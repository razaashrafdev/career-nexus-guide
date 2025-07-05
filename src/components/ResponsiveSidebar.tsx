
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResponsiveSidebarProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveSidebar = ({ children, className }: ResponsiveSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-lg"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Fixed Full Height */}
      <div
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-white/90 backdrop-blur-sm shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:relative md:z-auto",
          className
        )}
      >
        {/* Close button for mobile - visible when sidebar is open */}
        {isOpen && (
          <div className="md:hidden absolute top-4 right-4 z-60">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default ResponsiveSidebar;
