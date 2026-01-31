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
      {/* Mobile & Tablet Menu Button - visible below lg (1024px) */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-lg"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
