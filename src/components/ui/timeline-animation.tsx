"use client"
import { motion, useInView } from "framer-motion"
import { ElementType, ReactNode, useRef } from "react"
import { cn } from "@/lib/utils"

export function TimelineContent({
  children,
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  as = "div",
}: {
  children: ReactNode
  animationNum?: number
  timelineRef?: React.RefObject<any>
  customVariants?: any
  className?: string
  as?: any
}) {
  const localRef = useRef(null)
  const ref = timelineRef || localRef
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = customVariants || {
    visible: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: i * 0.2, duration: 0.5 } }),
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  }

  // Use the appropriate motion component based on the 'as' prop
  const MotionComponent = as === 'p' ? motion.p : as === 'span' ? motion.span : motion.div

  return (
    <MotionComponent
      ref={localRef}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}
