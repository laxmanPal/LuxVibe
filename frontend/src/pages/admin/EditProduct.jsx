import ProductForm from "../../components/admin/ProductForm";

export default function EditProduct() {
  return (
    <>
        <ProductForm title={"Edit product"} redBtn={"Delete"} blueBtn={"Save"}/>
    </>
  );
}
