
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="climate-section bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="climate-heading">Why Climate Insights?</h2>
            <p className="climate-paragraph">
              Climate change is one of the most pressing challenges of our time, affecting communities around the world. 
              Understanding climate data is the first step toward making informed decisions and taking meaningful action.
            </p>
            <p className="climate-paragraph">
              Our platform combines comprehensive historical data, real-time insights, and AI-powered recommendations to 
              help individuals, communities, and policymakers make informed decisions about environmental issues.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col items-center p-4 bg-card rounded-lg">
                <span className="text-3xl font-bold text-primary">50+</span>
                <span className="text-sm text-muted-foreground text-center">Data sources integrated</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-card rounded-lg">
                <span className="text-3xl font-bold text-primary">All 50</span>
                <span className="text-sm text-muted-foreground text-center">U.S. states covered</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-card rounded-lg">
                <span className="text-3xl font-bold text-primary">10 yrs</span>
                <span className="text-sm text-muted-foreground text-center">Historical data</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-card rounded-lg">
                <span className="text-3xl font-bold text-primary">24/7</span>
                <span className="text-sm text-muted-foreground text-center">Real-time updates</span>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-climate-blue/20 flex items-center justify-center">
              <div className="text-7xl">🌍</div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
              <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
              <p className="text-sm">
                To provide accessible, accurate climate data and actionable insights that empower everyone to 
                contribute to a more sustainable future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
