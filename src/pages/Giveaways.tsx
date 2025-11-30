import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GiveawayCard } from "@/components/GiveawayCard";
import { Navigation } from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Giveaways = () => {
  const [activeTab, setActiveTab] = useState("all");

  const { data: giveaways, isLoading } = useQuery({
    queryKey: ["giveaways", activeTab],
    queryFn: async () => {
      let query = supabase
        .from("giveaways")
        .select(`
          *,
          vip_user:vip_user_id (id),
          giveaway_items (
            quantity,
            item:items (*)
          ),
          giveaway_participants (count),
          giveaway_winners (
            user_id,
            claimed
          )
        `)
        .order("created_at", { ascending: false });

      if (activeTab === "upcoming") {
        query = query
          .gt("draw_time", new Date().toISOString())
          .in("status", ["created", "ongoing"]);
      } else if (activeTab === "completed") {
        query = query.eq("status", "completed");
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Giveaway Plaza</h1>
          <p className="mt-2 text-muted-foreground">
            Join exciting giveaways and win amazing prizes!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <GiveawayList giveaways={giveaways} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="upcoming" className="mt-8">
            <GiveawayList giveaways={giveaways} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="completed" className="mt-8">
            <GiveawayList giveaways={giveaways} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const GiveawayList = ({ giveaways, isLoading }: { giveaways: any; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-lg border border-border bg-muted"
          />
        ))}
      </div>
    );
  }

  if (!giveaways || giveaways.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">No giveaways found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {giveaways.map((giveaway: any) => (
        <GiveawayCard key={giveaway.id} giveaway={giveaway} />
      ))}
    </div>
  );
};

export default Giveaways;
