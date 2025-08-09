const ProductForm = ({
  title,
  redBtn,
  blueBtn,
  onSubmit,
  submitting,
  deleting,
  productDetails,
  existingImages,
  redBtnAction,
}) => {
  const [productImages, setProductImages] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    brand: "",
    categories: [],
    description: "",
    price: "",
    discountPrice: "",
    inStock: "",
  });
  const { categories } = useCategoryCtx();

  useEffect(() => {
    if (productDetails && productDetails.name) {
      setFormFields({
        name: productDetails.name || "",
        brand: productDetails.brand || "",
        categories: productDetails.categories?.map((cat) => cat._id) || [], // handle array or string
        description: productDetails.description || "",
        price: productDetails.price || "",
        discountPrice: productDetails.discountPrice || "",
        inStock: productDetails.inStock || "",
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

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-gray-600">Fill in the information below to manage your product</p>
        </div>

        <form onSubmit={(event) => onSubmit(event, formFields, productImages)}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left Column - Takes up 2/3 on large screens */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Basic Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Basic Information
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-1">
                      <TextField
                        fullWidth
                        type="text"
                        id="name"
                        name="name"
                        label="Product Name"
                        variant="outlined"
                        value={formFields.name}
                        onChange={handleInputChange}
                        className="!mb-0"
                        InputLabelProps={{
                          style: { color: '#6B7280' }
                        }}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <TextField
                        fullWidth
                        type="text"
                        id="brand"
                        name="brand"
                        label="Brand Name"
                        variant="outlined"
                        value={formFields.brand}
                        onChange={handleInputChange}
                        className="!mb-0"
                        InputLabelProps={{
                          style: { color: '#6B7280' }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <TextField
                      fullWidth
                      id="description"
                      label="Product Description"
                      name="description"
                      value={formFields.description}
                      onChange={handleInputChange}
                      multiline
                      rows={5}
                      variant="outlined"
                      placeholder="Describe your product in detail..."
                      InputLabelProps={{
                        style: { color: '#6B7280' }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Additional Information
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <Autocomplete
                      multiple
                      id="categories"
                      options={categories}
                      getOptionLabel={(option) => option.name}
                      value={categories.filter((cat) =>
                        formFields.categories.includes(cat._id)
                      )}
                      onChange={(event, newValue) => {
                        setFormFields({
                          ...formFields,
                          categories: newValue.map((cat) => cat._id),
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Product Categories"
                          placeholder="Select categories for your product"
                          InputLabelProps={{
                            style: { color: '#6B7280' }
                          }}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option.name}
                            {...getTagProps({ index })}
                            className="!bg-blue-50 !border-blue-200 !text-blue-700"
                            key={option._id}
                          />
                        ))
                      }
                    />
                  </div>
                  
                  <div>
                    <TextField
                      fullWidth
                      type="number"
                      id="quantity"
                      name="inStock"
                      label="Stock Quantity"
                      variant="outlined"
                      value={formFields.inStock}
                      onChange={handleInputChange}
                      placeholder="Enter available quantity"
                      InputLabelProps={{
                        style: { color: '#6B7280' }
                      }}
                      inputProps={{ min: 0 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Takes up 1/3 on large screens */}
            <div className="xl:col-span-1 space-y-6">
              
              {/* Product Images Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Product Images
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Upload up to 5 images</p>
                </div>
                <div className="p-6">
                  <ImageUploader
                    name="images"
                    limit={5}
                    onFileSelect={setProductImages}
                    existingImages={existingImages}
                  />
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    Pricing
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Set your product prices</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <TextField
                      fullWidth
                      type="number"
                      id="price"
                      label="Regular Price"
                      name="price"
                      variant="outlined"
                      value={formFields.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      InputLabelProps={{
                        style: { color: '#6B7280' }
                      }}
                      InputProps={{
                        startAdornment: (
                          <span className="text-gray-500 mr-2">$</span>
                        ),
                      }}
                      inputProps={{ min: 0, step: "0.01" }}
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
                      placeholder="0.00"
                      InputLabelProps={{
                        style: { color: '#6B7280' }
                      }}
                      InputProps={{
                        startAdornment: (
                          <span className="text-gray-500 mr-2">$</span>
                        ),
                      }}
                      inputProps={{ min: 0, step: "0.01" }}
                    />
                    {formFields.price && formFields.discountPrice && (
                      <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-700">
                          <span className="font-medium">Discount: </span>
                          {((formFields.price - formFields.discountPrice) / formFields.price * 100).toFixed(1)}% off
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Stats Card (Optional Enhancement) */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
                <h4 className="text-base font-semibold text-gray-800 mb-3">Quick Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categories:</span>
                    <span className="font-medium text-gray-900">
                      {formFields.categories.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock:</span>
                    <span className="font-medium text-gray-900">
                      {formFields.inStock || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Images:</span>
                    <span className="font-medium text-gray-900">
                      {productImages.length || 0}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4 shadow-lg z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <Button
              onClick={redBtnAction}
              className="!border-2 !border-red-500 !text-red-600 !rounded-lg !font-medium !capitalize !px-6 !py-3 hover:!bg-red-50 !transition-all !duration-200 order-2 sm:order-1"
            >
              {deleting ? (
                <CircularProgress size="20px" color="inherit" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <RiDeleteBinLine className="text-lg" />
                  {redBtn}
                </span>
              )}
            </Button>
            
            <Button
              type="submit"
              className="!bg-blue-600 hover:!bg-blue-700 !text-white !rounded-lg !font-medium !capitalize !px-8 !py-3 !shadow-md hover:!shadow-lg !transition-all !duration-200 order-1 sm:order-2"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <CircularProgress size="20px" color="inherit" />
                  <span>Processing...</span>
                </div>
              ) : (
                blueBtn
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};