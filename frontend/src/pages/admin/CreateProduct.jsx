import ProductForm from "../../components/admin/ProductForm";

export default function CreateProduct() {
  return (
    <>
        <ProductForm title={"Create product"} redBtn={"Discard"} blueBtn={"Create"}/>
    </>
  );
}
