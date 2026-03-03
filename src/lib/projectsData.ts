export type ProjectStat = {
  title: string;
  subtitle: string;
  icon: string;
};

export type ProjectBenefit = {
  icon: string;
  title: string;
  description: string;
};

export type ProjectResource = {
  id: string;
  title: string;
  href: string;
};

export type ProjectTerm = {
  label: string;
  value: string;
};

export type ProjectVisual = {
  title: string;
  description: string;
  image: string;
};

export type Project = {
  slug: string;
  location: string;
  name: string;
  fullName: string;
  tagline: string;
  price: string;
  heroImage: string;
  cardImage: string;
  /** Hero subtitle left of title (e.g. "ROOMS & SUITES") */
  heroSubtitleLeft: string;
  /** Hero subtitle right of title (e.g. "SPA & EVENTS") */
  heroSubtitleRight: string;
  /** Bottom strip line 1 (e.g. "Morocco, Marrakesh") */
  heroBottomLine1: string;
  /** Bottom strip line 2 (e.g. "12,500 m²") */
  heroBottomLine2: string;
  numbers: ProjectStat[];
  benefits: ProjectBenefit[];
  visuals: ProjectVisual[];
  resources: ProjectResource[];
  terms: ProjectTerm[];
  investCtaImage: string;
  comingSoon?: boolean;
  /** YouTube video URL (paste any link from YouTube to test / from admin later) */
  youtubeUrl?: string;
};

const PROJECTS: Project[] = [
  {
    slug: "nuru",
    location: "Marrakesh",
    name: "Nuru",
    fullName: "Nuru Marrakesh",
    tagline:
      "Discover the Nuraya Collection portfolio and become a co-owner in our design-led luxury hotels.",
    price: "from $25,000",
    heroImage: "/p2hero.png",
    cardImage: "/p1.png",
    heroSubtitleLeft: "Rooms & Suites",
    heroSubtitleRight: "Spa & Events",
    heroBottomLine1: "Morocco, Marrakesh",
    heroBottomLine2: "12,500 m²",
    numbers: [
      { title: "86 units", subtitle: "Number of Keys", icon: "/pn1.png" },
      { title: "Q4 2028", subtitle: "Completion Date", icon: "/pn2.png" },
      { title: "$25,000", subtitle: "Minimum Investment", icon: "/pn3.png" },
      {
        title: "12-16% annually",
        subtitle: "Expected Returns",
        icon: "/pn4.png",
      },
    ],
    benefits: [
      {
        icon: "/pn2.png",
        title: "Real Ownership",
        description:
          "Gain equity in real estate and the operating hospitality business. Giving you access to long-term upside asset-backed security.",
      },
      {
        icon: "/in1.png",
        title: "Transparency & Diversification",
        description:
          "Receive consistent investor updates, third-party audits, and clear financial reporting to track your investment with confidence.",
      },
      {
        icon: "/in2.png",
        title: "Multiple revenue streams",
        description:
          "You'll have ownership in a scalable hospitality business, earning beyond rooms with revenue from dining, experiences, wellness & more.",
      },
      {
        icon: "/in3.png",
        title: "Impact-Driven Community",
        description:
          "Invest alongside a like-minded network focused on building meaningful hospitality experiences and long-term financial growth.",
      },
    ],
    visuals: [
      {
        title: "Project visuals",
        description:
          "We source the deals, complete due diligence, build the business strategy, secure financing, and close.",
        image: "/projectvisuals.png",
      },
      {
        title: "Project visuals",
        description:
          "Our in-house team manages hotel operations, guest experience, and marketing under the Nuraya Collection brand.",
        image: "/projectvisuals.png",
      },
      {
        title: "Project visuals",
        description:
          "Design-led renovations and the Nuraya Collection brand identity bring each property to life.",
        image: "/projectvisuals.png",
      },
    ],
    resources: [
      { id: "r-01", title: "View Investor Deck", href: "#" },
      { id: "r-02", title: "View Financial Model", href: "#" },
      { id: "r-03", title: "Supporting Information Package", href: "#" },
      { id: "r-04", title: "Destination Overview", href: "#" },
    ],
    terms: [
      {
        label: "Who we accept",
        value:
          "Every Nuraya property is a visual statement — where art, architecture, and storytelling collide to create unforgettable spaces that inspire and captivate.",
      },
      {
        label: "Minimum check sizes",
        value:
          "Our hospitality is warm, intuitive, and detail-driven — rooted in genuine care, local culture, and a commitment to making every guest feel seen and celebrated.",
      },
      {
        label: "Residency and nationality options",
        value:
          "We honor local creativity by weaving music, food, fashion, and tradition into the fabric of every property — turning each hotel into a living gallery of African excellence.",
      },
      {
        label: "Time horizon and liquidity expectations",
        value:
          "We honor local creativity by weaving music, food, fashion, and tradition into the fabric of every property — turning each hotel into a living gallery of African excellence.",
      },
      {
        label: "Project risk profile",
        value:
          "We honor local creativity by weaving music, food, fashion, and tradition into the fabric of every property — turning each hotel into a living gallery of African excellence.",
      },
      {
        label: "Compliance notes",
        value:
          "Each stay extends beyond the hotel with curated experiences and personalized packages designed to match your intention — whether that’s rest, celebration, exploration, or reconnection.",
      },
    ],
    investCtaImage: "/tiles.png",
    comingSoon: false,
    // Paste any YouTube link here to test (or leave empty to hide video section)
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    slug: "nahla",
    location: "Cape Town",
    name: "Nahla",
    fullName: "Nahla Cape Town",
    tagline:
      "Discover the Nuraya Collection portfolio and become a co-owner in our design-led luxury hotels.",
    price: "from $25,000",
    heroImage: "/p2hero.png",
    cardImage: "/p2.png",
    heroSubtitleLeft: "Rooms & Suites",
    heroSubtitleRight: "Spa & Events",
    heroBottomLine1: "South Africa, Cape Town",
    heroBottomLine2: "9,200 m²",
    numbers: [
      { title: "28 units", subtitle: "Number of Keys", icon: "/pn1.png" },
      { title: "Q2 2029", subtitle: "Completion Date", icon: "/pn2.png" },
      { title: "$25,000", subtitle: "Minimum Investment", icon: "/pn3.png" },
      {
        title: "12-16% annually",
        subtitle: "Expected Returns",
        icon: "/pn4.png",
      },
    ],
    benefits: [
      {
        icon: "/pn2.png",
        title: "Real Ownership",
        description:
          "Gain equity in real estate and the operating hospitality business. Giving you access to long-term upside asset-backed security.",
      },
      {
        icon: "/in1.png",
        title: "Transparency & Diversification",
        description:
          "Receive consistent investor updates, third-party audits, and clear financial reporting to track your investment with confidence.",
      },
      {
        icon: "/in2.png",
        title: "Multiple revenue streams",
        description:
          "You'll have ownership in a scalable hospitality business, earning beyond rooms with revenue from dining, experiences, wellness & more.",
      },
      {
        icon: "/in3.png",
        title: "Impact-Driven Community",
        description:
          "Invest alongside a like-minded network focused on building meaningful hospitality experiences and long-term financial growth.",
      },
    ],
    visuals: [
      {
        title: "Project visuals",
        description:
          "We source the deals, complete due diligence, build the business strategy, secure financing, and close.",
        image: "/projectvisuals.png",
      },
      {
        title: "Project visuals",
        description:
          "Our in-house team manages hotel operations, guest experience, and marketing under the Nuraya Collection brand.",
        image: "/projectvisuals.png",
      },
      {
        title: "Project visuals",
        description:
          "Design-led renovations and the Nuraya Collection brand identity bring each property to life.",
        image: "/projectvisuals.png",
      },
    ],
    resources: [
      { id: "r-01", title: "View Investor Deck", href: "#" },
      { id: "r-02", title: "View Financial Model", href: "#" },
      { id: "r-03", title: "Supporting Information Package", href: "#" },
      { id: "r-04", title: "Destination Overview", href: "#" },
    ],
    terms: [
      { label: "Investment Structure", value: "LLC membership units" },
      { label: "Minimum Investment", value: "$25,000" },
      { label: "Target IRR", value: "16–20% annually" },
      { label: "Hold Period", value: "5 years" },
      { label: "Distributions", value: "Quarterly (from Month 6)" },
      { label: "Exit Strategy", value: "Hotel sale or refinancing at Year 5" },
      { label: "Investor Reporting", value: "Quarterly reports + dashboard" },
      { label: "Fund Manager", value: "Nuraya Capital Management LLC" },
    ],
    investCtaImage: "/tiles.png",
    comingSoon: true,
  },
  {
    slug: "niva",
    location: "Zanzibar",
    name: "Niva",
    fullName: "Niva Zanzibar",
    tagline:
      "Discover the Nuraya Collection portfolio and become a co-owner in our design-led luxury hotels.",
    price: "from $25,000",
    heroImage: "/p2hero.png",
    cardImage: "/p3.png",
    heroSubtitleLeft: "Rooms & Villas",
    heroSubtitleRight: "Beach & Pool",
    heroBottomLine1: "Tanzania, Zanzibar",
    heroBottomLine2: "8,400 m²",
    numbers: [
      { title: "24 units", subtitle: "Number of Keys", icon: "/pn1.png" },
      { title: "Q3 2029", subtitle: "Completion Date", icon: "/pn2.png" },
      { title: "$25,000", subtitle: "Minimum Investment", icon: "/pn3.png" },
      {
        title: "12-16% annually",
        subtitle: "Expected Returns",
        icon: "/pn4.png",
      },
    ],
    benefits: [
      {
        icon: "/pn2.png",
        title: "Real Ownership",
        description:
          "Gain equity in real estate and the operating hospitality business. Giving you access to long-term upside asset-backed security.",
      },
      {
        icon: "/in1.png",
        title: "Transparency & Diversification",
        description:
          "Receive consistent investor updates, third-party audits, and clear financial reporting to track your investment with confidence.",
      },
      {
        icon: "/in2.png",
        title: "Multiple revenue streams",
        description:
          "You'll have ownership in a scalable hospitality business, earning beyond rooms with revenue from dining, experiences, wellness & more.",
      },
      {
        icon: "/in3.png",
        title: "Impact-Driven Community",
        description:
          "Invest alongside a like-minded network focused on building meaningful hospitality experiences and long-term financial growth.",
      },
    ],
    visuals: [
      {
        title: "Project visuals",
        description:
          "We source the deals, complete due diligence, build the business strategy, secure financing, and close.",
        image: "/projectvisuals.png",
      },
      {
        title: "Project visuals",
        description:
          "Our in-house team manages hotel operations, guest experience, and marketing under the Nuraya Collection brand.",
        image: "/projectvisuals.png",
      },
      {
        title: "Project visuals",
        description:
          "Design-led renovations and the Nuraya Collection brand identity bring each property to life.",
        image: "/projectvisuals.png",
      },
    ],
    resources: [
      { id: "r-01", title: "View Investor Deck", href: "#" },
      { id: "r-02", title: "View Financial Model", href: "#" },
      { id: "r-03", title: "Supporting Information Package", href: "#" },
      { id: "r-04", title: "Destination Overview", href: "#" },
    ],
    terms: [
      { label: "Investment Structure", value: "LLC membership units" },
      { label: "Minimum Investment", value: "$25,000" },
      { label: "Target IRR", value: "17–21% annually" },
      { label: "Hold Period", value: "5 years" },
      { label: "Distributions", value: "Quarterly (from Month 6)" },
      { label: "Exit Strategy", value: "Hotel sale or refinancing at Year 5" },
      { label: "Investor Reporting", value: "Quarterly reports + dashboard" },
      { label: "Fund Manager", value: "Nuraya Capital Management LLC" },
    ],
    investCtaImage: "/tiles.png",
    comingSoon: true,
  },
  {
    slug: "niva",
    location: "Zanzibar",
    name: "Niva",
    fullName: "Niva Zanzibar",
    tagline:
      "Discover the Nuraya Collection portfolio and become a co-owner in our design-led luxury hotels.",
    price: "from $25,000",
    heroImage: "/p2hero.png",
    cardImage: "/p3.png",
    heroSubtitleLeft: "Rooms & Villas",
    heroSubtitleRight: "Beach & Pool",
    heroBottomLine1: "Tanzania, Zanzibar",
    heroBottomLine2: "8,400 m²",
    numbers: [
      { title: "24 units", subtitle: "Number of Keys", icon: "/pn1.png" },
      { title: "Q3 2029", subtitle: "Completion Date", icon: "/pn2.png" },
      { title: "$25,000", subtitle: "Minimum Investment", icon: "/pn3.png" },
      {
        title: "12-16% annually",
        subtitle: "Expected Returns",
        icon: "/pn4.png",
      },
    ],
    benefits: [
      {
        icon: "/pn2.png",
        title: "Real Ownership",
        description:
          "Gain equity in real estate and the operating hospitality business. Giving you access to long-term upside asset-backed security.",
      },
      {
        icon: "/in1.png",
        title: "Transparency & Diversification",
        description:
          "Receive consistent investor updates, third-party audits, and clear financial reporting to track your investment with confidence.",
      },
      {
        icon: "/in2.png",
        title: "Multiple revenue streams",
        description:
          "You'll have ownership in a scalable hospitality business, earning beyond rooms with revenue from dining, experiences, wellness & more.",
      },
      {
        icon: "/in3.png",
        title: "Impact-Driven Community",
        description:
          "Invest alongside a like-minded network focused on building meaningful hospitality experiences and long-term financial growth.",
      },
    ],
    visuals: [
      {
        title: "Project visuals",
        description:
          "We source the deals, complete due diligence, build the business strategy, secure financing, and close.",
        image: "/projectvisuals.png",
      },
      {
        title: "Project visuals",
        description:
          "Our in-house team manages hotel operations, guest experience, and marketing under the Nuraya Collection brand.",
        image: "/projectvisuals.png",
      },
      {
        title: "Project visuals",
        description:
          "Design-led renovations and the Nuraya Collection brand identity bring each property to life.",
        image: "/projectvisuals.png",
      },
    ],
    resources: [
      { id: "r-01", title: "View Investor Deck", href: "#" },
      { id: "r-02", title: "View Financial Model", href: "#" },
      { id: "r-03", title: "Supporting Information Package", href: "#" },
      { id: "r-04", title: "Destination Overview", href: "#" },
    ],
    terms: [
      { label: "Investment Structure", value: "LLC membership units" },
      { label: "Minimum Investment", value: "$25,000" },
      { label: "Target IRR", value: "17–21% annually" },
      { label: "Hold Period", value: "5 years" },
      { label: "Distributions", value: "Quarterly (from Month 6)" },
      { label: "Exit Strategy", value: "Hotel sale or refinancing at Year 5" },
      { label: "Investor Reporting", value: "Quarterly reports + dashboard" },
      { label: "Fund Manager", value: "Nuraya Capital Management LLC" },
    ],
    investCtaImage: "/tiles.png",
    comingSoon: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

export { PROJECTS };
