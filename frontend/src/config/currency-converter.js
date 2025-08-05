const usdToInrRate = 83.25; // You can update this as needed

export function convertUsdToInr(usd) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(usd * usdToInrRate);
}
