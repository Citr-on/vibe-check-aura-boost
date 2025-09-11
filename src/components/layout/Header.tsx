import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon, SparklesIcon, GemIcon, Settings02Icon, Menu01Icon, DashboardSquare01Icon, AiImageIcon, TaskEdit01Icon, InformationCircleIcon, MessageQuestionIcon } from '@hugeicons/core-free-icons';
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
interface HeaderProps {
  credits: number;
  aura: number;
}
export const Header = ({
  credits,
  aura
}: HeaderProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;
  return <header className="border-b bg-card shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
              <HugeiconsIcon icon={SparklesIcon} size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">Aura</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/dashboard" className={`font-body transition-colors hover:text-primary flex items-center gap-2 ${isActive('/dashboard') ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              <HugeiconsIcon icon={DashboardSquare01Icon} size={16} />
              Mes Analyses
            </Link>
            <Link to="/studio-ia" className={`font-body transition-colors hover:text-primary flex items-center gap-2 ${isActive('/studio-ia') ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              <HugeiconsIcon icon={AiImageIcon} size={16} />
              Studio IA
            </Link>
            <Link to="/review" className={`font-body transition-colors hover:text-primary flex items-center gap-2 ${isActive('/review') ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              <HugeiconsIcon icon={TaskEdit01Icon} size={16} />
              Évaluer des profils
            </Link>
          </nav>

          {/* Balance & Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm font-medium">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <HugeiconsIcon icon={SparklesIcon} size={20} className="text-primary" />
                <span>{aura} Aura</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center space-x-1 text-foreground">
                <HugeiconsIcon icon={GemIcon} size={20} className="text-accent" />
                <span>{credits} Crédits</span>
              </div>
              
              <Link to="/credits">
                <div className="relative w-8 h-8 ml-1 cursor-pointer border border-input bg-background hover:bg-accent-muted hover:text-foreground rounded-xl inline-flex items-center justify-center transition-colors">
                  <HugeiconsIcon icon={GemIcon} size={20} className="text-accent absolute inset-0 m-auto" />
                  <HugeiconsIcon icon={PlusSignIcon} size={12} className="text-foreground absolute -top-1 -right-1 bg-background rounded-full border border-border" />
                </div>
              </Link>
              
              <Link to="/faq">
                <Button size="sm" variant="outline" className="w-8 h-8 p-0 ml-1">
                  <HugeiconsIcon icon={MessageQuestionIcon} size={16} />
                </Button>
              </Link>
            </div>

            <Link to="/parametres" className="hidden lg:block">
              <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                <AvatarFallback>
                  <HugeiconsIcon icon={Settings02Icon} size={16} />
                </AvatarFallback>
              </Avatar>
            </Link>

            {/* Mobile/Tablet Menu Burger */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <HugeiconsIcon icon={Menu01Icon} size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <Link to="/dashboard" className={`flex items-center space-x-3 font-body transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary font-medium' : 'text-muted-foreground'}`} onClick={() => setIsMenuOpen(false)}>
                    <HugeiconsIcon icon={DashboardSquare01Icon} size={20} />
                    <span>Mes Analyses</span>
                  </Link>
                  <Link to="/studio-ia" className={`flex items-center space-x-3 font-body transition-colors hover:text-primary ${isActive('/studio-ia') ? 'text-primary font-medium' : 'text-muted-foreground'}`} onClick={() => setIsMenuOpen(false)}>
                    <HugeiconsIcon icon={AiImageIcon} size={20} />
                    <span>Studio IA</span>
                  </Link>
                  <Link to="/review" className={`flex items-center space-x-3 font-body transition-colors hover:text-primary ${isActive('/review') ? 'text-primary font-medium' : 'text-muted-foreground'}`} onClick={() => setIsMenuOpen(false)}>
                    <HugeiconsIcon icon={TaskEdit01Icon} size={20} />
                  <span>Évaluer des profils</span>
                  </Link>
                  <Link to="/parametres" className={`flex items-center space-x-3 font-body transition-colors hover:text-primary ${isActive('/parametres') ? 'text-primary font-medium' : 'text-muted-foreground'}`} onClick={() => setIsMenuOpen(false)}>
                    <HugeiconsIcon icon={Settings02Icon} size={20} />
                    <span>Paramètres</span>
                  </Link>
                  
                  <div className="lg:hidden">
                    <hr className="border-border mb-6" />
                    <div className="flex items-center space-x-3 text-sm font-medium mb-6">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <HugeiconsIcon icon={SparklesIcon} size={20} className="text-primary" />
                        <span>{aura} Aura</span>
                      </div>
                      <div className="w-px h-4 bg-border"></div>
                      <div className="flex items-center space-x-1 text-foreground">
                        <HugeiconsIcon icon={GemIcon} size={20} className="text-accent" />
                        <span>{credits} Crédits</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center space-x-3 font-body transition-colors hover:text-accent text-muted-foreground mb-4 w-full text-left">
                          <div className="flex items-center gap-1">
                            <HugeiconsIcon icon={GemIcon} size={20} />
                            <HugeiconsIcon icon={PlusSignIcon} size={16} />
                          </div>
                          <span>Acheter des crédits</span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem asChild>
                          <Link to="/credits?pack=5" className="flex items-center justify-between w-full" onClick={() => setIsMenuOpen(false)}>
                            <span>5 Crédits</span>
                            <span className="text-muted-foreground">2,99€</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/credits?pack=20" className="flex items-center justify-between w-full" onClick={() => setIsMenuOpen(false)}>
                            <span>20 Crédits</span>
                            <span className="text-muted-foreground">9,99€</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/credits?pack=50" className="flex items-center justify-between w-full" onClick={() => setIsMenuOpen(false)}>
                            <span>50 Crédits</span>
                            <span className="text-muted-foreground">19,99€</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/credits?pack=100" className="flex items-center justify-between w-full" onClick={() => setIsMenuOpen(false)}>
                            <span>100 Crédits</span>
                            <span className="text-muted-foreground">34,99€</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <hr className="border-border" />
                  <Link to="/faq" className="flex items-center space-x-3 font-body transition-colors hover:text-primary text-muted-foreground" onClick={() => setIsMenuOpen(false)}>
                    <HugeiconsIcon icon={InformationCircleIcon} size={20} />
                    <span>Feedback & FAQ</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>;
};