"use client";

import { Loader2 } from "lucide-react";

type LoadingOverlayProps = {
  className?: string;
};

export default function LoadingOverLay({ className = "" }: LoadingOverlayProps) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${className}`}>
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}
