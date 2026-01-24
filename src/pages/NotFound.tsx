import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header variant="back" />
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-2xl">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                {/* 404 Number with Gradient */}
                <div className="mb-6">
                  <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-none">
                    404
                  </h1>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Page Not Found
                </h2>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-600 mb-2 max-w-md mx-auto">
                  Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={() => navigate("/")}
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 px-6 py-2.5 text-base font-medium"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go to Homepage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFound;
