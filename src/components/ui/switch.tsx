// components/ui/switch.tsx
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
    "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 bg-secondary p-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 data-[state=checked]:bg-primary",
    {
      variants: {
        size: {
          small:  "h-4 w-8",   // 1rem × 2rem
          medium: "h-7 w-12",  // 1.5rem × 2.75rem
          large:  "h-10 w-18", // 2.5rem × 4.5rem
        },
      },
      defaultVariants: {
        size: "medium",
      },
    }
);

const thumbVariants = cva(
    "pointer-events-none block rounded-full bg-background shadow ring-0 transition-transform",
    {
      variants: {
        size: {
          small:  "h-3 w-3 data-[state=checked]:translate-x-4",  // slides 1rem
          medium: "h-6 w-6 data-[state=checked]:translate-x-5", // slides 1.25rem
          large:  "h-9 w-9 data-[state=checked]:translate-x-9", // slides 2.25rem
        },
      },
      defaultVariants: {
        size: "medium",
      },
    }
);

export interface SwitchProps
    extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
        VariantProps<typeof switchVariants> {}

export const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitive.Root>,
    SwitchProps
>(({ className, size, ...props }, ref) => (
    <SwitchPrimitive.Root
        className={cn(switchVariants({ size }), className)}
        {...props}
        ref={ref}
    >
      <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
    </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;
