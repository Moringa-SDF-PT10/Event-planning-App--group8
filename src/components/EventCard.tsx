import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  capacity: number;
  attendees: number;
  price: number;
  category: string;
  image: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {event.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              ${event.price}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>{event.attendees}/{event.capacity} attending</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <div className="flex w-full gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/events/${event.id}`}>View Details</Link>
          </Button>
          <Button className="flex-1">
            RSVP Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;