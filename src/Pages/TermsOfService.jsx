import React from 'react';
import { FileText, Scale, AlertTriangle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

export default function TermsOfService() {
    const sections = [
        {
            id: 'acceptance',
            title: '1. Acceptance of Terms',
            content: `By accessing or using the Solarionis platform, website, mobile applications, or any related services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Services.

These Terms constitute a legally binding agreement between you and Solarionis Global LLC ("Solarionis," "we," "us," or "our"). Please read them carefully before using our Services.`
        },
        {
            id: 'eligibility',
            title: '2. Eligibility and Account Registration',
            content: `**Age and Legal Capacity:**
You must be at least 18 years of age and have the legal capacity to enter into contracts to use our Services.

**Accredited Investor Status:**
Certain investment opportunities on our platform are available only to accredited investors as defined by the Securities and Exchange Commission (SEC). By investing in these opportunities, you represent and warrant that you meet the applicable investor qualifications.

**Account Registration:**
To access our investment platform, you must:
- Provide accurate, current, and complete information during registration
- Maintain and promptly update your account information
- Keep your login credentials confidential
- Notify us immediately of any unauthorized access
- Accept responsibility for all activities under your account

**Identity Verification:**
We are required by law to verify your identity. You agree to provide government-issued identification and other documentation as requested for KYC (Know Your Customer) and AML (Anti-Money Laundering) compliance.

**Account Termination:**
We reserve the right to suspend or terminate your account at any time for:
- Violation of these Terms
- Fraudulent or illegal activity
- Providing false or misleading information
- Any other reason at our sole discretion`
        },
        {
            id: 'investment-risks',
            title: '3. Investment Risks and Disclaimers',
            content: `**Risk of Loss:**
Investing in solar energy infrastructure and renewable energy projects involves substantial risk, including the possible loss of your entire investment. Past performance is not indicative of future results.

**No Investment Advice:**
Solarionis is a platform that facilitates investments in renewable energy projects. We do not provide investment, legal, or tax advice. The information on our platform is for informational purposes only and should not be considered as:
- Investment advice or recommendations
- An offer to sell or solicitation to buy securities
- A substitute for professional financial advice

**Due Diligence:**
You are solely responsible for:
- Conducting your own due diligence on investment opportunities
- Evaluating the risks and merits of each investment
- Determining whether an investment is suitable for you
- Consulting with financial, legal, and tax advisors

**Forward-Looking Statements:**
Our platform may contain forward-looking statements regarding projected returns, performance expectations, and project timelines. These statements are based on current assumptions and involve risks and uncertainties. Actual results may differ materially from projected results.

**No Guarantee of Returns:**
We make no guarantees regarding:
- Investment returns or performance
- Dividend payments or distributions
- Liquidity or ability to sell your investments
- Project completion or operational success`
        },
        {
            id: 'securities-regulations',
            title: '4. Securities Laws and Regulations',
            content: `**Offering Materials:**
Investment opportunities on our platform are offered through private placement memorandums, subscription agreements, and other offering documents. You must carefully review these documents before investing.

**Regulation D Offerings:**
Many investments on our platform are offered under Rule 506(b) or Rule 506(c) of Regulation D and are exempt from SEC registration requirements.

**State Securities Laws:**
You represent that you are not located in a jurisdiction where the offered securities cannot be legally sold.

**Transfer Restrictions:**
Securities purchased through our platform are subject to significant restrictions on transferability and resale. These securities:
- Have not been registered with the SEC
- Cannot be sold or transferred except in compliance with federal and state securities laws
- May be subject to holding period requirements
- May have limited liquidity

**Investor Acknowledgments:**
By investing through our platform, you acknowledge:
- You have received and reviewed all offering materials
- You understand the risks and illiquid nature of the investment
- You meet all investor qualification requirements
- You are investing for your own account and not for others
- You have the financial means to hold the investment long-term`
        },
        {
            id: 'fees',
            title: '5. Fees and Payments',
            content: `**Platform Fees:**
Solarionis charges fees for accessing and using our platform, which may include:
- Account setup or annual fees
- Investment processing fees
- Asset management fees
- Performance fees or carried interest

**Fee Disclosure:**
All applicable fees are disclosed in the offering documents for each investment opportunity. Fees may vary by investment type and investor classification.

**Payment Processing:**
- Payments and distributions are processed through our authorized payment partners
- You authorize us to debit your linked bank account for investments
- You are responsible for ensuring sufficient funds for all transactions
- Failed payments may result in account suspension or investment cancellation

**Refund Policy:**
- Investment commitments are generally non-refundable once accepted
- Exceptions may be made as outlined in specific offering documents
- Processing fees are generally non-refundable`
        },
        {
            id: 'intellectual-property',
            title: '6. Intellectual Property Rights',
            content: `**Our Property:**
All content, features, and functionality of our Services, including but not limited to:
- Text, graphics, logos, images, and software
- Platform design and user interface
- Investment tools and calculators
- Educational materials and research

are owned by Solarionis or our licensors and are protected by copyright, trademark, and other intellectual property laws.

**Limited License:**
We grant you a limited, non-exclusive, non-transferable license to access and use our Services for personal, non-commercial purposes. You may not:
- Copy, modify, or create derivative works
- Reverse engineer or decompile any software
- Remove or alter any copyright or trademark notices
- Use our content for commercial purposes without permission
- Frame or link to our Services without authorization

**User Content:**
You retain ownership of any content you submit to our platform. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content for operating and improving our Services.`
        },
        {
            id: 'user-conduct',
            title: '7. User Conduct and Prohibited Activities',
            content: `You agree not to:

**Illegal Activities:**
- Engage in money laundering or terrorist financing
- Violate any applicable laws or regulations
- Use our Services for fraudulent purposes
- Impersonate others or misrepresent your identity

**Platform Misuse:**
- Attempt to gain unauthorized access to our systems
- Interfere with or disrupt our Services
- Use automated tools to access or scrape our platform
- Transmit viruses, malware, or harmful code
- Overload our servers or infrastructure

**Prohibited Communications:**
- Send spam or unsolicited communications to other users
- Harass, threaten, or abuse others
- Share false or misleading information
- Violate others' privacy or intellectual property rights

**Market Manipulation:**
- Engage in wash trading or other manipulative practices
- Spread false information to affect investment values
- Coordinate with others to manipulate markets

Violation of these prohibitions may result in account termination, legal action, and reporting to law enforcement.`
        },
        {
            id: 'disclaimers',
            title: '8. Disclaimers and Warranties',
            content: `**"AS IS" Basis:**
Our Services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to:
- Merchantability or fitness for a particular purpose
- Accuracy, reliability, or completeness of information
- Uninterrupted or error-free operation
- Security or freedom from viruses

**Third-Party Content:**
We may provide links to third-party websites, services, or content. We do not endorse or assume responsibility for any third-party materials.

**Investment Performance:**
We make no warranties regarding:
- The performance of any investment
- The accuracy of project valuations
- The reliability of project sponsors
- The likelihood of achieving projected returns

**System Availability:**
We do not guarantee continuous, uninterrupted access to our Services. We may suspend or restrict access for:
- Scheduled maintenance
- Emergency repairs
- Technical issues
- Security concerns
- Legal or regulatory requirements`
        },
        {
            id: 'limitation-of-liability',
            title: '9. Limitation of Liability',
            content: `**Maximum Liability:**
To the fullest extent permitted by law, Solarionis and its officers, directors, employees, agents, and affiliates shall not be liable for:

**Indirect Damages:**
- Lost profits or investment returns
- Loss of data or business opportunities
- Indirect, incidental, or consequential damages
- Punitive or exemplary damages

**Investment Losses:**
We are not liable for:
- Investment losses or underperformance
- Project failures or defaults
- Changes in market conditions
- Tax consequences of investments

**Cap on Liability:**
Our total liability for any claims arising from or related to our Services shall not exceed the greater of:
- The fees you paid to Solarionis in the 12 months preceding the claim, or
- $100

**Exceptions:**
Nothing in these Terms limits our liability for:
- Death or personal injury caused by our negligence
- Fraud or fraudulent misrepresentation
- Any liability that cannot be excluded under applicable law`
        },
        {
            id: 'indemnification',
            title: '10. Indemnification',
            content: `You agree to indemnify, defend, and hold harmless Solarionis and its officers, directors, employees, agents, affiliates, and partners from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from or related to:

- Your use of our Services
- Your violation of these Terms
- Your violation of any laws or regulations
- Your violation of any third-party rights
- Your investment decisions
- Information you provide to us or other users
- Your breach of any representations or warranties

We reserve the right to assume the exclusive defense and control of any matter subject to indemnification, and you agree to cooperate with our defense of such claims.`
        },
        {
            id: 'dispute-resolution',
            title: '11. Dispute Resolution and Arbitration',
            content: `**Informal Resolution:**
Before initiating any formal dispute resolution, you agree to contact us at legal@solarionis.com to attempt to resolve the dispute informally.

**Binding Arbitration:**
Any dispute, controversy, or claim arising out of or relating to these Terms or our Services shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules.

**Arbitration Terms:**
- The arbitration shall be conducted by a single arbitrator
- The arbitration shall take place in San Francisco, California
- The arbitration shall be conducted in English
- The arbitrator's decision shall be final and binding
- Each party shall bear its own costs and attorneys' fees

**Class Action Waiver:**
You agree that any arbitration or proceeding shall be limited to the dispute between you and Solarionis individually. You waive any right to participate in a class action, collective action, or representative proceeding.

**Exceptions:**
Either party may seek injunctive or equitable relief in court to protect intellectual property rights or confidential information.

**Governing Law:**
These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles.`
        },
        {
            id: 'modifications',
            title: '12. Modifications to Terms',
            content: `We reserve the right to modify these Terms at any time. We will notify you of material changes by:
- Posting the updated Terms on our website
- Sending an email to your registered address
- Displaying a prominent notice on our platform

Your continued use of our Services after the effective date of the updated Terms constitutes your acceptance of the changes. If you do not agree to the modified Terms, you must stop using our Services.`
        },
        {
            id: 'termination',
            title: '13. Termination',
            content: `**By You:**
You may terminate your account at any time by:
- Contacting our support team
- Following the account closure process in your settings
- Sending written notice to our address

**By Us:**
We may suspend or terminate your access to our Services immediately, without prior notice, for:
- Violation of these Terms
- Suspicious or fraudulent activity
- Legal or regulatory requirements
- Extended period of inactivity
- Any other reason at our sole discretion

**Effect of Termination:**
Upon termination:
- Your right to access and use our Services will cease
- You remain liable for all commitments and obligations incurred
- Existing investments will continue according to their terms
- Provisions that by their nature should survive will remain in effect`
        },
        {
            id: 'general',
            title: '14. General Provisions',
            content: `**Entire Agreement:**
These Terms, together with our Privacy Policy and any applicable offering documents, constitute the entire agreement between you and Solarionis.

**Severability:**
If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.

**No Waiver:**
Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.

**Assignment:**
You may not assign or transfer these Terms or your account without our prior written consent. We may assign these Terms to any successor or affiliate.

**Force Majeure:**
We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, network infrastructure failures, strikes, or shortages of transportation facilities, fuel, energy, labor, or materials.

**Notices:**
All notices to Solarionis must be sent to:
Solarionis Global LLC
Legal Department
123 Energy Plaza, Suite 500
San Francisco, CA 94105
Email: legal@solarionis.com

**Electronic Communications:**
You consent to receive electronic communications from us, including emails, text messages, and platform notifications. These electronic communications satisfy any legal requirement for written communications.`
        },
        {
            id: 'contact',
            title: '15. Contact Information',
            content: `If you have questions about these Terms of Service, please contact us:

**Solarionis Legal Team**
Email: legal@solarionis.com
Phone: 1-800-SOLARIONIS
Mail: Solarionis Global LLC
      Legal Department
      123 Energy Plaza, Suite 500
      San Francisco, CA 94105

**Customer Support:**
Email: support@solarionis.com
Phone: 1-800-SOLARIONIS
Hours: Monday-Friday, 9:00 AM - 6:00 PM PST`
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
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
                        Please read these terms carefully before using our platform
                    </p>
                    <p className="text-sm text-gray-400">
                        Last Updated: February 1, 2026
                    </p>
                </div>
            </section>

            {/* Important Notice */}
            {/* <section className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-orange-900 mb-2">
                                    Important Legal Notice
                                </h3>
                                <p className="text-orange-800 leading-relaxed">
                                    These Terms of Service contain important information about your legal rights, remedies, and obligations. They include various limitations and exclusions, and a binding arbitration clause and class action waiver. Please read them carefully.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Content Section */}
            <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">

                    {/* Introduction */}
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Welcome to Solarionis. These Terms of Service ("Terms") govern your access to and use of the Solarionis platform, website, and services. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Solarionis Global LLC operates an online platform that allows qualified investors to invest in solar energy infrastructure and renewable energy projects. Our platform is not a broker-dealer and does not provide investment advice.
                        </p>
                    </div>

                    {/* Table of Contents */}
                    <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {sections.map((section, index) => (
                                <a
                                    key={index}
                                    href={`#${section.id}`}
                                    className="text-(--deep-black) hover:underline text-sm"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Terms Sections */}
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                id={section.id}
                                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-24"
                            >
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                                    {section.title}
                                </h2>
                                <div className="prose prose-gray max-w-none">
                                    {section.content.split('\n\n').map((paragraph, pIndex) => {
                                        // Check if it's a bold heading
                                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                            return (
                                                <h3 key={pIndex} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                                                    {paragraph.replace(/\*\*/g, '')}
                                                </h3>
                                            );
                                        }

                                        // Parse bold text within paragraphs
                                        const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                                        return (
                                            <p key={pIndex} className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                                                {parts.map((part, partIndex) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <strong key={partIndex}>{part.replace(/\*\*/g, '')}</strong>;
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Acceptance CTA */}
                    <div className="bg-gradient-to-r from-(--solar-gold) to-yellow-500 rounded-2xl p-8 sm:p-10 text-center mt-12">
                        <FileText className="w-12 h-12 text-gray-900 mx-auto mb-4" />
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            Questions About Our Terms?
                        </h3>
                        <p className="text-gray-800 mb-6 max-w-2xl mx-auto">
                            Our legal team is available to answer any questions about these Terms of Service.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-all"
                        >
                            Contact Legal Team
                            <FileText className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}