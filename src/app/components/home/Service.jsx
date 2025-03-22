const services = [
  {
    name: "Buy Instagram Followers",
    icon: "📸",
    desc: "Increase your Instagram engagement with real followers.",
  },
  {
    name: "Buy YouTube Subscribers",
    icon: "📺",
    desc: "Grow your YouTube channel with genuine subscribers.",
  },
  {
    name: "Buy Twitter Followers",
    icon: "🐦",
    desc: "Boost your Twitter profile and reach a larger audience.",
  },
  {
    name: "Buy TikTok Followers",
    icon: "🎵",
    desc: "Gain more exposure on TikTok with authentic followers.",
  },
];

const ServiceList = () => {
  return (
    <section className="bg-transparent text-white py-12 px-6">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 rounded-md text-center transition duration-300 hover:bg-purple-500 hover:text-black hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-5xl">{service.icon}</div>
            <h3 className="text-xl font-semibold mt-3">{service.name}</h3>
            <p className="text-gray-200 mt-2">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceList;
