"use client";
import Faq from "./components/home/Faq";
import Features from "./components/home/Feature";
import Hero from "./components/home/Hero";
import ServiceList from "./components/home/Service";
import Testimonials from "./components/home/Testimonial";

const Page = () => {
  return (
    <>
      <Hero />
      <Features />
      <ServiceList />
      <Testimonials />
      <Faq />;
    </>
  );
};

export default Page;
