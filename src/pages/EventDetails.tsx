import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VendorCard from "@/components/VendorCard";
import { Calendar, MapPin, Users, DollarSign, Share2, Heart, Clock, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EventDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock event data (in real app, would fetch based on ID)
  const event = {
    id: 1,
    title: "Annual Tech Conference 2024",
    description: "Join industry leaders for cutting-edge technology discussions, networking opportunities, and hands-on workshops. This year's conference features keynote speakers from major tech companies, interactive sessions on AI, blockchain, and cybersecurity, plus exclusive networking events.",
    location: "San Francisco Convention Center, 747 Howard St, San Francisco, CA 94103",
    date: "March 15, 2024",
    time: "9:00 AM - 6:00 PM",
    capacity: 500,
    attendees: 342,
    price: 299,
    category: "Technology",
    image: "/placeholder.svg",
    organizer: {
      name: "Tech Events Inc.",
      avatar: "/placeholder.svg",
      rating: 4.8,
      events: 24
    },
    agenda: [
      { time: "9:00 AM", title: "Registration & Welcome Coffee" },
      { time: "10:00 AM", title: "Keynote: The Future of AI" },
      { time: "11:30 AM", title: "Panel: Blockchain Revolution" },
      { time: "1:00 PM", title: "Networking Lunch" },
      { time: "2:30 PM", title: "Workshop: Cybersecurity Best Practices" },
      { time: "4:00 PM", title: "Startup Pitch Competition" },
      { time: "5:30 PM", title: "Closing Remarks & After Party" }
    ]
  };

  const vendors = [
    {
      id: 1,
      name: "Elite Catering Co.",
      serviceType: "Catering",
      location: "San Francisco, CA",
      rating: 4.9,
      reviews: 156,
      description: "Premium catering services for corporate events and conferences.",
      contact: { phone: "(555) 123-4567", email: "hello@elitecatering.com" },
      image: "/placeholder.svg",
      priceRange: "$$$"
    },
    {
      id: 2,
      name: "Sound Wave Audio",
      serviceType: "Audio/Visual",
      location: "San Francisco, CA",
      rating: 4.7,
      reviews: 89,
      description: "Complete audio/visual solutions for conferences and events.",
      contact: { phone: "(555) 345-6789", email: "booking@soundwaveav.com" },
      image: "/placeholder.svg",
      priceRange: "$$"
    }
  ];

  const handleRSVP = () => {
    toast({
      title: "RSVP Successful!",
      description: `You're now registered for ${event.title}. Check your email for confirmation details.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Event link has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="container mx-auto px-6 py-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/events">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="container mx-auto">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              {event.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </CardContent>
            </Card>

            {/* Agenda */}
            <Card>
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                      <div className="text-sm font-semibold text-primary min-w-[80px]">
                        {item.time}
                      </div>
                      <div className="text-sm font-medium">{item.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Easily accessible by public transport with on-site parking available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vendors */}
            <Card>
              <CardHeader>
                <CardTitle>Event Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden">
                          <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{vendor.name}</h4>
                          <p className="text-xs text-muted-foreground">{vendor.serviceType}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{vendor.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* RSVP Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">${event.price}</div>
                  <div className="text-sm text-muted-foreground">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Available Spots</span>
                    <span className="font-medium">{event.capacity - event.attendees} left</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Currently Attending</span>
                    <span className="font-medium">{event.attendees} people</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={handleRSVP} className="w-full" size="lg">
                    RSVP Now - ${event.price}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handleShare}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Card */}
            <Card>
              <CardHeader>
                <CardTitle>Event Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarImage src={event.organizer.avatar} />
                    <AvatarFallback>{event.organizer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{event.organizer.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.organizer.events} events organized
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Event Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Event Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Capacity</span>
                  </div>
                  <span className="font-medium">{event.capacity}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Duration</span>
                  </div>
                  <span className="font-medium">9 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Price Range</span>
                  </div>
                  <span className="font-medium">${event.price}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;