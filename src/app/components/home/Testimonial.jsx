const testimonials = [
  {
    name: "John Doe",
    review: "Amazing service! My Instagram followers grew overnight!",
  },
  {
    name: "Lisa Brad",
    review: "Super fast delivery. Highly recommended for social media growth!",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-transparent text-white py-12 px-6 text-center">
      <h2 className="text-2xl md:text-4xl font-bold">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 rounded-md transition duration-300 hover:bg-green-500 hover:text-black hover:shadow-xl hover:-translate-y-1"
          >
            <p className="italic  hover:text-black">"{testimonial.review}"</p>
            <h3 className="text-lg font-semibold mt-3">{testimonial.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
