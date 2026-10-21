"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={cn(
          "bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-sand-300 relative focus:outline-none",
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b border-sand-200 bg-sand-50">
          {title && <h3 className="text-lg font-bold text-primary">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="tap-target p-2 text-charcoal-muted hover:text-charcoal rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export const Drawer: React.FC<ModalProps & { position?: "left" | "right" }> = ({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  className,
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-charcoal/60 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />
      <div
        className={cn(
          "relative z-10 w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-sand-200 transition-transform duration-300",
          position === "right" ? "ml-auto border-l" : "mr-auto border-r",
          className
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sand-200 bg-sand-50">
          <h3 className="text-lg font-bold text-primary">{title || "Menu"}</h3>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="tap-target p-2 text-charcoal-muted hover:text-charcoal rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};