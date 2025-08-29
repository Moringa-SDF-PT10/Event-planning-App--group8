import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EventCard from "@/components/EventCard";
import { Search, Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Events = () => {
  // Mock data for demonstration
  const events = [
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
    },
    {
      id: 4,
      title: "Corporate Leadership Summit",
      description: "Learn from successful leaders and expand your professional network in this exclusive event.",
      location: "Downtown Convention Center",
      date: "May 5, 2024",
      time: "8:00 AM",
      capacity: 300,
      attendees: 198,
      price: 199,
      category: "Corporate",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Art & Design Workshop",
      description: "Hands-on creative workshop for artists and designers of all skill levels.",
      location: "Creative Arts Studio",
      date: "June 12, 2024",
      time: "1:00 PM",
      capacity: 50,
      attendees: 35,
      price: 75,
      category: "Arts",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Food & Wine Tasting",
      description: "Explore exquisite flavors with renowned chefs and sommelier-guided tastings.",
      location: "Rooftop Garden Restaurant",
      date: "August 18, 2024",
      time: "6:00 PM",
      capacity: 80,
      attendees: 62,
      price: 120,
      category: "Food & Drink",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-primary-glow/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">Discover Events</h1>
              <p className="text-lg text-muted-foreground">
                Find and join amazing events happening near you
              </p>
            </div>
            <Button size="lg" className="mt-6 md:mt-0" asChild>
              <Link to="/events/create">
                <Plus className="w-5 h-5 mr-2" />
                Create Event
              </Link>
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
                placeholder="Search events by name or description..." 
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
                <SelectItem value="food-drink">Food & Drink</SelectItem>
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
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="0-50">$0 - $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-200">$100 - $200</SelectItem>
                <SelectItem value="200+">$200+</SelectItem>
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
            All Events <span className="text-muted-foreground">({events.length} results)</span>
          </h2>
          <Select defaultValue="newest">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Events
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Events;