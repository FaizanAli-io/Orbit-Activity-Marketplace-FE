import Block from '@/app/layout/Block';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
  return (
    <Block>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight'>Privacy Policy</h1>
          <p className='text-lg text-muted-foreground'>
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Privacy Matters to Us</CardTitle>
          </CardHeader>
          <CardContent className='prose prose-gray max-w-none space-y-6'>
            <p className='text-lg'>
              At Orbit Activity Marketplace, we are committed to protecting your
              privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, and safeguard
              your data when you use our platform.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='text-lg font-semibold mb-2'>
                Personal Information
              </h3>
              <ul className='list-disc list-inside space-y-1 text-muted-foreground'>
                <li>
                  Name and contact information (email address, phone number)
                </li>
                <li>Account credentials and profile information</li>
                <li>
                  Payment information (processed securely through third-party
                  providers)
                </li>
                <li>Activity preferences and booking history</li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2'>Usage Information</h3>
              <ul className='list-disc list-inside space-y-1 text-muted-foreground'>
                <li>Device information and IP address</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and time spent on our platform</li>
                <li>Search queries and activity interactions</li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2'>
                Location Information
              </h3>
              <ul className='list-disc list-inside space-y-1 text-muted-foreground'>
                <li>Approximate location based on IP address</li>
                <li>
                  Location data when you search for activities in specific areas
                </li>
                <li>GPS location (only with your explicit consent)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
              <li>Provide and maintain our activity marketplace services</li>
              <li>Process bookings and facilitate payments</li>
              <li>
                Send you important updates about your account and bookings
              </li>
              <li>
                Personalize your experience and recommend relevant activities
              </li>
              <li>Improve our platform and develop new features</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations and resolve disputes</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card>
          <CardHeader>
            <CardTitle>3. Information Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='text-lg font-semibold mb-2'>
                With Activity Providers
              </h3>
              <p className='text-muted-foreground'>
                We share necessary booking information with activity providers
                to facilitate your reservations, including your name, contact
                details, and booking preferences.
              </p>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2'>
                With Service Providers
              </h3>
              <p className='text-muted-foreground'>
                We work with trusted third-party service providers for payment
                processing, email delivery, analytics, and customer support.
                These providers are bound by strict confidentiality agreements.
              </p>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2'>Legal Requirements</h3>
              <p className='text-muted-foreground'>
                We may disclose your information when required by law, to
                protect our rights, or to ensure the safety and security of our
                users and platform.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card>
          <CardHeader>
            <CardTitle>4. Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground mb-4'>
              We implement industry-standard security measures to protect your
              personal information:
            </p>
            <ul className='list-disc list-inside space-y-1 text-muted-foreground'>
              <li>Encryption of data in transit and at rest</li>
              <li>Secure payment processing through PCI-compliant providers</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection practices</li>
            </ul>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card>
          <CardHeader>
            <CardTitle>5. Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground mb-4'>
              You have the following rights regarding your personal data:
            </p>
            <ul className='list-disc list-inside space-y-1 text-muted-foreground'>
              <li>
                <strong>Access:</strong> Request a copy of the personal data we
                hold about you
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete data
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                data (subject to legal requirements)
              </li>
              <li>
                <strong>Portability:</strong> Request transfer of your data to
                another service
              </li>
              <li>
                <strong>Objection:</strong> Object to processing of your data
                for marketing purposes
              </li>
              <li>
                <strong>Withdrawal:</strong> Withdraw consent for data
                processing at any time
              </li>
            </ul>
            <p className='text-sm text-muted-foreground mt-4'>
              To exercise these rights, please contact us at
              privacy@orbit-marketplace.com
            </p>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card>
          <CardHeader>
            <CardTitle>6. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground mb-4'>
              We use cookies and similar technologies to enhance your
              experience:
            </p>
            <div className='space-y-3'>
              <div>
                <h4 className='font-semibold'>Essential Cookies</h4>
                <p className='text-sm text-muted-foreground'>
                  Required for basic functionality and security
                </p>
              </div>
              <div>
                <h4 className='font-semibold'>Analytics Cookies</h4>
                <p className='text-sm text-muted-foreground'>
                  Help us understand how you use our platform
                </p>
              </div>
              <div>
                <h4 className='font-semibold'>Preference Cookies</h4>
                <p className='text-sm text-muted-foreground'>
                  Remember your settings and preferences
                </p>
              </div>
            </div>
            <p className='text-sm text-muted-foreground mt-4'>
              You can manage your cookie preferences through your browser
              settings.
            </p>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle>7. Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              We retain your personal information for as long as necessary to
              provide our services, comply with legal obligations, resolve
              disputes, and enforce our agreements. Account information is
              typically retained for 7 years after account closure, while
              booking records are kept for 3 years for customer service and
              legal purposes.
            </p>
          </CardContent>
        </Card>

        {/* International Transfers */}
        <Card>
          <CardHeader>
            <CardTitle>8. International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              Your information may be transferred to and processed in countries
              other than your country of residence. We ensure appropriate
              safeguards are in place to protect your data in accordance with
              applicable data protection laws.
            </p>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>9. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              Our platform is not intended for children under 13 years of age.
              We do not knowingly collect personal information from children
              under 13. If we become aware that we have collected such
              information, we will take steps to delete it promptly.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card>
          <CardHeader>
            <CardTitle>10. Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or applicable laws. We will notify you of
              any material changes by posting the updated policy on our platform
              and updating the "Last updated" date. Your continued use of our
              services after such changes constitutes acceptance of the updated
              policy.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>11. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground mb-4'>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className='space-y-2 text-sm'>
              <p>
                <strong>Email:</strong> privacy@orbit-marketplace.com
              </p>
              <p>
                <strong>Address:</strong> Orbit Activity Marketplace, 123 Main
                Street, City, State 12345
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
            <Separator className='my-4' />
            <p className='text-xs text-muted-foreground'>
              This Privacy Policy is effective as of the date last updated above
              and will remain in effect except with respect to any changes in
              its provisions in the future, which will be in effect immediately
              after being posted on this page.
            </p>
          </CardContent>
        </Card>
      </div>
    </Block>
  );
}
