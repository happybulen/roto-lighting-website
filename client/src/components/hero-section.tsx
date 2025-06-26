import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/IMG_5127_1750950989223.jpg";

export default function HeroSection() {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-blue to-medium-blue opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-gray-900">
            <div className="inline-block mb-4">
              <span className="bg-primary-blue text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                ROTATIONAL MOLDING SPECIALISTS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6 tracking-tight">
              Custom Roto <span className="text-primary-blue">Molding</span> Solutions
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed font-medium">
              With Roto Lighting, you'll always find a personalized approach to rotational molding with 40+ years of precision manufacturing excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                className="bg-primary-blue text-white px-8 py-4 font-bold text-lg hover:bg-medium-blue rounded-lg shadow-lg"
                onClick={() => {
                  // Smart scroll: target quote form on mobile, contact section on desktop
                  const isMobile = window.innerWidth < 1024; // lg breakpoint
                  const targetId = isMobile ? 'quote-form' : 'contact';
                  const element = document.getElementById(targetId);
                  if (element) {
                    // Account for sticky navigation header height plus extra padding
                    const headerOffset = window.innerWidth < 768 ? 100 : 120;
                    const elementPosition = element.offsetTop - headerOffset;
                    
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Get Quote
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 font-semibold text-lg hover:bg-gray-50 rounded-lg"
                onClick={() => {
                  const element = document.getElementById('services');
                  if (element) {
                    // Account for sticky navigation header height plus extra padding
                    const headerOffset = window.innerWidth < 768 ? 100 : 120;
                    const elementPosition = element.offsetTop - headerOffset;
                    
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Our Services
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (760) 238-1100
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="break-all sm:break-normal">info@rotationalmoldingpros.com</span>
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-gray-200">
              <img 
                src={heroImage} 
                alt="Roto Lighting rotational molding equipment" 
                className="rounded-xl w-full h-auto mb-6 object-cover"
              />
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-3xl font-black text-primary-blue mb-1">40+</div>
                  <div className="text-sm text-gray-600 font-medium">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-primary-blue mb-1">1000+</div>
                  <div className="text-sm text-gray-600 font-medium">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-primary-blue mb-1">100%</div>
                  <div className="text-sm text-gray-600 font-medium">USA Made</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Indicators */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 lg:flex lg:justify-center lg:items-center lg:space-x-12">
            <div className="flex items-center gap-2 text-gray-600 justify-center">
              <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium">40+ Years</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 justify-center">
              <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium">Made in USA</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 justify-center">
              <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium">Custom Solutions</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 justify-center">
              <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium">Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
