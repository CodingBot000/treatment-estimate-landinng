"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  
  const handleQuoteClick = () => {
    router.push("/estimate");
  };
  
  return (
    <div className="min-h-dvh bg-gradient-to-b from-pink-50 to-white">
      <div className="mx-auto max-w-md px-4">
        {/* Header */}
        <header className="text-center py-6">
          <div className="text-pink-500 font-bold text-2xl">
            MimoTok
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center py-8">
          <div className="text-pink-500 text-2xl font-semibold mb-4 leading-relaxed">
            ✨ Discover Korea's Premium Beauty — For Free
          </div>
          <h2 className="text-gray-800 text-lg mb-8 leading-relaxed px-2">
            In just 3 minutes, our AI curates treatments tailored to your goals, budget, and lifestyle.
          </h2>
        </section>

        {/* Model Image Section */}
        <section className="text-center py-6">
          <div className="w-full max-w-sm mx-auto">
            <Image
              src="/estimate/landing_model2.png"
              alt="Beauty Model"
              width={300}
              height={400}
              className="w-full h-auto rounded-2xl shadow-lg"
              priority
            />
          </div>
        </section>

        {/* Features Section */}
        <div className="space-y-12 py-8">
          <section className="text-center">
            <div className="text-pink-500 text-xl font-semibold mb-3">
              💎 Trusted by Experts
            </div>
            <p className="text-gray-700 text-base leading-relaxed px-2">
              Every recommendation comes with personalized feedback from Korean dermatologists — ensuring accuracy and peace of mind.
            </p>
          </section>

          <section className="text-center">
            <div className="text-pink-500 text-xl font-semibold mb-3">
              💝 Celebrity-Level Care, Made Simple
            </div>
            <p className="text-gray-700 text-base leading-relaxed px-2">
              The same treatments global beauty icons seek in Seoul, now simplified and personalized just for you.
            </p>
          </section>

          <section className="text-center">
            <div className="text-pink-500 text-xl font-semibold mb-3">
              👉 Luxury, Authenticity, and Expert Care
            </div>
            <p className="text-gray-700 text-base leading-relaxed px-2">
              All in one free consultation. Start your beauty journey today.
            </p>
          </section>
        </div>

        {/* CTA Section */}
        <section className="text-center py-12">
          <button
            onClick={handleQuoteClick}
            className="w-full max-w-xs px-8 py-4 rounded-full text-white font-semibold text-lg
                      bg-gradient-to-r from-pink-500 via-red-500 to-purple-500
                      hover:shadow-lg hover:scale-105 transition-all duration-200
                      shadow-md"
          >
            Start My Beauty Journey
          </button>

          <div className="text-sm text-gray-500 mt-4 px-2">
            Free consultation • Takes 3 minutes • Instant recommendations
          </div>
        </section>
      </div>
    </div>
  );
}