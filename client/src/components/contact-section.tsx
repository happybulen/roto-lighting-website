import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import contactImage from "@assets/5_1750953287938.jpg";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    details: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const quoteRequestMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send quote request');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Sent",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        details: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send quote request. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.details) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    quoteRequestMutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Ready to start your rotational molding project? Contact our experienced team for a consultation and custom quote.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600">(760) 238-1100</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600">info@rotationalmoldingpros.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600">82-579 Fleming Way Unit D<br />Indio, CA 92201</p>
                </div>
              </div>


            </div>

            <img 
              src={contactImage} 
              alt="Precision white rotational molded component - technical excellence" 
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>

          <Card className="bg-light-gray" id="quote-form">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Quote</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2">First Name *</Label>
                    <Input 
                      id="firstName"
                      type="text" 
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="focus:ring-2 focus:ring-primary-blue"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2">Last Name *</Label>
                    <Input 
                      id="lastName"
                      type="text" 
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="focus:ring-2 focus:ring-primary-blue"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">Email *</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="focus:ring-2 focus:ring-primary-blue"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">Phone</Label>
                  <Input 
                    id="phone"
                    type="tel" 
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="focus:ring-2 focus:ring-primary-blue"
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2">Company</Label>
                  <Input 
                    id="company"
                    type="text" 
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="focus:ring-2 focus:ring-primary-blue"
                  />
                </div>

                <div>
                  <Label htmlFor="projectType" className="text-sm font-medium text-gray-700 mb-2">Project Type</Label>
                  <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                    <SelectTrigger className="focus:ring-2 focus:ring-primary-blue">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom-housings">Custom Housings</SelectItem>
                      <SelectItem value="commercial">Commercial Applications</SelectItem>
                      <SelectItem value="outdoor">Outdoor Products</SelectItem>
                      <SelectItem value="residential">Residential Solutions</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="details" className="text-sm font-medium text-gray-700 mb-2">Project Details *</Label>
                  <Textarea 
                    id="details"
                    rows={4} 
                    placeholder="Tell us about your project requirements..."
                    value={formData.details}
                    onChange={(e) => handleInputChange('details', e.target.value)}
                    className="focus:ring-2 focus:ring-primary-blue resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary-blue text-white hover:bg-dark-blue font-semibold py-4"
                  disabled={quoteRequestMutation.isPending}
                >
                  {quoteRequestMutation.isPending ? "Sending..." : "Send Quote Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
