import React from 'react';
import { Shield, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function PrivacyPolicy() {
    const settings = useSiteSettings();
    const sections = [
        {
            id: 'collection',
            title: '1. Information We Collect',
            content: `Solarionis collects information you provide directly, information created through your use of the platform, and limited technical information automatically generated when you use the site.

This may include:
- name, email address, phone number, date of birth, and address
- account credentials and profile information
- KYC and identity verification information
- deposit, wallet, withdrawal, and investment records
- contact form submissions and support correspondence
- testimonials or other user-submitted content
- device, browser, IP address, session, and security log data`
        },
        {
            id: 'use',
            title: '2. How We Use Information',
            content: `Solarionis uses personal information to operate and secure the platform, verify users, support transactions, and communicate with users.

We may use information to:
- create and manage accounts
- verify identity and perform compliance checks
- process deposits, wallet credits, withdrawals, and investment actions
- review testimonials, contact messages, and support requests
- send verification emails, transactional updates, and service notices
- detect fraud, abuse, suspicious activity, or policy violations
- improve platform performance, reporting, and product features`
        },
        {
            id: 'sharing',
            title: '3. When We Share Information',
            content: `Solarionis does not sell personal information as part of the ordinary operation of this platform.

We may share information with service providers and partners where necessary to operate the platform, including:
- identity verification providers
- payment and wallet infrastructure providers
- crypto payment processors such as NOWPayments
- email and notification providers
- cloud hosting, analytics, logging, and security vendors

We may also disclose information where required for legal compliance, fraud prevention, enforcement of platform rights, or protection of users and the platform.`
        },
        {
            id: 'kyc-payments',
            title: '4. KYC, Payments, and Financial Records',
            content: `Because Solarionis supports financial activity and compliance workflows, we may collect and retain records related to verification, funding, withdrawals, and investment activity.

This may include:
- KYC status and verification results
- wallet balances and ledger records
- deposit payment instructions and provider status updates
- withdrawal destination details and processing records
- transaction metadata used for monitoring, reconciliation, dispute review, and audit trails`
        },
        {
            id: 'cookies',
            title: '5. Cookies, Sessions, and Technical Data',
            content: `Solarionis uses cookies, local storage, tokens, and related browser technologies to support authentication, security, rate limiting, session continuity, and user experience.

We may collect technical usage information such as IP address, request timestamps, browser type, device information, and error logs to help protect the platform and diagnose operational issues.`
        },
        {
            id: 'security',
            title: '6. Security and Retention',
            content: `Solarionis uses administrative, technical, and operational safeguards designed to protect platform data. No internet-based system can be guaranteed fully secure, but we take reasonable steps to limit unauthorized access, misuse, or loss.

We retain information for as long as reasonably necessary for:
- account administration
- compliance and audit requirements
- transaction history and financial reconciliation
- dispute resolution and security investigations
- service improvement and operational recordkeeping`
        },
        {
            id: 'rights',
            title: '7. Your Choices and Rights',
            content: `Subject to applicable law, you may request access to, correction of, or deletion of certain personal information. Some records may need to be retained for compliance, fraud prevention, accounting, or legal reasons even after a deletion request.

You may also:
- update account information through the platform where available
- contact Solarionis to request changes or ask questions about your data
- stop receiving non-essential communications where unsubscribe options are provided`
        },
        {
            id: 'content',
            title: '8. Testimonials and Contact Messages',
            content: `If you submit a testimonial, Solarionis may store it, review it, and publish it only after admin approval where applicable. Rejected or pending testimonials are not displayed publicly.

If you send a message through the contact page, Solarionis may store the message, allow admins to review it in the admin panel, and send a reply by email using the contact information you submitted.`
        },
        {
            id: 'changes',
            title: '9. Changes to This Policy',
            content: `Solarionis may update this Privacy Policy from time to time to reflect platform, legal, security, or operational changes. The latest version posted on the site will apply from its stated effective date.`
        },
        {
            id: 'contact',
            title: '10. Contact Us',
            content: `If you have privacy questions or requests, contact Solarionis at:

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
                        <Shield className="w-8 h-8 text-(--solar-gold)" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-6">
                        How Solarionis collects, uses, stores, and protects personal information
                    </p>
                    <p className="text-sm text-gray-400">
                        Last Updated: March 11, 2026
                    </p>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            This Privacy Policy describes how Solarionis handles information collected through the website, dashboard, KYC process, payment and withdrawal flows, testimonials, and contact support features.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            By using Solarionis, you acknowledge the practices described in this Privacy Policy.
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
                        <div className="space-y-2">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="block text-black hover:underline"
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
                            Questions About Your Data?
                        </h3>
                        <p className="text-gray-800 mb-6 max-w-2xl mx-auto">
                            Contact Solarionis if you need help understanding how your account, KYC, payment, or support information is handled.
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
