import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Users, Gift, Share2, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface GiveawayCardProps {
  giveaway: any;
}

export const GiveawayCard = ({ giveaway }: GiveawayCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isParticipating, setIsParticipating] = useState(false);

  const participateMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Check if already participating
      const { data: existing } = await supabase
        .from("giveaway_participants")
        .select("id")
        .eq("giveaway_id", giveaway.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        throw new Error("Already participating");
      }

      // Check if following VIP
      const { data: following } = await supabase
        .from("user_follows")
        .select("id")
        .eq("follower_id", user.id)
        .eq("following_id", giveaway.vip_user_id)
        .maybeSingle();

      // If not following, follow first
      if (!following) {
        const { error: followError } = await supabase
          .from("user_follows")
          .insert({
            follower_id: user.id,
            following_id: giveaway.vip_user_id,
          });

        if (followError) throw followError;
      }

      // Participate in giveaway
      const { error } = await supabase
        .from("giveaway_participants")
        .insert({
          giveaway_id: giveaway.id,
          user_id: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      setIsParticipating(true);
      toast({
        title: "Success!",
        description: "You've joined the giveaway. Good luck!",
      });
      queryClient.invalidateQueries({ queryKey: ["giveaways"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join giveaway",
        variant: "destructive",
      });
    },
  });

  const handleParticipate = () => {
    participateMutation.mutate();
  };

  const handleShare = () => {
    const url = `${window.location.origin}/giveaways/${giveaway.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Share this giveaway with your friends",
    });
  };

  const isCompleted = giveaway.status === "completed";
  const isUpcoming = new Date(giveaway.draw_time) > new Date();

  // Get first item for display
  const firstItem = giveaway.giveaway_items?.[0]?.items;

  return (
    <Card className="overflow-hidden border border-border bg-card transition-all hover:shadow-md">
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
        {/* Prize Image */}
        <div className="flex-shrink-0">
          <div className="relative h-20 w-20 overflow-hidden rounded-lg border-2 border-primary/20 bg-muted">
            {firstItem?.image_url ? (
              <img
                src={firstItem.image_url}
                alt={firstItem.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Gift className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-2">
          {/* Title and Status */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-card-foreground line-clamp-1">
                {giveaway.title}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Gift className="h-4 w-4" />
                <span className="line-clamp-1">
                  {firstItem?.name || "Prize"}
                  {firstItem?.value && ` • $${firstItem.value}`}
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <Badge
              variant={isCompleted ? "secondary" : "default"}
              className="flex-shrink-0"
            >
              {isCompleted ? "Completed" : isUpcoming ? "Upcoming" : "Ongoing"}
            </Badge>
          </div>

          {/* VIP User Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                VIP
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              by VIP Creator
            </span>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Join to enter</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {isCompleted
                  ? "Ended"
                  : `Draws ${formatDistanceToNow(new Date(giveaway.draw_time), {
                      addSuffix: true,
                    })}`}
              </span>
            </div>
          </div>

          {/* Winner Info for completed giveaways */}
          {isCompleted && (
            <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Winner announced!
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-shrink-0 gap-2 md:flex-col">
          <Button
            size="sm"
            className="flex-1 md:flex-none"
            disabled={isCompleted || isParticipating || participateMutation.isPending}
            onClick={handleParticipate}
          >
            {isCompleted
              ? "Ended"
              : isParticipating
              ? "Joined"
              : participateMutation.isPending
              ? "Joining..."
              : "Join Now"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-shrink-0"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
