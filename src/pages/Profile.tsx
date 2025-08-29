import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventCard from "@/components/EventCard";
import { Calendar, MapPin, Mail, Phone, Edit, Settings, Star } from "lucide-react";

const Profile = () => {
  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    avatar: "/placeholder.svg",
    bio: "Event enthusiast and organizer with a passion for creating memorable experiences. Love bringing people together for amazing events!",
    stats: {
      eventsOrganized: 12,
      eventsAttended: 45,
      totalAttendees: 2847
    }
  };

  // Mock events data
  const organizedEvents = [
    {
      id: 1,
      title: "Tech Networking Mixer",
      description: "Monthly networking event for tech professionals in the Bay Area.",
      location: "Downtown SF",
      date: "March 15, 2024",
      time: "6:00 PM",
      capacity: 100,
      attendees: 78,
      price: 25,
      category: "Networking",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Startup Pitch Night",
      description: "Local entrepreneurs pitch their innovative startup ideas to investors.",
      location: "Innovation Hub",
      date: "April 8, 2024",
      time: "7:00 PM",
      capacity: 150,
      attendees: 92,
      price: 15,
      category: "Business",
      image: "/placeholder.svg"
    }
  ];

  const attendingEvents = [
    {
      id: 3,
      title: "Annual Tech Conference 2024",
      description: "Join industry leaders for cutting-edge technology discussions.",
      location: "Convention Center",
      date: "May 20, 2024",
      time: "9:00 AM",
      capacity: 500,
      attendees: 342,
      price: 299,
      category: "Technology",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Summer Music Festival",
      description: "Amazing live music from local and international artists.",
      location: "Golden Gate Park",
      date: "July 15, 2024",
      time: "2:00 PM",
      capacity: 2000,
      attendees: 1567,
      price: 89,
      category: "Music",
      image: "/placeholder.svg"
    }
  ];

  const reviews = [
    {
      id: 1,
      eventName: "Tech Innovation Summit",
      rating: 5,
      comment: "Fantastic event! Great speakers and excellent networking opportunities.",
      date: "February 2024"
    },
    {
      id: 2,
      eventName: "Creative Workshop Series",
      rating: 4,
      comment: "Really enjoyed the hands-on activities. Would love to see more like this!",
      date: "January 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
                    <div className="space-y-1 text-muted-foreground">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Member since {user.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
                
                <p className="mt-4 text-foreground">{user.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{user.stats.eventsOrganized}</div>
              <div className="text-muted-foreground">Events Organized</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{user.stats.eventsAttended}</div>
              <div className="text-muted-foreground">Events Attended</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{user.stats.totalAttendees.toLocaleString()}</div>
              <div className="text-muted-foreground">Total Attendees</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="organized" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="organized">My Events</TabsTrigger>
            <TabsTrigger value="attending">Attending</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="organized" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Events I've Organized</h2>
              <Button>Create New Event</Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attending" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Events I'm Attending</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attendingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <h2 className="text-2xl font-semibold">My Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{review.eventName}</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-warning fill-warning' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <h2 className="text-2xl font-semibold">Favorite Events</h2>
            <div className="text-center py-12">
              <p className="text-muted-foreground">No favorite events yet. Start exploring events to add them to your favorites!</p>
              <Button className="mt-4">Browse Events</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;