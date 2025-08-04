const CATEGORIES = {
  Men: '64e1234abcd1234567890001',
  Women: '64e1234abcd1234567890002',
  Kids: '64e1234abcd1234567890003',
  Footwear: '64e1234abcd1234567890004',
  Bags: '64e1234abcd1234567890005',
  Jewelry: '64e1234abcd1234567890006',
  Sunglasses: '64e1234abcd1234567890007',
};

const products = [
  {
    name: "Kids Rainbow Hoodie",
    description: "Brighten up your little one’s world with our Kids Rainbow Hoodie. Colorful and fun, this hoodie is made to keep kids warm during playtime, trips to the park, or family outings. The soft cotton-poly blend offers gentle warmth without sacrificing breathability, while the vibrant rainbow design inspires creativity and joy. Easy to wash and durable enough for endless adventures, it’ll quickly become a favorite in their closet.",
    brand: "TinyTrendz",
    categories: [CATEGORIES.Kids],
    price: 29.99,
    discountPrice: 24.99,
    inStock: 50,
    sizes: ["2T", "3T", "4T", "5T"],
    images: [
      {
        url: "https://example.com/images/hoodie3.jpg",
        public_id: "hoodie3_img1"
      }
    ],
    isPublished: true,
    rating: 4.6,
    numReviews: 5
  },
  {
    name: "Kids Dino Hoodie",
    description: "Let your little explorers roar with excitement in the Kids Dino Hoodie! Featuring playful dinosaur spikes along the hood and back, this cozy creation sparks imagination during playtime. Soft, stretchy fabric keeps up with every leap and tumble, while easy-on zippers make dressing a breeze. Durable and machine-washable, it’s a practical pick that adds a sense of adventure to everyday wear.",
    brand: "RoarWear",
    categories: [CATEGORIES.Kids],
    price: 34.99,
    discountPrice: 29.99,
    inStock: 40,
    sizes: ["2T", "3T", "4T"],
    images: [
      {
        url: "https://example.com/images/hoodie10.jpg",
        public_id: "hoodie10_img1"
      }
    ],
    isPublished: true,
    rating: 4.9,
    numReviews: 9
  },
  {
    name: "Tech Hoodie",
    description: "Stay powered on the go with our Tech Hoodie, meticulously designed for athletes and tech enthusiasts alike. Featuring moisture-wicking fabric, headphone cord guides, and an internal media pocket, this hoodie merges function with fashion. The modern cut and contrasting panels give it a sporty aesthetic, providing comfort and utility whether you’re at the gym or exploring the city.",
    brand: "MoveFlex",
    categories: [CATEGORIES.Men, CATEGORIES.Women],
    price: 59.99,
    discountPrice: 55.99,
    inStock: 70,
    sizes: ["M", "L", "XL"],
    images: [
      {
        url: "https://example.com/images/hoodie11.jpg",
        public_id: "hoodie11_img1"
      }
    ],
    isPublished: true,
    rating: 4.1,
    numReviews: 7
  },
  {
    name: "Hoodie with Fanny Pack",
    description: "The Hoodie with Fanny Pack is the ultimate blend of fashion and functionality. Its integrated, detachable fanny pack lets you carry essentials hands-free, perfect for festivals, traveling, or daily errands. Made from a lightweight, stain-resistant blend, this hoodie ensures comfort all day long, with a relaxed fit designed for layering or wearing on its own.",
    brand: "Baggy",
    categories: [CATEGORIES.Men, CATEGORIES.Bags],
    price: 55.99,
    discountPrice: 50.99,
    inStock: 48,
    sizes: ["S", "M", "L"],
    images: [
      {
        url: "https://example.com/images/hoodie12.jpg",
        public_id: "hoodie12_img1"
      }
    ],
    isPublished: true,
    rating: 3.9,
    numReviews: 5
  },
  {
    name: "Luxury Gold Print Hoodie",
    description: "Elevate your style with the Luxury Gold Print Hoodie, featuring intricate, metallic gold designs throughout. This hoodie uses top-grade cotton for a naturally soft touch, while the shimmering patterns add a touch of opulence. Ideal for making a statement during night outs or special events, its tailored fit and refined finishes set it apart as an iconic wardrobe choice.",
    brand: "RichMode",
    categories: [CATEGORIES.Men, CATEGORIES.Jewelry],
    price: 99.99,
    discountPrice: 89.99,
    inStock: 15,
    sizes: ["M", "L", "XL"],
    images: [
      {
        url: "https://example.com/images/hoodie13.jpg",
        public_id: "hoodie13_img1"
      }
    ],
    isPublished: true,
    rating: 4.9,
    numReviews: 3
  },
  {
    name: "Reflective Night Hoodie",
    description: "Stay visible and stylish with the Reflective Night Hoodie. Designed for late-night joggers, commuters, or anyone who values safety after dark, this hoodie features reflective strips along the seams and hood. The soft, breathable material keeps you comfortable, while the modern fit ensures you never have to choose between utility and style.",
    brand: "GlowUp",
    categories: [CATEGORIES.Men, CATEGORIES.Women, CATEGORIES.Sunglasses],
    price: 62.99,
    discountPrice: 58.99,
    inStock: 29,
    sizes: ["S", "M", "L"],
    images: [
      {
        url: "https://example.com/images/hoodie14.jpg",
        public_id: "hoodie14_img1"
      }
    ],
    isPublished: true,
    rating: 4.6,
    numReviews: 8
  },
  {
    name: "Eco-Friendly Hoodie",
    description: "Join the movement towards sustainability with our Eco-Friendly Hoodie, made entirely from 100% organic cotton. This piece is dyed using eco-safe processes, offering a soft and breathable fit perfect for all-day comfort. Simple yet stylish, it’s designed for the conscious consumer who doesn’t compromise on fashion or values. Show your support for the environment and look good doing it.",
    brand: "EcoBasics",
    categories: [CATEGORIES.Men, CATEGORIES.Women],
    price: 49.99,
    discountPrice: 44.99,
    inStock: 55,
    sizes: ["S", "M", "L"],
    images: [
      {
        url: "https://example.com/images/hoodie15.jpg",
        public_id: "hoodie15_img1"
      }
    ],
    isPublished: true,
    rating: 4.5,
    numReviews: 7
  },
  {
    name: "Dual-Tone Hoodie",
    description: "Inject some energy into your wardrobe with our Dual-Tone Hoodie. The bold two-color design grabs attention while the lightweight, stretchable fabric ensures ease of movement. This hoodie features a full-length zipper, side pockets, and a comfortable hood, making it an ideal choice for outdoor activities, sporty looks, or everyday errands.",
    brand: "ColorPop",
    categories: [CATEGORIES.Men, CATEGORIES.Women],
    price: 41.99,
    discountPrice: 37.99,
    inStock: 77,
    sizes: ["S", "M", "L"],
    images: [
      {
        url: "https://example.com/images/hoodie16.jpg",
        public_id: "hoodie16_img1"
      }
    ],
    isPublished: true,
    rating: 4.0,
    numReviews: 4
  },
  {
    name: "Travel Hoodie",
    description: "Designed for wanderers and world explorers, the Travel Hoodie is packed with features like hidden zipper pockets, thumb holes, and a phone sleeve. Lightweight and packable, it’s an ideal choice for long flights, road trips, and unpredictable weather. Its quick-dry fabric and breathable construction make it just as appropriate for sightseeing as for the daily commute.",
    brand: "Nomad",
    categories: [CATEGORIES.Men, CATEGORIES.Bags],
    price: 64.99,
    discountPrice: 59.99,
    inStock: 22,
    sizes: ["M", "L"],
    images: [
      {
        url: "https://example.com/images/hoodie17.jpg",
        public_id: "hoodie17_img1"
      }
    ],
    isPublished: true,
    rating: 4.7,
    numReviews: 6
  }
];




[
  {
    "name": "Kids Rainbow Hoodie",
    "description": "Brighten up your little one’s world with our Kids Rainbow Hoodie. Colorful and fun, this hoodie is made to keep kids warm during playtime, trips to the park, or family outings. The soft cotton-poly blend offers gentle warmth without sacrificing breathability, while the vibrant rainbow design inspires creativity and joy. Easy to wash and durable enough for endless adventures, it’ll quickly become a favorite in their closet.",
    "brand": "TinyTrendz",
    "categories": ["688f43ce92720e7b1c098d81"],
    "price": 29.99,
    "discountPrice": 24.99,
    "inStock": 50,
    "sizes": ["2T", "3T", "4T", "5T"],
    "images": [
      {
        "url": "https://example.com/images/hoodie3.jpg",
        "public_id": "hoodie3_img1"
      }
    ],
    "isPublished": true,
    "rating": 4.6,
    "numReviews": 5
  },
  {
    "name": "Kids Dino Hoodie",
    "description": "Let your little explorers roar with excitement in the Kids Dino Hoodie! Featuring playful dinosaur spikes along the hood and back, this cozy creation sparks imagination during playtime. Soft, stretchy fabric keeps up with every leap and tumble, while easy-on zippers make dressing a breeze. Durable and machine-washable, it’s a practical pick that adds a sense of adventure to everyday wear.",
    "brand": "RoarWear",
    "categories": ["688f43ce92720e7b1c098d81"],
    "price": 34.99,
    "discountPrice": 29.99,
    "inStock": 40,
    "sizes": ["2T", "3T", "4T"],
    "images": [
      {
        "url": "https://example.com/images/hoodie10.jpg",
        "public_id": "hoodie10_img1"
      }
    ],
    "isPublished": true,
    "rating": 4.9,
    "numReviews": 9
  },
  {
    "name": "Tech Hoodie",
    "description": "Stay powered on the go with our Tech Hoodie, meticulously designed for athletes and tech enthusiasts alike. Featuring moisture-wicking fabric, headphone cord guides, and an internal media pocket, this hoodie merges function with fashion. The modern cut and contrasting panels give it a sporty aesthetic, providing comfort and utility whether you’re at the gym or exploring the city.",
    "brand": "MoveFlex",
    "categories": ["688f456092720e7b1c098e20", "688f454992720e7b1c098e05"],
    "price": 59.99,
    "discountPrice": 55.99,
    "inStock": 70,
    "sizes": ["M", "L", "XL"],
    "images": [
      {
        "url": "https://example.com/images/hoodie11.jpg",
        "public_id": "hoodie11_img1"
      }
    ],
    "isPublished": true,
    "rating": 4.1,
    "numReviews": 7
  },
  {
    "name": "Hoodie with Fanny Pack",
    "description": "The Hoodie with Fanny Pack is the ultimate blend of fashion and functionality. Its integrated, detachable fanny pack lets you carry essentials hands-free, perfect for festivals, traveling, or daily errands. Made from a lightweight, stain-resistant blend, this hoodie ensures comfort all day long, with a relaxed fit designed for layering or wearing on its own.",
    "brand": "Baggy",
    "categories": ["688f456092720e7b1c098e20", "688f432e92720e7b1c098d10"],
    "price": 55.99,
    "discountPrice": 50.99,
    "inStock": 48,
    "sizes": ["S", "M", "L"],
    "images": [
      {
        "url": "https://example.com/images/hoodie12.jpg",
        "public_id": "hoodie12_img1"
      }
    ],
    "isPublished": true,
    "rating": 3.9,
    "numReviews": 5
  },
  {
    "name": "Luxury Gold Print Hoodie",
    "description": "Elevate your style with the Luxury Gold Print Hoodie, featuring intricate, metallic gold designs throughout. This hoodie uses top-grade cotton for a naturally soft touch, while the shimmering patterns add a touch of opulence. Ideal for making a statement during night outs or special events, its tailored fit and refined finishes set it apart as an iconic wardrobe choice.",
    "brand": "RichMode",
    "categories": ["688f456092720e7b1c098e20"],
    "price": 99.99,
    "discountPrice": 89.99,
    "inStock": 15,
    "sizes": ["M", "L", "XL"],
    "images": [
      {
        "url": "https://example.com/images/hoodie13.jpg",
        "public_id": "hoodie13_img1"
      }
    ],
    "isPublished": true,
    "rating": 4.9,
    "numReviews": 3
  },
  {
    "name": "Reflective Night Hoodie",
    "description": "Stay visible and stylish with the Reflective Night Hoodie. Designed for late-night joggers, commuters, or anyone who values safety after dark, this hoodie features reflective strips along the seams and hood. The soft, breathable material keeps you comfortable, while the modern fit ensures you never have to choose between utility and style.",
    "brand": "GlowUp",
    "categories": ["688f456092720e7b1c098e20", "688f454992720e7b1c098e05"],
    "price": 62.99,
    "discountPrice": 58.99,
    "inStock": 29,
    "sizes": ["S", "M", "L"],
    "images": [
      {
        "url": "https://example.com/images/hoodie14.jpg",
        "public_id": "hoodie14_img1"
      }
    ],
    "isPublished": true,
    "rating": 4.6,
    "numReviews": 8
  },
  {
    "name": "Eco-Friendly Hoodie",
    "description": "Join the movement towards sustainability with our Eco-Friendly Hoodie, made entirely from 100% organic cotton. This piece is dyed using eco-safe processes, offering a soft and breathable fit perfect for all-day comfort. Simple yet stylish, it’s designed for the conscious consumer who doesn’t compromise on fashion or values. Show your support for the environment and look good doing it.",
    "brand": "EcoBasics",
    "categories": ["688f456092720e7b1c098e20", "688f454992720e7b1c098e05"],
    "price": 49.99,
    "discountPrice": 44.99,
    "inStock": 55,
    "sizes": ["S", "M", "L"],
    "images": [
      {
        "url": "https://example.com/images/hoodie15.jpg",
        "public_id": "hoodie15_img1"
      }
    ],
    "isPublished": true,
    "rating": 4.5,
    "numReviews": 7
  },
  {
    "name": "Dual-Tone Hoodie",
    "description": "Inject some energy into your wardrobe with our Dual-Tone Hoodie. The bold two-color design grabs attention while the lightweight, stretchable fabric ensures ease of movement. This hoodie features a full-length zipper, side pockets, and a comfortable hood, making it an ideal choice for outdoor activities, sporty looks, or everyday errands.",
    "brand": "ColorPop",
    "categories": ["688f456092720e7b1c098e20", "688f454992720e7b1c098e05"],
    "price": 41.99,
    "discountPrice": 37.99,
    "inStock": 77,
    "sizes": ["S", "M", "L"],
    "images": [
      {
        "url": "https://example.com/images/hoodie16.jpg",
        "public_id": "hoodie16_img1"
      }
    ],
    "isPublished": true,
    "rating": 4.0,
    "numReviews": 4
  },
  {
    "name": "Travel Hoodie",
    "description": "Designed for wanderers and world explorers, the Travel Hoodie is packed with features like hidden zipper pockets, thumb holes, and a phone sleeve. Lightweight and packable, it’s an ideal choice for long flights, road trips, and unpredictable weather. Its quick-dry fabric and breathable construction make it just as appropriate for sightseeing as for the daily commute.",
    "brand": "Nomad",
    "categories": ["688f456092720e7b1c098e20", "688f454992720e7b1c098e05"],
    "price": 64.99,
    "discountPrice": 59.99,
    "inStock": 22,
    "sizes": ["M", "L"],
    "images": [
      {
        "url": "https://example.com/images/hoodie17.jpg",
        "public_id": "hoodie17_img1"
      }
    ],
    "isPublished": true,
    "rating": 4.7,
    "numReviews": 6
  }
]
