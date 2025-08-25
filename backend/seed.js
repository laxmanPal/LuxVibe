import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/category.js";
import Product from "./models/product.js";

dotenv.config();

const categories = [{
    "name": "Glasses",
    "slug": "glasses",
    "images": []
}, {
    "name": "Jewelry",
    "slug": "jewelry",
    "images": []
}, {
    "name": "Bags",
    "slug": "bags",
    "images": []
}, {
    "name": "Footwear",
    "slug": "footwear",
    "images": []
}, {
    "name": "Kids",
    "slug": "kids",
    "images": []
}, {
    "name": "Women",
    "slug": "women",
    "images": []
}, {
    "name": "Men",
    "slug": "men",
    "images": []
}];

const products = [
  {
    "name": "Raynex Wraparound Sunglasses",
    "description": "Engineered for all-day comfort, these wraparound sunglasses are designed with a snug fit that prevents slipping during movement. Their curved frame design provides extra coverage against sunlight, making them perfect for outdoor activities.",
    "brand": "Raynex",
    "price": 2699,
    "discountPrice": 2099,
    "inStock": 27,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "ZenithMetal Rectangular Sunglasses",
    "description": "These rectangular sunglasses offer a modern twist on classic eyewear with slim metallic frames. Lightweight and durable, they make an excellent choice for business and casual attire alike.",
    "brand": "ZenithMetal",
    "price": 2399,
    "discountPrice": 1799,
    "inStock": 36,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "GlareFree Driving Sunglasses",
    "description": "Specially designed with anti-reflective lenses, these sunglasses minimize glare from headlights and bright sunlight while driving. Comfortable for long hours, they ensure safety and style behind the wheel.",
    "brand": "GlareFree",
    "price": 1999,
    "discountPrice": 1599,
    "inStock": 48,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "Solaris Hexagon Sunglasses",
    "description": "Featuring trendy hexagonal lenses, these sunglasses add a modern edge to everyday looks. Their lightweight alloy frame makes them durable yet stylish, catering to fashion-forward individuals.",
    "brand": "Solaris",
    "price": 2599,
    "discountPrice": 1999,
    "inStock": 21,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "TruShade Mirrored Sunglasses",
    "description": "These mirrored lens sunglasses reflect glare and add a vibrant flair to any outfit. Popular among trendsetters, they blend street-style fashion with essential UV protection.",
    "brand": "TruShade",
    "price": 2299,
    "discountPrice": 1699,
    "inStock": 44,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "VantaVision Wayfarer Sunglasses",
    "description": "With a timeless wayfarer design, these sunglasses are crafted to suit all face shapes. Sturdy frames and tinted lenses make them perfect for both casual and formal use.",
    "brand": "VantaVision",
    "price": 2499,
    "discountPrice": 1899,
    "inStock": 52,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "ClearView Transparent Sunglasses",
    "description": "Designed with transparent frames, these sunglasses bring a modern and futuristic vibe to casual wear. They are lightweight, comfortable, and built for long-lasting durability.",
    "brand": "ClearView",
    "price": 2199,
    "discountPrice": 1699,
    "inStock": 37,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "ArcticRay Frosted Sunglasses",
    "description": "These frosted frame sunglasses are perfect for adding subtle sophistication. With durable build quality and tinted lenses, they are suitable for urban and beach lifestyles.",
    "brand": "ArcticRay",
    "price": 2399,
    "discountPrice": 1899,
    "inStock": 33,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "MetroShade Slim Sunglasses",
    "description": "These slim-framed sunglasses are built for minimalist fashion enthusiasts. Their understated design makes them versatile, blending seamlessly with casual and formal attire.",
    "brand": "MetroShade",
    "price": 2099,
    "discountPrice": 1599,
    "inStock": 40,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "SkyLens Gradient Blue Sunglasses",
    "description": "With gradient blue lenses, these sunglasses combine cool aesthetics with UV protection. Built with lightweight materials, they are ideal for everyday city life.",
    "brand": "SkyLens",
    "price": 2299,
    "discountPrice": 1799,
    "inStock": 29,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "BoldRay Matte Black Sunglasses",
    "description": "Matte black frames give these sunglasses a bold and modern aesthetic. Designed to withstand daily wear, they are a staple accessory for versatile fashion looks.",
    "brand": "BoldRay",
    "price": 2599,
    "discountPrice": 1999,
    "inStock": 47,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "AureliaCraft Aviator Sunglasses",
    "description": "These aviator sunglasses are designed with a sleek metallic frame and tinted lenses, offering a blend of durability and comfort. Ideal for outdoor wear, they provide UV protection while maintaining a stylish appearance suitable for both casual and semi-formal outfits.",
    "brand": "AureliaCraft",
    "price": 2599,
    "discountPrice": 1899,
    "inStock": 35,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "UrbanEdge Square Frame Sunglasses",
    "description": "Crafted with bold acetate frames, these square sunglasses are perfect for individuals looking to make a statement. Lightweight yet sturdy, they complement modern fashion while offering excellent eye protection.",
    "brand": "UrbanEdge",
    "price": 1999,
    "discountPrice": 1499,
    "inStock": 50,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "VistaLux Round Retro Sunglasses",
    "description": "These round retro sunglasses bring back timeless charm with modern materials. The lightweight frame ensures comfort, while tinted lenses add an elegant vibe, making them ideal for daily wear.",
    "brand": "VistaLux",
    "price": 2299,
    "discountPrice": 1799,
    "inStock": 28,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "SunScape Polarized Sunglasses",
    "description": "Built for adventure seekers, these polarized sunglasses minimize glare, making them perfect for driving, hiking, or beach outings. They combine function with rugged design for everyday versatility.",
    "brand": "SunScape",
    "price": 2799,
    "discountPrice": 2099,
    "inStock": 40,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "FrameWorks Cat-Eye Sunglasses",
    "description": "These cat-eye sunglasses offer a stylish, feminine design paired with modern UV protection. The lightweight acetate frame ensures long-lasting comfort, making them an essential fashion accessory.",
    "brand": "FrameWorks",
    "price": 2499,
    "discountPrice": 1999,
    "inStock": 22,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "ShadeCraft Oversized Sunglasses",
    "description": "Oversized lenses with gradient shades give these sunglasses a bold and glamorous appeal. Perfect for holidays and day outings, they provide complete UV protection while adding flair to your outfit.",
    "brand": "ShadeCraft",
    "price": 2899,
    "discountPrice": 2199,
    "inStock": 19,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "NovaRay Sport Sunglasses",
    "description": "Designed for active lifestyles, these sports sunglasses feature flexible arms, anti-slip grips, and polarized lenses. Great for runners, cyclists, and outdoor enthusiasts.",
    "brand": "NovaRay",
    "price": 3199,
    "discountPrice": 2499,
    "inStock": 46,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "LuxeVision Clubmaster Sunglasses",
    "description": "These half-frame clubmaster sunglasses combine vintage appeal with modern comfort. Their sturdy build and tinted lenses make them suitable for daily wear and travel.",
    "brand": "LuxeVision",
    "price": 2499,
    "discountPrice": 1999,
    "inStock": 31,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "OptiWave Gradient Sunglasses",
    "description": "These gradient lens sunglasses offer a chic urban design. The lightweight frame sits comfortably for long hours, making them suitable for driving and daily wear.",
    "brand": "OptiWave",
    "price": 2199,
    "discountPrice": 1699,
    "inStock": 42,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "glasses"
    ]
  },
  {
    "name": "AureliaCraft Gold-Plated Necklace",
    "description": "This elegant gold-plated necklace is crafted with precision and fine detailing. Designed to enhance both ethnic and western attire, its lightweight build makes it comfortable for long wear. A perfect blend of tradition and modern fashion.",
    "brand": "AureliaCraft",
    "price": 3499,
    "discountPrice": 2799,
    "inStock": 25,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "UrbanEdge Silver Hoop Earrings",
    "description": "Minimalist yet striking, these sterling silver hoop earrings are designed to complement everyday outfits. They are lightweight and hypoallergenic, making them ideal for prolonged use.",
    "brand": "UrbanEdge",
    "price": 1599,
    "discountPrice": 1199,
    "inStock": 45,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "VistaLux Pearl Drop Earrings",
    "description": "Designed with fine imitation pearls, these drop earrings add timeless charm to any outfit. They are perfect for festive wear, weddings, and evening parties.",
    "brand": "VistaLux",
    "price": 2199,
    "discountPrice": 1699,
    "inStock": 30,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "SunScape Stone-Studded Bangle Set",
    "description": "This designer bangle set is crafted with sparkling stones and premium alloys. Lightweight yet durable, it adds instant glamour to traditional outfits.",
    "brand": "SunScape",
    "price": 2599,
    "discountPrice": 1999,
    "inStock": 18,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "FrameWorks Adjustable Finger Ring",
    "description": "Crafted from stainless steel with a polished finish, this adjustable ring offers both durability and comfort. Its contemporary design makes it suitable for daily wear as well as special occasions.",
    "brand": "FrameWorks",
    "price": 1399,
    "discountPrice": 999,
    "inStock": 52,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "ShadeCraft Layered Pendant",
    "description": "This layered pendant features a unique geometric design, making it a bold statement piece. Its light build ensures all-day comfort while adding a chic element to your look.",
    "brand": "ShadeCraft",
    "price": 1799,
    "discountPrice": 1299,
    "inStock": 36,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "NovaRay Crystal Choker Necklace",
    "description": "With embedded crystals and premium metal chains, this choker necklace is perfect for evening wear. It adds a glamorous and modern touch to party outfits.",
    "brand": "NovaRay",
    "price": 2999,
    "discountPrice": 2399,
    "inStock": 22,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "LuxeVision Oxidized Silver Jhumkas",
    "description": "These oxidized silver jhumkas are a timeless classic that blend beautifully with ethnic wear. Handmade with intricate detailing, they are both lightweight and durable.",
    "brand": "LuxeVision",
    "price": 1899,
    "discountPrice": 1399,
    "inStock": 41,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "OptiWave Gemstone Pendant",
    "description": "This gemstone pendant showcases vibrant colored stones set in durable metal. It is versatile enough to be paired with both daily casual wear and festive attire.",
    "brand": "OptiWave",
    "price": 2299,
    "discountPrice": 1799,
    "inStock": 28,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "Raynex Brass Anklet Pair",
    "description": "This anklet pair is made of high-quality brass alloy and designed with intricate engravings. Comfortable and lightweight, they add subtle charm to ethnic and western outfits.",
    "brand": "Raynex",
    "price": 1499,
    "discountPrice": 1099,
    "inStock": 55,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "AuraCraft Antique Kundan Necklace",
    "description": "A traditional Kundan necklace with antique finish, perfect for weddings and festive occasions. Handcrafted with attention to detail for a royal look.",
    "brand": "AuraCraft",
    "price": 4999,
    "discountPrice": 3899,
    "inStock": 16,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "ZenithStyle Beaded Bracelet",
    "description": "A casual beaded bracelet designed for daily wear. Lightweight, adjustable, and available in earthy tones for a natural style.",
    "brand": "ZenithStyle",
    "price": 899,
    "discountPrice": 649,
    "inStock": 60,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "MoonRay Stone Pendant Set",
    "description": "Elegant pendant set with earrings featuring colored stones. Perfect for gifting and suitable for formal or festive wear.",
    "brand": "MoonRay",
    "price": 2699,
    "discountPrice": 2099,
    "inStock": 27,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "Lustra Brass Cuff Bracelet",
    "description": "A modern cuff bracelet crafted in brass with matte polish. Adjustable and versatile, ideal for both men and women.",
    "brand": "Lustra",
    "price": 1799,
    "discountPrice": 1399,
    "inStock": 33,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "GleamEdge Oxidized Nose Pin",
    "description": "Handmade oxidized silver nose pin with floral engraving. Lightweight and skin-friendly for everyday wear.",
    "brand": "GleamEdge",
    "price": 599,
    "discountPrice": 399,
    "inStock": 75,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "ShineCraft Layered Bead Anklet",
    "description": "Stylish anklet made with multiple layers of colorful beads. Designed to add a playful and bohemian charm to casual wear.",
    "brand": "ShineCraft",
    "price": 1299,
    "discountPrice": 949,
    "inStock": 42,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "Velora Crystal Stud Earrings",
    "description": "Minimalist stud earrings made with sparkling crystals. Lightweight, elegant, and perfect for daily office wear.",
    "brand": "Velora",
    "price": 999,
    "discountPrice": 749,
    "inStock": 50,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "MiraGlow Gold-Plated Kada",
    "description": "Gold-plated kada bangle with premium polish. Durable and suitable for traditional outfits, yet sleek enough for modern styling.",
    "brand": "MiraGlow",
    "price": 2699,
    "discountPrice": 1999,
    "inStock": 21,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "CrystalBay Designer Brooch",
    "description": "A unique brooch studded with imitation crystals. Adds sophistication to coats, sarees, or even bags for an elevated look.",
    "brand": "CrystalBay",
    "price": 1599,
    "discountPrice": 1199,
    "inStock": 38,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "NovaEdge Adjustable Charm Bracelet",
    "description": "Trendy charm bracelet with multiple dangling charms. Adjustable and suitable for casual everyday outfits.",
    "brand": "NovaEdge",
    "price": 1899,
    "discountPrice": 1499,
    "inStock": 47,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "jewelry"
    ]
  },
  {
    "name": "Oversized Grey Hoodie",
    "description": "Wrap yourself in the luxurious comfort of our Oversized Grey Hoodie, designed for those who value both style and relaxation. Its extra-roomy silhouette provides a laid-back, trendy look while allowing for free movement. Crafted with plush, breathable materials, it seamlessly blends comfort and fashion. Perfect for lounging at home, casual hangouts, or layering over your activewear, this hoodie is a must-have for every modern, fashion-forward wardrobe.",
    "brand": "UrbanLuxe",
    "price": 4820.95,
    "discountPrice": 4382.6,
    "inStock": 80,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      {
        "$oid": "688f454992720e7b1c098e05"
      }
    ]
  },
  {
    "name": "Street Style Zipper Hoodie",
    "description": "Make a statement with the Street Style Zipper Hoodie, engineered for those who seek a bold, urban edge in their attire. Featuring a sturdy front zipper and sleek, streamlined silhouette, this hoodie is crafted from premium midweight fleece to keep you cozy yet cool. Its modern streetwear-inspired details, such as ribbed cuffs, contrast piping, and a tailored fit, set you apart from the crowd whether you’re downtown or at a weekend gathering.",
    "brand": "CityEdge",
    "price": 5259.29,
    "discountPrice": 4382.6,
    "inStock": 75,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      {
        "$oid": "688f456092720e7b1c098e20"
      },
      {
        "$oid": "688f454992720e7b1c098e05"
      }
    ]
  },
  {
    "name": "Pink Cropped Hoodie",
    "description": "Chic and playful, the Pink Cropped Hoodie is your new go-to for effortless style. Its cropped cut accentuates the waistline, while the ultra-soft fabric feels gentle against your skin. Designed for layering over tank tops, tees, or sports bras, this hoodie features ribbed hems and a relaxed hood. Combine it with your favorite high-waisted jeans or leggings for a trendy, casual ensemble that moves with you throughout the day.",
    "brand": "FemmeFit",
    "price": 4382.6,
    "discountPrice": 3944.25,
    "inStock": 90,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      {
        "$oid": "688f454992720e7b1c098e05"
      }
    ]
  },
  {
    "name": "White Minimal Hoodie",
    "description": "Embrace understated style with the White Minimal Hoodie. This cozy essential features a clean and simple silhouette, making it easy to pair with any outfit. Crafted with premium, pill-resistant fabric, it maintains its fresh, crisp look wash after wash. Whether layered under a jacket or worn solo, its relaxed fit and deep front pocket offer both comfort and convenience for any occasion.",
    "brand": "SimpleWear",
    "price": 3505.9,
    "discountPrice": 2629.21,
    "inStock": 110,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      {
        "$oid": "688f456092720e7b1c098e20"
      },
      {
        "$oid": "688f454992720e7b1c098e05"
      }
    ]
  },
  {
    "name": "Denim Hoodie",
    "description": "Fusing classic denim style with modern hoodie comfort, our Denim Hoodie is a statement piece for every wardrobe. The exterior has a rugged denim finish, while the interior stays soft and cozy for all-day wear. Detailed with contrast stitching, metal buttons, and an adjustable hood, this hoodie brings casual cool to any outfit, letting you layer up with confidence and style.",
    "brand": "DenimBlend",
    "price": 7012.68,
    "discountPrice": 6135.99,
    "inStock": 35,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      {
        "$oid": "688f456092720e7b1c098e20"
      },
      {
        "$oid": "688f454992720e7b1c098e05"
      }
    ]
  },
  {
    "name": "Hoodie with Fanny",
    "description": "The Hoodie with Fanny Pack is the ultimate blend of fashion and functionality. Its integrated, detachable fanny pack lets you carry essentials hands-free, perfect for festivals, traveling, or daily errands. Made from a lightweight, stain-resistant blend, this hoodie ensures comfort all day long, with a relaxed fit designed for layering or wearing on its own.",
    "brand": "Baggy",
    "price": 4909.07,
    "discountPrice": 4470.69,
    "inStock": 48,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      {
        "$oid": "688f456092720e7b1c098e20"
      },
      {
        "$oid": "688f454992720e7b1c098e05"
      }
    ]
  },
  {
    "name": "Tech Hoodie",
    "description": "Stay powered on the go with our Tech Hoodie, meticulously designed for athletes and tech enthusiasts alike. Featuring moisture-wicking fabric, headphone cord guides, and an internal media pocket, this hoodie merges function with fashion. The modern cut and contrasting panels give it a sporty aesthetic, providing comfort and utility whether you’re at the gym or exploring the city.",
    "brand": "MoveFlex",
    "price": 5259.29,
    "discountPrice": 4908.62,
    "inStock": 70,
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "images": [],
    "isPublished": true,
    "rating": 4.1,
    "numReviews": 7,
    "reviews": [],
    "categorySlugs": [
      "men",
      "women"
    ]
  },
  {
    "name": "Reflective Night Hoodie",
    "description": "Stay visible and stylish with the Reflective Night Hoodie. Designed for late-night joggers, commuters, or anyone who values safety after dark, this hoodie features reflective strips along the seams and hood. The soft, breathable material keeps you comfortable, while the modern fit ensures you never have to choose between utility and style.",
    "brand": "GlowUp",
    "price": 5522.3,
    "discountPrice": 5171.62,
    "inStock": 29,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "images": [],
    "isPublished": true,
    "rating": 4.6,
    "numReviews": 8,
    "reviews": [],
    "categorySlugs": [
      "men",
      "women"
    ]
  },
  {
    "name": "Chainsaw man Hoodie",
    "description": "Join the movement towards sustainability with our Eco-Friendly Hoodie, made entirely from 100% organic cotton. This piece is dyed using eco-safe processes, offering a soft and breathable fit perfect for all-day comfort. Simple yet stylish, it’s designed for the conscious consumer who doesn’t compromise on fashion or values. Show your support for the environment and look good doing it.",
    "brand": "Chainsaw Basics",
    "price": 4382.6,
    "discountPrice": 3944.25,
    "inStock": 55,
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "images": [],
    "isPublished": true,
    "rating": 4.5,
    "numReviews": 7,
    "reviews": [],
    "categorySlugs": [
      "men",
      "women"
    ]
  },
  {
    "name": "Travel Hoodie",
    "description": "Designed for wanderers and world explorers, the Travel Hoodie is packed with features like hidden zipper pockets, thumb holes, and a phone sleeve. Lightweight and packable, it’s an ideal choice for long flights, road trips, and unpredictable weather. Its quick-dry fabric and breathable construction make it just as appropriate for sightseeing as for the daily commute.",
    "brand": "Nomad",
    "price": 5697.64,
    "discountPrice": 5259.29,
    "inStock": 22,
    "sizes": [
      "M",
      "L"
    ],
    "images": [],
    "isPublished": true,
    "rating": 4.7,
    "numReviews": 6,
    "reviews": [],
    "categorySlugs": [
      "men",
      "women"
    ]
  },
  {
    "name": "Classic Black Hoodie",
    "description": "Experience ultimate versatility with our Classic Black Hoodie—a wardrobe staple that combines timeless style and unbeatable comfort. Made from ultra-soft, brushed cotton blend, this hoodie is perfect for layering during chilly days or wearing solo for a laid-back weekend look. The relaxed fit, adjustable drawstring hood, and spacious front pocket make it both functional and cozy. Whether you’re heading to the gym, running errands, or just relaxing at home, this hoodie will keep you warm and stylish season after season.",
    "brand": "ComfyWear",
    "price": 4031.92,
    "discountPrice": 3505.9,
    "inStock": 120,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      {
        "$oid": "688f456092720e7b1c098e20"
      }
    ]
  },
  {
    "name": "Sherpa Lined Hoodie",
    "description": "Brave the cold with unmatched warmth in our Sherpa Lined Hoodie. The inside is fully lined with ultra-soft, plush Sherpa fleece, creating a cocoon of comfort that traps heat without adding bulk. Perfect for outdoor adventures or cozying up on the couch, this hoodie features a high-neck design, secure pockets, and an adjustable hood for extra protection against wind and chill.",
    "brand": "WinterVibe",
    "price": 6135.99,
    "discountPrice": 5259.29,
    "inStock": 60,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      {
        "$oid": "688f456092720e7b1c098e20"
      }
    ]
  },
  {
    "name": "UrbanEdge Cotton Tee",
    "description": "Crafted from premium 100% cotton, this t-shirt combines comfort and durability in a clean minimalist design. The breathable fabric ensures sweat-wicking performance during warm Indian summers, while its soft hand-feel makes it an everyday essential. A classic crew-neck silhouette fits seamlessly with both casual jeans and semi-formal chinos. Designed for all-day wear, the stitching is reinforced for longer life, ensuring it remains a staple in your wardrobe. Perfect for those who appreciate modern basics with superior craftsmanship.",
    "brand": "UrbanEdge",
    "price": 699,
    "discountPrice": 599,
    "inStock": 100,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      {
        "$oid": "688f456092720e7b1c098e20"
      }
    ]
  },
  {
    "name": "StreetLoom City Backpack",
    "description": "A sleek urban backpack designed for commuters who carry a little of everything. The padded 15.6\" laptop sleeve keeps devices safe, while quick-access pockets organize cables, cards, and keys. Breathable mesh back panel and contoured straps reduce heat build-up during long days. Built with water-resistant fabric that shrugs off light rain and spills.",
    "brand": "StreetLoom",
    "price": 3999,
    "discountPrice": 3199,
    "inStock": 34,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "men"
    ]
  },
  {
    "name": "Velora Luxe Handbag",
    "description": "An elegant handbag crafted from soft-grain faux leather with a subtle sheen. The structured silhouette stands upright on its own, while internal dividers keep essentials neatly separated. A detachable crossbody strap converts it from desk to dinner in seconds. Finished with satin hardware that resists tarnish.",
    "brand": "Velora",
    "price": 4499,
    "discountPrice": 3499,
    "inStock": 28,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "women"
    ]
  },
  {
    "name": "TrailMile 45L Trek Rucksack",
    "description": "Built for weekend treks and long day hikes, this 45L rucksack balances capacity with comfort. Compression straps stabilize the load, and the airflow channel helps keep your back cool. A bottom zip opens to a separate shoe or laundry compartment. Durable ripstop exterior resists scuffs on rocky trails.",
    "brand": "TrailMile",
    "price": 6299,
    "discountPrice": 4999,
    "inStock": 19,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags"
    ]
  },
  {
    "name": "WorkForge Laptop Messenger",
    "description": "A professional messenger bag tailored for office and travel. The padded sleeve fits up to 15\" laptops, while a full-width organizer stores pens, chargers, and notebooks. Magnetic flap with hidden zip keeps your gear secure without slowing you down. Slip it over your trolley handle using the rear pass-through.",
    "brand": "WorkForge",
    "price": 4199,
    "discountPrice": 3399,
    "inStock": 31,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "men"
    ]
  },
  {
    "name": "BloomKnot Embroidered Clutch",
    "description": "A statement party clutch with hand-embroidered florals and a pearl-kiss lock. Compact yet practical, it fits large phones, cards, and lipstick with room to spare. The detachable chain lets you switch from clutch to shoulder bag instantly. Lined with satin to protect delicate accessories.",
    "brand": "BloomKnot",
    "price": 2499,
    "discountPrice": 1899,
    "inStock": 44,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "women"
    ]
  },
  {
    "name": "EcoJute Market Tote",
    "description": "This reusable market tote is woven from sturdy natural jute for daily errands and beach days alike. Wide handles sit comfortably on the shoulder even when fully loaded. An interior slip pocket keeps your phone and wallet easy to reach. Collapses flat to slide into a drawer or suitcase.",
    "brand": "EcoJute",
    "price": 999,
    "discountPrice": 749,
    "inStock": 67,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags"
    ]
  },
  {
    "name": "JetPod Cabin Trolley 20\"",
    "description": "A compact cabin trolley with a hard-shell exterior and smooth 360° spinner wheels. The telescopic handle locks at multiple heights for comfort. Interior cross straps and zip divider keep clothes tidy in transit. Sized to fit most airline carry-on requirements.",
    "brand": "JetPod",
    "price": 7999,
    "discountPrice": 6399,
    "inStock": 24,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags"
    ]
  },
  {
    "name": "GymRush Ventilated Duffel",
    "description": "A lightweight duffel designed for workouts and short trips. A ventilated shoe pocket isolates used trainers from clean clothes. The wide U-shaped opening makes packing effortless, and the water-resistant base protects against wet floors. Carry by hand or clip on the padded shoulder strap.",
    "brand": "GymRush",
    "price": 2899,
    "discountPrice": 2199,
    "inStock": 37,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "men"
    ]
  },
  {
    "name": "PicoPack Mini Backpack",
    "description": "Small in size, big on organization. The PicoPack features two front stash pockets, a hidden back pocket, and a roomy main compartment for daily essentials. Soft straps make it comfortable for long wear, and the compact profile suits cafe runs and concerts alike. A playful pop lining adds personality.",
    "brand": "PicoPack",
    "price": 1799,
    "discountPrice": 1399,
    "inStock": 52,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "women"
    ]
  },
  {
    "name": "CrossLink Sling Pro",
    "description": "A versatile sling that wears left or right and keeps your hands free. The padded back panel contours to the body, while the interior divider keeps a tablet separate from small accessories. Quick-release buckle makes it easy to swing around to the front for security. Ideal for city commuting and travel.",
    "brand": "CrossLink",
    "price": 1999,
    "discountPrice": 1499,
    "inStock": 48,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags"
    ]
  },
  {
    "name": "CanvasCrafter Artist Tote",
    "description": "Designed for creatives, this tall tote fits sketchbooks, A4 folders, and a slim laptop. Side loops hold brushes or pens, and the interior zip pocket secures valuables. Heavyweight canvas stands up to daily use without losing shape. Perfect for classes, studios, and street sketching.",
    "brand": "CanvasCrafter",
    "price": 1699,
    "discountPrice": 1299,
    "inStock": 56,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags"
    ]
  },
  {
    "name": "UrbanSprint Anti-Theft Backpack",
    "description": "Security-focused backpack with hidden zippers and a cut-resistant panel. An external USB passthrough keeps your phone charged on the go. Reflective accents enhance low-light visibility on late commutes. Fits a 16\" laptop with shock-absorbing padding.",
    "brand": "UrbanSprint",
    "price": 3699,
    "discountPrice": 2899,
    "inStock": 33,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "women",
      "men"
    ]
  },
  {
    "name": "KidVoyage Dinosaur Schoolbag",
    "description": "A fun and durable school backpack with a friendly dino print kids love. The lightweight frame is easy on little shoulders, and the chest strap prevents slipping. Two bottle pockets and reflective piping add safety and convenience. Easy-clean lining survives accidental spills.",
    "brand": "KidVoyage",
    "price": 1599,
    "discountPrice": 1199,
    "inStock": 61,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "kids"
    ]
  },
  {
    "name": "SparkGala Party Purse",
    "description": "Glitter-finish mini purse that catches light from every angle. The interior slip pocket keeps cards tidy while leaving space for essentials. A delicate chain strap lets you wear it crossbody when the dance floor calls. Snap closure keeps everything secure without fuss.",
    "brand": "SparkGala",
    "price": 1899,
    "discountPrice": 1399,
    "inStock": 46,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "women"
    ]
  },
  {
    "name": "NomadFold Packable Daypack",
    "description": "This featherweight daypack folds into its own pocket for travel. Despite the small packed size, it opens to a surprisingly spacious main compartment with an internal key clip. Ripstop fabric resists tears from daily adventures. Toss it in your suitcase or glovebox as a just-in-case bag.",
    "brand": "NomadFold",
    "price": 1499,
    "discountPrice": 1099,
    "inStock": 58,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags"
    ]
  },
  {
    "name": "MetroMate Executive Briefcase",
    "description": "A slim briefcase for meetings when you need sharp looks without bulk. The interior features a padded laptop sleeve, pen loops, and a zip pocket for accessories. Vegan leather exterior wipes clean and holds its shape. Includes a detachable shoulder strap for hands-free commuting.",
    "brand": "MetroMate",
    "price": 4899,
    "discountPrice": 3899,
    "inStock": 23,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "men"
    ]
  },
  {
    "name": "WeaveWave Boho Hobo",
    "description": "A relaxed boho hobo bag with soft drape and woven texture. The generous interior swallows a scarf, tablet, and water bottle with ease. Magnetic top closes quickly, while the zip pocket secures valuables. Pairs perfectly with flowy dresses and denim.",
    "brand": "WeaveWave",
    "price": 2699,
    "discountPrice": 2099,
    "inStock": 36,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags",
      "women"
    ]
  },
  {
    "name": "AquaGuard Dry Bag 20L",
    "description": "Keep gear dry on kayak trips and monsoon rides with this roll-top dry bag. Welded seams and a watertight buckle seal out splashes and rain. The removable strap lets you carry it crossbody when hands are full. Bright color options improve visibility outdoors.",
    "brand": "AquaGuard",
    "price": 2199,
    "discountPrice": 1699,
    "inStock": 40,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags"
    ]
  },
  {
    "name": "SportSphere Shoe Sack",
    "description": "A ventilated drawstring sack tailored for shoes or quick gym runs. The mesh panel lets moisture escape while protecting the rest of your kit. Durable cord and reinforced corners withstand daily use. Stashes flat in a backpack pocket when not in use.",
    "brand": "SportSphere",
    "price": 799,
    "discountPrice": 599,
    "inStock": 73,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags"
    ]
  },
  {
    "name": "Heritage Trunk Weekender",
    "description": "A vintage-inspired weekender with reinforced edges and classic trunk hardware. The wide mouth opening makes packing easy, and the interior straps keep clothing stacked. Dual carry handles and a padded shoulder strap offer flexible carry options. Perfect for road trips and short business travel.",
    "brand": "Heritage Trunk Co.",
    "price": 5799,
    "discountPrice": 4599,
    "inStock": 20,
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "bags"
    ]
  },
  {
    "name": "StrideFlex Running Shoes",
    "description": "Designed for both comfort and performance, these running shoes feature breathable mesh uppers, cushioned midsoles, and durable rubber soles for maximum grip and support during your workouts or casual runs.",
    "brand": "StrideFlex",
    "price": 3499,
    "discountPrice": 2799,
    "inStock": 55,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "UrbanWalk Sneakers",
    "description": "A stylish pair of sneakers crafted with a modern design, featuring lightweight construction, cushioned insoles, and versatile looks that pair perfectly with jeans, shorts, or joggers.",
    "brand": "UrbanWalk",
    "price": 2899,
    "discountPrice": 2199,
    "inStock": 72,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "LeatherEase Formal Shoes",
    "description": "Elegant formal shoes made with premium faux leather, cushioned footbeds, and slip-resistant soles. Perfect for professional settings and formal occasions where style and comfort matter.",
    "brand": "LeatherEase",
    "price": 3999,
    "discountPrice": 3199,
    "inStock": 40,
    "sizes": [
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "TrailTrek Hiking Boots",
    "description": "Built for adventure, these hiking boots feature rugged soles for grip, water-resistant uppers, and reinforced ankle support. Ideal for trekking and outdoor exploration.",
    "brand": "TrailTrek",
    "price": 5499,
    "discountPrice": 4599,
    "inStock": 30,
    "sizes": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "ComfyCloud Slippers",
    "description": "Soft and cozy slippers designed with plush interiors and anti-slip soles, offering warmth and comfort for relaxing indoors or casual use.",
    "brand": "ComfyCloud",
    "price": 999,
    "discountPrice": 699,
    "inStock": 85,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "AeroStep Sports Shoes",
    "description": "Lightweight sports shoes with breathable mesh uppers, cushioned EVA midsoles, and slip-resistant rubber outsoles. Perfect for gym workouts, jogging, and casual sports activities.",
    "brand": "AeroStep",
    "price": 3199,
    "discountPrice": 2499,
    "inStock": 62,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "MetroMule Loafers",
    "description": "Stylish loafers with slip-on design, faux leather finish, and soft cushioned footbeds. These versatile shoes work perfectly for casual and semi-formal looks.",
    "brand": "MetroMule",
    "price": 2799,
    "discountPrice": 2199,
    "inStock": 48,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "CozyStep Flip Flops",
    "description": "Everyday casual flip-flops made with soft EVA footbeds and lightweight rubber straps. Designed for comfort and ease whether at home, beach, or outdoors.",
    "brand": "CozyStep",
    "price": 699,
    "discountPrice": 499,
    "inStock": 95,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "EliteEdge Brogues",
    "description": "Classic brogues with intricate detailing, polished finish, and durable soles. Designed for timeless sophistication and perfect for pairing with formal wear.",
    "brand": "EliteEdge",
    "price": 4499,
    "discountPrice": 3699,
    "inStock": 28,
    "sizes": [
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "VenturePro Sandals",
    "description": "Outdoor sandals with adjustable Velcro straps, cushioned footbeds, and durable rubber soles. Great for summer outings, trekking, and casual walks.",
    "brand": "VenturePro",
    "price": 1999,
    "discountPrice": 1499,
    "inStock": 67,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "TrailMate Hiking Boots",
    "description": "Rugged hiking boots with ankle support, waterproof coating, and anti-slip outsoles. Designed for outdoor adventures, trekking, and long-distance walking.",
    "brand": "TrailMate",
    "price": 5299,
    "discountPrice": 4399,
    "inStock": 33,
    "sizes": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "ComfiWear Ballet Flats",
    "description": "Chic ballet flats with cushioned insoles and soft faux-leather construction. Designed for all-day comfort and effortless style, perfect for office and casual wear.",
    "brand": "ComfiWear",
    "price": 1899,
    "discountPrice": 1399,
    "inStock": 72,
    "sizes": [
      "5",
      "6",
      "7",
      "8",
      "9"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "UrbanStep High Tops",
    "description": "Trendy high-top sneakers with padded collars, breathable canvas material, and cushioned soles. A stylish streetwear essential for urban lifestyles.",
    "brand": "UrbanStep",
    "price": 3499,
    "discountPrice": 2899,
    "inStock": 58,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "FlexiRun Trainers",
    "description": "Performance trainers with lightweight mesh uppers, flexible soles, and impact-absorbing midsoles. Ideal for running, workouts, and daily fitness activities.",
    "brand": "FlexiRun",
    "price": 2999,
    "discountPrice": 2299,
    "inStock": 81,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "ClassicWalk Derby Shoes",
    "description": "Elegant Derby shoes crafted with synthetic leather, lace-up closure, and comfortable footbeds. A wardrobe essential for formal occasions and office attire.",
    "brand": "ClassicWalk",
    "price": 3899,
    "discountPrice": 3199,
    "inStock": 40,
    "sizes": [
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "DailyEase Slip-Ons",
    "description": "Comfort-oriented slip-on shoes with elastic side panels and cushioned insoles. Perfect for everyday wear, travel, and light outdoor activities.",
    "brand": "DailyEase",
    "price": 1799,
    "discountPrice": 1299,
    "inStock": 66,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "BoldTrek Combat Boots",
    "description": "Sturdy combat boots with tough soles, lace-up closure, and ankle support. Built for durability and style, perfect for rugged streetwear and outdoor looks.",
    "brand": "BoldTrek",
    "price": 4999,
    "discountPrice": 4199,
    "inStock": 25,
    "sizes": [
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "LiteFlex Running Shoes",
    "description": "Ultra-lightweight running shoes with knitted uppers and shock-absorbing soles. Designed for marathon runners and fitness enthusiasts.",
    "brand": "LiteFlex",
    "price": 2799,
    "discountPrice": 2199,
    "inStock": 77,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "ChillStep Espadrilles",
    "description": "Casual espadrilles with canvas uppers and jute-wrapped soles. Comfortable, lightweight, and perfect for warm-weather casual wear.",
    "brand": "ChillStep",
    "price": 1599,
    "discountPrice": 1099,
    "inStock": 54,
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "PrimeEdge Formal Oxfords",
    "description": "Classic Oxford shoes with polished uppers, lace-up design, and cushioned insoles. A must-have for formal occasions, meetings, and events.",
    "brand": "PrimeEdge",
    "price": 4299,
    "discountPrice": 3599,
    "inStock": 37,
    "sizes": [
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "footwear"
    ]
  },
  {
    "name": "SunnyDay Graphic Tee",
    "description": "This soft cotton t-shirt keeps little ones comfy from playground to playdates. The breathable knit resists shrinking after repeated washes, while the tag-free neck avoids irritation. A vivid front print stays bright even after countless adventures and laundry cycles.",
    "brand": "SunnyDay",
    "price": 799,
    "discountPrice": 599,
    "inStock": 120,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "Playtime Denim Dungarees",
    "description": "Sturdy yet soft denim dungarees made for climbing, crawling, and creative messes. Adjustable shoulder straps grow with your child and the roomy pockets stash treasures from the day. Reinforced knees add durability without adding bulk.",
    "brand": "Playtime",
    "price": 1999,
    "discountPrice": 1499,
    "inStock": 50,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "CozyBear Fleece Hoodie",
    "description": "A plush fleece hoodie with a gentle brushed interior for warmth without weight. Ribbed cuffs hold sleeves in place during active play and a roomy hood adds snuggly coverage. Perfect for layering over tees on breezy evenings.",
    "brand": "CozyBear",
    "price": 1499,
    "discountPrice": 1199,
    "inStock": 70,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "StarryNight Cotton Dress",
    "description": "Twirl-ready cotton dress with a soft lining that prevents cling and keeps skin happy. The A-line silhouette allows free movement while a gentle elastic waist ensures a secure fit. Finished with sparkly star prints that delight at birthdays and festivals.",
    "brand": "StarryNight",
    "price": 2199,
    "discountPrice": 1699,
    "inStock": 45,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "Explorer Windbreaker Jacket",
    "description": "Lightweight windbreaker with a water-repellent finish for drizzles and breezy bus stops. Mesh lining boosts airflow, while reflective trims add low-light visibility. Packs down small into its own pocket for easy carrying.",
    "brand": "SkyHigh Kids",
    "price": 1799,
    "discountPrice": 1399,
    "inStock": 40,
    "sizes": [
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "Dreamland Pajama Set",
    "description": "Snuggly two-piece pajamas in breathable cotton jersey for comfy nights. The elasticated waistband sits softly on the tummy, and flat seams help prevent irritation. Prints remain bright after repeated washes.",
    "brand": "Dreamland",
    "price": 1099,
    "discountPrice": 799,
    "inStock": 80,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "SplashZone Swim Set",
    "description": "Chlorine-resistant swim set that dries fast and moves with them. Raglan sleeves protect shoulders from sun while the elasticated shorts stay put in the water. Ideal for pools, beaches, and swim lessons.",
    "brand": "SplashZone",
    "price": 1399,
    "discountPrice": 999,
    "inStock": 60,
    "sizes": [
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "ActiveStretch Joggers",
    "description": "Everyday joggers with a soft brushed interior and a flexible waistband that keeps up with playground sprints. Ribbed cuffs prevent riding up and the drawcord adjusts for a perfect fit. Built for comfort at home and school.",
    "brand": "ActiveStretch",
    "price": 1299,
    "discountPrice": 999,
    "inStock": 75,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "SchoolDays Polo Tee",
    "description": "A neat polo with a soft collar that holds its shape through busy school weeks. Breathable piqué knit wicks moisture, while reinforced placket stitching stands up to frequent wear. Easy to tuck in and easy to love.",
    "brand": "SchoolDays",
    "price": 999,
    "discountPrice": 749,
    "inStock": 110,
    "sizes": [
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "FestiveWeave Kurta Set",
    "description": "A traditional kurta set in breathable cotton blend designed for celebrations and family gatherings. The kurta features delicate contrast piping and the pyjama includes a soft drawstring for fuss-free comfort. Easy to style with sandals or moccasins.",
    "brand": "FestiveWeave",
    "price": 2499,
    "discountPrice": 1999,
    "inStock": 35,
    "sizes": [
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "TinySteps Sprint Sneakers",
    "description": "Lightweight sneakers that cushion every hop and skip with responsive foam. Breathable mesh uppers keep feet cool and adjustable straps make on-off simple for independent kids. A grippy outsole handles playgrounds and pavements with ease.",
    "brand": "TinySteps",
    "price": 1999,
    "discountPrice": 1499,
    "inStock": 65,
    "sizes": [
      "9C",
      "10C",
      "11C",
      "12C",
      "13C",
      "1Y",
      "2Y",
      "3Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids",
      "footwear"
    ]
  },
  {
    "name": "MiniTrek Adventure Sandals",
    "description": "Open-toe sandals with adjustable straps for a secure, custom fit. The cushioned footbed supports all-day exploring, while the rugged outsole grips on park paths and garden trails. Quick-dry materials make them monsoon friendly.",
    "brand": "MiniTrek",
    "price": 1499,
    "discountPrice": 1099,
    "inStock": 55,
    "sizes": [
      "9C",
      "10C",
      "11C",
      "12C",
      "13C",
      "1Y",
      "2Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids",
      "footwear"
    ]
  },
  {
    "name": "ClassMate School Shoes",
    "description": "Polished school shoes with a scuff-resistant upper and a cushioned insole for long days. The non-marking outsole keeps classroom floors clean, and an easy hook-and-loop closure speeds up mornings. Built to handle the weekly timetable.",
    "brand": "ClassMate",
    "price": 2299,
    "discountPrice": 1799,
    "inStock": 40,
    "sizes": [
      "10C",
      "11C",
      "12C",
      "13C",
      "1Y",
      "2Y",
      "3Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids",
      "footwear"
    ]
  },
  {
    "name": "RainGuard Gumboots",
    "description": "Waterproof gumboots made for puddle-jumping season. A deep-lug sole improves traction on slick paths, and the tall shaft keeps socks dry. Easy-rinse exterior cleans up in a snap after muddy adventures.",
    "brand": "RainGuard",
    "price": 1699,
    "discountPrice": 1299,
    "inStock": 30,
    "sizes": [
      "10C",
      "11C",
      "12C",
      "13C",
      "1Y",
      "2Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids",
      "footwear"
    ]
  },
  {
    "name": "ComfyCloud Slippers Kids",
    "description": "Plush slip-on slippers with memory foam that cradles growing feet. A soft microfleece lining keeps toes warm on chilly mornings and the grippy sole prevents slips on tile floors. Perfect for cozy days at home.",
    "brand": "ComfyCloud",
    "price": 899,
    "discountPrice": 599,
    "inStock": 90,
    "sizes": [
      "9C",
      "10C",
      "11C",
      "12C",
      "13C",
      "1Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids",
      "footwear"
    ]
  },
  {
    "name": "DinoPack School Backpack",
    "description": "A cheerful backpack with a friendly dino print that brightens school mornings. Dual bottle pockets, a padded device sleeve, and a front organizer keep essentials tidy. Easy-clean lining and reflective tape add everyday practicality.",
    "brand": "KidVoyage",
    "price": 1599,
    "discountPrice": 1199,
    "inStock": 70,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids",
      "bags"
    ]
  },
  {
    "name": "SparkLuxe Hairband Pack (3)",
    "description": "A trio of soft, snag-free hairbands topped with playful bows and glitter accents. Gentle elastic holds styles all day without pulling. Great for school, parties, and photos.",
    "brand": "SparkLuxe",
    "price": 499,
    "discountPrice": 349,
    "inStock": 100,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "WarmWool Knitted Cap",
    "description": "A cozy knit cap with a soft rib that stretches comfortably over little ears. Lightweight warmth makes it a winter staple for school runs and park time. Easy to hand-wash and quick to dry.",
    "brand": "WarmWool",
    "price": 699,
    "discountPrice": 499,
    "inStock": 80,
    "sizes": [],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "SprintKid Knit Shorts",
    "description": "Breathable knit shorts with an adjustable drawcord for the perfect fit. The lightweight fabric wicks moisture to keep kids cool on hot days. Side pockets store small finds from the playground.",
    "brand": "SprintKid",
    "price": 899,
    "discountPrice": 649,
    "inStock": 95,
    "sizes": [
      "2-3Y",
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  },
  {
    "name": "LunaBelle Party Gown",
    "description": "A dreamy party gown with layered tulle, satin lining, and a gentle stretch waist for comfort through the celebrations. Subtle shimmer details photograph beautifully. Designed for birthdays, weddings, and festive nights.",
    "brand": "LunaBelle",
    "price": 2899,
    "discountPrice": 2299,
    "inStock": 28,
    "sizes": [
      "3-4Y",
      "4-5Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "images": [],
    "isPublished": true,
    "rating": 0,
    "numReviews": 0,
    "reviews": [],
    "categorySlugs": [
      "kids"
    ]
  }
]



const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Clear old data
        await Category.deleteMany();
        await Product.deleteMany();

        console.log("🗑️ Old data cleared");

        // Insert categories
        const createdCategories = await Category.insertMany(categories);
        console.log("Categories seeded");

        // Map products with actual category IDs
        const productsWithCategoryIds = products.map((product) => {
            const categoryIds = product.categorySlugs.map((slug) => {
                const category = createdCategories.find((cat) => cat.slug === slug);
                return category ? category._id : null;
            }).filter(Boolean);

            return {
                ...product,
                categories: categoryIds,
            };
        });

        // Insert products
        await Product.insertMany(productsWithCategoryIds);
        console.log("Products seeded");

        process.exit();
    } catch (err) {
        console.error("Error seeding DB:", err);
        process.exit(1);
    }
};

seedDB();