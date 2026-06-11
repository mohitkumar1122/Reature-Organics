import { dbConnect } from "./db";
import { Category } from "./models/Category";
import { Product } from "./models/Product";
import { Coupon } from "./models/Coupon";
import { Banner } from "./models/Banner";
import { Blog } from "./models/Blog";
import { Resource } from "./models/Resource";
import { User } from "./models/User";
import bcrypt from "bcryptjs";

const initialCategories = [
  { name: "Ayurvedic Medicines", slug: "ayurvedic-medicines", description: "Traditional formulations for healing", icon: "Activity" },
  { name: "Immunity Boosters", slug: "immunity-boosters", description: "Strengthen your natural defenses", icon: "Shield" },
  { name: "Digestive Care", slug: "digestive-care", description: "Support gut health and metabolism", icon: "Flame" },
  { name: "Skin Care", slug: "skin-care", description: "Nourish your skin from within", icon: "Sparkles" },
  { name: "Hair Care", slug: "hair-care", description: "Strengthen hair roots naturally", icon: "Scissors" },
  { name: "Women's Health", slug: "womens-health", description: "Hormonal balance and vital support", icon: "Heart" },
  { name: "Men's Health", slug: "mens-health", description: "Stamina, energy, and muscle strength", icon: "Zap" },
  { name: "Diabetes Care", slug: "diabetes-care", description: "Regulate blood glucose levels", icon: "Droplet" },
  { name: "Joint Care", slug: "joint-care", description: "Relieve muscle and joint stiffness", icon: "Activity" },
  { name: "Herbal Supplements", slug: "herbal-supplements", description: "Daily vitamins from organic herbs", icon: "Leaf" },
  { name: "Personal Care", slug: "personal-care", description: "Chemical-free hygiene and body care", icon: "User" },
  { name: "Wellness Devices", slug: "wellness-devices", description: "Surgicals and fitness monitoring devices", icon: "Cpu" },
];

const initialProducts = [
  {
    title: "Premium Ashwagandha KSM-66 Capsule",
    description: "KSM-66 Ashwagandha is the highest concentration, highly bioavailable full-spectrum root extract. Helps reduce stress, anxiety, cortisol levels, and stress-related food cravings.",
    price: 699,
    discountPercentage: 15,
    stock: 50,
    brand: "Reature Organic",
    sku: "ASH-KSM66-60",
    ingredients: ["Ashwagandha Root Extract (500mg)", "Black Pepper Extract (5mg)"],
    benefits: ["Reduces stress and cortisol", "Enhances stamina and endurance", "Improves sleep quality"],
    usageInstructions: "Take 1 capsule twice daily with warm water or milk, preferably after meals.",
    precautions: "Do not exceed the recommended dose. Pregnant or lactating women should consult a physician.",
    healthConditions: ["Immunity", "Weight Management"],
    images: ["https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=600"],
    specifications: { "Capsule Count": "60 Capsules", "Form": "Veggie Capsules", "Source": "100% Organic Root" },
  },
  {
    title: "Triphala Digestive Wellness Tablets",
    description: "A combination of Amla, Haritaki, and Bibhitaki that cleanses the digestive tract, alleviates constipation, and improves nutrient absorption.",
    price: 350,
    discountPercentage: 10,
    stock: 120,
    brand: "Reature Organic",
    sku: "TRI-DIG-120",
    ingredients: ["Amla (33.3%)", "Bibhitaki (33.3%)", "Haritaki (33.3%)"],
    benefits: ["Supports healthy digestion", "Relieves occasional constipation", "Detoxifies the colon"],
    usageInstructions: "1-2 tablets before sleeping with lukewarm water.",
    precautions: "Consult a doctor if you have active diarrhea.",
    healthConditions: ["Skin Care", "Immunity"],
    images: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600"],
    specifications: { "Tablet Count": "120 Tablets", "Form": "Pressed Herb", "Dosage": "500mg per Tablet" },
  },
  {
    title: "Organic Chyawanprash Immunity Booster",
    description: "Authentic Ayurvedic recipe prepared with over 40 potent herbs, fresh Amla, ghee, and wild honey. Rich in Vitamin C to defend against seasonal cold and flu.",
    price: 499,
    discountPercentage: 20,
    stock: 80,
    brand: "Reature Organic",
    sku: "CHY-IMM-500",
    ingredients: ["Amla", "Giloy", "Ashwagandha", "Shatavari", "Honey", "Pure Cow Ghee"],
    benefits: ["Boosts respiratory health", "Enhances memory and cognitive health", "Protects against seasonal infections"],
    usageInstructions: "1 tablespoon twice a day for adults. 1/2 tablespoon for children.",
    precautions: "Diabetic patients should opt for our Sugar-Free variant.",
    healthConditions: ["Immunity"],
    images: ["https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600"],
    specifications: { "Net Weight": "500g", "Form": "Paste", "Shelf Life": "24 Months" },
  },
  {
    title: "Pure Neem & Aloe Vera Acne Gel",
    description: "Lightweight, non-greasy facial gel that combines anti-bacterial Neem with soothing Aloe Vera to clear blemishes, soothe sunburn, and hydrate dull skin.",
    price: 280,
    discountPercentage: 5,
    stock: 200,
    brand: "Reature Organic",
    sku: "NEEM-ALOE-150",
    ingredients: ["Neem Extract (2%)", "Aloe Vera Juice (95%)", "Tea Tree Oil (0.5%)"],
    benefits: ["Combats active acne", "Soothes skin irritations", "Delivers oil-free hydration"],
    usageInstructions: "Apply a small amount to clean face, massaging in upward circular motions.",
    precautions: "For external use only. Patch test before first use.",
    healthConditions: ["Skin Care"],
    images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600"],
    specifications: { "Volume": "150ml", "Skin Type": "Oily & Acne-Prone", "Form": "Gel" },
  },
  {
    title: "DiabeCare Herbal Blood Sugar Regulator",
    description: "Formulated with Bitter Gourd (Karela), Jamun Seeds, and Gurmar to naturally regulate insulin sensitivity and keep glucose levels balanced.",
    price: 599,
    discountPercentage: 12,
    stock: 45,
    brand: "Reature Organic",
    sku: "DIAB-HERB-60",
    ingredients: ["Karela Extract (150mg)", "Jamun Extract (150mg)", "Gurmar Extract (200mg)"],
    benefits: ["Balances blood sugar", "Controls sweet cravings", "Supports pancreatic functions"],
    usageInstructions: "Take 1 tablet 30 minutes before breakfast and dinner.",
    precautions: "Monitor blood sugar regularly and consult your endocrinologist.",
    healthConditions: ["Diabetes"],
    images: ["https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600"],
    specifications: { "Tablet Count": "60 Tablets", "Form": "Tablet", "Type": "Standardized Extract" },
  },
  {
    title: "Kesh Vardhan Bhringraj Hair Oil",
    description: "Enriched with bhringraj, amla, and sesame oil. Restores hair follicles, reverses premature graying, and halts severe hair fall from the first week.",
    price: 420,
    discountPercentage: 18,
    stock: 65,
    brand: "Reature Organic",
    sku: "KESH-BHR-200",
    ingredients: ["Bhringraj Leaf Extract", "Amla", "Sesame Oil base", "Coconut Oil"],
    benefits: ["Stimulates hair regrowth", "Prevents premature graying", "Relieves scalp itchiness"],
    usageInstructions: "Gently massage oil into scalp. Leave it overnight or for at least 2 hours before washing.",
    precautions: "Avoid contact with eyes.",
    healthConditions: ["Hair Fall"],
    images: ["https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600"],
    specifications: { "Volume": "200ml", "Form": "Oil", "Bottle Type": "Glass Dispenser" },
  }
];

const initialBanners = [
  {
    title: "Ancient Wisdom, Modern Wellness",
    subtitle: "Premium 100% Ayurvedic remedies clinically certified for modern life.",
    imageUrl: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1400",
    linkUrl: "/shop",
    position: "hero",
    order: 1,
  },
  {
    title: "Pure Ayurvedic Solutions For Healthy Living",
    subtitle: "Hand-picked organic herbs crafted without synthetic chemicals.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1400",
    linkUrl: "/shop",
    position: "hero",
    order: 2,
  },
  {
    title: "Trusted By Thousands Of Families",
    subtitle: "Discover why over 10,000+ happy customers choose Reature Organic.",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400",
    linkUrl: "/about",
    position: "hero",
    order: 3,
  }
];

const initialBlogs = [
  {
    title: "Benefits Of Ashwagandha for Stress, Stamina, and Strength",
    content: "Ashwagandha (Withania somnifera) is one of the most important herbs in Ayurveda, a form of alternative medicine based on Indian principles of natural healing. People have used ashwagandha for thousands of years to ease stress, increase energy levels, and improve concentration. Modern research shows that KSM-66 extract increases VO2 max, enhances cognitive clarity, and lowers serum cortisol levels by up to 27.9%. Let us explore its chemical composition and how it promotes natural cortisol balancing.",
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=800",
    author: "Dr. Vasudev Shastri",
    category: "Ayurveda",
    tags: ["Ashwagandha", "Stress Relief", "Adaptogens"],
    seoKeywords: ["benefits of ashwagandha", "ashwagandha stress relief", "KSM-66 benefits"],
    readTime: 6,
  },
  {
    title: "Ayurvedic Remedies For Digestion and Gas Relief",
    content: "In Ayurveda, good health starts with strong digestion (Agni). Weak digestive fire leads to Ama (toxin build-up), which triggers gas, bloating, and fatigue. Herbs like Ginger, Fennel, Cumin, and Triphala are excellent for restoring Agni. Triphala acts as a gentle colon cleanser while Haritaki aids regular stool evacuation. Read on to discover the ideal nighttime digestive tonic.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800",
    author: "Ayurvedacharya Priya Varma",
    category: "Herbal Remedies",
    tags: ["Digestion", "Triphala", "Gas Remedies"],
    seoKeywords: ["ayurvedic remedies for digestion", "bloating relief", "how to use triphala"],
    readTime: 4,
  },
  {
    title: "Herbal Solutions For Better Sleep Without Side Effects",
    content: "Anxiety and sleep deprivation are chronic modern issues. While pharmaceutical sleeping aids are habit-forming, Ayurvedic remedies like Chamomile, Brahmi, Ashwagandha, and Jatamansi offer calming effects without side effects. Brahmi cools the head and reduces mental stress, while Jatamansi stabilizes neurotransmitters for deep, restorative sleep. Learn how to prepare a soothing bedside milk brew.",
    image: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?q=80&w=800",
    author: "Dr. Vasudev Shastri",
    category: "Herbal Remedies",
    tags: ["Sleep Solutions", "Brahmi", "Stress"],
    seoKeywords: ["herbal solutions for sleep", "natural insomnia cure", "brahmi for sleep"],
    readTime: 5,
  }
];

const initialResources = [
  {
    title: "Reature Organic Product Catalog 2026",
    description: "Detailed description of all our herbs, tablets, extracts, and quality standards in one comprehensive catalog.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "Catalog",
    type: "pdf",
  },
  {
    title: "Ayurvedic Daily Wellness Routine (Dinacharya) Guide",
    description: "A master guide detailing how to balance Vata, Pitta, and Kapha throughout the day using diet, yoga, and herbs.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "User Guide",
    type: "pdf",
  },
  {
    title: "Company Profile and Manufacturing Quality Standards Brochure",
    description: "Learn about our extraction plants, WHO-GMP certification process, and vertical farming supply chain.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "Brochure",
    type: "pdf",
  }
];

const initialCoupons = [
  {
    code: "WELCOME15",
    discountType: "percentage",
    value: 15,
    minOrderValue: 499,
    maxDiscount: 150,
    expiryDate: new Date("2028-12-31"),
    isActive: true,
  },
  {
    code: "AYURNEW",
    discountType: "flat",
    value: 100,
    minOrderValue: 999,
    expiryDate: new Date("2028-12-31"),
    isActive: true,
  }
];

export async function seedDatabase() {
  await dbConnect();

  // Seed Admin User from Environment Variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(adminPassword, salt);
      const newAdmin = new User({
        name: "Super Admin",
        email: adminEmail.toLowerCase(),
        phone: "9999999999",
        passwordHash,
        role: "admin",
        isVerified: true,
      });
      await newAdmin.save();
      console.log("Admin account seeded successfully.");
    } else {
      // Keep password synced with .env
      const isMatch = await bcrypt.compare(adminPassword, existingAdmin.passwordHash);
      if (!isMatch) {
        const salt = await bcrypt.genSalt(10);
        existingAdmin.passwordHash = await bcrypt.hash(adminPassword, salt);
        await existingAdmin.save();
        console.log("Admin account password updated from environment variables.");
      }
    }
  }

  const productCount = await Product.countDocuments();
  if (productCount > 0) {
    return { seeded: false, message: "Database already populated" };
  }

  // Seed Categories
  const createdCategories = [];
  for (const cat of initialCategories) {
    let category = await Category.findOne({ slug: cat.slug });
    if (!category) {
      category = new Category(cat);
      await category.save();
    }
    createdCategories.push(category);
  }

  // Seed Products
  for (const prod of initialProducts) {
    const slug = prod.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const categoryObj = createdCategories.find((c) => c.name === "Immunity Boosters") || createdCategories[0];
    
    // Find matching category based on tags or defaults
    let matchedCat = categoryObj;
    if (prod.title.includes("Ashwagandha")) {
      matchedCat = createdCategories.find((c) => c.slug === "herbal-supplements") || categoryObj;
    } else if (prod.title.includes("Triphala")) {
      matchedCat = createdCategories.find((c) => c.slug === "digestive-care") || categoryObj;
    } else if (prod.title.includes("Neem")) {
      matchedCat = createdCategories.find((c) => c.slug === "skin-care") || categoryObj;
    } else if (prod.title.includes("DiabeCare")) {
      matchedCat = createdCategories.find((c) => c.slug === "diabetes-care") || categoryObj;
    } else if (prod.title.includes("Kesh Vardhan")) {
      matchedCat = createdCategories.find((c) => c.slug === "hair-care") || categoryObj;
    }

    const existingProduct = await Product.findOne({ sku: prod.sku });
    if (!existingProduct) {
      const newProd = new Product({
        ...prod,
        slug,
        category: matchedCat._id,
      });
      await newProd.save();
    }
  }

  // Seed Banners
  for (const ban of initialBanners) {
    const existingBanner = await Banner.findOne({ title: ban.title });
    if (!existingBanner) {
      await new Banner(ban).save();
    }
  }

  // Seed Blogs
  for (const blog of initialBlogs) {
    const slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const existingBlog = await Blog.findOne({ slug });
    if (!existingBlog) {
      await new Blog({ ...blog, slug }).save();
    }
  }

  // Seed Resources
  for (const res of initialResources) {
    const existingRes = await Resource.findOne({ title: res.title });
    if (!existingRes) {
      await new Resource(res).save();
    }
  }

  // Seed Coupons
  for (const coup of initialCoupons) {
    const existingCoup = await Coupon.findOne({ code: coup.code });
    if (!existingCoup) {
      await new Coupon(coup).save();
    }
  }

  return { seeded: true, message: "Database seeded successfully" };
}
