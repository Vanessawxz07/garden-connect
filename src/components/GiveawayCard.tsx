import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Users, Gift, Share2, CheckCircle2, Sparkles } from "lucide-react";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
  const drawTime = new Date(giveaway.draw_time);
  const now = new Date();
  const secondsRemaining = differenceInSeconds(drawTime, now);
  const isAboutToStart = secondsRemaining > 0 && secondsRemaining < 3600; // Less than 1 hour

  // Get first item for display
  const firstItem = giveaway.giveaway_items?.[0]?.items;

  // Mock participant count (will be replaced with real data)
  const participantCount = 36;
  const maxParticipants = 50;

  return (
    <Card className="group relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 transition-all hover:border-primary/40 hover:shadow-xl">
      {/* Decorative corner accents */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
      
      <div className="relative flex flex-col gap-4 p-5">
        {/* Header: Status Badge & VIP Info */}
        <div className="flex items-start justify-between gap-3">
          {/* Status Badge */}
          <Badge
            variant={isCompleted ? "secondary" : "default"}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold"
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                已完成
              </>
            ) : isAboutToStart ? (
              <>
                <Sparkles className="h-3 w-3" />
                即将开始
              </>
            ) : (
              <>
                <Clock className="h-3 w-3 animate-pulse" />
                进行中
              </>
            )}
          </Badge>

          {/* VIP Creator Info */}
          <Link
            to={`/profile/${giveaway.vip_user_id}`}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="text-xs text-muted-foreground">by</span>
            <Avatar className="h-6 w-6 border border-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                VIP
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">VIP Creator</span>
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="flex gap-4">
          {/* Prize Item Image */}
          <div className="relative flex-shrink-0">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20 shadow-lg transition-transform group-hover:scale-105">
              {firstItem?.image_url ? (
                <img
                  src={firstItem.image_url}
                  alt={firstItem.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Gift className="h-10 w-10 text-primary" />
                </div>
              )}
              {/* Rarity badge overlay */}
              {firstItem?.name && (
                <div className="absolute left-1 top-1 rounded bg-gradient-to-r from-purple-500 to-pink-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-md">
                  Mythical
                </div>
              )}
            </div>
          </div>

          {/* Giveaway Details */}
          <div className="flex-1 space-y-3">
            {/* Prize Name & Value */}
            <div>
              <h3 className="text-lg font-bold text-foreground line-clamp-1">
                {firstItem?.name || "Mystery Prize"}
              </h3>
              {firstItem?.value && (
                <div className="mt-1 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                  <span className="text-sm font-semibold text-primary">
                    ${firstItem.value}
                  </span>
                </div>
              )}
            </div>

            {/* Giveaway Title */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {giveaway.title}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {/* Participant Count */}
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground">
                  {participantCount}/{maxParticipants}
                </span>
                <span className="text-muted-foreground">参与中</span>
              </div>

              {/* Timer/Status */}
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {isCompleted
                    ? "已结束"
                    : `${formatDistanceToNow(drawTime, { addSuffix: true })} 开奖`}
                </span>
              </div>
            </div>

            {/* Requirements hint */}
            {!isCompleted && (
              <p className="text-xs text-muted-foreground">
                要求：关注 + 50 用户
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 font-semibold"
            disabled={isCompleted || isParticipating || participateMutation.isPending}
            onClick={handleParticipate}
          >
            {isCompleted
              ? "已结束"
              : isParticipating
              ? "已参与 ✓"
              : participateMutation.isPending
              ? "加入中..."
              : "立即参与 🔥"}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="flex-shrink-0"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span className="ml-1.5 hidden sm:inline">分享</span>
          </Button>
        </div>

        {/* Winner announcement for completed */}
        {isCompleted && (
          <div className="rounded-lg bg-primary/10 px-3 py-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                获奖者已公布！
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
