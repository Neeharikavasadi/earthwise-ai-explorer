
import React from 'react';
import { ArrowRight, BarChart2, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate-fade-in">
              Climate Insights
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Comprehensive climate statistics, AI-driven insights, and actionable environmental recommendations.
            </p>
          </div>
          <div className="space-x-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              className="climate-button-primary"
              onClick={() => navigate('/statistics')}
            >
              Explore Climate Data
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
