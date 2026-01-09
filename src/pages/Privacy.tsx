import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
          <Card>
            <CardHeader>
              <CardTitle>Our Commitment to Your Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, such as when you create an account,
                  use our services, or contact us for support.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How We Use Your Information</h3>
                <p>
                  We use the information we collect to provide, maintain, and improve our services,
                  process transactions, and communicate with you.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Information Sharing</h3>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties
                  without your consent, except as described in this policy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Data Security</h3>
                <p>
                  We implement appropriate security measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please contact us through our support channels.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;