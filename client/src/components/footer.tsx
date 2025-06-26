import { useState } from "react";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import PrivacyPolicyPopup from "./privacy-policy-popup";

export default function Footer() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTab, setPopupTab] = useState<"privacy" | "terms">("privacy");
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">Roto Lighting</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Over 40 years of excellence in custom rotational molding services. Precision through innovation, built to last.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center hover:bg-dark-blue transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center hover:bg-dark-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center hover:bg-dark-blue transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Custom Molding
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Tooling Design
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Prototype Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Quality Testing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center gap-2">
                <span>📞</span> (760) 238-1100
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span> info@rotationalmoldingpros.com
              </p>
              <p className="flex items-start gap-2">
                <span>📍</span> 
                <span>82-579 Fleming Way Unit D<br />Indio, CA 92201</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Roto Lighting. All rights reserved. Made in USA.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              onClick={() => {
                setPopupTab("privacy");
                setIsPopupOpen(true);
              }}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => {
                setPopupTab("terms");
                setIsPopupOpen(true);
              }}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </button>
            <a href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</a>
          </div>
        </div>
      </div>

      <PrivacyPolicyPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        initialTab={popupTab}
      />
    </footer>
  );
}
