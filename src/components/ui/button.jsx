// components/ui/button.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
