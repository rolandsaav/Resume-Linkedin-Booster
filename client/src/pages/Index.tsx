import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();

  const companies = [
    "Google", "Meta", "OpenAI", "Jane Street", "Citadel", 
    "Microsoft", "Apple", "Goldman Sachs", "Two Sigma", "Stripe"
  ];

  const features = [
    {
      title: "AI-Powered Resume Enhancement",
      description: "Transform your old resume into a modern, ATS-optimized masterpiece that gets noticed by top recruiters.",
      icon: "📄"
    },
    {
      title: "LinkedIn Profile Optimization",
      description: "Craft compelling LinkedIn profiles that attract headhunters from FAANG and top-tier firms.",
      icon: "💼"
    },
    {
      title: "Portfolio Website Creation",
      description: "Build stunning portfolio websites that showcase your projects and achievements professionally.",
      icon: "🌐"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Career Alchemy
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            Trusted by 50,000+ professionals
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Turn Your Experience Into
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Your Dream Job
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your resume, LinkedIn, and portfolio into powerful assets. 
            Our AI-powered platform helps you stand out and get hired at elite firms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" disabled={loading}>
              <Link to={user ? "/get-started" : "/login"}>Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-full transition-all duration-300">
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Trusted by professionals at the world's most competitive companies
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {companies.map((company, index) => (
              <div
                key={index}
                className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to stand out
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform transforms your career documents into powerful tools that open doors to elite opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-white/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Top Performers
            </h2>
            <p className="text-xl text-gray-600">
              See how professionals landed their dream roles at elite companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "Landed a Staff Engineer role at Google after using Career Alchemy. The optimization was incredible!",
                name: "Sarah Chen",
                role: "Staff Engineer at Google",
                company: "Google"
              },
              {
                quote: "Got interviews at Jane Street, Citadel, and Two Sigma. The quantitative resume template was perfect.",
                name: "Michael Rodriguez",
                role: "Quantitative Researcher",
                company: "Jane Street"
              },
              {
                quote: "My LinkedIn profile views increased 300% and I received offers from Meta and OpenAI.",
                name: "Emily Johnson",
                role: "ML Engineer at OpenAI",
                company: "OpenAI"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to transform your career?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who've landed their dream jobs at top tech companies and elite firms.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Start Your Transformation
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 7-day free trial • 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Career Alchemy
              </div>
              <p className="text-gray-400">
                Empowering careers through AI-powered resume and profile optimization.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn Optimizer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portfolio Creator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Career Alchemy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
