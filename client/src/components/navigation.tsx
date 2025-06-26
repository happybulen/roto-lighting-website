import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import rotoLogo from "@assets/rotologo_1750950303711.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const navigateToSection = (sectionId: string) => {
    const scrollToElement = (element: HTMLElement) => {
      // Account for sticky navigation header height (80px) plus extra padding
      const headerOffset = window.innerWidth < 768 ? 100 : 120; // More offset on mobile
      const elementPosition = element.offsetTop - headerOffset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    };

    // If we're on the home page, scroll to section
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        scrollToElement(element);
      }
    } else {
      // If we're on another page, navigate to home first then scroll
      setLocation('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          scrollToElement(element);
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 sm:gap-4">
              <img src={rotoLogo} alt="Roto Lighting Logo" className="h-10 sm:h-12 w-auto" />
              <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Roto Lighting</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <button 
                onClick={() => navigateToSection('home')}
                className="text-gray-700 hover:text-primary-blue px-4 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-gray-50"
              >
                Home
              </button>
              <button 
                onClick={() => navigateToSection('services')}
                className="text-gray-700 hover:text-primary-blue px-4 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-gray-50"
              >
                Services
              </button>
              <button 
                onClick={() => navigateToSection('experience')}
                className="text-gray-700 hover:text-primary-blue px-4 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-gray-50"
              >
                About
              </button>
              <button 
                onClick={() => navigateToSection('products')}
                className="text-gray-700 hover:text-primary-blue px-4 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-gray-50"
              >
                Applications
              </button>
              <a 
                href="/blog"
                className="text-gray-700 hover:text-primary-blue px-4 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-gray-50"
              >
                Blog
              </a>
              <button 
                onClick={() => navigateToSection('contact')}
                className="text-gray-700 hover:text-primary-blue px-4 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-gray-50"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button 
              onClick={() => navigateToSection('contact')}
              className="bg-primary-blue text-white hover:bg-medium-blue px-6 py-3 font-bold rounded-xl shadow-lg"
            >
              Get Quote
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-blue"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <button 
                onClick={() => navigateToSection('home')}
                className="block w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => navigateToSection('services')}
                className="block w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => navigateToSection('experience')}
                className="block w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => navigateToSection('products')}
                className="block w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
              >
                Applications
              </button>
              <a 
                href="/blog"
                className="block w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
              >
                Blog
              </a>
              <button 
                onClick={() => navigateToSection('contact')}
                className="block w-full text-left px-4 py-3 text-base font-semibold text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
              >
                Contact
              </button>
              <div className="px-4 py-3">
                <Button 
                  onClick={() => navigateToSection('contact')}
                  className="w-full bg-primary-blue text-white hover:bg-medium-blue font-bold rounded-xl shadow-lg"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}