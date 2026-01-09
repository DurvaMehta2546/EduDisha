import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Acceptance of Terms</h3>
                <p>
                  By accessing and using EduDisha, you accept and agree to be bound by the terms
                  and provision of this agreement.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Use License</h3>
                <p>
                  Permission is granted to temporarily use EduDisha for personal, non-commercial
                  transitory viewing only.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">User Responsibilities</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account and password
                  and for restricting access to your computer.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Prohibited Uses</h3>
                <p>
                  You may not use our services for any unlawful purpose or to solicit others to perform
                  or participate in any unlawful acts.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Limitation of Liability</h3>
                <p>
                  In no event shall EduDisha or its suppliers be liable for any damages arising out of
                  the use or inability to use our services.
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

export default Terms;