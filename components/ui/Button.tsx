import React from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, Loader2 } from "lucide-react";
import { AMX_BRAND } from "@/lib/constants";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    const sizeStyles = {
      sm: "min-h-[44px] px-4 text-sm py-2",
      md: "min-h-[44px] px-6 text-base py-2.5",
      lg: "min-h-[48px] px-8 text-lg py-3",
    };

    const variantStyles = {
      primary: "bg-primary text-warmWhite hover:bg-primary-700 active:bg-primary-800 border border-transparent shadow-sm",
      secondary: "bg-secondary text-warmWhite hover:bg-secondary-600 active:bg-secondary-700 border border-transparent shadow-sm",
      outline: "bg-white text-charcoal border border-sand-300 hover:bg-sand-50 active:bg-sand-100",
      ghost: "bg-transparent text-charcoal hover:bg-sand-100 active:bg-sand-200",
      whatsapp: "bg-[#25D366] text-white hover:bg-[#20ba59] active:bg-[#1caa52] shadow-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "tap-target inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export const PrimaryButton: React.FC<ButtonProps> = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton: React.FC<ButtonProps> = (props) => <Button variant="secondary" {...props} />;

export interface WhatsAppButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  message?: string;
  phoneNumber?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = "Hello AMX, I would like to inquire about Arba Minch experiences.",
  phoneNumber = AMX_BRAND.whatsappNumber,
  size = "md",
  className,
  children = "WhatsApp Us",
}) => {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  const sizeStyles = {
    sm: "min-h-[44px] px-4 text-sm py-2",
    md: "min-h-[44px] px-6 text-base py-2.5",
    lg: "min-h-[48px] px-8 text-lg py-3",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "tap-target inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        sizeStyles[size],
        className
      )}
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      <span>{children}</span>
    </a>
  );
};