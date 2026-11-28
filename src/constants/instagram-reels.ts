/**
 * YUVA NATURALS — Official Instagram Reels Configuration
 * 
 * Official Profile: https://www.instagram.com/yuva_naturals/
 * 
 * Exact 5 Reels:
 * 1. https://www.instagram.com/reel/DfyyXo_JQBh/
 * 2. https://www.instagram.com/reel/DgR06IYpRJG/
 * 3. https://www.instagram.com/reel/DgOv6J9gBjK/
 * 4. https://www.instagram.com/reel/DgNOjWgJ3wO/
 * 5. https://www.instagram.com/reel/DfEEVYNSTPi/
 */

export interface InstagramReel {
  id: string;
  reelUrl: string;
  shortcode: string;
  embedUrl: string;
  title: string;
  caption: string;
}

export const INSTAGRAM_ACCOUNT = {
  handle: "@yuva_naturals",
  name: "YUVA NATURALS",
  profileUrl: "https://www.instagram.com/yuva_naturals/",
  tagline: "Handcrafted Botanical Care • Nature's Touch, Radiant Glow",
};

export const INSTAGRAM_REELS: InstagramReel[] = [
  {
    id: "reel-1",
    reelUrl: "https://www.instagram.com/reel/DfyyXo_JQBh/",
    shortcode: "DfyyXo_JQBh",
    embedUrl: "https://www.instagram.com/reel/DfyyXo_JQBh/embed/",
    title: "Handmade Botanical Ritual",
    caption: "Artisanal small-batch crafting with pure botanical oils and traditional wisdom.",
  },
  {
    id: "reel-2",
    reelUrl: "https://www.instagram.com/reel/DgR06IYpRJG/",
    shortcode: "DgR06IYpRJG",
    embedUrl: "https://www.instagram.com/reel/DgR06IYpRJG/embed/",
    title: "Pure Farm Goat Milk Infusion",
    caption: "Cold-processed to retain nourishing lactic acid, vitamins, and natural skin hydration.",
  },
  {
    id: "reel-3",
    reelUrl: "https://www.instagram.com/reel/DgOv6J9gBjK/",
    shortcode: "DgOv6J9gBjK",
    embedUrl: "https://www.instagram.com/reel/DgOv6J9gBjK/embed/",
    title: "Behind The Scenes Crafting",
    caption: "Hand-poured, cured over weeks, and finished with our embossed botanical seal.",
  },
  {
    id: "reel-4",
    reelUrl: "https://www.instagram.com/reel/DgNOjWgJ3wO/",
    shortcode: "DgNOjWgJ3wO",
    embedUrl: "https://www.instagram.com/reel/DgNOjWgJ3wO/embed/",
    title: "Nourishing Herbal Hair & Skin Care",
    caption: "Enriched with hibiscus, bhringraj, and pure plant extracts for healthy vitality.",
  },
  {
    id: "reel-5",
    reelUrl: "https://www.instagram.com/reel/DfEEVYNSTPi/",
    shortcode: "DfEEVYNSTPi",
    embedUrl: "https://www.instagram.com/reel/DfEEVYNSTPi/embed/",
    title: "Radiant Skin Glow Essentials",
    caption: "100% botanical care free from harsh sulfates, synthetic parabens, and cheap fillers.",
  },
];
