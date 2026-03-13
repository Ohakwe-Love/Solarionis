import React from 'react';
import { Scale, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function TermsOfService() {
    const settings = useSiteSettings();
    const sections = [
        {
            id: 'acceptance',
            title: '1. Acceptance of Terms',
            content: `These Terms of Service govern your access to and use of the Solarionis website, investment dashboard, admin interfaces, and related services. By using Solarionis, you agree to these Terms and to our Privacy Policy.

If you do not agree, do not use the platform.`
        },
        {
            id: 'platform',
            title: '2. What Solarionis Provides',
            content: `Solarionis is a digital platform for viewing renewable energy investment opportunities, creating an account, completing identity verification, funding your wallet, requesting withdrawals, reviewing content published by Solarionis, and interacting with platform features such as testimonials and contact support.

Solarionis may provide project information, expected returns, funding progress, and educational or marketing content. Platform content is intended for informational purposes and operational use of the service.`
        },
        {
            id: 'eligibility',
            title: '3. Eligibility and Accounts',
            content: `You must be at least 18 years old and legally able to enter into a binding agreement to use Solarionis.

When creating an account, you agree to:
- provide accurate and complete information
- keep your login credentials confidential
- maintain updated profile and contact information
- use the platform only for lawful purposes

You are responsible for all activity under your account unless you promptly notify Solarionis of unauthorized access.`
        },
        {
            id: 'verification',
            title: '4. Identity Verification and Compliance',
            content: `Solarionis may require identity verification, KYC, AML screening, and additional compliance checks before allowing deposits, withdrawals, investments, or other actions.

You agree to provide truthful information and any documents reasonably requested for compliance. Solarionis may suspend or restrict access where verification is incomplete, inconsistent, expired, or appears suspicious.`
        },
        {
            id: 'funding',
            title: '5. Deposits, Wallet Funding, and Withdrawals',
            content: `Solarionis supports wallet funding through supported payment methods, including crypto payment flows processed through integrated providers.

You understand and agree that:
- deposit instructions must be followed exactly
- crypto transactions may require network confirmation before crediting
- provider delays, blockchain congestion, invalid payment data, or failed webhooks can delay processing
- withdrawals may be reviewed and processed manually by platform administrators
- withdrawal requests may be placed on hold pending compliance, security, or operational review

Solarionis may reject, delay, reverse, or investigate funding activity where required by law, platform policy, or security controls.`
        },
        {
            id: 'investments',
            title: '6. Investments and Risk Disclosure',
            content: `Investing through Solarionis involves risk. Any investment may lose value, underperform expectations, become illiquid, or fail to generate projected returns.

You are responsible for your own investment decisions. Solarionis does not guarantee profits, distributions, liquidity, exit opportunities, or portfolio performance. Past performance, projected returns, target IRR, expected payouts, and similar metrics are not guarantees of future results.

Nothing on Solarionis should be treated as legal, tax, accounting, or personalized investment advice. You should review offering information carefully and seek independent professional advice where appropriate.`
        },
        {
            id: 'content',
            title: '7. Platform Content and User Submissions',
            content: `Solarionis may publish projects, articles, updates, marketing materials, dashboards, and performance information. Solarionis may update, correct, pause, or remove content at any time.

If you submit content such as testimonials, feedback, or contact messages:
- you must provide lawful, truthful, and non-infringing content
- you must not upload abusive, fraudulent, defamatory, or misleading material
- Solarionis may review, moderate, reject, or remove submissions
- testimonials may be held for admin approval before publication`
        },
        {
            id: 'prohibited',
            title: '8. Prohibited Conduct',
            content: `You may not:
- use Solarionis for unlawful, fraudulent, deceptive, or abusive activity
- attempt to bypass authentication, verification, throttling, or security controls
- interfere with the platform, servers, APIs, or third-party integrations
- scrape, copy, reverse engineer, or misuse platform content or data
- impersonate another user, admin, or organization
- submit false KYC, payment, or withdrawal information
- use the platform to launder funds or conceal source of funds`
        },
        {
            id: 'admin',
            title: '9. Suspension, Restriction, and Termination',
            content: `Solarionis may suspend, restrict, or terminate accounts or transactions where necessary for security, compliance, operational integrity, legal obligations, or violation of these Terms.

Termination or suspension does not automatically cancel obligations already created on the platform, including pending reviews, investment records, or required compliance cooperation.`
        },
        {
            id: 'intellectual-property',
            title: '10. Intellectual Property',
            content: `The Solarionis brand, website design, software, text, graphics, dashboards, code, and related materials are owned by Solarionis or its licensors and are protected by applicable intellectual property laws.

You may use the platform only for your personal or internal business use in connection with Solarionis services. You may not reproduce or commercially exploit platform content without permission.`
        },
        {
            id: 'disclaimers',
            title: '11. Disclaimers',
            content: `Solarionis is provided on an "as is" and "as available" basis to the maximum extent permitted by law.

Solarionis does not guarantee:
- uninterrupted access
- error-free operation
- immediate processing of deposits or withdrawals
- accuracy of third-party data
- successful completion of any project or transaction
- availability of any specific project, article, or feature`
        },
        {
            id: 'liability',
            title: '12. Limitation of Liability',
            content: `To the maximum extent permitted by law, Solarionis and its affiliates, officers, employees, contractors, and service providers are not liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, investment losses, lost opportunities, loss of data, or interruption of service.

Where liability cannot be excluded, Solarionis's total liability will be limited to the amount you paid directly to Solarionis for the specific service giving rise to the claim, if any.`
        },
        {
            id: 'changes',
            title: '13. Changes to the Service or Terms',
            content: `Solarionis may update the platform, features, fees, integrations, supported assets, content, and these Terms from time to time.

Updated Terms become effective when posted unless a later date is stated. Continued use of Solarionis after updates means you accept the revised Terms.`
        },
        {
            id: 'law',
            title: '14. Governing Law',
            content: `These Terms are governed by the laws applicable to the operator of the Solarionis platform, without regard to conflict of laws principles, except where mandatory local consumer or financial laws apply.

If any provision is found unenforceable, the remaining provisions remain in effect.`
        },
        {
            id: 'contact',
            title: '15. Contact Information',
            content: `If you have questions about these Terms, contact Solarionis at:

Email: ${settings.support_email}
${settings.support_phone ? `Phone: ${settings.support_phone}\n` : ''}Contact Page: /contact`
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-(--deep-black) text-white pt-2">
                <Header />
                <div className="max-w-4xl mx-auto text-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                    <div className="w-16 h-16 bg-(--solar-gold)/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Scale className="w-8 h-8 text-(--solar-gold)" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-6">
                        Terms governing use of the Solarionis platform and services
                    </p>
                    <p className="text-sm text-gray-400">
                        Last Updated: March 11, 2026
                    </p>
                </div>
            </section>

            <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            These Terms apply to use of Solarionis as a renewable energy investment platform, including account registration, KYC verification, wallet funding, withdrawals, admin-reviewed content, and related support features.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            You should read these Terms together with the Privacy Policy and any specific investment or offering information made available on the platform.
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="text-(--deep-black) hover:underline text-sm"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                id={section.id}
                                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-24"
                            >
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                                    {section.title}
                                </h2>
                                <div className="prose prose-gray max-w-none">
                                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                                        <p key={pIndex} className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-(--solar-gold) to-yellow-500 rounded-2xl p-8 sm:p-10 text-center mt-12">
                        <Mail className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            Need Clarification?
                        </h3>
                        <p className="text-gray-800 mb-6 max-w-2xl mx-auto">
                            If anything in these Terms is unclear, contact Solarionis before using the platform or making an investment decision.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-all"
                        >
                            Contact Support
                            <Mail className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
