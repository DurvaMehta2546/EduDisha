import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is EduDisha?",
      answer: "EduDisha is a comprehensive study platform designed specifically for GTU students to help them organize their academics, exchange skills, and discover scholarships."
    },
    {
      question: "Is EduDisha free to use?",
      answer: "Yes, EduDisha offers free access to most features. Some premium features may be available in the future."
    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking on the 'Register' button and filling out the required information."
    },
    {
      question: "Can I access EduDisha on mobile devices?",
      answer: "Yes, EduDisha is responsive and works on all devices including smartphones and tablets."
    },
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
          <Card>
            <CardHeader>
              <CardTitle>Common Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;