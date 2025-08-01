import Address from "../models/address.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { streetAddress, city, state, country, pincode, phone, type } =
      req.body;

    const address = new Address({
      userId,
      streetAddress,
      city,
      state,
      country,
      pincode,
      phone,
      type,
    });

    await address.save();

    res.status(201).json({
      message: "Adding Address successful.",
      address,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Add Address Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAddress = async (req, res) => {
  const userId = req.userId;

  try {
    const address = await Address.find({ userId });
    if (!address) {
      return res.status(404).json({
        message: "Something went wrong cannot get address.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Address fetched successfully",
      address,
      success: true,
    });
  } catch (error) {
    console.error("Get All Address Error:", error);
    return res.status(500).json({
      message: "Failed to get addresses",
      success: false,
    });
  }
};

export const setActiveAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // Deactivate all addresses for this user
    await Address.updateMany({ userId }, { status: false });

    // Activate the selected one
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: id, userId },
      { status: true },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res
      .status(200)
      .json({ message: "Active address set", address: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: "Error setting active address" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    await Address.findOneAndDelete({ _id: id, userId });
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Delete Address Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
