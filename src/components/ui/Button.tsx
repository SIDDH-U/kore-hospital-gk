"use client";

import React, { forwardRef } from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary-dark" | "secondary-light" | "whatsapp" | "ghost";
export type ButtonSize = "default" | "sm" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "default",
      href,
      isExternal,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses =
      "inline-flex items-center justify-center font-semibold rounded-[12px] whitespace-nowrap gap-2 transition-all duration-150 active:scale-[0.98] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

    // Size variants
    const sizeClasses = {
      sm: "min-h-[44px] px-4 text-sm",
      default: "min-h-[48px] px-5 text-[15px]",
      lg: "min-h-[52px] px-6 text-base",
    }[size];

    // Style variants
    const variantClasses = {
      primary:
        "bg-[#F5A524] hover:bg-[#E09419] text-[#0F2321] shadow-xs active:bg-[#CC8214]",
      "secondary-dark":
        "border-2 border-white text-white hover:bg-white/10 active:bg-white/15",
      "secondary-light":
        "border-2 border-[#0B7A68] text-[#0B7A68] bg-transparent hover:bg-[#EAF6F2] active:bg-[#D6ECE5]",
      whatsapp:
        "bg-[#1B8755] hover:bg-[#167046] text-white shadow-xs active:bg-[#115A37]",
      ghost:
        "bg-transparent text-[#0B7A68] hover:bg-[#EAF6F2] active:bg-[#D6ECE5]",
    }[variant];

    const widthClasses = fullWidth ? "w-full" : "";
    const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClasses} ${className}`;

    const content = (
      <>
        {icon && iconPosition === "left" && (
          <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-[2]">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-[2]">{icon}</span>
        )}
      </>
    );

    if (href) {
      if (isExternal || href.startsWith("tel:") || href.startsWith("https://wa.me") || href.startsWith("http")) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target={isExternal || href.startsWith("https://wa.me") ? "_blank" : undefined}
            rel={isExternal || href.startsWith("https://wa.me") ? "noopener noreferrer" : undefined}
            className={combinedClasses}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type || "button"}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
