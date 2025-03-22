const faqs = [
  {
    question: "What is an SMM panel?",
    answer: "An SMM panel is a platform that sells social media services.",
  },
  {
    question: "Are SMM services safe to use?",
    answer: "Yes, we provide high-quality, risk-free services.",
  },
  {
    question: "How fast is the delivery?",
    answer: "Most services are delivered within minutes of ordering.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept PayPal, credit cards, and cryptocurrency.",
  },
  {
    question: "Can I get a refund?",
    answer: "Refunds are available if your order isn't delivered properly.",
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, we provide 24/7 customer support for all users.",
  },
];

const Faq = () => {
  return (
    <section className="bg-transparent text-white py-12 px-6">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Frequently Asked Questions
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-md shadow-md transition duration-300 hover:bg-yellow-800 hover:text-black hover:shadow-lg hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <p className="text-white mt-2 ">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
