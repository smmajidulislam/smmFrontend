import { useState, useEffect } from "react";
import Image from "next/image";
import heroImage from "../../../../public/asesst/hero.png";
import Link from "next/link";

const Hero = () => {
  // Typewriter effect for h1
  const headingTexts = ["Automated Social Media ", "Promotion System "];
  const [headingText, setHeadingText] = useState("");
  const [headingIndex, setHeadingIndex] = useState(0);
  const [headingCharIndex, setHeadingCharIndex] = useState(0);
  const [headingDeleting, setHeadingDeleting] = useState(false);

  // Typewriter effect for p
  const paragraphText =
    "Our service provides social media promotion marketing services for bloggers, musicians, and entrepreneurs. The service uses several large sources for advertising.";
  const [paraText, setParaText] = useState("");
  const [paraCharIndex, setParaCharIndex] = useState(0);
  const [paraDeleting, setParaDeleting] = useState(false);

  // Effect for heading

  useEffect(() => {
    const currentWord = headingTexts[headingIndex];

    if (!headingDeleting && headingCharIndex === currentWord.length) {
      setTimeout(() => setHeadingDeleting(true), 2000);
      return;
    }

    if (headingDeleting && headingCharIndex === 0) {
      setHeadingDeleting(false);
      setHeadingIndex((prev) => (prev + 1) % headingTexts.length);
      return;
    }

    const timer = setTimeout(() => {
      setHeadingCharIndex((prev) => (headingDeleting ? prev - 1 : prev + 1));
      setHeadingText(currentWord.substring(0, headingCharIndex));
    }, 100);

    return () => clearTimeout(timer);
  }, [headingCharIndex, headingDeleting, headingIndex]);

  // Effect for paragraph
  useEffect(() => {
    if (!paraDeleting && paraCharIndex === paragraphText.length) {
      setTimeout(() => setParaDeleting(true), 2000);
      return;
    }

    if (paraDeleting && paraCharIndex === 0) {
      setParaDeleting(false);
      return;
    }

    const timer = setTimeout(() => {
      setParaCharIndex((prev) => (paraDeleting ? prev - 1 : prev + 1));
      setParaText(paragraphText.substring(0, paraCharIndex));
    }, 50); // Slower typing speed for paragraph

    return () => clearTimeout(timer);
  }, [paraCharIndex, paraDeleting]);

  return (
    <div className="flex justify-evenly flex-wrap items-center min-h-screen w-full py-10 bg-transparent overflow-x-hidden">
      {/* Left Content */}
      <div className="relative w-full md:w-[50%] text-center -translate-y-5">
        {/* Background shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 blur-3xl opacity-40 animate-pulse"></div>

        {/* h1 with glow effect */}
        <h1 className="relative text-4xl font-bold text-white inline-block z-10">
          {headingText}
        </h1>

        {/* p with glow effect */}
        <p className="relative text-white mt-5 mx-10 text-lg z-10">
          {paraText}
        </p>

        {/* Button with glow effect */}
        <button className="relative bg-gray-700 text-white mt-5 text-center p-5 rounded-3xl block mx-auto shadow-lg transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-green-700 hover:to-green-900 hover:text-white hover:shadow-green-500 hover:shadow-2xl before:absolute before:inset-0 before:rounded-3xl before:bg-green-500 before:blur-lg before:opacity-0 hover:before:opacity-40 hover:before:transition-opacity hover:before:duration-300 z-10">
          <Link href="/service" className="relative z-10 font-bold text-lg">
            Get Started
          </Link>
        </button>
      </div>

      {/* Right Content (Image with Animation) */}
      <div className="relative w-full md:w-[50%] flex justify-center items-center">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-50 animate-pulse"></div>
        <Image
          src={heroImage}
          alt="Hero"
          width={500}
          height={300}
          style={{ height: "auto", width: "auto" }}
          priority
          className="relative transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Hero;
