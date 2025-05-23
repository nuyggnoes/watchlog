"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function TrailerButton({ trailerUrl }: { trailerUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="lg" className="gap-2" onClick={() => setOpen(true)}>
        <Play className="h-4 w-4" />
        Watch Trailer
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent className="w-full max-w-3xl aspect-video">
          <iframe src={trailerUrl} title="Trailer" allowFullScreen className="w-full h-full rounded" />
        </DialogContent>
      </Dialog>
    </>
  );
}
