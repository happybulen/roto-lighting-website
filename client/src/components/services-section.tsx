import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cog, DollarSign, Calendar, ArrowRight, Check } from "lucide-react";
const servicesImage = "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&h=400&fit=crop";

export default function ServicesSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Custom Roto Molding Services</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Built to Last - We use high-impact polymer resin to create long-lasting, durable parts perfect for outdoor and heavy-use applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 sm:p-8">
              <div className="w-16 h-16 bg-primary-blue rounded-lg flex items-center justify-center mb-6">
                <Cog className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">PRECISION MOLDING</h3>
              <p className="text-gray-600 mb-6">Expert rotational molding services with precise control over thickness and quality. Professional results for complex geometries.</p>
              <button 
                onClick={scrollToContact}
                className="text-primary-blue font-medium hover:text-dark-blue transition-colors flex items-center gap-1"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 sm:p-8">
              <div className="w-16 h-16 bg-primary-blue rounded-lg flex items-center justify-center mb-6">
                <DollarSign className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">NO HIDDEN FEES</h3>
              <p className="text-gray-600 mb-6">Transparent pricing with no hidden fees. What you see is what you pay for our premium rotational molding services.</p>
              <button 
                onClick={scrollToContact}
                className="text-primary-blue font-medium hover:text-dark-blue transition-colors flex items-center gap-1"
              >
                Get Quote <ArrowRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 sm:p-8">
              <div className="w-16 h-16 bg-primary-blue rounded-lg flex items-center justify-center mb-6">
                <Calendar className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">FLEXIBLE SCHEDULING</h3>
              <p className="text-gray-600 mb-6">Schedule your rotational molding consultation and project timeline through our streamlined process.</p>
              <button 
                onClick={scrollToContact}
                className="text-primary-blue font-medium hover:text-dark-blue transition-colors flex items-center gap-1"
              >
                Book Now <ArrowRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <img 
              src={servicesImage} 
              alt="Professional black rotational molded post - custom lighting solution" 
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Precision Through Innovation</h3>
            <p className="text-lg text-gray-600 mb-8">
              We specialize in rotational molding, allowing us to create seamless, hollow parts with consistent thickness and strength. Our advanced techniques ensure superior quality for every project.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-white h-3 w-3" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Custom Tooling Design</h4>
                  <p className="text-gray-600">Specialized molds designed for your specific requirements</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-white h-3 w-3" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">High-Impact Materials</h4>
                  <p className="text-gray-600">Durable polymer resins for long-lasting applications</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-white h-3 w-3" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quality Assurance</h4>
                  <p className="text-gray-600">Rigorous testing and inspection processes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
