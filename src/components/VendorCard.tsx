import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Mail } from "lucide-react";

interface Vendor {
  id: number;
  name: string;
  serviceType: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  contact: {
    phone: string;
    email: string;
  };
  image: string;
  priceRange: string;
}

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img 
                src={vendor.image} 
                alt={vendor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{vendor.name}</h3>
              <Badge variant="outline" className="mt-1">
                {vendor.serviceType}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 fill-warning text-warning mr-1" />
              <span className="font-medium">{vendor.rating}</span>
              <span className="text-muted-foreground ml-1">({vendor.reviews})</span>
            </div>
            <p className="text-sm text-muted-foreground">{vendor.priceRange}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {vendor.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{vendor.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="w-4 h-4 mr-2" />
            <span>{vendor.contact.phone}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Mail className="w-4 h-4 mr-2" />
            <span>{vendor.contact.email}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1">
            View Profile
          </Button>
          <Button className="flex-1">
            Contact
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VendorCard;