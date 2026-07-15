export type Work = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  gradient: string;
  initials: string;
};

export const works: Work[] = [
  {
    slug: "lumen-studio",
    title: "Lumen Studio",
    category: "Web Experience",
    year: "2026",
    client: "Lumen",
    role: "Design & Development",
    description:
      "An immersive monochrome web experience for a photography studio, with scroll-driven galleries, WebGL grain, and a custom booking flow.",
    gradient: "linear-gradient(135deg, #2b2b2b 0%, #6d6d68 55%, #101010 100%)",
    initials: "LS",
  },
  {
    slug: "vanta-finance",
    title: "Vanta Finance",
    category: "Product Design",
    year: "2026",
    client: "Vanta",
    role: "UI/UX & Frontend",
    description:
      "A dark-mode fintech dashboard with glassmorphic data cards, real-time charts, and a design system built for density.",
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #3a3a38 45%, #8c8c86 100%)",
    initials: "VF",
  },
  {
    slug: "orbit-agency",
    title: "Orbit Agency",
    category: "Brand & Web",
    year: "2025",
    client: "Orbit",
    role: "Creative Direction",
    description:
      "Full brand identity and website for a creative agency, featuring kinetic typography, curtain transitions, and a case-study engine.",
    gradient: "linear-gradient(120deg, #4c4c48 0%, #111111 50%, #5c5c58 100%)",
    initials: "OA",
  },
  {
    slug: "noir-commerce",
    title: "Noir Commerce",
    category: "E-Commerce",
    year: "2025",
    client: "Noir",
    role: "Design & Development",
    description:
      "A fashion e-commerce concept where every product page reads like an editorial spread. Smooth scroll, magnetic CTAs, grain everywhere.",
    gradient: "linear-gradient(150deg, #181818 0%, #7a7a74 60%, #050505 100%)",
    initials: "NC",
  },
];

export const services = [
  {
    index: "01",
    title: "Web & Software Development",
    description:
      "Marketing sites, web apps, and internal tools built on a modern stack. Fast, smooth, and designed to turn visitors into customers.",
    tags: ["Next.js", "React", "Supabase", "WordPress"],
  },
  {
    index: "02",
    title: "Social Media Management",
    description:
      "Content planning, art direction, and consistent publishing that keeps the brand alive. A feed people actually want to follow.",
    tags: ["Instagram", "TikTok", "Content Strategy"],
  },
  {
    index: "03",
    title: "Ads Management",
    description:
      "Paid campaigns on Meta and Google, from creative to targeting to reporting. Budgets spent where they actually perform.",
    tags: ["Meta Ads", "Google Ads", "Analytics"],
  },
  {
    index: "04",
    title: "AI Automation",
    description:
      "Custom AI workflows that take over the repetitive work, from lead follow-ups to content pipelines. Your business keeps running while you sleep.",
    tags: ["n8n", "Make", "OpenAI", "Claude"],
  },
];

/** Stacks & platforms for the hero marquee and manifesto chips. */
export const stacks = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Supabase",
  "WordPress",
  "Figma",
  "Meta Ads",
  "Google Ads",
  "n8n",
  "OpenAI",
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
];

export const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/legal-terms", label: "Legal Terms" },
];

export const socials = [
  { href: "https://github.com/adityasomaa", label: "GitHub" },
  { href: "https://www.linkedin.com/in/aditya-soma", label: "LinkedIn" },
  { href: "https://www.instagram.com/adtyasoma", label: "Instagram" },
];
