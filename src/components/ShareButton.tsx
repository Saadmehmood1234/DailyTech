"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error("Share cancelled", err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <Button size="sm" variant="outline" className="cursor-pointer gap-2" onClick={handleShare}>
      <Share2 className="h-4 w-4" />
      Share
    </Button>
  );
}
