
import React, { useState } from 'react';
import { Menu, X, Sun, Moon, BarChart2, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { title: 'Climate Statistics', icon: <BarChart2 className="mr-2 h-5 w-5" />, route: '/statistics' },
    { title: 'AI Chatbot', icon: <MessageSquare className="mr-2 h-5 w-5" />, route: '/chatbot' },
    { title: 'Recommendations', icon: <CheckCircle className="mr-2 h-5 w-5" />, route: '/recommendations' },
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation(item.route)}
                >
                  {item.icon}
                  {item.title}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <a 
            href="/" 
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <span className="text-primary text-2xl">🌍</span>
            <span className="hidden md:inline-block">Climate Insights</span>
          </a>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          {menuItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className="flex items-center"
              onClick={() => handleNavigation(item.route)}
            >
              {item.icon}
              <span>{item.title}</span>
            </Button>
          ))}
        </div>

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
