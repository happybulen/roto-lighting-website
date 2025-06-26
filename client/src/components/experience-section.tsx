import { Card, CardContent } from "@/components/ui/card";
import { Award, Bolt, Flag } from "lucide-react";
// Using placeholder image for deployment
const facilityImage = "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&h=400&fit=crop";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Over 40 Years of Excellence</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              We provide over 40 years of rotational molding and tooling expertise, delivering innovative solutions for industries worldwide.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-blue mb-2">40+</div>
                <div className="text-sm sm:text-base text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-blue mb-2">1000+</div>
                <div className="text-sm sm:text-base text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-blue mb-2">50+</div>
                <div className="text-sm sm:text-base text-gray-600">Industries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-blue mb-2">100%</div>
                <div className="text-sm sm:text-base text-gray-600">Made in USA</div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src={facilityImage} 
              alt="Custom decorative rocks - Roto Lighting landscaping solutions" 
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>

        <Card className="bg-light-gray">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8 sm:mb-12">Why Choose Roto Lighting?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="text-white h-10 w-10" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Industry Leadership</h4>
                <p className="text-gray-600">Four decades of innovation and excellence in rotational molding technology.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bolt className="text-white h-10 w-10" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Custom Solutions</h4>
                <p className="text-gray-600">Tailored manufacturing solutions designed specifically for your unique requirements.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <Flag className="text-white h-10 w-10" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Made in USA</h4>
                <p className="text-gray-600">Proudly manufactured in America with the highest quality standards and materials.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
