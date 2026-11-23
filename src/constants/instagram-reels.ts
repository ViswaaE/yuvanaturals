/**
 * YUVA NATURALS — Instagram Reels Configuration
 * 
 * Centralized editable configuration for official Instagram Reels.
 * Business owners can easily update or add new Reels here by adding the Instagram Reel URL
 * or shortcode.
 * 
 * Official Profile: https://www.instagram.com/yuva_naturals/
 */

export interface InstagramReel {
  id: string;
  title: string;
  caption: string;
  /**
   * Full Instagram URL to the reel or post
   * e.g. "https://www.instagram.com/reel/Cxxxxxxxxxx/"
   */
  reelUrl: string;
  /**
   * The unique Instagram shortcode from the URL (the code after /reel/ or /p/)
   * Used for embedding the live in-site player: https://www.instagram.com/reel/{shortcode}/embed/
   */
  shortcode: string;
  /**
   * Path to the 9:16 portrait thumbnail in the /public folder
   */
  thumbnail: string;
  duration?: string;
  productTag?: string;
  productSlug?: string;
}

export const INSTAGRAM_ACCOUNT = {
  handle: "@yuva_naturals",
  name: "YUVA NATURALS",
  profileUrl: "https://www.instagram.com/yuva_naturals/",
  tagline: "Nature's Touch, Radiant Glow • Handcrafted Botanical Wellness",
};

/**
 * Featured Reels from @yuva_naturals
 * To add a new reel:
 * 1. Copy the Reel link from Instagram (e.g. https://www.instagram.com/reel/C1234567890/)
 * 2. Set reelUrl to that link and shortcode to the ID between /reel/ and /
 * 3. Place a 9:16 portrait thumbnail in public/reels/
 */
export const INSTAGRAM_REELS: InstagramReel[] = [
  {
    id: "reel-charcoal-bath-bar",
    title: "Handmade Charcoal Bath Bar Crafting",
    caption: "Watch how our Activated Bamboo Charcoal Bath Bar is handmade and stamped with the YUVA NATURALS signature seal. Deep detox for radiant, purified skin. 🌿✨",
    reelUrl: "https://www.instagram.com/yuva_naturals/",
    shortcode: "C_charcoal_yuva",
    thumbnail: "/reels/reel_charcoal_soap.jpg",
    duration: "0:45",
    productTag: "Charcoal Bath Bar",
    productSlug: "charcoal-bath-bar",
  },
  {
    id: "reel-rose-bath-bar",
    title: "Pure Damask Rose Bath Bar Making",
    caption: "Infused with pure Damask rose petals, raw unrefined shea butter, and cold-pressed botanical oils. Gentle nourishing lather for everyday radiance. 🌹🧼",
    reelUrl: "https://www.instagram.com/yuva_naturals/",
    shortcode: "C_rose_yuva",
    thumbnail: "/reels/reel_rose_soap.jpg",
    duration: "0:38",
    productTag: "Rose Bath Bar",
    productSlug: "rose-bath-bar",
  },
  {
    id: "reel-saffron-bath-bar",
    title: "Kashmiri Saffron & Goat Milk Ritual",
    caption: "Real saffron strands blended into fresh farm goat milk. Cold-processed over 6 weeks to retain vital lactic acids and antioxidant vitamins. 💛🥛",
    reelUrl: "https://www.instagram.com/yuva_naturals/",
    shortcode: "C_saffron_yuva",
    thumbnail: "/reels/reel_saffron_soap.jpg",
    duration: "0:52",
    productTag: "Goat Milk with Saffron Bar",
    productSlug: "goat-milk-saffron-bath-bar",
  },
  {
    id: "reel-flora-lumin-elixir",
    title: "Flora Lumin Elixir Botanical Drops",
    caption: "15ml of concentrated botanical magic: Rosehip, Jojoba, Argan, and Neroli oils for deep nourishment and an all-day natural skin glow. ✨🌸",
    reelUrl: "https://www.instagram.com/yuva_naturals/",
    shortcode: "C_floralumin_yuva",
    thumbnail: "/reels/reel_flora_lumin.jpg",
    duration: "0:42",
    productTag: "Flora Lumin Elixir",
    productSlug: "flora-lumin-elixir",
  },
  {
    id: "reel-aloe-acne-gel",
    title: "Aloe Boosted Anti-Acne Gel Routine",
    caption: "Lightweight, non-greasy blemish control powered by pure aloe vera, tea tree extract, and soothing botanicals. Available in 30ml and 50ml. 🌿💧",
    reelUrl: "https://www.instagram.com/yuva_naturals/",
    shortcode: "C_aloeacne_yuva",
    thumbnail: "/reels/reel_aloe_acne_gel.jpg",
    duration: "0:35",
    productTag: "Aloe Boosted Anti-Acne Gel",
    productSlug: "aloe-boosted-anti-acne-face-gel",
  },
  {
    id: "reel-blue-pea-wash",
    title: "Blue Pea Herbal Face Wash Cleanse",
    caption: "Gentle daily foaming cleanser enriched with antioxidant-rich Blue Pea flower extract and Damask rose hydrosol. Fresh, soothing, and clear. 💙🌱",
    reelUrl: "https://www.instagram.com/yuva_naturals/",
    shortcode: "C_bluepea_yuva",
    thumbnail: "/reels/reel_blue_pea.jpg",
    duration: "0:48",
    productTag: "Blue Pea Face Wash",
    productSlug: "blue-pea-face-wash",
  },
];
