/* ─────────────────────────────────────────────────────────────
   Hannah Barron — Shared Data Layer
   Admin writes to localStorage; front page reads from it.
   Falls back to these defaults if nothing saved yet.
───────────────────────────────────────────────────────────── */

const HB_DEFAULTS = {
  siteSettings: {
    heroImage: "hannah.jpg"  // put your photo file in the project folder with this name
  },
  products: [
    {
      id: "prod-1", name: "Get Bit! Catfish Tee", price: 32.99, origPrice: null,
      category: "tees", badge: "Featured", description: "The signature tee. Heather military green with a hand-drawn catfish noodling graphic in vintage gold ink. Soft tri-blend fabric.",
      sizes: ["S","M","L","XL","2XL","3XL"], emoji: "👕",
      bg: "linear-gradient(135deg,#2a3818,#4a5e20)",
      image: "hannah.jpg", image2: "hannah2.jpg", image3: "hannah3.jpg", featured: true, active: true
    },
    {
      id: "prod-2", name: "Noodler Snapback", price: 34.99, origPrice: null,
      category: "hats", badge: "Best Seller", description: "Structured snapback, camo brim, embroidered HB logo.",
      sizes: [], emoji: "🧢",
      bg: "linear-gradient(135deg,#1a3810,#2e5a1c)",
      image: "", featured: false, active: true
    },
    {
      id: "prod-3", name: "HB Outdoors Tee", price: 29.99, origPrice: null,
      category: "tees", badge: "Best Seller", description: "Premium heavyweight, vintage graphic. S–3XL.",
      sizes: ["S","M","L","XL","2XL"], emoji: "👕",
      bg: "linear-gradient(135deg,#200a08,#3a1810)",
      image: "", featured: false, active: true
    },
    {
      id: "prod-4", name: "Camo Pullover Hoodie", price: 59.99, origPrice: null,
      category: "hoodies", badge: "New", description: "Super-soft fleece, mossy oak camo, embroidered chest logo.",
      sizes: ["S","M","L","XL"], emoji: "🧥",
      bg: "linear-gradient(135deg,#101830,#1a2848)",
      image: "", featured: false, active: true
    },
    {
      id: "prod-5", name: "Trucker Hat — Camo", price: 27.99, origPrice: null,
      category: "hats", badge: "", description: "Foam front, mesh back, adjustable snapback. Classic outdoor look.",
      sizes: [], emoji: "🤠",
      bg: "linear-gradient(135deg,#2a1808,#4a2c10)",
      image: "", featured: false, active: true
    },
    {
      id: "prod-6", name: "Noodle Queen Tee", price: 22.99, origPrice: 29.99,
      category: "tees", badge: "Sale", description: "For the women who noodle. Soft-washed, relaxed fit.",
      sizes: ["XS","S","M","L","XL"], emoji: "👕",
      bg: "linear-gradient(135deg,#0a1a30,#102040)",
      image: "", featured: false, active: true
    },
    {
      id: "prod-7", name: "HB Duffel Bag", price: 74.99, origPrice: null,
      category: "gear", badge: "New", description: "Heavy-duty 40L duffel. Water-resistant, embroidered logo.",
      sizes: [], emoji: "🎒",
      bg: "linear-gradient(135deg,#1a3020,#2a5030)",
      image: "", featured: false, active: true
    },
    {
      id: "prod-8", name: "Sticker Pack (5pc)", price: 9.99, origPrice: null,
      category: "accessories", badge: "", description: "Waterproof vinyl stickers. HB logo, noodling, hunting designs.",
      sizes: [], emoji: "📿",
      bg: "linear-gradient(135deg,#301010,#501820)",
      image: "", featured: false, active: true
    },
    {
      id: "prod-9", name: "Full-Zip Fleece Jacket", price: 79.99, origPrice: null,
      category: "hoodies", badge: "", description: "Heavyweight full-zip fleece. Warm, durable, HB-branded.",
      sizes: ["S","M","L","XL","2XL"], emoji: "🧥",
      bg: "linear-gradient(135deg,#0a200a,#1a4010)",
      image: "", featured: false, active: true
    }
  ],
  giveaway: {
    active: true,
    prizeTitle: "2025 Chevy Silverado 1500 Trail Boss",
    prizeDesc: "4WD, Midnight Edition, fully loaded — ready for the wild.",
    winnerName: "",          // empty = no winner announced yet
    winnerLocation: "",
    winnerDate: "",
    truckImage: "",          // base64 or URL; empty = show emoji placeholder
    privateWinnerToken: "",  // secret token — only bearer sees "You Won"
    privateWinnerName: "",   // name shown in private winner message
    entryLink: "#",
    entryCtaText: "Enter the Giveaway",
    lastUpdated: ""
  },
  news: [
    {
      id: "default-1",
      headline: "New Noodling Season Kicks Off — Hannah Hits the River",
      excerpt: "With water temps rising in Alabama, Hannah is back in the mud grabbing flatheads bare-handed. Season 2 content drops every Friday.",
      date: "2026-04-15",
      tag: "Noodling",
      image: ""
    },
    {
      id: "default-2",
      headline: "Hannah Partners with Bass Pro Shops for Spring Collection",
      excerpt: "Exciting new collaboration announced with Bass Pro Shops. Hannah's signature gear line hits stores and online this May.",
      date: "2026-04-10",
      tag: "News",
      image: ""
    },
    {
      id: "default-3",
      headline: "Turkey Season Wrap-Up — What a Year!",
      excerpt: "Hannah wraps up an incredible turkey season in Alabama. Full recap video now live on YouTube — over 800K views and counting.",
      date: "2026-04-02",
      tag: "Hunting",
      image: ""
    }
  ]
};

/* ── Helpers ─────────────────────────────────────────────── */
function hb_getGiveaway() {
  try {
    const saved = localStorage.getItem('hb_giveaway');
    return saved ? JSON.parse(saved) : HB_DEFAULTS.giveaway;
  } catch { return HB_DEFAULTS.giveaway; }
}

function hb_getNews() {
  try {
    const saved = localStorage.getItem('hb_news');
    return saved ? JSON.parse(saved) : HB_DEFAULTS.news;
  } catch { return HB_DEFAULTS.news; }
}

function hb_safeSave(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch(e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      alert('⚠️ Storage full! Your browser\'s local storage is nearly full.\n\nTip: Use an image URL (paste a link) instead of uploading a file — uploaded photos take much more space.');
    }
    return false;
  }
}

function hb_saveGiveaway(data) {
  data.lastUpdated = new Date().toISOString();
  return hb_safeSave('hb_giveaway', data);
}

function hb_saveNews(articles) {
  return hb_safeSave('hb_news', articles);
}

function hb_getProducts() {
  try {
    const saved = localStorage.getItem('hb_products');
    if (!saved) return HB_DEFAULTS.products;
    const products = JSON.parse(saved);
    // Merge images from defaults for any product missing them
    return products.map(p => {
      const def = HB_DEFAULTS.products.find(d => d.id === p.id);
      if (!def) return p;
      return {
        ...p,
        image:  p.image  || def.image  || '',
        image2: p.image2 || def.image2 || '',
        image3: p.image3 || def.image3 || '',
      };
    });
  } catch { return HB_DEFAULTS.products; }
}

function hb_saveProducts(products) {
  return hb_safeSave('hb_products', products);
}

function hb_getEntries() {
  try {
    const saved = localStorage.getItem('hb_entries');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function hb_saveEntries(entries) {
  localStorage.setItem('hb_entries', JSON.stringify(entries));
}

function hb_addEntry(entry) {
  const entries = hb_getEntries();
  entries.unshift(entry);
  hb_saveEntries(entries);
}

function hb_getSiteSettings() {
  try {
    const saved = localStorage.getItem('hb_siteSettings');
    return saved ? { ...HB_DEFAULTS.siteSettings, ...JSON.parse(saved) } : HB_DEFAULTS.siteSettings;
  } catch { return HB_DEFAULTS.siteSettings; }
}

function hb_saveSiteSettings(data) {
  return hb_safeSave('hb_siteSettings', data);
}

/* Resize an image file to max dimensions before storing as base64.
   Returns a Promise<string> (base64 dataURL). */
function hb_resizeImage(file, maxW, maxH, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let w = img.width, h = img.height;
      if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
      if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality || 0.75));
    };
    img.onerror = reject;
    img.src = url;
  });
}

function hb_formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
