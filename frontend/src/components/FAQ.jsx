import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
  {
    question: "Can I use this in my project?",
    answer:
      "Yes. Free to use for personal and commercial projects. No attribution required.",
  },
  {
    question: "Is procollab open-source?",
    answer:
      "Not currently. We're working on making parts of it open for community contribution.",
  },
  {
    question: "Does procollab support real-time collaboration?",
    answer:
      "Yes, you can work with teammates on projects simultaneously with real-time sync.",
  },
  {
    question: "Can I integrate AI-generated tasks into my project boards?",
    answer:
      "Absolutely. Our AI suggestion engine helps auto-generate tasks based on your project goal.",
  },
  {
    question: "How secure is my data on procollab?",
    answer:
      "Your data is encrypted and stored securely. We follow industry-standard practices.",
  },
  {
    question: "Do I need an account to use procollab?",
    answer:
      "Yes, you’ll need to sign up to create, save, and manage your project boards.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes! You can use procollab with limited features on our free tier.",
  },
  {
    question: "Can I invite my team members?",
    answer:
      "Of course. You can invite unlimited team members to collaborate on your workspace.",
  },
  {
    question: "Do you offer API access?",
    answer:
      "We’re currently in beta for our API. You can join the waitlist for early access.",
  },
  {
    question: "How do I report a bug or suggest a feature?",
    answer:
      "Use the 'Feature Request & Issue' link in the footer or email us at support@procollab.ai.",
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="borderrounded-xl shadow-md p-4 transition-all duration-300">
        <CollapsibleTrigger className="flex justify-between items-center w-full text-left text-lg font-semibold darktext-white hover:underline focus:outline-none">
          {question}
          {isOpen ? (
            <FaMinus className="text-gray-400" />
          ) : (
            <FaPlus className="text-gray-400" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 dark:text-gray-300 text-sm leading-relaxed">
          {answer}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

const FAQ = () => {
  return (
    <div className="dotted-bg-home">
      <section className="w-full max-w-4xl mx-auto px-12 py-16 ">
        <div className="bg-background text-foreground ">
          <h2 className="text-3xl font-bold text-center dark:text-white mb-10">
            Frequently Asked Questions about Procollab
          </h2>
          <div className="space-y-5">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
