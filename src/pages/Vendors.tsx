import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VendorCard from "@/components/VendorCard";
import { Search, Filter, Plus } from "lucide-react";

const Vendors = () => {
  // Mock data for demonstration
  const vendors = [
    {
      id: 1,
      name: "Elite Catering Co.",
      serviceType: "Catering",
      location: "San Francisco, CA",
      rating: 4.9,
      reviews: 156,
      description: "Premium catering services for corporate events, weddings, and special occasions. Fresh, locally-sourced ingredients.",
      contact: {
        phone: "(555) 123-4567",
        email: "hello@elitecatering.com"
      },
      image: "/placeholder.svg",
      priceRange: "$$$"
    },
    {
      id: 2,
      name: "Lens & Light Photography",
      serviceType: "Photography",
      location: "New York, NY",
      rating: 4.8,
      reviews: 203,
      description: "Professional event photography with a creative eye. Capturing your special moments with artistic flair.",
      contact: {
        phone: "(555) 234-5678",
        email: "info@lenslight.com"
      },
      image: "/placeholder.svg",
      priceRange: "$$"
    },
    {
      id: 3,
      name: "Sound Wave Audio",
      serviceType: "Audio/Visual",
      location: "Chicago, IL",
      rating: 4.7,
      reviews: 89,
      description: "Complete audio/visual solutions for events of any size. Professional equipment and experienced technicians.",
      contact: {
        phone: "(555) 345-6789",
        email: "booking@soundwaveav.com"
      },
      image: "/placeholder.svg",
      priceRange: "$$"
    },
    {
      id: 4,
      name: "Bloom & Blossom Floral",
      serviceType: "Floral Design",
      location: "Los Angeles, CA",
      rating: 4.9,
      reviews: 127,
      description: "Stunning floral arrangements and decorations that transform any venue into a magical space.",
      contact: {
        phone: "(555) 456-7890",
        email: "orders@bloomblossom.com"
      },
      image: "/placeholder.svg",
      priceRange: "$$$"
    },
    {
      id: 5,
      name: "Party Perfect Rentals",
      serviceType: "Equipment Rental",
      location: "Austin, TX",
      rating: 4.6,
      reviews: 94,
      description: "Wide selection of party and event rentals including tents, tables, chairs, linens, and more.",
      contact: {
        phone: "(555) 567-8901",
        email: "rentals@partyperfect.com"
      },
      image: "/placeholder.svg",
      priceRange: "$"
    },
    {
      id: 6,
      name: "Harmony Entertainment",
      serviceType: "Entertainment",
      location: "Miami, FL",
      rating: 4.8,
      reviews: 178,
      description: "Professional DJs, live bands, and entertainment services to keep your guests dancing all night long.",
      contact: {
        phone: "(555) 678-9012",
        email: "bookings@harmonyent.com"
      },
      image: "/placeholder.svg",
      priceRange: "$$"
    }
  ];

  const serviceTypes = [
    "All Services",
    "Catering",
    "Photography",
    "Audio/Visual",
    "Floral Design",
    "Equipment Rental",
    "Entertainment",
    "Venue Decoration",
    "Transportation"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-accent/10 to-primary/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">Find Vendors</h1>
              <p className="text-lg text-muted-foreground">
                Connect with trusted event service providers
              </p>
            </div>
            <Button size="lg" className="mt-6 md:mt-0">
              <Plus className="w-5 h-5 mr-2" />
              Join as Vendor
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search vendors by name or service..." 
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="san-francisco">San Francisco</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
                <SelectItem value="los-angeles">Los Angeles</SelectItem>
                <SelectItem value="austin">Austin</SelectItem>
                <SelectItem value="miami">Miami</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="$">$ - Budget</SelectItem>
                <SelectItem value="$$">$$ - Moderate</SelectItem>
                <SelectItem value="$$$">$$$ - Premium</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="lg:w-32">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            All Vendors <span className="text-muted-foreground">({vendors.length} results)</span>
          </h2>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vendors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Vendors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Vendors;