import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Calendar, BookOpen, Users, Shield, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mental-health.jpg";
export default function Home() {
  const features = [{
    icon: MessageCircle,
    title: "AI Support Chat",
    description: "24/7 confidential chatbot providing immediate coping strategies and support",
    color: "bg-primary",
    href: "/chat"
  }, {
    icon: Calendar,
    title: "Book Counselor",
    description: "Schedule private appointments with qualified mental health professionals",
    color: "bg-wellness",
    href: "/bookings"
  }, {
    icon: BookOpen,
    title: "Resource Hub",
    description: "Access articles, videos, and relaxation tools in multiple languages",
    color: "bg-calm",
    href: "/resources"
  }, {
    icon: Users,
    title: "Peer Support",
    description: "Connect anonymously with other students in a safe, moderated environment",
    color: "bg-support",
    href: "/forum"
  }];
  const stats = [{
    label: "Students Helped",
    value: "2,500+",
    icon: Heart
  }, {
    label: "Counseling Sessions",
    value: "850+",
    icon: Calendar
  }, {
    label: "Available 24/7",
    value: "Always",
    icon: Clock
  }, {
    label: "Success Rate",
    value: "94%",
    icon: Star
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/95" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Mental Health
              <span className="block text-primary">Matters</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              A comprehensive digital support system designed specifically for students. 
              Get immediate help, book counseling sessions, and connect with peers in a 
              stigma-free environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/chat">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                  <MessageCircle className="mr-3 h-5 w-5" />
                  Start Support Chat
                </Button>
              </Link>
              <Link to="/resources">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                  <BookOpen className="mr-3 h-5 w-5" />
                  Explore Resources
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(stat => <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Complete Support System
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for mental wellness, from immediate support to long-term care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(feature => <Link key={feature.title} to={feature.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>)}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Your Privacy is Protected
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              All conversations are confidential, data is encrypted, and you have complete 
              control over your information. Our platform follows strict privacy guidelines 
              to ensure you feel safe seeking help.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-wellness rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">All data is encrypted and secure</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-calm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Anonymous Options</h3>
                <p className="text-sm text-muted-foreground">Use our services without revealing identity</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-support rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Professional Standards</h3>
                <p className="text-sm text-muted-foreground">Licensed professionals and ethical guidelines</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
}