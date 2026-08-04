"use client"

import { cn } from "@/lib/utils"
import React from "react"

type TColorProp = string | string[]

interface ShineBorderProps {
  borderRadius?: number
  borderWidth?: number
  duration?: number
  color?: TColorProp
  className?: string
  children: React.ReactNode
}

/**
 * @name Shine Border
 * @description It is an animated background border effect component with easy to use and configurable props.
 */
export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={{
        "--border-radius": `${borderRadius}px`,
      } as React.CSSProperties}
      className={cn(
        "relative rounded-[--border-radius] bg-white",
        className,
      )}
    >
      <div
        style={{
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
          animation: `shine ${duration}s infinite linear`,
          backgroundImage: `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
          backgroundSize: "300% 300%",
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
        className="pointer-events-none absolute inset-0 size-full will-change-[background-position]"
      />
      {children}
    </div>
  )
}
