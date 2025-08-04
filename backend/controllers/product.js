import cloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      categories,
      price,
      discountPrice,
      inStock,
      sizes,
      isPublished,
    } = req.body;


    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // Parse arrays from form-data string
    const categoryIds = Array.isArray(categories)
      ? categories
      : categories?.split(",").map((id) => id.trim()) || [];

    const sizeList = Array.isArray(sizes)
      ? sizes
      : sizes?.split(",").map((s) => s.trim()) || [];

    // Upload all images to Cloudinary
    const imageUploadResults = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, "products");
        imageUploadResults.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // Create the product
    const newProduct = await Product.create({
      name,
      description,
      brand,
      categories: categoryIds,
      price,
      discountPrice: discountPrice || null,
      inStock: inStock || 0,
      sizes: sizeList,
      images: imageUploadResults,
      isPublished: isPublished ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const productsQuery = Product.find()
      .populate("categories", "name")
      .sort({ createdAt: -1 });

    if (limit > 0) {
      productsQuery.limit(limit);
    }

    const products = await productsQuery;

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categories",
      "name"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      categories,
      price,
      discountPrice,
      inStock,
      sizes,
      isPublished,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Parse input
    const categoryIds = Array.isArray(categories)
      ? categories
      : categories?.split(",").map((id) => id.trim()) || [];

    const sizeList = Array.isArray(sizes)
      ? sizes
      : sizes?.split(",").map((s) => s.trim()) || [];

    // Upload new images if provided
    if (req.files?.length) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, "products");
        product.images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // Update fields
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.brand = brand ?? product.brand;
    product.categories =
      categoryIds.length > 0 ? categoryIds : product.categories;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.inStock = inStock ?? product.inStock;
    product.sizes = sizeList.length > 0 ? sizeList : product.sizes;
    product.isPublished = isPublished ?? product.isPublished;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete images from Cloudinary
    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    // Remove product from DB
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product and images deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

export const deleteProductImage = async (req, res) => {
  const { id } = req.params;
  const imageUrl = req.body?.imageUrl;

  if (!imageUrl) {
    return res.status(400).json({
      success: false,
      message: "imageUrl is required in request body",
    });
  }

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const removedImage = product.images.find(
      (imgObj) => imgObj.url === imageUrl
    );

    if (!removedImage) {
      return res.status(400).json({
        success: false,
        message: "Image URL not found in product",
      });
    }

    if (removedImage.public_id) {
      await cloudinary.uploader.destroy(removedImage.public_id);
    }

    product.images = product.images.filter((imgObj) => imgObj.url !== imageUrl);

    await product.save();

    res.status(200).json({
      success: true,
      message: "Image removed from product and Cloudinary",
      images: product.images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove image",
      error: error.message,
    });
  }
};
