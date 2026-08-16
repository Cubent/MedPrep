'use client';

// Brand assets updated: header/footer logo and step images
import React, { useEffect, useState } from 'react';

export function LuminaInteractiveList() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const carousel = document.getElementById('deals-carousel');
    if (!carousel) return;

    let scrollInterval: NodeJS.Timeout;
    
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const currentScroll = carousel.scrollLeft;
        
        if (currentScroll >= maxScroll) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const cardWidth = carousel.scrollWidth / 7;
          carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 3000);
    };

    startAutoScroll();

    // Pause auto-scroll on hover
    carousel.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    carousel.addEventListener('mouseleave', startAutoScroll);

    return () => {
      clearInterval(scrollInterval);
      carousel.removeEventListener('mouseenter', () => clearInterval(scrollInterval));
      carousel.removeEventListener('mouseleave', startAutoScroll);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/animateos-logo (12).png"
              alt="TripDeals Logo"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <div className="text-xl font-bold text-[#004ffe]">
              TripDeals
            </div>
          </div>
          <a 
            href="https://apps.apple.com/us/app/tripdeals-cheap-flight-deals/id6758586511" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#004ffe] text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#5a0c24] transition-colors"
          >
            Download App
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-[#FFFFFF] flex flex-col items-center justify-center relative overflow-hidden px-6 py-24 sm:py-32 lg:py-40 mt-14">
        {/* Main Content - Centered */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
          {/* Social Proof Badge */}
          <div className="mb-4 bg-[#004ffe] rounded-full px-3 sm:px-5 py-2 sm:py-2.5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-full">
            <div className="hidden sm:flex -space-x-2 shrink-0">
              <img 
                src="https://randomuser.me/api/portraits/women/1.jpg" 
                alt="User" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white"
              />
              <img 
                src="https://randomuser.me/api/portraits/men/2.jpg" 
                alt="User" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white"
              />
              <img 
                src="https://randomuser.me/api/portraits/women/3.jpg" 
                alt="User" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white"
              />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="text-white font-medium text-xs sm:text-sm whitespace-nowrap">
                Loved by 50K+ Travelers,
              </span>
              <div className="flex gap-0.5 shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" viewBox="0 0 20 20">
                  <defs>
                    <linearGradient id="star-gradient">
                      <stop offset="69%" stopColor="currentColor" />
                      <stop offset="69%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#star-gradient)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              </div>
              <span className="text-white font-medium text-xs sm:text-sm whitespace-nowrap">rating</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="text-[#004ffe]">Save up to 90%</span> <span className="text-black">on flights</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            Join TripDeals and find the best flights from your city
          </p>

          {/* App Store Button */}
          <div className="flex items-center justify-center">
            <a 
              href="https://apps.apple.com/us/app/tripdeals-cheap-flight-deals/id6758586511" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img 
                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1610841600" 
                alt="Download on the App Store" 
                className="h-12 sm:h-14"
              />
            </a>
          </div>
        </div>
      </div>

      {/* How Does It Work Section */}
      <div className="bg-[#f5f5f5] py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-3">
              How does it work
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about TripDeals
            </p>
          </div>

          {/* Three Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-[#004ffe]">1</span>
                </div>
                <div className="w-64 h-80 overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="/6.png"
                    alt="Start with your airport"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Choose your home airport</h3>
              <p className="text-gray-600">
                Select your departure city or nearest major airport.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-[#004ffe]">2</span>
                </div>
                <div className="w-64 h-80 overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="/7.png"
                    alt="Deals to your dream destinations"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Receive exclusive flight deals</h3>
              <p className="text-gray-600">
                Get instant alerts for massive discounts and error fares.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-[#004ffe]">3</span>
                </div>
                <div className="w-64 h-80 overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="/8.png"
                    alt="Then book it"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Book your trip</h3>
              <p className="text-gray-600">
                Found the perfect deal? Book directly with the airline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-3">
              Deals We've Found in the Past
            </h2>
            <p className="text-lg text-gray-600">
              Real deals our members have booked
            </p>
          </div>

          {/* Deals Carousel */}
          <div className="relative">
            <div 
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 scrollbar-hide"
              id="deals-carousel"
              onScroll={(e) => {
                const carousel = e.currentTarget;
                const scrollLeft = carousel.scrollLeft;
                const cardWidth = carousel.scrollWidth / 7;
                const activeIndex = Math.round(scrollLeft / cardWidth);
                
                document.querySelectorAll('.dot-indicator').forEach((dot, index) => {
                  if (index === activeIndex) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-gray-800');
                  } else {
                    dot.classList.remove('bg-gray-800');
                    dot.classList.add('bg-gray-300');
                  }
                });
              }}
            >
              {/* Deal 1 - Boston to Paris */}
              <div className="min-w-[280px] sm:min-w-[320px] snap-start">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop" 
                    alt="Boston to Paris" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004ffe]/80 via-[#004ffe]/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <span className="inline-block bg-[#004ffe] text-white text-xs font-bold px-3 py-1 rounded-full">
                      BOOKED BY TRIPDEALS MEMBERS
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl font-bold mb-2">$245</div>
                    <div className="text-lg font-semibold mb-1">Boston ⇄ Paris</div>
                    <div className="text-sm opacity-90">Roundtrip (72% off normally $875+)</div>
                  </div>
                </div>
              </div>

              {/* Deal 2 - Toronto to New York */}
              <div className="min-w-[280px] sm:min-w-[320px] snap-start">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&h=400&fit=crop" 
                    alt="Toronto to New York" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004ffe]/80 via-[#004ffe]/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <span className="inline-block bg-[#004ffe] text-white text-xs font-bold px-3 py-1 rounded-full">
                      BOOKED BY TRIPDEALS MEMBERS
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl font-bold mb-2">$22</div>
                    <div className="text-lg font-semibold mb-1">Toronto ⇄ New York</div>
                    <div className="text-sm opacity-90">Roundtrip (85% off normally $150+)</div>
                  </div>
                </div>
              </div>

              {/* Deal 3 - Miami to Tokyo */}
              <div className="min-w-[280px] sm:min-w-[320px] snap-start">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop" 
                    alt="Miami to Tokyo" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004ffe]/80 via-[#004ffe]/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <span className="inline-block bg-[#004ffe] text-white text-xs font-bold px-3 py-1 rounded-full">
                      BOOKED BY TRIPDEALS MEMBERS
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl font-bold mb-2">$187</div>
                    <div className="text-lg font-semibold mb-1">Miami ⇄ Tokyo</div>
                    <div className="text-sm opacity-90">Roundtrip (69% off normally $600+)</div>
                  </div>
                </div>
              </div>

              {/* Deal 4 - Los Angeles to London */}
              <div className="min-w-[280px] sm:min-w-[320px] snap-start">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop" 
                    alt="Los Angeles to London" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004ffe]/80 via-[#004ffe]/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <span className="inline-block bg-[#004ffe] text-white text-xs font-bold px-3 py-1 rounded-full">
                      BOOKED BY TRIPDEALS MEMBERS
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl font-bold mb-2">$89</div>
                    <div className="text-lg font-semibold mb-1">Los Angeles ⇄ London</div>
                    <div className="text-sm opacity-90">Roundtrip (56% off normally $200+)</div>
                  </div>
                </div>
              </div>

              {/* Deal 5 */}
              <div className="min-w-[280px] sm:min-w-[320px] snap-start">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop" 
                    alt="Boston to Paris" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004ffe]/80 via-[#004ffe]/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <span className="inline-block bg-[#004ffe] text-white text-xs font-bold px-3 py-1 rounded-full">
                      BOOKED BY TRIPDEALS MEMBERS
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl font-bold mb-2">$245</div>
                    <div className="text-lg font-semibold mb-1">Boston ⇄ Paris</div>
                    <div className="text-sm opacity-90">Roundtrip (72% off normally $875+)</div>
                  </div>
                </div>
              </div>

              {/* Deal 6 */}
              <div className="min-w-[280px] sm:min-w-[320px] snap-start">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop" 
                    alt="Seattle to Barcelona" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004ffe]/80 via-[#004ffe]/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <span className="inline-block bg-[#004ffe] text-white text-xs font-bold px-3 py-1 rounded-full">
                      BOOKED BY TRIPDEALS MEMBERS
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl font-bold mb-2">$312</div>
                    <div className="text-lg font-semibold mb-1">Seattle ⇄ Barcelona</div>
                    <div className="text-sm opacity-90">Roundtrip (68% off normally $975+)</div>
                  </div>
                </div>
              </div>

              {/* Deal 7 */}
              <div className="min-w-[280px] sm:min-w-[320px] snap-start">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&h=400&fit=crop" 
                    alt="Chicago to Rome" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004ffe]/80 via-[#004ffe]/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <span className="inline-block bg-[#004ffe] text-white text-xs font-bold px-3 py-1 rounded-full">
                      BOOKED BY TRIPDEALS MEMBERS
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl font-bold mb-2">$298</div>
                    <div className="text-lg font-semibold mb-1">Chicago ⇄ Rome</div>
                    <div className="text-sm opacity-90">Roundtrip (70% off normally $995+)</div>
                  </div>
                </div>
              </div>

              {/* Deal 8 */}
              <div className="min-w-[280px] sm:min-w-[320px] snap-start">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=600&h=400&fit=crop" 
                    alt="Denver to Amsterdam" 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004ffe]/80 via-[#004ffe]/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <span className="inline-block bg-[#004ffe] text-white text-xs font-bold px-3 py-1 rounded-full">
                      BOOKED BY TRIPDEALS MEMBERS
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl font-bold mb-2">$267</div>
                    <div className="text-lg font-semibold mb-1">Denver ⇄ Amsterdam</div>
                    <div className="text-sm opacity-90">Roundtrip (74% off normally $1025+)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            <button className="dot-indicator w-2 h-2 rounded-full bg-gray-800 transition-colors" onClick={() => document.getElementById('deals-carousel')?.scrollTo({left: 0, behavior: 'smooth'})}></button>
            <button className="dot-indicator w-2 h-2 rounded-full bg-gray-300 transition-colors" onClick={() => document.getElementById('deals-carousel')?.scrollTo({left: document.getElementById('deals-carousel')!.scrollWidth / 7, behavior: 'smooth'})}></button>
            <button className="dot-indicator w-2 h-2 rounded-full bg-gray-300 transition-colors" onClick={() => document.getElementById('deals-carousel')?.scrollTo({left: document.getElementById('deals-carousel')!.scrollWidth / 7 * 2, behavior: 'smooth'})}></button>
            <button className="dot-indicator w-2 h-2 rounded-full bg-gray-300 transition-colors" onClick={() => document.getElementById('deals-carousel')?.scrollTo({left: document.getElementById('deals-carousel')!.scrollWidth / 7 * 3, behavior: 'smooth'})}></button>
            <button className="dot-indicator w-2 h-2 rounded-full bg-gray-300 transition-colors" onClick={() => document.getElementById('deals-carousel')?.scrollTo({left: document.getElementById('deals-carousel')!.scrollWidth / 7 * 4, behavior: 'smooth'})}></button>
            <button className="dot-indicator w-2 h-2 rounded-full bg-gray-300 transition-colors" onClick={() => document.getElementById('deals-carousel')?.scrollTo({left: document.getElementById('deals-carousel')!.scrollWidth / 7 * 5, behavior: 'smooth'})}></button>
            <button className="dot-indicator w-2 h-2 rounded-full bg-gray-300 transition-colors" onClick={() => document.getElementById('deals-carousel')?.scrollTo({left: document.getElementById('deals-carousel')!.scrollWidth / 7 * 6, behavior: 'smooth'})}></button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* FAQ Section */}
      <div className="bg-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2 sm:mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Everything you need to know about TripDeals
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-2 sm:space-y-3">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleFaq(0)}
                className="w-full flex justify-between items-center cursor-pointer p-4 sm:p-5 font-semibold text-base sm:text-lg text-black hover:bg-gray-100 transition-colors text-left"
              >
                <span>What is TripDeals?</span>
                <svg className={`w-5 h-5 transition-transform ${openFaq === 0 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 0 && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 sm:pt-2 text-sm sm:text-base text-gray-600">
                  TripDeals is a flight deal alert service that helps you save up to 90% on flights. We monitor prices from your home airport and notify you when we find amazing deals and mistake fares.
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleFaq(1)}
                className="w-full flex justify-between items-center cursor-pointer p-4 sm:p-5 font-semibold text-base sm:text-lg text-black hover:bg-gray-100 transition-colors text-left"
              >
                <span>How much does it cost?</span>
                <svg className={`w-5 h-5 transition-transform ${openFaq === 1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 1 && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 sm:pt-2 text-sm sm:text-base text-gray-600">
                  TripDeals offers both free and premium plans. The free plan gives you access to basic deal alerts, while premium members get exclusive deals, priority notifications, and advanced filters.
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleFaq(2)}
                className="w-full flex justify-between items-center cursor-pointer p-4 sm:p-5 font-semibold text-base sm:text-lg text-black hover:bg-gray-100 transition-colors text-left"
              >
                <span>How do I book a flight?</span>
                <svg className={`w-5 h-5 transition-transform ${openFaq === 2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 2 && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 sm:pt-2 text-sm sm:text-base text-gray-600">
                  When you find a deal you love, simply click through to book directly with the airline or travel provider. We don't handle bookings ourselves - we just help you find the best prices.
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleFaq(3)}
                className="w-full flex justify-between items-center cursor-pointer p-4 sm:p-5 font-semibold text-base sm:text-lg text-black hover:bg-gray-100 transition-colors text-left"
              >
                <span>Which airports do you cover?</span>
                <svg className={`w-5 h-5 transition-transform ${openFaq === 3 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 3 && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 sm:pt-2 text-sm sm:text-base text-gray-600">
                  We cover hundreds of airports worldwide. Simply select your home airport when you sign up, and we'll send you deals specifically from your location.
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleFaq(4)}
                className="w-full flex justify-between items-center cursor-pointer p-4 sm:p-5 font-semibold text-base sm:text-lg text-black hover:bg-gray-100 transition-colors text-left"
              >
                <span>Are the deals really legitimate?</span>
                <svg className={`w-5 h-5 transition-transform ${openFaq === 4 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 4 && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 sm:pt-2 text-sm sm:text-base text-gray-600">
                  Absolutely! All deals are verified and bookable at the time we send them. However, flight prices can change quickly, so we recommend booking as soon as you see a deal you like.
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleFaq(5)}
                className="w-full flex justify-between items-center cursor-pointer p-4 sm:p-5 font-semibold text-base sm:text-lg text-black hover:bg-gray-100 transition-colors text-left"
              >
                <span>Can I cancel my subscription anytime?</span>
                <svg className={`w-5 h-5 transition-transform ${openFaq === 5 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 5 && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 sm:pt-2 text-sm sm:text-base text-gray-600">
                  Yes! You can cancel your premium subscription at any time with no penalties. Your access will continue until the end of your billing period.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-3">
              <img
                src="/animateos-logo (12).png"
                alt="TripDeals Logo"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <div className="text-sm text-gray-600">
                © 2026 TripDeals. All rights reserved.
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-[#004ffe] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-[#004ffe] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-[#004ffe] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
