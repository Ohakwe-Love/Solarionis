export const FAQ_CATEGORIES = [
    { id: "all", name: "All Topics" },
    { id: "getting-started", name: "Getting Started" },
    { id: "investing", name: "Investing" },
    { id: "account", name: "Account & Security" },
    { id: "payments", name: "Payments & Taxes" },
    { id: "portfolios", name: "Portfolios" },
];

export const DEFAULT_FAQS = [
    {
        id: 1,
        category: "getting-started",
        question: "What is Solarionis?",
        answer: "Solarionis is an investment platform that provides access to solar energy infrastructure projects. It allows users to review opportunities, fund their account, and monitor investment activity in one place.",
        sort_order: 10,
    },
    {
        id: 2,
        category: "getting-started",
        question: "Who can invest with Solarionis?",
        answer: "Anyone 18 years or older can create an account, but individual projects may still have their own investment rules and minimums.",
        sort_order: 20,
    },
    {
        id: 3,
        category: "investing",
        question: "What are the minimum investment amounts?",
        answer: "Minimums vary by project. Review each opportunity for the actual minimum deposit, allocation cap, and duration.",
        sort_order: 30,
    },
    {
        id: 4,
        category: "account",
        question: "How do I create an account?",
        answer: "Use the Create Account flow, verify your email, and complete the profile and compliance details requested by the platform.",
        sort_order: 40,
    },
    {
        id: 5,
        category: "payments",
        question: "How do I fund my investments?",
        answer: "Follow the wallet or deposit instructions shown in the platform. For crypto funding, use the exact asset, network, and destination details provided.",
        sort_order: 50,
    },
    {
        id: 6,
        category: "portfolios",
        question: "How do I track my investments?",
        answer: "Use your dashboard to monitor balances, active investments, activity history, and related documents.",
        sort_order: 60,
    },
];

export function normalizeFaqs(payload) {
    if (!Array.isArray(payload) || payload.length === 0) {
        return DEFAULT_FAQS;
    }

    return payload.map((faq, index) => ({
        id: faq.id || index + 1,
        category: String(faq.category || "general"),
        question: String(faq.question || ""),
        answer: String(faq.answer || ""),
        sort_order: Number(faq.sort_order || 0),
    }));
}
