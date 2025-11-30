import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Gift className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Welcome to Giveaway Plaza
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Join exciting giveaways and win amazing prizes!
          </p>
          <Link to="/giveaways">
            <Button size="lg">
              <Gift className="mr-2 h-5 w-5" />
              Explore Giveaways
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
