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

      const { data: existing } = await supabase
        .from("giveaway_participants")
        .select("id")
        .eq("giveaway_id", giveaway.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        throw new Error("Already participating");
      }

      const { data: following } = await supabase
        .from("user_follows")
        .select("id")
        .eq("follower_id", user.id)
        .eq("following_id", giveaway.vip_user_id)
        .maybeSingle();

      if (!following) {
        const { error: followError } = await supabase
          .from("user_follows")
          .insert({
            follower_id: user.id,
            following_id: giveaway.vip_user_id,
          });

        if (followError) throw followError;
      }

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
      title: "链接已复制！",
      description: "分享这个抽奖给你的朋友",
    });
  };

  const isCompleted = giveaway.status === "completed";
  const drawTime = new Date(giveaway.draw_time);
  const now = new Date();
  const secondsRemaining = differenceInSeconds(drawTime, now);

  const firstItem = giveaway.giveaway_items?.[0]?.items;
  const participantCount = 36;

  return (
    <Card className="relative overflow-hidden border-2 border-border bg-card transition-all hover:shadow-lg">
      <div className="flex items-start gap-4 p-5">
        {/* Left Section: Creator Info & Details */}
        <div className="flex-1 space-y-4">
          {/* Top: Status & Countdown */}
          <div className="flex items-center gap-3">
            <Badge
              variant={isCompleted ? "secondary" : "default"}
              className="flex items-center gap-1.5 rounded-full px-3 py-1"
            >
              <div className="h-2 w-2 rounded-full bg-current" />
              <span className="text-xs font-semibold">
                {isCompleted ? "已完成" : "进行中"}
              </span>
            </Badge>
            
            {!isCompleted && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {formatDistanceToNow(drawTime, { addSuffix: true })} 开奖
                </span>
              </div>
            )}
          </div>

          {/* Creator Info */}
          <Link
            to={`/profile/${giveaway.vip_user_id}`}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                L
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-foreground">Luke</div>
              <div className="text-xs text-muted-foreground">
                Published {formatDistanceToNow(new Date(giveaway.created_at || ""), { addSuffix: true })}
              </div>
            </div>
          </Link>

          {/* Giveaway Title & Prize Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              {giveaway.title}
            </h3>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Prize:</span>
                <span className="text-sm font-bold text-destructive">
                  {firstItem?.name || "Mystery Prize"}
                </span>
              </div>
              
              {firstItem?.value && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Prize Value:</span>
                  <span className="text-sm font-bold text-destructive">
                    {firstItem.value}
                  </span>
                </div>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="font-medium">开奖时间：</span>
              {drawTime.toLocaleString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>

            {giveaway.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {giveaway.description}
              </p>
            )}
          </div>
        </div>

        {/* Right Section: Prize Image & Actions */}
        <div className="flex flex-col items-end gap-4">
          {/* Prize Image */}
          {firstItem?.image_url && (
            <div className="h-20 w-20 overflow-hidden rounded-lg border-2 border-border shadow-sm">
              <img
                src={firstItem.image_url}
                alt={firstItem.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Join Button & Participant Count */}
          <div className="flex flex-col items-end gap-2">
            <Button
              size="lg"
              className="min-w-[140px] bg-green-600 font-bold text-white hover:bg-green-700"
              disabled={isCompleted || isParticipating || participateMutation.isPending}
              onClick={handleParticipate}
            >
              {isCompleted
                ? "已结束"
                : isParticipating
                ? "已参与"
                : participateMutation.isPending
                ? "加入中..."
                : "Join Now"}
            </Button>
            
            {!isCompleted && (
              <div className="text-xs text-destructive font-medium">
                {participantCount} users joining!
              </div>
            )}
          </div>

          {/* Share Button */}
          <Button
            size="sm"
            variant="ghost"
            className="gap-2 text-muted-foreground"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            分享
          </Button>
        </div>
      </div>

      {/* Winner announcement for completed */}
      {isCompleted && (
        <div className="border-t border-border bg-muted/50 px-5 py-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              获奖者已公布！
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};
