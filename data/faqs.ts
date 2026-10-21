export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "pricing" | "safety" | "cancellation";
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I request a trip with AMX?",
    answer:
      "Simply choose an experience or submit a custom trip request. You provide your dates, group size, and interests. No upfront payment is required at this stage. We check real availability with local verified providers and send you a clear quotation with a confirmed itinerary.",
    category: "booking",
  },
  {
    id: "faq-2",
    question: "How and when do I pay?",
    answer:
      "We believe in complete price transparency. Your quotation outlines the exact cost in Ethiopian Birr (ETB). Payment terms (whether settling upon arrival with your coordinator or paying a small lodge deposit) are clearly stated before you confirm your itinerary.",
    category: "pricing",
  },
  {
    id: "faq-3",
    question: "What is included in the package price?",
    answer:
      "Every package clearly separates what is included (e.g., vehicle coordination, verified driver, boat charter, safety life jackets, guide) from what is not included (e.g., lunches, park entrance permits, tips). There are no unexpected fees on your trip.",
    category: "pricing",
  },
  {
    id: "faq-4",
    question: "Can I cancel or change my dates?",
    answer:
      "Yes. Most half-day and single-day experiences allow free cancellation or date shifts up to 24 hours before pickup. Multi-day trips with lodge bookings require 48 hours notice. All cancellation conditions are written in plain language on your quotation.",
    category: "cancellation",
  },
  {
    id: "faq-5",
    question: "What happens if a provider is unavailable?",
    answer:
      "Because AMX coordinates a vetted network of certified guides, drivers, and boat operators, your coordinator will substitute an equally verified and qualified provider in our network and inform you immediately without compromising your schedule.",
    category: "safety",
  },
  {
    id: "faq-6",
    question: "Who do I contact during my trip?",
    answer:
      "You have one responsible AMX coordinator assigned to your booking. You will have their direct Ethiopian phone number and WhatsApp contact for on-ground assistance from the moment you arrive in Arba Minch until departure.",
    category: "safety",
  },
];