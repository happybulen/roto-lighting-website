import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Building, Trees, Users } from "lucide-react";
const product1 = "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400&h=300&fit=crop";
const product2 = "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop";
const product3 = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop";
const product4 = "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop";

export default function ProductsSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Perfect For Every Application</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Our rotational molding services create durable, precision-engineered products for a wide range of industries and applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Home className="text-primary-blue h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Housings</h3>
              <p className="text-gray-600 text-sm">Protective enclosures for electronics and equipment</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building className="text-primary-blue h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Commercial</h3>
              <p className="text-gray-600 text-sm">Large-scale commercial and industrial applications</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trees className="text-primary-blue h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Outdoor Applications</h3>
              <p className="text-gray-600 text-sm">Weather-resistant products for outdoor use</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary-blue h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Residential</h3>
              <p className="text-gray-600 text-sm">Consumer products and residential solutions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <img 
            src={product1} 
            alt="Green custom housing component with handle - professional rotational molding" 
            className="rounded-lg shadow-md w-full h-48 object-cover"
          />
          <img 
            src={product2} 
            alt="Brown decorative column post - architectural outdoor solution" 
            className="rounded-lg shadow-md w-full h-48 object-cover"
          />
          <img 
            src={product3} 
            alt="Red commercial equipment housing - industrial application" 
            className="rounded-lg shadow-md w-full h-48 object-cover"
          />
          <img 
            src={product4} 
            alt="Precision electronic component housing - technical molding" 
            className="rounded-lg shadow-md w-full h-48 object-cover"
          />
        </div>

        <div className="text-center">
          <Card className="bg-primary-blue text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Any Color, Any Shape, Ultimate Durability</h3>
              <p className="text-blue-100 mb-6">From concept to completion, we deliver precision rotational molding solutions that exceed expectations.</p>
              <Button 
                onClick={scrollToContact}
                className="bg-white text-primary-blue hover:bg-gray-100 font-semibold"
              >
                Start Your Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
