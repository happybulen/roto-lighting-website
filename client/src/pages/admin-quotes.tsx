import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Building, Calendar, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/navigation";
import type { QuoteRequest } from "@shared/schema";

export default function AdminQuotes() {
  const { data: quoteRequests, isLoading } = useQuery<QuoteRequest[]>({
    queryKey: ["/api/admin/quote-requests"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading quote requests...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quote Requests</h1>
          <p className="text-gray-600">View and manage customer quote requests</p>
          <div className="mt-4">
            <Button asChild>
              <a href="/admin" className="inline-flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Back to Admin CMS
              </a>
            </Button>
          </div>
        </div>

        {!quoteRequests || quoteRequests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-gray-500">No quote requests found</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {quoteRequests.map((quote) => (
              <Card key={quote.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {quote.firstName} {quote.lastName}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(quote.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </span>
                        <Badge variant="outline">Quote #{quote.id}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Contact Details</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">
                            {quote.email}
                          </a>
                        </div>
                        {quote.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a href={`tel:${quote.phone}`} className="text-blue-600 hover:underline">
                              {quote.phone}
                            </a>
                          </div>
                        )}
                        {quote.company && (
                          <div className="flex items-center gap-2 text-sm">
                            <Building className="h-4 w-4 text-gray-500" />
                            <span>{quote.company}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {quote.projectType && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Project Type</h4>
                        <Badge variant="secondary">{quote.projectType}</Badge>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Project Details */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Project Details</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{quote.details}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button asChild size="sm">
                      <a href={`mailto:${quote.email}?subject=Re: Quote Request - ${quote.projectType || 'Your Project'}`}>
                        Reply via Email
                      </a>
                    </Button>
                    {quote.phone && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`tel:${quote.phone}`}>Call Customer</a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}