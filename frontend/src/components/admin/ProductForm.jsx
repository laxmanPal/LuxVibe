import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ImageUploader from "../../components/admin/ImageUploader";
import Button from "@mui/material/Button";
import { RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
const API_URL = import.meta.env.VITE_API_URL;

const ProductForm = ({
  title,
  redBtn,
  blueBtn,
  onSubmit,
  submitting,
  productDetails,
  existingProductImages,
  redBtnAction
}) => {
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    brand: "",
    categories: "",
    description: "",
    price: "",
    discountPrice: "",
  });

  useEffect(() => {
    if (productDetails && productDetails.name) {
      setFormFields({
        name: productDetails.name || "",
        brand: productDetails.brand || "",
        categories: productDetails.categories[0]?._id || "", // handle array or string
        description: productDetails.description || "",
        price: productDetails.price || "",
        discountPrice: productDetails.discountPrice || "",
      });
      if (productDetails.images) {
        setProductImages(productDetails.images);
      }
    }
  }, [productDetails]);

  const handleInputChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/category/all-categories`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching Users failed");
      }
      console.log(data);

      setCategories(data.categories);
    } catch (error) {
      console.error("Fetching Categories Error:", error.message);
    }
  };
  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <form onSubmit={(event) => onSubmit(event, formFields, productImages)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-30">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <TextField
                    fullWidth
                    type="text"
                    id="name"
                    name="name"
                    label="Product Name"
                    variant="outlined"
                    value={formFields.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    type="text"
                    id="brand"
                    name="brand"
                    label="Brand Name"
                    variant="outlined"
                    value={formFields.brand}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    label="Category"
                    id="Category"
                    name="categories"
                    variant="outlined"
                    value={formFields.categories}
                    onChange={handleInputChange}
                    select
                  >
                    {categories.map((category, index) => {
                      return (
                        <MenuItem value={category._id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    value={formFields.description}
                    onChange={handleInputChange}
                    multiline
                    rows={5}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-4">Product Image</h3>
              <ImageUploader
                name="images"
                limit={5}
                onFileSelect={setProductImages}
                existingProductImages={existingProductImages}
              />
            </div>

            {/* Pricing */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-4">Pricing</h3>

              <div className="space-y-4">
                <div>
                  <TextField
                    fullWidth
                    type="number"
                    id="price"
                    label="Price"
                    name="price"
                    variant="outlined"
                    value={formFields.price}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    type="number"
                    id="sale-price"
                    label="Sale Price"
                    name="discountPrice"
                    variant="outlined"
                    value={formFields.discountPrice}
                    onChange={handleInputChange}
                  />
                </div>

                {/* <div>
                  <TextField
                    fullWidth
                    type="number"
                    id="name"
                    label="Off %"
                    variant="outlined"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white px-5 py-5 shadow z-40">
          <div className="flex justify-end gap-5">
            <Button onClick={redBtnAction} className="!border !border-red-600 !text-red-600 !rounded-lg text-center font-medium gap-3 !capitalize">
              <RiDeleteBinLine /> {redBtn}
            </Button>
            <Button
              type="submit"
              className="!bg-blue-500 !text-white !rounded-lg text-center font-medium gap-3 !capitalize"
            >
              {submitting ? (
                <CircularProgress size="20px" color="inherit" />
              ) : (
                blueBtn
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
