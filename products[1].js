/* VELCYRO — Product Catalog
 * Replace the demo image paths with real product photography when available.
 */
const VELCYRO_PRODUCTS = [
  {
    "id": 1,
    "slug": "void-signal-oversized-tee",
    "name": "VOID SIGNAL OVERSIZED TEE",
    "category": "tees",
    "collection": "VOID",
    "price": 999,
    "compareAt": 1199,
    "tag": "BESTSELLER",
    "color": "Black",
    "description": "A heavyweight oversized tee built around the VELCYRO visual language. Clean proportions, a deliberate silhouette and a graphic system designed for everyday rotation.",
    "material": "240 GSM heavyweight cotton",
    "fit": "Oversized",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "assets/products/void-signal-front.jpg",
      "assets/products/void-signal-back.jpg"
    ]
  },
  {
    "id": 2,
    "slug": "eclipse-heavyweight-tee",
    "name": "ECLIPSE HEAVYWEIGHT TEE",
    "category": "tees",
    "collection": "VOID",
    "price": 1099,
    "compareAt": 1299,
    "tag": "NEW",
    "color": "Off White",
    "description": "A restrained heavyweight tee with an oversized silhouette and tonal visual identity.",
    "material": "240 GSM heavyweight cotton",
    "fit": "Oversized",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "assets/products/eclipse-front.jpg",
      "assets/products/eclipse-back.jpg"
    ]
  },
  {
    "id": 3,
    "slug": "orbital-code-hoodie",
    "name": "ORBITAL CODE HOODIE",
    "category": "hoodies",
    "collection": "ORBIT",
    "price": 1899,
    "compareAt": 2199,
    "tag": "LIMITED",
    "color": "Slate",
    "description": "A heavyweight hoodie with a relaxed silhouette and a graphic treatment inspired by systems, signals and orbital forms.",
    "material": "420 GSM heavyweight cotton blend",
    "fit": "Relaxed oversized",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "assets/products/orbital-code-front.jpg",
      "assets/products/orbital-code-back.jpg"
    ]
  },
  {
    "id": 4,
    "slug": "after-dark-oversized-tee",
    "name": "AFTER DARK OVERSIZED TEE",
    "category": "tees",
    "collection": "AFTER DARK",
    "price": 999,
    "compareAt": 1199,
    "tag": "",
    "color": "Deep Olive",
    "description": "A dark-toned oversized tee designed for the after-hours side of the VELCYRO universe.",
    "material": "240 GSM heavyweight cotton",
    "fit": "Oversized",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "assets/products/after-dark-front.jpg",
      "assets/products/after-dark-back.jpg"
    ]
  },
  {
    "id": 5,
    "slug": "no-signal-heavy-hoodie",
    "name": "NO SIGNAL HEAVY HOODIE",
    "category": "hoodies",
    "collection": "AFTER DARK",
    "price": 1999,
    "compareAt": 2299,
    "tag": "DROP 01",
    "color": "Black",
    "description": "A substantial everyday hoodie with a clean exterior and a deliberately minimal VELCYRO identity.",
    "material": "420 GSM heavyweight cotton blend",
    "fit": "Relaxed oversized",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "assets/products/no-signal-front.jpg",
      "assets/products/no-signal-back.jpg"
    ]
  },
  {
    "id": 6,
    "slug": "lunar-static-tee",
    "name": "LUNAR STATIC TEE",
    "category": "tees",
    "collection": "ORBIT",
    "price": 1049,
    "compareAt": 1249,
    "tag": "NEW",
    "color": "Muted Purple",
    "description": "A graphic-led heavyweight tee built around the tension between static noise and precise geometry.",
    "material": "240 GSM heavyweight cotton",
    "fit": "Oversized",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "assets/products/lunar-static-front.jpg",
      "assets/products/lunar-static-back.jpg"
    ]
  },
  {
    "id": 7,
    "slug": "void-archive-tee",
    "name": "VOID ARCHIVE TEE",
    "category": "tees",
    "collection": "VOID",
    "price": 1199,
    "compareAt": 1399,
    "tag": "",
    "color": "Stone",
    "description": "An archive-inspired piece with a substantial hand feel and an understated graphic direction.",
    "material": "240 GSM heavyweight cotton",
    "fit": "Oversized",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "assets/products/void-archive-front.jpg",
      "assets/products/void-archive-back.jpg"
    ]
  },
  {
    "id": 8,
    "slug": "velcyro-frequency-hoodie",
    "name": "VELCYRO FREQUENCY HOODIE",
    "category": "hoodies",
    "collection": "ORBIT",
    "price": 2099,
    "compareAt": 2399,
    "tag": "LIMITED",
    "color": "Blue Grey",
    "description": "The signature hoodie of Drop 01: heavyweight construction, oversized proportions and a visual language built for VELCYRO.",
    "material": "420 GSM heavyweight cotton blend",
    "fit": "Relaxed oversized",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "assets/products/frequency-front.jpg",
      "assets/products/frequency-back.jpg"
    ]
  }
];

window.VELCYRO_PRODUCTS = VELCYRO_PRODUCTS;

window.getProductById = function (id) {
  return VELCYRO_PRODUCTS.find(p => Number(p.id) === Number(id)) || null;
};

window.getProductBySlug = function (slug) {
  return VELCYRO_PRODUCTS.find(p => p.slug === slug) || null;
};

window.formatINR = function (value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
};
