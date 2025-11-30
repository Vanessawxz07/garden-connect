import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Gift, Calculator, BookOpen, FileText, PawPrint, ChevronDown, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const dropdownItems = [
    { 
      label: "Trade", 
      items: ["Buy", "Sell", "Exchange"] 
    },
    { 
      label: "Calculator", 
      icon: Calculator,
      items: ["Value Calculator", "Trade Calculator"] 
    },
    { 
      label: "Wiki", 
      icon: BookOpen,
      items: ["Pets Guide", "Items Guide", "Trading Tips"] 
    },
    { 
      label: "Articles", 
      icon: FileText,
      items: ["News", "Updates", "Guides"] 
    },
  ];

  return (
    <nav className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors">
            GAG
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {dropdownItems.map((item) => (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem}>
                      {subItem}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Value
            </Button>
            
            <Link to="/giveaways">
              <Button variant="ghost" className={cn(
                "text-muted-foreground hover:text-foreground",
                location.pathname === "/giveaways" && "bg-accent text-accent-foreground"
              )}>
                <Gift className="mr-2 h-4 w-4" />
                Giveaways
              </Button>
            </Link>
            
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <PawPrint className="mr-2 h-4 w-4" />
              Pet Management
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button className="relative bg-blue-600 hover:bg-blue-700 text-white">
            <MessageSquare className="mr-2 h-4 w-4" />
            MESSAGE
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center">
              15
            </span>
          </Button>
          
          {isAuthenticated ? (
            <Button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 p-0"
            >
              <User className="h-5 w-5 text-white" />
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
            >
              登录
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
