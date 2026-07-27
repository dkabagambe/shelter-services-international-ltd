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

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  unit: string;
  tagline: string;
  minOrder: string;
  badge?: string;
  rating: number;
  reviews: number;
};

export const products: Product[] = [
  {
    id: "french-beans",
    name: "French Beans",
    image: frenchBeans,
    price: 1.8,
    unit: "kg",
    tagline: "Fresh & Crisp",
    minOrder: "1000 kg",
    rating: 4.8,
    reviews: 168,
  },
  {
    id: "green-capsicum",
    name: "Green Capsicum",
    image: peppers,
    price: 1.6,
    unit: "kg",
    tagline: "Premium Quality",
    minOrder: "1000 kg",
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
    rating: 4.8,
    reviews: 132,
  },
  {
    id: "avocado",
    name: "Hass Avocados",
    image: avocado,
    price: 2.4,
    unit: "kg",
    tagline: "Export Grade · Class 1",
    minOrder: "500 kg",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 214,
  },
  {
    id: "baby-corn",
    name: "Baby Corn",
    image: babyCorn,
    price: 2.9,
    unit: "kg",
    tagline: "Tender · Uniform Grade",
    minOrder: "300 kg",
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "snow-peas",
    name: "Snow Peas",
    image: snowPeas,
    price: 3.1,
    unit: "kg",
    tagline: "Flat Pod · Premium",
    minOrder: "300 kg",
    rating: 4.8,
    reviews: 73,
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
    rating: 5.0,
    reviews: 189,
  },
];
