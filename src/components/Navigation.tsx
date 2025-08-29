import { Button } from "@/components/ui/button";
import { Calendar, Users, Building2, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Calendar },
    { path: "/events", label: "Events", icon: Calendar },
    { path: "/vendors", label: "Vendors", icon: Building2 },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EventifyHive</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link to="/events/create">Create Event</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;