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
      "An immersive monochrome web experience for a photography studio — scroll-driven galleries, WebGL grain, and a custom booking flow.",
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
      "Full brand identity and website for a creative agency — kinetic typography, curtain transitions, and a case-study engine.",
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
      "A fashion e-commerce concept where every product page is an editorial spread — smooth scroll, magnetic CTAs, grain everywhere.",
    gradient: "linear-gradient(150deg, #181818 0%, #7a7a74 60%, #050505 100%)",
    initials: "NC",
  },
];

export const services = [
  {
    index: "01",
    title: "Web Experiences",
    description:
      "Award-style marketing sites and portfolios with smooth scroll, seamless page transitions, and motion that serves the story — not the other way around.",
    tags: ["Next.js", "GSAP", "Lenis", "WebGL"],
  },
  {
    index: "02",
    title: "Product & UI Design",
    description:
      "Interfaces designed in monochrome first: hierarchy, rhythm and contrast before color. Design systems that engineers actually enjoy using.",
    tags: ["Design Systems", "Figma", "Prototyping"],
  },
  {
    index: "03",
    title: "Creative Development",
    description:
      "Interactive components nobody has seen before — custom cursors, physics hovers, shader grain, kinetic type. The anti-mainstream layer.",
    tags: ["Canvas", "Shaders", "Micro-interactions"],
  },
  {
    index: "04",
    title: "Motion & Direction",
    description:
      "Choreographed loaders, curtain reveals and scroll narratives. Every millisecond of easing is intentional, slightly slow, and very smooth.",
    tags: ["Motion Design", "Art Direction"],
  },
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
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://x.com", label: "X / Twitter" },
];
