import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import Order from "../models/order.js";
import User from "../models/user.js";
import Cart from "../models/cart.js";

async function handleStripeOrder(session) {
  try {
    const { userId, shippingAddress } = session.metadata;
    const parsedAddress = JSON.parse(shippingAddress);

    const user = await User.findById(userId);

    const stripeLineItems = session.line_items.data;

    const items = stripeLineItems.map((item) => ({
      product: item.price.product.metadata.productId,
      quantity: item.quantity,
      size: item.metadata?.size || "",
      price: item.price.unit_amount / 100,
    }));

    const order = new Order({
      user: userId,
      items,
      shippingAddress: {
        fullName: user.name,
        streetAddress: parsedAddress.streetAddress,
        city: parsedAddress.city,
        pincode: parsedAddress.pincode,
        country: parsedAddress.country,
      },
      paymentMethod: "Stripe",
      paymentStatus: {
        isPaid: true,
        paidAt: new Date(),
        paymentId: session.payment_intent,
        method: "Stripe",
      },
      orderStatus: "Confirmed",
      deliveryStatus: {
        isDelivered: false,
        deliveredAt: null,
      },
      totalAmount: session.amount_total / 100,
      shippingFee: 0,
      taxAmount: 0,
    });

    await order.save();

    await Cart.findOneAndUpdate(
      { user: userId },
      { items: [], totalItems: 0, totalPrice: 0 }
    );
  } catch (error) {
    console.error("Order creation failed:", error);
    throw error;
  }
}

export const createStripeCheckoutSession = async (req, res) => {
  try {
    const { cartItems, shippingInfo } = req.body;
    const userId = req.userId;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          images: [item.product.images[0].url],
          name: item.product.name,
          metadata: {
            productId: item.product._id.toString(),
          },
        },
        unit_amount: Math.round(item.product.discountPrice * 100), // ₹ → paise
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/myaccount/myorders`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        userId,
        shippingAddress: JSON.stringify(shippingInfo),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create Stripe session" });
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items", "line_items.data.price.product"],
        }
      );

      await handleStripeOrder(sessionWithLineItems);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook event:", error);
    res.status(500).json({ error: error.message });
  }
};
