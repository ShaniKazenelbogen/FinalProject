import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { 
  Heart, 
  Users, 
  Clock, 
  Award, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  // Custom Logo Component
  const Logo = ({ size = "large" }) => {
    const sizes = {
      large: { big: "w-12 h-12", small: "w-7 h-7" },
      medium: { big: "w-8 h-8", small: "w-5 h-5" }
    };
    
    return (
      <div className="relative flex items-center justify-center">
        <Heart className={`${sizes[size].big} text-pink-400 fill-current`} />
        <Heart className={`${sizes[size].small} text-purple-300 fill-current -ml-2 mb-1`} />
      </div>
    );
  };

  const services = [
    {
      icon: Heart,
      title: "Individual Therapy",
      description: "One-on-one sessions tailored to your personal journey of healing and growth."
    },
    {
      icon: Users,
      title: "Group Therapy",
      description: "Connect with others facing similar challenges in a supportive group environment."
    },
    {
      icon: Award,
      title: "Specialized Programs",
      description: "Targeted treatment programs for anxiety, depression, trauma, and relationship issues."
    }
  ];

  const features = [
    "Licensed and experienced therapists",
    "Flexible scheduling options",
    "Comfortable and private environment",
    "Evidence-based treatment approaches",
    "Insurance accepted",
    "Telehealth options available"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl mx-4"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Logo size="large" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            You're in the Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your journey to mental wellness begins here. We provide compassionate, 
            professional therapy services to help you heal, grow, and thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="large"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl shadow-lg"
              onClick={() => navigate("/signin")}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Get Started Today
            </Button>
            <Button 
              size="large"
              variant="outlined"
              className="border-2 border-purple-200 hover:bg-purple-50 px-8 py-3 rounded-xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive mental health support tailored to your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
              <p className="text-xl text-gray-600 mb-8">
                We're committed to providing the highest quality mental health care in a 
                warm, welcoming environment where healing can flourish.
              </p>
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">5.0 Rating</span>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "The team at You're in the Center changed my life. Their compassionate approach 
                  and professional expertise helped me overcome challenges I never thought possible."
                </p>
                <div className="font-semibold text-gray-900">- Sarah M., Client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-12">
            Ready to start your relaxing session? We're here for you.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-0 text-center">
                <Phone className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600">(05) 7122 077</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-0 text-center">
                <Mail className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">yourincenter@gmail.com</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-0 text-center">
                <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600">14 Wellin Ave<br />Jerusalem</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 p-8">
            <CardContent className="pt-0">
              <h3 className="text-2xl font-bold mb-4">Ready to Begin?</h3>
              <p className="text-purple-100 mb-6">
                Take the first step towards better mental health. Sign in to schedule your appointment today.
              </p>
              <Button 
                size="large"
                variant="contained"
                className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl font-semibold"
                onClick={() => navigate("/signin")}
              >
                Sign In Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}