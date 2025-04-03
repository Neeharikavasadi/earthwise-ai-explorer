
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Droplets, Wind, Factory, TreePine, AlertTriangle, Thermometer, Sun } from 'lucide-react';

// Mock data for demonstration purposes with Indian states
const stateRecommendations = {
  Maharashtra: {
    issues: [
      { id: 1, title: 'Frequent Flooding', severity: 'high', icon: <Droplets className="h-5 w-5" /> },
      { id: 2, title: 'Air Pollution', severity: 'high', icon: <Factory className="h-5 w-5" /> },
      { id: 3, title: 'Deforestation', severity: 'medium', icon: <TreePine className="h-5 w-5" /> },
    ],
    personal: [
      { id: 1, title: 'Install Rain Barrels', description: 'Collect rainwater to reduce runoff and conserve water during non-monsoon periods.' },
      { id: 2, title: 'Use Public Transport', description: 'Reduce personal vehicle usage to decrease air pollution in urban areas.' },
      { id: 3, title: 'Support Local Reforestation', description: 'Join or donate to Western Ghats tree planting initiatives to restore natural habitats.' },
      { id: 4, title: 'Create Urban Gardens', description: 'Convert available space into small gardens to improve urban ecosystems.' },
    ],
    community: [
      { id: 1, title: 'Urban Flood Management', description: 'Develop community-wide drainage systems and implement early warning mechanisms.' },
      { id: 2, title: 'Clean Air Initiatives', description: 'Organize community air quality monitoring and implement vehicle-free days.' },
      { id: 3, title: 'Green Space Development', description: 'Convert unused urban areas into parks and community gardens.' },
    ],
    policy: [
      { id: 1, title: 'Flood Zone Regulations', description: 'Update building codes in coastal areas and implement stricter development guidelines.' },
      { id: 2, title: 'Industrial Emissions Standards', description: 'Enforce stricter controls on industrial emissions in Mumbai-Pune industrial corridor.' },
      { id: 3, title: 'Western Ghats Protection', description: 'Strengthen legal protections for the Western Ghats and enforce conservation laws.' },
    ]
  },
  Delhi: {
    issues: [
      { id: 1, title: 'Severe Air Pollution', severity: 'high', icon: <Factory className="h-5 w-5" /> },
      { id: 2, title: 'Water Scarcity', severity: 'high', icon: <Droplets className="h-5 w-5" /> },
      { id: 3, title: 'Urban Heat Island', severity: 'medium', icon: <Thermometer className="h-5 w-5" /> },
    ],
    personal: [
      { id: 1, title: 'Use Air Purifiers', description: 'Install air purifiers in homes, especially during winter months when pollution peaks.' },
      { id: 2, title: 'Water Conservation', description: 'Install water-efficient fixtures and practice rainwater harvesting.' },
      { id: 3, title: 'Use Public Transport', description: 'Utilize Delhi Metro and public buses to reduce vehicle emissions.' },
      { id: 4, title: 'Terrace Gardening', description: 'Create rooftop gardens to help reduce heat island effect and improve air quality.' },
    ],
    community: [
      { id: 1, title: 'Car-Free Sundays', description: 'Implement car-free zones in neighborhoods to reduce emissions and promote community engagement.' },
      { id: 2, title: 'Community Water Management', description: 'Develop community rainwater harvesting systems and water recycling programs.' },
      { id: 3, title: 'Urban Forestation', description: 'Plant trees along roads and in public spaces to combat heat island effect and air pollution.' },
    ],
    policy: [
      { id: 1, title: 'Strict Vehicle Emission Standards', description: 'Enforce tougher emission norms and accelerate transition to electric public transport.' },
      { id: 2, title: 'Industrial Relocation', description: 'Relocate high-polluting industries outside the city limits.' },
      { id: 3, title: 'Water Resource Management', description: 'Implement comprehensive Yamuna river restoration and protection policies.' },
    ]
  },
  Kerala: {
    issues: [
      { id: 1, title: 'Coastal Erosion', severity: 'high', icon: <Droplets className="h-5 w-5" /> },
      { id: 2, title: 'Monsoon Flooding', severity: 'high', icon: <AlertTriangle className="h-5 w-5" /> },
      { id: 3, title: 'Biodiversity Loss', severity: 'medium', icon: <TreePine className="h-5 w-5" /> },
    ],
    personal: [
      { id: 1, title: 'Rainwater Harvesting', description: 'Install rainwater collection systems to manage heavy rainfall and conserve water.' },
      { id: 2, title: 'Restore Mangroves', description: 'Participate in local mangrove restoration efforts to protect coastal areas.' },
      { id: 3, title: 'Sustainable Fishing', description: 'Support sustainable fishing practices to preserve marine ecosystems.' },
      { id: 4, title: 'Eco-friendly Home Design', description: 'Implement traditional Kerala architecture principles for climate-resilient housing.' },
    ],
    community: [
      { id: 1, title: 'Early Warning Systems', description: 'Develop community-based flood and landslide warning networks.' },
      { id: 2, title: 'Wetland Conservation', description: 'Restore and protect local wetlands that act as natural flood barriers.' },
      { id: 3, title: 'Sustainable Tourism', description: 'Promote ecotourism that protects rather than harms natural ecosystems.' },
    ],
    policy: [
      { id: 1, title: 'Coastal Zone Management', description: 'Implement science-based coastal management policies to address erosion.' },
      { id: 2, title: 'Forest Conservation', description: 'Strengthen protections for the Western Ghats and enforce anti-deforestation laws.' },
      { id: 3, title: 'Climate-Resilient Agriculture', description: 'Develop policies supporting traditional, climate-adapted agricultural practices.' },
    ]
  },
  Tamil_Nadu: {
    issues: [
      { id: 1, title: 'Water Scarcity', severity: 'high', icon: <Droplets className="h-5 w-5" /> },
      { id: 2, title: 'Coastal Vulnerability', severity: 'high', icon: <AlertTriangle className="h-5 w-5" /> },
      { id: 3, title: 'Heat Waves', severity: 'medium', icon: <Sun className="h-5 w-5" /> },
    ],
    personal: [
      { id: 1, title: 'Water Conservation', description: 'Install low-flow fixtures and practice greywater recycling for gardening.' },
      { id: 2, title: 'Heat-Resistant Housing', description: 'Use traditional cooling techniques and heat-reflective materials in home construction.' },
      { id: 3, title: 'Energy Efficiency', description: 'Install solar panels and energy-efficient appliances to reduce carbon footprint.' },
      { id: 4, title: 'Native Gardening', description: 'Plant drought-resistant native species that require less water.' },
    ],
    community: [
      { id: 1, title: 'Lake Restoration', description: 'Participate in local water body cleanup and restoration initiatives.' },
      { id: 2, title: 'Community Rainwater Harvesting', description: 'Implement neighborhood-scale rainwater collection systems.' },
      { id: 3, title: 'Coastal Restoration', description: 'Support mangrove and coral reef restoration projects along the coast.' },
    ],
    policy: [
      { id: 1, title: 'Water Management Reform', description: 'Implement comprehensive water management policies addressing overexploitation.' },
      { id: 2, title: 'Coastal Infrastructure', description: 'Develop climate-resilient coastal infrastructure and early warning systems.' },
      { id: 3, title: 'Renewable Energy Transition', description: 'Accelerate transition to wind and solar energy to reduce emissions.' },
    ]
  }
};

// List of all Indian states and union territories
const states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Tamil_Nadu', // Included for mock data compatibility
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

const RecommendationsPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');

  // If the selected state doesn't have data, provide a fallback
  const stateData = stateRecommendations[selectedState as keyof typeof stateRecommendations] || 
    stateRecommendations['Maharashtra'];

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
        <h1 className="climate-heading mb-8">Climate Recommendations for Indian States</h1>
        
        <div className="max-w-md mx-auto mb-8">
          <label className="block mb-2 text-sm font-medium text-foreground">Select State</label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
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
