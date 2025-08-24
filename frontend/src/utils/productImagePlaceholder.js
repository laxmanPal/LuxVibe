import defaultPlaceholder from "../assets/products_placeholder_imgs/default.webp";
import jewellryPlaceholder from "../assets/products_placeholder_imgs/jewellry.png";
import footwearPlaceholder from "../assets/products_placeholder_imgs/footwear.webp";
import bagsPlaceholder from "../assets/products_placeholder_imgs/bags.webp";
import glassesPlaceholder from "../assets/products_placeholder_imgs/glasses.webp";

const placeholderImages = {
    footwear: footwearPlaceholder,
    bags: bagsPlaceholder,
    glasses: glassesPlaceholder,
    jewellry: jewellryPlaceholder,
    default: defaultPlaceholder,
};

const getProductImage = (product) => {
    if (product.images?.length > 0 && product.images[0]?.url) {
        return product.images[0].url;
    }

    if (product.categories && product.categories.length > 0) {
        const categoryNames = product.categories.map((c) =>
            c.name?.toLowerCase()
        );

        if (categoryNames.some((name) => name.includes("footwear") || name.includes("shoe"))) {
            return placeholderImages.footwear;
        }
        if (categoryNames.some((name) => name.includes("glass") || name.includes("sunglass"))) {
            return placeholderImages.glasses;
        }
        if (categoryNames.some((name) => name.includes("bag") || name.includes("backpack"))) {
            return placeholderImages.bags;
        }
        if (categoryNames.some((name) => name.includes("jewelry") || name.includes("jewellry"))) {
            return placeholderImages.jewellry;
        }
    }

    return placeholderImages.default;
};

export default getProductImage;