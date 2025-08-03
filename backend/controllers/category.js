import cloudinary from "../config/cloudinary.js";
import Category from "../models/category.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const existing = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // let imageUrl = "";
    // if (req.file) {
    //   const result = await uploadToCloudinary(req.file.buffer, "categories");
    //   imageUrl = result.secure_url;
    // }

    const imageUploadResults = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, "categories");
        imageUploadResults.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const category = await Category.create({
      name,
      slug,
      images: imageUploadResults,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    category.slug = slug || category.slug;

    // if (req.file?.path) {
    //   category.image = req.file.path;
    // }

    if (req.files?.length) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, "categories");
        category.images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // Upload new images if provided
    // if (req.files?.length) {
    //   for (const file of req.files) {
    //     const result = await uploadToCloudinary(file.buffer, "products");
    //     product.images.push({
    //       url: result.secure_url,
    //       public_id: result.public_id,
    //     });
    //   }
    // }

    const updatedCategory = await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    for (const img of category.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};
