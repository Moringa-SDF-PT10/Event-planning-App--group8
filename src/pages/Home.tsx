import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EventCard from "@/components/EventCard";
import { Search, Calendar, Users, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  // Mock data for demonstration
  const featuredEvents = [
    {
      id: 1,
      title: "Annual Tech Conference 2024",
      description: "Join industry leaders for cutting-edge technology discussions and networking opportunities.",
      location: "San Francisco, CA",
      date: "March 15, 2024",
      time: "9:00 AM",
      capacity: 500,
      attendees: 342,
      price: 299,
      category: "Technology",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Summer Music Festival",
      description: "Experience amazing live music from local and international artists in a beautiful outdoor setting.",
      location: "Central Park, NY",
      date: "July 20, 2024",
      time: "2:00 PM",
      capacity: 2000,
      attendees: 1567,
      price: 89,
      category: "Music",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Wedding Showcase",
      description: "Discover the latest wedding trends and meet top wedding vendors in your area.",
      location: "Grand Ballroom, Chicago",
      date: "April 10, 2024",
      time: "11:00 AM",
      capacity: 200,
      attendees: 156,
      price: 25,
      category: "Wedding",
      image: "/placeholder.svg"
    }
  ];

  const stats = [
    { icon: Calendar, label: "Events Hosted", value: "1,000+" },
    { icon: Users, label: "Happy Attendees", value: "50,000+" },
    { icon: Building2, label: "Trusted Vendors", value: "500+" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent">
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Create Unforgettable
            <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent"> Events</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover amazing events, connect with top vendors, and make your occasions memorable
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/events">Explore Events</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/events/create">Create Event</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Find Your Perfect Event</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search events..." 
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="san-francisco">San Francisco</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                </SelectContent>
              </Select>
              <Button className="md:w-32">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <Button variant="outline" asChild>
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-glow">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Create Your Event?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who trust EventifyHive to make their occasions successful
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link to="/events/create">Start Creating</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;