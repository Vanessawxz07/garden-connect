import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Gift } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/giveaways", label: "Giveaways", icon: Gift },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-foreground">
            GiveawayApp
          </Link>
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
