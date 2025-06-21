import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const options = [
    {
      title: "Build a Better Resume",
      description: "Our AI will help you craft a resume that stands out.",
      link: "/resume-builder",
      icon: "📄",
    },
    {
      title: "Improve Your LinkedIn",
      description: "Optimize your LinkedIn profile to attract recruiters.",
      link: "/linkedin-optimizer",
      icon: "💼",
    },
    {
      title: "Create a Portfolio Site",
      description: "Showcase your work with a professional portfolio.",
      link: "/portfolio-creator",
      icon: "🌐",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          How would you like to start?
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose an option below to begin your career transformation.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {options.map((option, index) => (
            <Link to={option.link} key={index} className="block group">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm h-full">
                <CardContent className="p-8 text-center flex flex-col items-center justify-between h-full">
                  <div>
                    <div className="text-5xl mb-6">{option.icon}</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {option.description}
                    </p>
                  </div>
                  <div className="flex items-center font-semibold text-blue-600 group-hover:text-purple-600 transition-colors">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetStarted; 