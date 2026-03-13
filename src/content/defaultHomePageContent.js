export const DEFAULT_HOME_PAGE_CONTENT = {
  hero: {
    title: 'Invest in Energy Infrastructure',
    highlight_text: 'Energy',
    subtitle: 'Diversify with direct access to private markets',
    primary_cta_label: 'Get Started',
    primary_cta_href: '/getting-started',
    secondary_cta_label: 'Learn More',
    secondary_cta_href: '/about',
    stats: [
      { key: 'invest', value: 462545600, suffix: '', prefix: '$', label: 'Total Invested', decimals: 0 },
      { key: 'return', value: 12.06, suffix: '%', prefix: '', label: 'Realized Return (IRR)', decimals: 2 },
    ],
  },
  why_choose: {
    title: 'Why Choose Solarionis',
    button_label: 'Learn More',
    button_href: '/about',
    items: [
      {
        icon_key: 'trending-up',
        title: 'High-Yield Returns',
        description: 'Invest in top-tier solar projects worldwide. Earn double digit returns.',
        color: '#FDBA4D',
      },
      {
        icon_key: 'globe',
        title: 'Diversify with Real Assets',
        description: 'Tap into global markets uncorrelated with stocks, across multiple currencies and economies.',
        color: '#38BDF8',
      },
      {
        icon_key: 'shield',
        title: 'Inflation Protection',
        description: 'Cash flows secured by long-term contracts, typically indexed to inflation.',
        color: '#F97316',
      },
      {
        icon_key: 'calendar',
        title: 'Monthly Cash Dividends',
        description: 'Enjoy steady, revenue-based payouts.',
        color: '#7C3AED',
      },
      {
        icon_key: 'leaf',
        title: 'Impact',
        description: 'Invest in the energy transition.',
        color: '#052CE7',
      },
    ],
  },
  performance: {
    footnote: 'Learn more about the assumptions.',
    rows: [
      { year: '2025', solarionis: '11.7%', reits: '2.3%', sp500: '17.4%' },
      { year: '2024', solarionis: '12.2%', reits: '4.3%', sp500: '25.0%' },
      { year: '2023', solarionis: '13.1%', reits: '11.5%', sp500: '26.3%' },
      { year: '2022', solarionis: '13.7%', reits: '-25.1%', sp500: '-18.1%' },
      { year: '2021', solarionis: '13.7%', reits: '39.9%', sp500: '28.7%' },
      { year: '2020', solarionis: '11.3%', reits: '-5.9%', sp500: '18.4%' },
    ],
  },
  market_trends: {
    eyebrow: 'Two Powerful Trends',
    title: 'Converging Market Trends',
    description: "Two powerful trends are converging: the urgent need for energy infrastructure and the rise of direct access to private markets. Together, they're unlocking a rare opportunity for today's investors.",
    cards: [
      {
        title: 'Energy Infrastructure',
        description: 'Solar assets deliver contracted, inflation-linked cash flows that keep portfolios steady, even when public markets swing.',
        button_label: 'Learn More',
        button_href: '/about',
        accent: 'gold',
        badges: [
          { label: 'Stable', tone: 'green' },
          { label: 'Inflation-Hedged Yield', tone: 'gold' },
        ],
      },
      {
        title: 'Private Markets',
        description: 'Private equity, credit, and infrastructure have outperformed public markets for decades. Tech-enabled access now puts these returns within reach.',
        button_label: 'Learn More',
        button_href: '/about',
        accent: 'blue',
        badges: [
          { label: 'Higher Returns', tone: 'orange' },
          { label: 'Diversification', tone: 'violet' },
        ],
      },
    ],
  },
  investor_types: {
    eyebrow: 'Investors For Everyone',
    title: 'Open to all investor types',
    description: 'Whether you are an individual looking to start with $100 or an institution seeking significant allocations, Solarionis provides a pathway to renewable energy ownership.',
    items: [
      { icon_key: 'user', title: 'Individual Investors', description: 'Start investing with as little as $100. No minimum net worth requirements.' },
      { icon_key: 'users', title: 'Non-Accredited Investors', description: 'Everyone can participate. No SEC accreditation needed to own real renewable energy assets.' },
      { icon_key: 'building-2', title: 'Small Businesses', description: 'Diversify your business investments with stable, income-producing clean energy assets.' },
      { icon_key: 'piggy-bank', title: 'IRA & 401(k) Accounts', description: 'Invest through tax-advantaged retirement accounts with our Solarionis IRA program.' },
      { icon_key: 'trending-up', title: 'Wealth Managers', description: 'Access institutional-quality renewable energy investments for your clients.' },
      { icon_key: 'landmark', title: 'Institutions', description: 'Large-scale allocations available for institutional investors seeking ESG-aligned assets.' },
    ],
  },
  how_it_works: {
    eyebrow: 'How It Works',
    title: 'Streamlined to Access Renewable energy investments',
    steps: [
      { icon_key: 'user-round', title: 'Create Your Account', href: '/register', theme: 'light' },
      { icon_key: 'layers', title: 'Build your Solarionis portfolio', href: '/investment', theme: 'dark' },
      { icon_key: 'brain-circuit', title: 'Earn monthly dividends', href: null, theme: 'light' },
    ],
  },
  retirement: {
    title: 'Retirement Investing Now',
    highlight_text: 'Available',
    description: 'Diversify your IRA by owning premium, dividend-producing clean energy projects backed by long-term contracts.',
    button_label: 'Learn More',
    button_href: '/investment',
  },
  newsletter: {
    eyebrow: 'Investment Offerings',
    title: 'Questions about Solarionis? We would love to hear from you.',
    button_label: 'Contact Us',
    button_href: '/contact',
  },
};

const sectionKeys = [
  'hero',
  'why_choose',
  'performance',
  'market_trends',
  'investor_types',
  'how_it_works',
  'retirement',
  'newsletter',
];

export function normalizeHomePageContent(payload) {
  if (!payload || typeof payload !== 'object') {
    return DEFAULT_HOME_PAGE_CONTENT;
  }

  const normalized = { ...DEFAULT_HOME_PAGE_CONTENT };

  for (const key of sectionKeys) {
    const incoming = payload[key];
    if (!incoming || typeof incoming !== 'object') {
      continue;
    }

    normalized[key] = {
      ...DEFAULT_HOME_PAGE_CONTENT[key],
      ...incoming,
    };
  }

  return normalized;
}
