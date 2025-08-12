import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Sparkles, Gem } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  credits: number;
  aura: number;
}

export const Header = ({ credits, aura }: HeaderProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-card shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">Aura</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`font-body transition-colors hover:text-primary ${
                isActive('/dashboard') ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              Mes Analyses
            </Link>
            <Link 
              to="/review" 
              className={`font-body transition-colors hover:text-primary ${
                isActive('/review') ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              Donner un avis
            </Link>
          </nav>

          {/* Balance & Profile */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-sm font-medium">
              <div className="flex items-center space-x-1 text-foreground">
                <Gem className="w-4 h-4 text-primary" />
                <span>{credits} Crédits</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>{aura} Aura</span>
              </div>
            </div>
            
            <Link to="/credits">
              <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </Link>

            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};