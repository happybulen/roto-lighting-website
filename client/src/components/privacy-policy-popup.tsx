import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PrivacyPolicyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "privacy" | "terms";
}

export default function PrivacyPolicyPopup({ isOpen, onClose, initialTab = "privacy" }: PrivacyPolicyPopupProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy & Terms of Service</DialogTitle>
          <DialogDescription>
            Please review our privacy policy and terms of service before using our website.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "privacy" | "terms")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          </TabsList>
          
          <TabsContent value="privacy">
            <ScrollArea className="h-96 w-full rounded-md border p-4">
              <div className="space-y-4 text-sm">
                <h3 className="text-lg font-semibold">Privacy Policy</h3>
                <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Information We Collect</h4>
                  <p>We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Request a quote or contact us through our forms</li>
                    <li>Subscribe to our email newsletter</li>
                    <li>Browse our website (through cookies and analytics)</li>
                  </ul>
                  
                  <h4 className="font-semibold">How We Use Your Information</h4>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Respond to your inquiries and provide quotes</li>
                    <li>Send you updates about our services (if subscribed)</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                  
                  <h4 className="font-semibold">Information Sharing</h4>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>With your consent</li>
                    <li>To service providers who assist in our operations</li>
                    <li>When required by law</li>
                  </ul>
                  
                  <h4 className="font-semibold">Data Security</h4>
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                  
                  <h4 className="font-semibold">Your Rights</h4>
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Unsubscribe from our communications</li>
                  </ul>
                  
                  <h4 className="font-semibold">Contact Us</h4>
                  <p>If you have questions about this privacy policy, please contact us at info@rotationalmoldingpros.com</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="terms">
            <ScrollArea className="h-96 w-full rounded-md border p-4">
              <div className="space-y-4 text-sm">
                <h3 className="text-lg font-semibold">Terms of Service</h3>
                <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Acceptance of Terms</h4>
                  <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                  
                  <h4 className="font-semibold">Use License</h4>
                  <p>Permission is granted to temporarily view the materials on Rotational Molding Pros' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for commercial purposes or public display</li>
                    <li>Attempt to reverse engineer any software on the website</li>
                    <li>Remove copyright or proprietary notations from materials</li>
                  </ul>
                  
                  <h4 className="font-semibold">Disclaimer</h4>
                  <p>The materials on Rotational Molding Pros' website are provided on an 'as is' basis. Rotational Molding Pros makes no warranties, expressed or implied, and hereby disclaims all other warranties including implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</p>
                  
                  <h4 className="font-semibold">Limitations</h4>
                  <p>In no event shall Rotational Molding Pros or its suppliers be liable for any damages arising out of the use or inability to use the materials on the website.</p>
                  
                  <h4 className="font-semibold">Accuracy of Materials</h4>
                  <p>The materials appearing on the website could include technical, typographical, or photographic errors. We do not warrant that any materials are accurate, complete, or current.</p>
                  
                  <h4 className="font-semibold">Modifications</h4>
                  <p>Rotational Molding Pros may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms.</p>
                  
                  <h4 className="font-semibold">Governing Law</h4>
                  <p>These terms are governed by and construed in accordance with the laws of California, USA.</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}