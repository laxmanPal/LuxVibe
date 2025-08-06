export function currencyFormatter(price) {
  const formattedPrice = Math.round(price);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(formattedPrice);
}
