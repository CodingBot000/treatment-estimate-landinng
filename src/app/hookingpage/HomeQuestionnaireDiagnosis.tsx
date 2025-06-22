'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomeQuestionnaireDiagnosis() {
  const router = useRouter();
  const handleQuoteClick = () => {
    // router.push("/estimate/step1");
    router.push("/estimate");
  };

  const handleExploreClick = () => {
    console.log("탐색하기 section clicked");
    window.location.href = "https://miracle3day.vercel.app/home/";
  };

  return (
    <section id="quote" className="py-20 min-h-screen bg-purple-500">
      <div className="container mx-auto px-4 py-20 text-center">
{/*       
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">Our Services</h2> */}
        <h1 className="text-5xl text-white font-bold mb-4">Beauty Link</h1>
        <p className="text-xl text-white mb-2">Before the treatment, start with a strategy.</p>
        {/* <p className="text-xl text-white mb-8">Premium Anti-Aging Treatment & Cosmetic Surgery Quotation Service</p> */}
        <p className="text-xl text-white mb-8">Get Started with Our Smart Treatment Finder</p>
        <div className="flex flex-col lg:flex-row gap-8 justify-center">

        <div
            className="bg-white rounded-lg shadow-lg w-[300px]  mx-auto p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
            onClick={handleQuoteClick}
          >
            <h2 className="text-purple-700 text-2xl font-bold text-center mb-6">Get a Quote</h2>
            <div className="w-full h-0.5 bg-purple-700 mb-6"></div>
            <div className="text-gray-700 text-center leading-tight">
            <p className="mb-2">Receive free quotes from premium clinics for <span className="text-purple-700 font-semibold">personalized anti-aging treatments or cosmetic procedures</span>
              tailored to your concerns and budget.</p>

            </div>
          </div>

     
          <div
            className="bg-white rounded-lg shadow-lg w-[300px]  mx-auto p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
            onClick={handleExploreClick}
          >
   
            <h2 className="text-purple-700 text-2xl font-bold text-center mb-6 ">Explore</h2>
            <div className="w-full h-0.5 bg-purple-700 mb-6"></div>
            <div className="text-gray-700 text-center leading-tight">
            <p className="mb-2">Only on Beauty Link discover exclusive anti-aging treatment and cosmetic surgery <span className="text-purple-700 font-semibold">discounts</span> from top-tier clinics and request a free consultation today!</p>
   
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
