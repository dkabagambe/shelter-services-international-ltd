// ── existing product images ────────────────────────────────────────────────
import frenchBeans from "@/assets/p-frenchbeans.jpg";
import peppers from "@/assets/p-peppers.jpg";
import cabbage from "@/assets/p-cabbage.jpg";
import carrots from "@/assets/p-carrots.jpg";
import broccoli from "@/assets/p-broccoli.jpg";
import tomatoes from "@/assets/p-tomatoes.jpg";
import avocado from "@/assets/p-avocado.jpg";
import babyCorn from "@/assets/p-babycorn.jpg";
import snowPeas from "@/assets/p-snowpeas.jpg";
import mangoes from "@/assets/p-mangoes.jpg";
import yellowBananas from "@/assets/p-yellow-bananas.jpg";
import greenBananas from "@/assets/p-green-bananas.jpg";
import pineapple from "@/assets/p-pineapple.jpg";
import passionFruit from "@/assets/p-passion-fruit.jpg";
import goatMeat from "@/assets/p-goat-meat.jpg";
import sheepMeat from "@/assets/p-sheep-meat.jpg";
import beef from "@/assets/p-beef.jpg";

// ── sheep gallery ──────────────────────────────────────────────────────────
import sheep1 from "@/assets/sheep1.jpeg";
import sheep2 from "@/assets/sheep2.jpeg";
import sheep3 from "@/assets/sheep3.jpeg";
import sheep4 from "@/assets/sheep4.jpeg";
import sheep5 from "@/assets/sheep5.jpeg";
import sheep6 from "@/assets/sheep6.jpeg";

// ── mango gallery ──────────────────────────────────────────────────────────
import mango1 from "@/assets/mango1.jpeg";
import mango2 from "@/assets/mango2.jpeg";
import mango3 from "@/assets/mango3.jpeg";

// ── pineapple gallery ──────────────────────────────────────────────────────
import pineapple2 from "@/assets/pineapple2.jpeg";

// ── goat gallery ───────────────────────────────────────────────────────────
import goat from "@/assets/goat.jpeg";

// ── banana gallery ─────────────────────────────────────────────────────────
import sweetBanana from "@/assets/Sweet banana.jpeg";
import bananaLeaves from "@/assets/Banana leaves.jpeg";

// ── pepper gallery ─────────────────────────────────────────────────────────
import redPepper from "@/assets/redpepper.jpeg";

// ── new product images ─────────────────────────────────────────────────────
import cucumber from "@/assets/cucumber.jpeg";
import bitterMelon from "@/assets/bitter melon.jpeg";
import curryLeaves from "@/assets/Curry leaves.jpeg";

// ── avocado varieties ──────────────────────────────────────────────────────
import hassAvocado from "@/assets/Hass Avocado.jpeg";
import fuerteAvocado from "@/assets/Fuerte Avocado.jpeg";
import jumboAvocado from "@/assets/Jumbo Avocado.jpeg";

// ═══════════════════════════════════════════════════════════════════════════
// Galleries  (keyed by product id)
// ═══════════════════════════════════════════════════════════════════════════
export const productGalleries: Record<string, string[]> = {
  "sheep-meat": [sheepMeat, sheep1, sheep2, sheep3, sheep4, sheep5, sheep6],
  mangoes: [mangoes, mango1, mango2, mango3],
  pineapple: [pineapple, pineapple2],
  "goat-meat": [goatMeat, goat],
  "yellow-bananas": [yellowBananas, sweetBanana, bananaLeaves],
  "green-bananas": [greenBananas, bananaLeaves],
  "green-capsicum": [peppers, redPepper],
};

// ═══════════════════════════════════════════════════════════════════════════
// Avocado varieties
// ═══════════════════════════════════════════════════════════════════════════
export type AvocadoVariety = {
  name: string;
  image: string;
  description: string;
  season: string;
};

export const avocadoVarieties: AvocadoVariety[] = [
  {
    name: "Hass Avocado",
    image: hassAvocado,
    description:
      "The most popular export variety. Rich, creamy texture with a nutty flavour. Dark pebbly skin when ripe. High oil content - ideal for guacamole and premium retail.",
    season: "Feb - Sep",
  },
  {
    name: "Fuerte Avocado",
    image: fuerteAvocado,
    description:
      "Pear-shaped with smooth, thin green skin. Mild, buttery flavour with a slightly lower oil content. Stays green when ripe - preferred in European markets.",
    season: "Apr - Aug",
  },
  {
    name: "Jumbo Avocado",
    image: jumboAvocado,
    description:
      "Extra-large size, smooth green skin. Mild taste with a high flesh-to-seed ratio. Very popular in Middle East markets for its impressive size and shelf life.",
    season: "Mar - Jul",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// Product type
// ═══════════════════════════════════════════════════════════════════════════
export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  tagline: string;
  minOrder: string;
  badge?: string;
  category: "fruits" | "meat" | "vegetables";
  rating: number;
  reviews: number;
};

// ═══════════════════════════════════════════════════════════════════════════
// Products list
// ═══════════════════════════════════════════════════════════════════════════
export const products: Product[] = [
  // ── Fruits ────────────────────────────────────────────────────────────────
  {
    id: "avocado",
    name: "African Avocados",
    image: avocado,
    price: 2.4,
    unit: "kg",
    tagline: "Hass, Fuerte & Jumbo - Export Grade Class 1",
    minOrder: "500 kg",
    badge: "Best Seller",
    category: "fruits",
    rating: 4.9,
    reviews: 214,
  },
  {
    id: "yellow-bananas",
    name: "Yellow Bananas",
    image: yellowBananas,
    price: 0.9,
    unit: "kg",
    tagline: "Sweet & Ripe - Cavendish",
    minOrder: "1000 kg",
    category: "fruits",
    rating: 4.8,
    reviews: 143,
  },
  {
    id: "green-bananas",
    name: "Green Bananas",
    image: greenBananas,
    price: 0.7,
    unit: "kg",
    tagline: "Raw - Long Shelf Life",
    minOrder: "1000 kg",
    category: "fruits",
    rating: 4.7,
    reviews: 98,
  },
  {
    id: "mangoes",
    name: "Kenyan Mangoes",
    image: mangoes,
    price: 2.7,
    unit: "kg",
    tagline: "Apple & Ngowe Varieties",
    minOrder: "500 kg",
    badge: "Seasonal",
    category: "fruits",
    rating: 5.0,
    reviews: 189,
  },
  {
    id: "pineapple",
    name: "Pineapples",
    image: pineapple,
    price: 1.5,
    unit: "kg",
    tagline: "Sweet & Juicy - Export Grade",
    minOrder: "500 kg",
    category: "fruits",
    rating: 4.8,
    reviews: 112,
  },
  {
    id: "passion-fruit",
    name: "Passion Fruits",
    image: passionFruit,
    price: 3.2,
    unit: "kg",
    tagline: "Purple - Naturally Sweet",
    minOrder: "300 kg",
    category: "fruits",
    rating: 4.9,
    reviews: 88,
  },

  // ── Meat ──────────────────────────────────────────────────────────────────
  {
    id: "goat-meat",
    name: "Goat Meat",
    image: goatMeat,
    price: 8.5,
    unit: "kg",
    tagline: "Fresh & Halal Certified",
    minOrder: "200 kg",
    badge: "Halal",
    category: "meat",
    rating: 4.9,
    reviews: 74,
  },
  {
    id: "sheep-meat",
    name: "Sheep Meat",
    image: sheepMeat,
    price: 9.0,
    unit: "kg",
    tagline: "Tender & Premium Cut",
    minOrder: "200 kg",
    badge: "Halal",
    category: "meat",
    rating: 4.8,
    reviews: 61,
  },
  {
    id: "beef",
    name: "Beef",
    image: beef,
    price: 7.5,
    unit: "kg",
    tagline: "Grass-Fed - Export Grade",
    minOrder: "300 kg",
    badge: "Halal",
    category: "meat",
    rating: 4.9,
    reviews: 93,
  },

  // ── Vegetables ────────────────────────────────────────────────────────────
  {
    id: "french-beans",
    name: "French Beans",
    image: frenchBeans,
    price: 1.8,
    unit: "kg",
    tagline: "Fresh & Crisp",
    minOrder: "1000 kg",
    category: "vegetables",
    rating: 4.8,
    reviews: 168,
  },
  {
    id: "green-capsicum",
    name: "Capsicum / Peppers",
    image: peppers,
    price: 1.6,
    unit: "kg",
    tagline: "Green & Red - Premium Quality",
    minOrder: "1000 kg",
    category: "vegetables",
    rating: 4.9,
    reviews: 87,
  },
  {
    id: "cabbage",
    name: "Cabbage",
    image: cabbage,
    price: 1.2,
    unit: "kg",
    tagline: "Fresh & Organic",
    minOrder: "1000 kg",
    category: "vegetables",
    rating: 4.6,
    reviews: 58,
  },
  {
    id: "carrots",
    name: "Carrots",
    image: carrots,
    price: 1.1,
    unit: "kg",
    tagline: "Sweet & Crunchy",
    minOrder: "1000 kg",
    category: "vegetables",
    rating: 4.8,
    reviews: 141,
  },
  {
    id: "broccoli",
    name: "Broccoli",
    image: broccoli,
    price: 2.2,
    unit: "kg",
    tagline: "Premium Grade",
    minOrder: "500 kg",
    category: "vegetables",
    rating: 4.7,
    reviews: 96,
  },
  {
    id: "cherry-tomatoes",
    name: "Cherry Tomatoes",
    image: tomatoes,
    price: 2.5,
    unit: "kg",
    tagline: "Fresh & Juicy",
    minOrder: "500 kg",
    category: "vegetables",
    rating: 4.8,
    reviews: 132,
  },
  {
    id: "baby-corn",
    name: "Baby Corn",
    image: babyCorn,
    price: 2.9,
    unit: "kg",
    tagline: "Tender - Uniform Grade",
    minOrder: "300 kg",
    category: "vegetables",
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "snow-peas",
    name: "Snow Peas",
    image: snowPeas,
    price: 3.1,
    unit: "kg",
    tagline: "Flat Pod - Premium",
    minOrder: "300 kg",
    category: "vegetables",
    rating: 4.8,
    reviews: 73,
  },
  // ── New products from newly added images ─────────────────────────────────
  {
    id: "cucumber",
    name: "Cucumber",
    image: cucumber,
    price: 1.3,
    unit: "kg",
    tagline: "Crisp & Fresh - Export Grade",
    minOrder: "500 kg",
    category: "vegetables",
    rating: 4.7,
    reviews: 42,
  },
  {
    id: "bitter-melon",
    name: "Bitter Melon",
    image: bitterMelon,
    price: 2.1,
    unit: "kg",
    tagline: "Bitter Gourd - Popular in Asian Markets",
    minOrder: "300 kg",
    category: "vegetables",
    rating: 4.6,
    reviews: 29,
  },
  {
    id: "curry-leaves",
    name: "Curry Leaves",
    image: curryLeaves,
    price: 4.5,
    unit: "kg",
    tagline: "Fresh & Aromatic - Premium Herb",
    minOrder: "50 kg",
    badge: "Fresh",
    category: "vegetables",
    rating: 4.9,
    reviews: 37,
  },
];
