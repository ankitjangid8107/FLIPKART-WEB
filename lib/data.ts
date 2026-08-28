export type Category = {
  slug: string;
  name: string;
  emoji: string;
};

export type Product = {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  ratingCount: number;
  emoji: string;
  tint: string;
  assured?: boolean;
  highlights: string[];
  description: string;
};

export const CATEGORIES: Category[] = [
  { slug: "mobiles", name: "Mobiles", emoji: "📱" },
  { slug: "laptops", name: "Laptops", emoji: "💻" },
  { slug: "audio", name: "Audio", emoji: "🎧" },
  { slug: "watches", name: "Watches", emoji: "⌚" },
  { slug: "fashion", name: "Fashion", emoji: "👕" },
  { slug: "home", name: "Home", emoji: "🛋️" },
  { slug: "appliances", name: "Appliances", emoji: "❄️" },
  { slug: "beauty", name: "Beauty", emoji: "🧴" },
];

const T = {
  blue: "from-blue-50 to-indigo-100",
  rose: "from-rose-50 to-pink-100",
  amber: "from-amber-50 to-orange-100",
  emerald: "from-emerald-50 to-teal-100",
  sky: "from-sky-50 to-cyan-100",
  violet: "from-violet-50 to-purple-100",
  lime: "from-lime-50 to-green-100",
  slate: "from-slate-100 to-zinc-200",
};

export const PRODUCTS: Product[] = [
  // ---------- Mobiles ----------
  {
    id: "novaphone-x9-pro",
    title: "Novaphone X9 Pro 5G (Blaze Blue, 256 GB)",
    brand: "Novaphone",
    category: "mobiles",
    price: 24999,
    mrp: 32999,
    rating: 4.4,
    ratingCount: 38210,
    emoji: "📱",
    tint: T.blue,
    assured: true,
    highlights: ["8 GB RAM | 256 GB ROM", "6.7\" 120 Hz AMOLED Display", "50 MP AI Triple Camera", "5000 mAh | 67 W SuperCharge"],
    description: "Flagship-grade performance with a blazing-fast Dimensity chipset, a stunning 120 Hz curved AMOLED display and an AI camera system that shoots studio-quality shots day or night.",
  },
  {
    id: "pixelite-8a",
    title: "Pixelite 8A (Charcoal, 128 GB)",
    brand: "Pixelite",
    category: "mobiles",
    price: 18999,
    mrp: 21999,
    rating: 4.5,
    ratingCount: 52340,
    emoji: "📱",
    tint: T.slate,
    assured: true,
    highlights: ["8 GB RAM | 128 GB ROM", "6.1\" OLED 90 Hz", "64 MP OIS Camera", "7 Years of OS Updates"],
    description: "The smartest mid-ranger ever built — clean software, class-leading cameras and 7 years of updates in a compact, pocket-friendly frame.",
  },
  {
    id: "galaxa-ultra-5g",
    title: "Galaxa Ultra 5G (Titanium Grey, 512 GB)",
    brand: "Galaxa",
    category: "mobiles",
    price: 74999,
    mrp: 99999,
    rating: 4.6,
    ratingCount: 12043,
    emoji: "📱",
    tint: T.violet,
    assured: true,
    highlights: ["12 GB RAM | 512 GB ROM", "6.8\" QHD+ 144 Hz LTPO", "200 MP Quad Camera + 10x Zoom", "Titanium Frame | IP68"],
    description: "The ultimate flagship: titanium build, a 200 MP pro-grade camera with 10x optical zoom, and desktop-class performance for creators and power users.",
  },
  {
    id: "redmote-note-14-pro",
    title: "Redmote Note 14 Pro+ (Midnight Black, 128 GB)",
    brand: "Redmote",
    category: "mobiles",
    price: 16999,
    mrp: 20999,
    rating: 4.3,
    ratingCount: 88121,
    emoji: "📱",
    tint: T.emerald,
    assured: true,
    highlights: ["8 GB RAM | 128 GB ROM", "108 MP Pro Camera", "6.67\" 120 Hz AMOLED", "90 W HyperCharge"],
    description: "India's best-selling camera phone. A 108 MP sensor, curved AMOLED panel and 90 W charging that fills up in 30 minutes — all under ₹17,000.",
  },
  {
    id: "orbit-phone-2a",
    title: "Orbit Phone (2a) (Milk, 128 GB)",
    brand: "Orbit",
    category: "mobiles",
    price: 21999,
    mrp: 24999,
    rating: 4.4,
    ratingCount: 15677,
    emoji: "📱",
    tint: T.rose,
    highlights: ["8 GB RAM | 128 GB ROM", "6.7\" 120 Hz AMOLED", "50 MP Dual Camera", "Glyph Interface"],
    description: "Stand out with a transparent design and the iconic Glyph interface — notifications you can see without looking at the screen.",
  },
  {
    id: "vibe-v30e",
    title: "Vibe V30e (Sunset Gold, 128 GB)",
    brand: "Vibe",
    category: "mobiles",
    price: 22499,
    mrp: 25999,
    rating: 4.2,
    ratingCount: 9043,
    emoji: "📱",
    tint: T.amber,
    highlights: ["8 GB RAM | 128 GB ROM", "6.67\" 120 Hz Curved AMOLED", "50 MP Sony Camera", "5500 mAh Battery"],
    description: "A style-first phone with a slim curved body, portrait-perfect Sony camera and a two-day battery.",
  },

  // ---------- Laptops ----------
  {
    id: "zenvo-airbook-pro-14",
    title: "Zenvo AirBook Pro 14 (M3 Chip, 16 GB / 512 GB SSD)",
    brand: "Zenvo",
    category: "laptops",
    price: 89990,
    mrp: 109990,
    rating: 4.6,
    ratingCount: 4321,
    emoji: "💻",
    tint: T.slate,
    assured: true,
    highlights: ["Apple-class M3 Chip | 10-core", "14.2\" Liquid Retina XDR", "18 hr Battery Life", "1.55 kg | Aluminium Body"],
    description: "Silent, fanless and unbelievably fast. The AirBook Pro 14 handles 4K editing and code compilation all day with 18 hours of battery.",
  },
  {
    id: "lenova-ideaslim-5",
    title: "Lenova IdeaSlim 5 (Intel Core i5 13th Gen, 16 GB / 512 GB)",
    brand: "Lenova",
    category: "laptops",
    price: 56990,
    mrp: 72990,
    rating: 4.3,
    ratingCount: 8765,
    emoji: "💻",
    tint: T.blue,
    highlights: ["Intel Core i5-13420H", "15.6\" FHD IPS 300 nits", "16 GB DDR4 | 512 GB SSD", "Backlit Keyboard"],
    description: "The everyday workhorse for students and professionals — snappy 13th-gen performance in a slim, travel-ready chassis.",
  },
  {
    id: "asur-vivobook-15",
    title: "Asur Vivobook 15 (Ryzen 5, 16 GB / 512 GB SSD)",
    brand: "Asur",
    category: "laptops",
    price: 45990,
    mrp: 58990,
    rating: 4.2,
    ratingCount: 12045,
    emoji: "💻",
    tint: T.violet,
    highlights: ["AMD Ryzen 5 7530U", "15.6\" FHD Anti-glare", "16 GB RAM | 512 GB SSD", "Fingerprint Login"],
    description: "Big performance, small price. Ryzen 5 power, a fast SSD and all-day battery for under ₹46,000.",
  },
  {
    id: "hpete-pavilion-x360",
    title: "HPete Pavilion x360 Touch (Core i5, 16 GB / 512 GB)",
    brand: "HPete",
    category: "laptops",
    price: 62990,
    mrp: 74999,
    rating: 4.1,
    ratingCount: 3320,
    emoji: "💻",
    tint: T.emerald,
    highlights: ["360° Convertible Touch", "14\" FHD Touchscreen", "Intel Core i5 | 16 GB", "B&O Dual Speakers"],
    description: "Sketch, note-take and present — a 2-in-1 convertible that flips into a tablet in one fluid motion.",
  },
  {
    id: "titan-gt77-gaming",
    title: "Titan GT77 Gaming Laptop (RTX 4070, i9 / 32 GB)",
    brand: "Titan",
    category: "laptops",
    price: 129990,
    mrp: 149990,
    rating: 4.5,
    ratingCount: 980,
    emoji: "💻",
    tint: T.rose,
    highlights: ["NVIDIA RTX 4070 8 GB", "17.3\" QHD 240 Hz", "Intel i9-13980HX", "RGB Per-key Backlight"],
    description: "Desktop-class gaming on the go — RTX 4070 firepower, a 240 Hz esports panel and a vapor-chamber cooling system.",
  },

  // ---------- Audio ----------
  {
    id: "boltbuds-pro-anc",
    title: "BoltBuds Pro ANC True Wireless Earbuds",
    brand: "Bolt",
    category: "audio",
    price: 2999,
    mrp: 4999,
    rating: 4.3,
    ratingCount: 92541,
    emoji: "🎧",
    tint: T.blue,
    assured: true,
    highlights: ["50 dB Active Noise Cancellation", "60 hr Total Playtime", "12.4 mm Bass Drivers", "45 ms Low Latency Game Mode"],
    description: "Flagship ANC at a budget price. Twin 12.4 mm drivers deliver deep bass while 50 dB hybrid ANC silences the world around you.",
  },
  {
    id: "soundcore-boombass",
    title: "SoundCore BoomBass 20 W Bluetooth Speaker",
    brand: "SoundCore",
    category: "audio",
    price: 1999,
    mrp: 3499,
    rating: 4.2,
    ratingCount: 45312,
    emoji: "🔊",
    tint: T.amber,
    highlights: ["20 W Stereo Output", "IPX7 Waterproof", "24 hr Playtime", "TWS Pairing for 40 W"],
    description: "Pool-party-proof sound. IPX7 waterproof, 24-hour battery and enough punch to fill a room (or two, when paired).",
  },
  {
    id: "novasound-studio",
    title: "NovaSound Studio Over-Ear Headphones",
    brand: "NovaSound",
    category: "audio",
    price: 5999,
    mrp: 8999,
    rating: 4.4,
    ratingCount: 12234,
    emoji: "🎧",
    tint: T.violet,
    highlights: ["Hybrid ANC | Ambient Mode", "40 mm Titanium Drivers", "80 hr Battery", "Memory Foam Cushions"],
    description: "Studio-tuned 40 mm drivers, plush memory-foam cushions and 80 hours of playback — comfort and clarity for long sessions.",
  },
  {
    id: "flexneck-2",
    title: "FlexNeck 2 Wireless Neckband (Bluetooth 5.3)",
    brand: "Flex",
    category: "audio",
    price: 1299,
    mrp: 2499,
    rating: 4.1,
    ratingCount: 67321,
    emoji: "🎧",
    tint: T.sky,
    highlights: ["48 hr Playtime", "Magnetic Earbuds", "Vibration Alerts for Calls", "IPX5 Sweatproof"],
    description: "The everyday neckband — all-week battery, magnetic buds that click together, and buzz-on-call so you never miss one.",
  },

  // ---------- Watches ----------
  {
    id: "smartfit-pulse-3",
    title: "SmartFit Pulse 3 Smartwatch (1.9\" AMOLED)",
    brand: "SmartFit",
    category: "watches",
    price: 3499,
    mrp: 6999,
    rating: 4.2,
    ratingCount: 51430,
    emoji: "⌚",
    tint: T.emerald,
    assured: true,
    highlights: ["1.9\" AMOLED Always-On", "Bluetooth Calling", "SpO2 + Heart Rate", "100+ Sports Modes"],
    description: "Calls from your wrist, health on your sleeve. A big always-on AMOLED screen, BT calling and 7-day battery.",
  },
  {
    id: "titanx-steel-analog",
    title: "Titanx Analog Steel Chain Watch (Silver Dial)",
    brand: "Titanx",
    category: "watches",
    price: 7995,
    mrp: 11995,
    rating: 4.5,
    ratingCount: 8213,
    emoji: "⌚",
    tint: T.slate,
    highlights: ["Stainless Steel Bracelet", "50 m Water Resistant", "Sapphire-Coated Glass", "2 Yr Warranty"],
    description: "Timeless stainless-steel design with a silver sunray dial — boardroom-ready, built to last decades.",
  },
  {
    id: "orbit-watch-2-pro",
    title: "Orbit Watch 2 Pro AMOLED Smartwatch",
    brand: "Orbit",
    category: "watches",
    price: 4999,
    mrp: 7999,
    rating: 4.3,
    ratingCount: 22014,
    emoji: "⌚",
    tint: T.rose,
    highlights: ["1.43\" AMOLED 466×466", "GPS Built-in", "Sleep & Stress Tracking", "10 Day Battery"],
    description: "A serious fitness watch with built-in GPS, clinical-grade sleep tracking and a display that shines even in noon sun.",
  },

  // ---------- Fashion ----------
  {
    id: "urbankraft-casual-shirt",
    title: "UrbanKraft Men's Solid Cotton Casual Shirt",
    brand: "UrbanKraft",
    category: "fashion",
    price: 799,
    mrp: 1999,
    rating: 4.1,
    ratingCount: 12034,
    emoji: "👕",
    tint: T.sky,
    highlights: ["100% Combed Cotton", "Regular Fit", "Machine Wash", "Full Sleeve"],
    description: "Breathable combed cotton in a clean solid shade — dresses up with chinos, dresses down with jeans.",
  },
  {
    id: "denimo-slim-jeans",
    title: "Denimo Men's Slim Fit Stretchable Jeans",
    brand: "Denimo",
    category: "fashion",
    price: 1199,
    mrp: 2999,
    rating: 4.2,
    ratingCount: 30123,
    emoji: "👖",
    tint: T.blue,
    highlights: ["Stretch Denim", "Slim Fit", "5-Pocket Style", "Fade-Resistant Dye"],
    description: "All-day comfort stretch denim that keeps its shape wash after wash.",
  },
  {
    id: "ethnica-kurta-set",
    title: "Ethnica Women's Cotton Printed Kurta with Palazzo",
    brand: "Ethnica",
    category: "fashion",
    price: 1299,
    mrp: 2599,
    rating: 4.3,
    ratingCount: 9210,
    emoji: "🧥",
    tint: T.rose,
    highlights: ["Soft Cotton Fabric", "Kurta + Palazzo Set", "Block Print", "Side Pockets"],
    description: "Hand-block prints on feather-soft cotton — a matching kurta and palazzo set for office and festive days alike.",
  },
  {
    id: "strideone-running-shoes",
    title: "StrideOne Men's Running Shoes (Memory Foam)",
    brand: "Stride",
    category: "fashion",
    price: 1799,
    mrp: 3999,
    rating: 4.2,
    ratingCount: 45320,
    emoji: "👟",
    tint: T.lime,
    highlights: ["Memory Foam Insole", "Breathable Mesh Upper", "Anti-Skid Rubber Sole", "Lightweight 240 g"],
    description: "Cloud-soft memory foam over a grippy rubber outsole — built for morning runs and long days on your feet.",
  },
  {
    id: "femina-georgette-saree",
    title: "Femina Georgette Embroidered Saree with Blouse Piece",
    brand: "Femina",
    category: "fashion",
    price: 1499,
    mrp: 3999,
    rating: 4.1,
    ratingCount: 7742,
    emoji: "👗",
    tint: T.amber,
    highlights: ["Soft Georgette", "Zari Embroidery", "5.5 m Saree + 0.8 m Blouse", "Dry Clean Recommended"],
    description: "Flowy georgette with delicate zari work — festive elegance without the festive price tag.",
  },

  // ---------- Home ----------
  {
    id: "comfycloud-sofa-3seater",
    title: "ComfyCloud Fabric 3-Seater Sofa (Graphite Grey)",
    brand: "ComfyCloud",
    category: "home",
    price: 24999,
    mrp: 39999,
    rating: 4.2,
    ratingCount: 2130,
    emoji: "🛋️",
    tint: T.slate,
    highlights: ["Solid Sheesham Frame", "High-Density Foam", "Stain-Resistant Fabric", "3 Yr Warranty"],
    description: "Sink-in comfort on a hardwood frame — high-density foam wrapped in a stain-resistant weave that survives real life.",
  },
  {
    id: "lumo-table-lamp",
    title: "Lumo Minimalist LED Table Lamp (3 Light Modes)",
    brand: "Lumo",
    category: "home",
    price: 899,
    mrp: 1999,
    rating: 4.3,
    ratingCount: 15230,
    emoji: "💡",
    tint: T.amber,
    highlights: ["3 Colour Temperatures", "Touch Dimmer", "USB-C Powered", "Eye-Care Diffuser"],
    description: "A sculptural lamp with flicker-free light — tap to switch between warm reading light and bright work light.",
  },
  {
    id: "sleepwell-memory-pillow",
    title: "SleepWell Memory Foam Pillow (Pack of 2)",
    brand: "SleepWell",
    category: "home",
    price: 999,
    mrp: 2199,
    rating: 4.4,
    ratingCount: 22011,
    emoji: "🛏️",
    tint: T.sky,
    highlights: ["Responsive Memory Foam", "Breathable Gel Layer", "Removable Zip Cover", "Neck-Support Contour"],
    description: "Contoured memory foam that cradles your neck and springs back night after night.",
  },
  {
    id: "aquapure-steel-bottle",
    title: "AquaPure Vacuum Insulated Steel Bottle 1 L",
    brand: "AquaPure",
    category: "home",
    price: 499,
    mrp: 999,
    rating: 4.5,
    ratingCount: 63210,
    emoji: "🧃",
    tint: T.emerald,
    highlights: ["24 hr Cold | 12 hr Hot", "Food-Grade 304 Steel", "Leak-Proof Cap", "BPA Free"],
    description: "Double-walled vacuum insulation keeps water icy for 24 hours — perfect for desk, gym and travel.",
  },

  // ---------- Appliances ----------
  {
    id: "frostair-split-ac",
    title: "FrostAir 1.5 Ton 5 Star Inverter Split AC (Copper)",
    brand: "FrostAir",
    category: "appliances",
    price: 34990,
    mrp: 45990,
    rating: 4.3,
    ratingCount: 8843,
    emoji: "❄️",
    tint: T.sky,
    assured: true,
    highlights: ["5 Star ISEER 5.2", "100% Copper Condenser", "4-Way Swing | Turbo Cool", "1 Yr Product + 10 Yr Compressor Warranty"],
    description: "Cools a room in 60 seconds with turbo mode while sipping power — 5-star inverter efficiency with an anti-corrosive copper coil.",
  },
  {
    id: "washpro-front-load",
    title: "WashPro 7 kg Fully Automatic Front Load Washing Machine",
    brand: "WashPro",
    category: "appliances",
    price: 27990,
    mrp: 34990,
    rating: 4.4,
    ratingCount: 5120,
    emoji: "🧺",
    tint: T.violet,
    highlights: ["1200 RPM Spin", "15 Wash Programs", "Inverter Motor | 10 Yr Warranty", "Steam Hygiene Wash"],
    description: "Steam-hygiene cycles kill 99.9% allergens while the inverter motor runs whisper-quiet.",
  },
  {
    id: "coolbreeze-ceiling-fan",
    title: "CoolBreeze 1200 mm BLDC Ceiling Fan (Matte White)",
    brand: "CoolBreeze",
    category: "appliances",
    price: 2299,
    mrp: 3599,
    rating: 4.2,
    ratingCount: 21140,
    emoji: "🌀",
    tint: T.blue,
    highlights: ["BLDC Motor | 28 W", "Remote + Speed Memory", "High Air Delivery 240 CMM", "5 Yr Warranty"],
    description: "A silent BLDC fan that runs on a third of the power, with a remote and sleep timer.",
  },
  {
    id: "chefmate-convection-oven",
    title: "ChefMate 23 L Convection Microwave Oven",
    brand: "ChefMate",
    category: "appliances",
    price: 9490,
    mrp: 12990,
    rating: 4.1,
    ratingCount: 4310,
    emoji: "🍲",
    tint: T.amber,
    highlights: ["23 L Convection", "101 Auto Cook Menus", "Steam Clean Cavity", "Child Lock"],
    description: "Bake, grill, reheat and steam-clean — 101 auto-cook menus take the guesswork out of dinner.",
  },

  // ---------- Beauty ----------
  {
    id: "glowveda-vitc-serum",
    title: "GlowVeda 10% Vitamin C Brightening Serum 30 ml",
    brand: "GlowVeda",
    category: "beauty",
    price: 549,
    mrp: 1099,
    rating: 4.4,
    ratingCount: 31230,
    emoji: "🧴",
    tint: T.amber,
    highlights: ["10% Vitamin C + HA", "Fades Dark Spots", "Dermat Tested", "Fragrance Free"],
    description: "A lightweight vitamin C serum with hyaluronic acid that brightens and evens tone in 4 weeks.",
  },
  {
    id: "luxe-edp-perfume",
    title: "Luxé Eau de Parfum — Velvet Oud 100 ml",
    brand: "Luxé",
    category: "beauty",
    price: 1999,
    mrp: 3999,
    rating: 4.3,
    ratingCount: 12043,
    emoji: "🌸",
    tint: T.rose,
    highlights: ["10+ hr Longevity", "Oud, Amber & Vanilla Notes", "Unisex", "Travel-Cap Spray"],
    description: "Velvet oud wrapped in amber and vanilla — a signature scent that lingers from morning meetings to midnight.",
  },
  {
    id: "herbalshine-hair-oil",
    title: "HerbalShine Ayurvedic Hair Oil 500 ml",
    brand: "HerbalShine",
    category: "beauty",
    price: 349,
    mrp: 699,
    rating: 4.5,
    ratingCount: 52310,
    emoji: "🌿",
    tint: T.lime,
    highlights: ["Bhringraj + Amla + Coconut", "Reduces Hairfall", "Non-Sticky Formula", "No Mineral Oil"],
    description: "A classic Ayurvedic blend that cools the scalp, strengthens roots and adds shine without the grease.",
  },
  {
    id: "pureskin-sunscreen",
    title: "PureSkin SPF 50 PA+++ Invisible Sunscreen 50 g",
    brand: "PureSkin",
    category: "beauty",
    price: 449,
    mrp: 799,
    rating: 4.4,
    ratingCount: 21320,
    emoji: "☀️",
    tint: T.sky,
    highlights: ["SPF 50 PA+++ Broad Spectrum", "No White Cast", "Gel Texture | Oil Free", "Blue-Light Protection"],
    description: "A weightless gel that disappears on every skin tone — broad-spectrum SPF 50 without the white cast.",
  },
  {
    id: "tresses-hair-dryer",
    title: "Tresses Pro 1600 W Ionic Hair Dryer",
    brand: "Tresses",
    category: "beauty",
    price: 1599,
    mrp: 2999,
    rating: 4.2,
    ratingCount: 10230,
    emoji: "💨",
    tint: T.violet,
    highlights: ["1600 W Ionic Care", "3 Heat × 2 Speed Settings", "Cool Shot Button", "Concentrator + Diffuser"],
    description: "Ionic conditioning cuts frizz while 1600 W dries fast — with attachments for sleek or bouncy finishes.",
  },
];

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export function discountPct(p: Product): number {
  return Math.round(((p.mrp - p.price) / p.mrp) * 100);
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoryProducts(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function searchProducts(q: string): Product[] {
  const s = q.toLowerCase().trim();
  if (!s) return [];
  return PRODUCTS.filter((p) =>
    `${p.title} ${p.brand} ${p.category}`.toLowerCase().includes(s)
  );
}

export function similarProducts(p: Product, n = 6): Product[] {
  return PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, n);
}

export const DEALS_OF_DAY: Product[] = [...PRODUCTS]
  .sort((a, b) => discountPct(b) - discountPct(a))
  .slice(0, 8);

export const BRANDS_BY_CATEGORY: Record<string, string[]> = PRODUCTS.reduce(
  (acc, p) => {
    (acc[p.category] ||= []).push(p.brand);
    return acc;
  },
  {} as Record<string, string[]>
);
