import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/**
 * FAQ Section Component
 * Features: Accordion layout with expand/collapse functionality
 * Design: Clean cards with smooth animations
 */
export default function FAQ() {
  const faqs = [
    {
      question: 'What are the payment options available?',
      answer: 'We offer flexible payment plans including down payment, construction-linked payment, and post-possession payment options. Please contact our sales team for detailed information.',
    },
    {
      question: 'When is the expected possession date?',
      answer: 'The project is expected to be completed by Q4 2027. We maintain strict timelines and ensure timely delivery of all units.',
    },
    {
      question: 'Are there any additional charges beyond the unit price?',
      answer: 'The unit price includes basic construction. Additional charges may apply for parking, amenities, and maintenance. A detailed cost breakdown will be provided during the booking process.',
    },
    {
      question: 'What is the maintenance cost?',
      answer: 'The maintenance cost is approximately ₹8-12 per sq ft per month, depending on the unit size and amenities used. This covers common area maintenance, security, and utilities.',
    },
    {
      question: 'Can I customize my unit?',
      answer: 'Yes, we offer customization options within the structural framework. You can choose finishes, colors, and layout modifications. Please consult with our design team for available options.',
    },
    {
      question: 'What are the loan options available?',
      answer: 'We have tie-ups with major banks and financial institutions offering home loans up to 80% of the property value. Our team can assist you in the loan approval process.',
    },
    {
      question: 'Is the project registered with RERA?',
      answer: 'Yes, Mount Castle is fully registered with the Real Estate Regulatory Authority (RERA) and complies with all regulations.',
    },
    {
      question: 'What is the security deposit policy?',
      answer: 'A security deposit of 10% of the unit price is required at the time of booking. This is refundable upon completion and handover of the unit.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="h-1 w-16 bg-accent mb-6" />
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about Mount Castle, our amenities, and the buying process.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border last:border-b-0"
              >
                <AccordionTrigger className="py-4 hover:text-accent transition-colors">
                  <span
                    className="text-lg font-semibold text-foreground text-left"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Help */}
        <div className="mt-16 p-8 bg-muted rounded-lg border border-border text-center">
          <h3
            className="text-2xl font-bold text-foreground mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Still Have Questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our expert team is here to help. Contact us for personalized assistance.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
