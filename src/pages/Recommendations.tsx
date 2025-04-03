
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Droplets, Wind, Factory, TreePine, AlertTriangle } from 'lucide-react';

// Mock data for demonstration purposes
const stateRecommendations = {
  Alabama: {
    issues: [
      { id: 1, title: 'Frequent Flooding', severity: 'high', icon: <Droplets className="h-5 w-5" /> },
      { id: 2, title: 'Air Quality Concerns', severity: 'medium', icon: <Wind className="h-5 w-5" /> },
      { id: 3, title: 'Deforestation', severity: 'medium', icon: <TreePine className="h-5 w-5" /> },
    ],
    personal: [
      { id: 1, title: 'Install Rain Barrels', description: 'Collect rainwater to reduce runoff and conserve water for gardens and lawns.' },
      { id: 2, title: 'Support Local Reforestation', description: 'Join or donate to local tree planting initiatives to restore natural habitats.' },
      { id: 3, title: 'Use Energy Efficient Appliances', description: 'Replace old appliances with Energy Star certified models to reduce carbon footprint.' },
      { id: 4, title: 'Create Rain Gardens', description: 'Design landscape features that absorb runoff and reduce flooding impact.' },
    ],
    community: [
      { id: 1, title: 'Flood Management Programs', description: 'Community-wide flood prevention systems including improved drainage and wetland restoration.' },
      { id: 2, title: 'Clean Air Initiatives', description: 'Implement stricter emissions testing and encourage public transportation use.' },
      { id: 3, title: 'Green Space Development', description: 'Convert unused urban areas into parks and community gardens to improve air quality.' },
    ],
    policy: [
      { id: 1, title: 'Flood Zone Regulations', description: 'Update building codes to account for increased flood risks and changing weather patterns.' },
      { id: 2, title: 'Industrial Emissions Standards', description: 'Implement stricter controls on industrial emissions to improve regional air quality.' },
      { id: 3, title: 'Forest Conservation Laws', description: 'Strengthen legal protections for forests and encourage sustainable forestry practices.' },
    ]
  },
  California: {
    issues: [
      { id: 1, title: 'Drought Conditions', severity: 'high', icon: <Droplets className="h-5 w-5" /> },
      { id: 2, title: 'Wildfire Risk', severity: 'high', icon: <AlertTriangle className="h-5 w-5" /> },
      { id: 3, title: 'Air Pollution', severity: 'medium', icon: <Factory className="h-5 w-5" /> },
    ],
    personal: [
      { id: 1, title: 'Install Water-Efficient Fixtures', description: 'Replace standard fixtures with low-flow alternatives to reduce water consumption.' },
      { id: 2, title: 'Create Defensible Space', description: 'Maintain vegetation around your home to reduce wildfire spread risk.' },
      { id: 3, title: 'Transition to Electric Vehicles', description: 'Consider electric or hybrid vehicles to reduce emissions and air pollution.' },
      { id: 4, title: 'Xeriscape Your Garden', description: 'Use drought-resistant plants and efficient irrigation to conserve water.' },
    ],
    community: [
      { id: 1, title: 'Community Water Recycling', description: 'Implement gray water systems and water recycling programs at community levels.' },
      { id: 2, title: 'Wildfire Preparedness Plans', description: 'Develop evacuation routes and community wildfire safety zones.' },
      { id: 3, title: 'Public Transportation Expansion', description: 'Invest in electric buses and light rail to reduce vehicle emissions.' },
    ],
    policy: [
      { id: 1, title: 'Water Conservation Legislation', description: 'Implement comprehensive water usage regulations and incentives for conservation.' },
      { id: 2, title: 'Forest Management Reforms', description: 'Update policies for controlled burns and forest thinning to reduce wildfire risk.' },
      { id: 3, title: 'Zero-Emission Vehicle Mandates', description: 'Accelerate transition to electric vehicles through incentives and regulations.' },
    ]
  }
};

const states = ['Alabama', 'California'];

const RecommendationsPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('California');

  const stateData = stateRecommendations[selectedState as keyof typeof stateRecommendations];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-climate-alert-red/20 text-climate-alert-red border-climate-alert-red hover:bg-climate-alert-red/30';
      case 'medium':
        return 'bg-climate-alert-orange/20 text-climate-alert-orange border-climate-alert-orange hover:bg-climate-alert-orange/30';
      case 'low':
        return 'bg-climate-alert-yellow/20 text-climate-alert-yellow border-climate-alert-yellow hover:bg-climate-alert-yellow/30';
      default:
        return 'bg-climate-blue/20 text-climate-blue border-climate-blue hover:bg-climate-blue/30';
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="climate-heading mb-8">Climate Recommendations</h1>
        
        <div className="max-w-md mx-auto mb-8">
          <label className="block mb-2 text-sm font-medium text-foreground">Select State</label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Climate Issues in {selectedState}</CardTitle>
            <CardDescription>
              Current environmental challenges that require attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stateData.issues.map((issue) => (
                <Card key={issue.id} className="overflow-hidden border-2 border-muted">
                  <CardHeader className="p-4 bg-muted/50">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {issue.icon}
                        {issue.title}
                      </CardTitle>
                      <Badge className={getSeverityColor(issue.severity)}>
                        {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations for {selectedState}</CardTitle>
            <CardDescription>
              AI-generated suggestions to address climate issues based on latest environmental data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Actions</TabsTrigger>
                <TabsTrigger value="community">Community Initiatives</TabsTrigger>
                <TabsTrigger value="policy">Policy Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stateData.personal.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-l-4 border-l-primary">
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-primary" />
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="community" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stateData.community.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-l-4 border-l-secondary">
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-secondary" />
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="policy" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stateData.policy.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-l-4 border-l-climate-blue">
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-climate-blue" />
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RecommendationsPage;
