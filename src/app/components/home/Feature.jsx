const Features = () => {
  const features = [
    {
      title: "High Quality",
      desc: "We provide top-quality services for social media growth.",
    },
    {
      title: "Fast Delivery",
      desc: "Your orders are processed and delivered instantly.",
    },
    {
      title: "Secure Payments",
      desc: "100% secure transactions with multiple payment methods.",
    },
    {
      title: "24/7 Support",
      desc: "Our support team is available anytime to assist you.",
    },
  ];

  return (
    <section className="bg-transparent py-12 px-6 text-white">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 rounded-md text-center transition duration-300 hover:bg-blue-500 hover:text-black hover:shadow-lg hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-black-800 mt-2 hover:text-black ">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
