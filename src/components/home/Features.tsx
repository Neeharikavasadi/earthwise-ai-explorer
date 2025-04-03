
import React from 'react';
import { BarChart2, MessageSquare, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Features: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <BarChart2 className="h-10 w-10 text-primary" />,
      title: "Climate Statistics",
      description: "Analyze 10-year trends across temperature, pollution, precipitation, and more for any state.",
      route: "/statistics"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "AI Chatbot",
      description: "Get instant answers to your climate questions and personalized sustainability recommendations.",
      route: "/chatbot"
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Recommendations",
      description: "Discover AI-generated solutions to address climate issues specific to your state.",
      route: "/recommendations"
    }
  ];

  return (
    <section className="climate-section">
      <div className="container">
        <h2 className="climate-heading text-center mb-10">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="space-y-1 flex flex-col items-center text-center">
                <div className="bg-muted rounded-full p-3 w-16 h-16 flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(feature.route)}
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
