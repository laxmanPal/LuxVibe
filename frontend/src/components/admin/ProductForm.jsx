import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ImageUploader from "../../components/admin/ImageUploader";
import Button from "@mui/material/Button";
import { RiDeleteBinLine } from "react-icons/ri";

const ProductForm = ({title , redBtn , blueBtn}) => {
  return (
      <div className="">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <form action="">
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
                    label="Product Name"
                    variant="outlined"
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    type="text"
                    id="name"
                    label="Brand Name"
                    variant="outlined"
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    label="Category"
                    variant="outlined"
                    select
                  >
                    <MenuItem value="men">Men</MenuItem>
                    <MenuItem value="women">Women</MenuItem>
                    <MenuItem value="kids">Kids</MenuItem>
                  </TextField>
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Description"
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
              <ImageUploader />
            </div>

            {/* Pricing */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-4">Pricing</h3>

              <div className="space-y-4">
                <div>
                  <TextField
                    fullWidth
                    type="number"
                    id="name"
                    label="Market Price"
                    variant="outlined"
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    type="number"
                    id="name"
                    label="Sale Price"
                    variant="outlined"
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    type="number"
                    id="name"
                    label="Off %"
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white px-5 py-5 shadow z-40">
          <div className="flex justify-end gap-5">
            <Button className="!border !border-red-600 !text-red-600 !rounded-lg text-center font-medium gap-3 !capitalize">
              <RiDeleteBinLine/> {redBtn}
            </Button>
            <Button className="!bg-blue-500 !text-white !rounded-lg text-center font-medium gap-3 !capitalize">
              {blueBtn}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
