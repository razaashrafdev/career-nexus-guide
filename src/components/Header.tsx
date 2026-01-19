import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  variant?: "default" | "back";
}

const Header = ({ variant = "default" }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  if (variant === "back") {
    return (
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center relative">
            {/* Logo - Left */}
            <Link to="/" className="flex items-center z-10">
              <img src="/header-icon.png" alt="CareerNexus Logo" className="h-10 w-auto md:h-12 md:w-auto" />
            </Link>
            
            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Buttons - Right */}
            <div className="hidden md:flex items-center ml-auto">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors ml-auto"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col space-y-3">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center relative">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center z-10">
            <img src="/header-icon.png" alt="CareerNexus Logo" className="h-10 w-auto md:h-12 md:w-auto" />
          </Link>
          
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Buttons - Right */}
          <div className="hidden md:flex items-center space-x-3 ml-auto">
            <Link to="/login" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm">
              Sign In
            </Link>
            <Link to="/signup" className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all text-sm">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-purple-600 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
