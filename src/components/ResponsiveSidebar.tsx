import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarRenderProps = {
  closeSidebar: () => void;
};

interface ResponsiveSidebarProps {
  children: React.ReactNode | ((props: SidebarRenderProps) => React.ReactNode);
  className?: string;
}

const ResponsiveSidebar = ({ children, className }: ResponsiveSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = useCallback(() => setIsOpen(false), []);

  const sidebarContent =
    typeof children === "function" ? children({ closeSidebar }) : children;

  return (
    <>
      {/* Mobile & Tablet Menu Button - visible below lg (1024px), touch-friendly */}
      <div className="lg:hidden fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-10 sm:h-11 sm:w-11 bg-white shadow-lg border-gray-200 rounded-lg touch-manipulation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5 sm:h-5 sm:w-5" /> : <Menu className="h-5 w-5 sm:h-5 sm:w-5" />}
        </Button>
      </div>

      {/* Overlay - below lg */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Fixed Full Height, always visible from lg up */}
      <div
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-white/90 backdrop-blur-sm shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          className
        )}
      >
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default ResponsiveSidebar;
