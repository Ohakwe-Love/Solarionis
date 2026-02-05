import React from 'react';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 'information-collection',
      title: '1. Information We Collect',
      content: `We collect information to provide better services to our users and ensure compliance with applicable securities regulations. The types of information we collect include:

**Personal Information:**
- Name, email address, phone number, and mailing address
- Date of birth and Social Security Number (for identity verification and tax reporting)
- Financial information including bank account details and investment amounts
- Employment information and income verification
- Government-issued identification documents

**Account Information:**
- Login credentials and account preferences
- Investment history and portfolio holdings
- Communication preferences and settings

**Technical Information:**
- IP address, browser type, and device information
- Cookies and similar tracking technologies
- Usage data and site interaction patterns

**Third-Party Information:**
- Information from identity verification services
- Credit reports and background checks (where permitted)
- Information from payment processors and financial institutions`
    },
    {
      id: 'information-use',
      title: '2. How We Use Your Information',
      content: `We use the collected information for the following purposes:

**Service Provision:**
- Process your investments and manage your account
- Verify your identity and assess investor suitability
- Execute transactions and distribute dividends
- Provide customer support and respond to inquiries

**Legal Compliance:**
- Comply with securities laws and regulations
- Perform KYC (Know Your Customer) and AML (Anti-Money Laundering) checks
- Generate tax documents (Form 1099, K-1, etc.)
- Maintain required records and reports

**Platform Improvement:**
- Analyze usage patterns to improve our services
- Develop new features and investment opportunities
- Conduct research and analytics
- Send service-related notifications

**Marketing Communications:**
- Send newsletters, investment opportunities, and educational content
- Provide updates about our platform and services
- Conduct surveys and gather feedback

You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or updating your preferences in your account settings.`
    },
    {
      id: 'information-sharing',
      title: '3. Information Sharing and Disclosure',
      content: `We do not sell your personal information. We may share your information in the following circumstances:

**Service Providers:**
We work with trusted third-party service providers who assist us in operating our platform:
- Payment processors (for ACH transfers and distributions)
- Identity verification services
- Cloud storage and hosting providers
- Customer relationship management systems
- Email and communication platforms

**Legal Requirements:**
We may disclose your information when required by law:
- To comply with court orders, subpoenas, or legal processes
- To enforce our Terms of Service
- To protect the rights, property, or safety of Solarionis, our users, or others
- To detect, prevent, or address fraud or security issues

**Business Transfers:**
In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.

**Investment Partners:**
Information necessary to manage your investments may be shared with:
- Fund managers and investment sponsors
- Custodians and escrow agents
- Legal counsel and auditors

**With Your Consent:**
We may share your information with other parties when you explicitly authorize us to do so.`
    },
    {
      id: 'data-security',
      title: '4. Data Security',
      content: `We implement industry-standard security measures to protect your personal information:

**Technical Safeguards:**
- 256-bit SSL encryption for data transmission
- Encrypted data storage and secure databases
- Multi-factor authentication for account access
- Regular security audits and penetration testing
- Intrusion detection and prevention systems

**Organizational Measures:**
- Limited employee access based on job requirements
- Background checks for employees with data access
- Regular security training and awareness programs
- Incident response and disaster recovery plans

**Third-Party Security:**
- Due diligence on service provider security practices
- Contractual obligations for data protection
- Regular vendor security assessments

While we strive to protect your information, no method of transmission or storage is 100% secure. We cannot guarantee absolute security but will notify you of any security breaches as required by law.`
    },
    {
      id: 'cookies',
      title: '5. Cookies and Tracking Technologies',
      content: `We use cookies and similar technologies to enhance your experience:

**Types of Cookies:**
- **Essential Cookies:** Required for platform functionality
- **Performance Cookies:** Help us understand how you use our site
- **Functional Cookies:** Remember your preferences and settings
- **Advertising Cookies:** Deliver relevant advertisements

**Third-Party Services:**
We use third-party analytics services including:
- Google Analytics (for usage analysis)
- Mixpanel (for user behavior tracking)
- Hotjar (for session recording and heatmaps)

**Your Choices:**
You can control cookies through your browser settings. Note that disabling cookies may affect platform functionality.`
    },
    {
      id: 'your-rights',
      title: '6. Your Privacy Rights',
      content: `You have the following rights regarding your personal information:

**Access and Portability:**
- Request a copy of your personal information
- Receive your data in a portable format

**Correction:**
- Update inaccurate or incomplete information
- Correct errors in your account details

**Deletion:**
- Request deletion of your personal information (subject to legal obligations)
- Close your account (after settling all investments)

**Opt-Out:**
- Unsubscribe from marketing communications
- Opt out of certain data collection practices

**California Residents (CCPA):**
California residents have additional rights including:
- Right to know what personal information is collected
- Right to know whether personal information is sold or disclosed
- Right to say no to the sale of personal information
- Right to non-discrimination for exercising privacy rights

**European Residents (GDPR):**
If you're in the EU, you have additional rights under GDPR including:
- Right to object to processing
- Right to restrict processing
- Right to data portability
- Right to lodge a complaint with supervisory authorities

To exercise these rights, contact us at privacy@solarionis.com.`
    },
    {
      id: 'data-retention',
      title: '7. Data Retention',
      content: `We retain your personal information for as long as necessary to:
- Provide our services and manage your account
- Comply with legal and regulatory requirements
- Resolve disputes and enforce our agreements

**Retention Periods:**
- Active account data: Duration of account plus 7 years
- Investment records: 7 years after investment closure (per SEC requirements)
- Tax documents: 7 years from filing date
- Communications: 3 years from last contact

After the retention period, we securely delete or anonymize your information.`
    },
    {
      id: 'childrens-privacy',
      title: '8. Children\'s Privacy',
      content: `Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information promptly.`
    },
    {
      id: 'international-transfers',
      title: '9. International Data Transfers',
      content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place for such transfers, including:
- Standard contractual clauses approved by regulatory authorities
- Data processing agreements with service providers
- Compliance with applicable data transfer regulations`
    },
    {
      id: 'changes',
      title: '10. Changes to This Privacy Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by:
- Posting a notice on our website
- Sending an email to your registered address
- Providing an in-app notification

The "Last Updated" date at the top of this policy indicates when it was last revised. Your continued use of our services after changes constitutes acceptance of the updated policy.`
    },
    {
      id: 'contact',
      title: '11. Contact Us',
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**Solarionis Privacy Team**
Email: privacy@solarionis.com
Phone: 1-800-SOLARIONIS
Mail: Solarionis Global LLC
      Privacy Department
      123 Energy Plaza, Suite 500
      San Francisco, CA 94105

**Data Protection Officer:**
Email: dpo@solarionis.com

We aim to respond to all inquiries within 30 days.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-(--deep-black) text-white pt-2">
                <Header />
        <div className="max-w-4xl mx-auto text-center  py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-16 bg-[var(--solar-gold)]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-[var(--solar-gold)]" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Your privacy and data security are our top priorities
          </p>
          <p className="text-sm text-gray-400">
            Last Updated: February 1, 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              At Solarionis Global LLC ("Solarionis," "we," "us," or "our"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our investment platform, or engage with our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#${section.id}`}
                  className="block text-black hover:underline"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Policy Sections */}
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

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-[var(--solar-gold)] to-yellow-500 rounded-2xl p-8 sm:p-10 text-center mt-12">
            <Mail className="w-12 h-12 text-gray-900 mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Have Questions About Privacy?
            </h3>
            <p className="text-gray-800 mb-6 max-w-2xl mx-auto">
              Our privacy team is here to help. Contact us for any questions or concerns about how we handle your data.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-all"
            >
              Contact Privacy Team
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}