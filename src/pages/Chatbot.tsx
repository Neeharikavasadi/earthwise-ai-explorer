
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Loader2, Droplets, Wind, Thermometer, CloudRain } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Mock climate data for Indian states - in a real app, this would come from an API
const stateClimateData = {
  'Maharashtra': {
    temperature: '30.2°C',
    humidity: '69%',
    pollution: 'Moderate (AQI: 83)',
    rainfall: '1950mm annually',
    windSpeed: '8.9 km/h',
  },
  'Delhi': {
    temperature: '28.1°C',
    humidity: '52%',
    pollution: 'Poor (AQI: 158)',
    rainfall: '655mm annually',
    windSpeed: '7.7 km/h',
  },
  'Tamil Nadu': {
    temperature: '31.7°C',
    humidity: '73%',
    pollution: 'Moderate (AQI: 67)',
    rainfall: '860mm annually',
    windSpeed: '9.7 km/h',
  },
  'Kerala': {
    temperature: '29.1°C',
    humidity: '80%',
    pollution: 'Good (AQI: 44)',
    rainfall: '2500mm annually',
    windSpeed: '6.5 km/h',
  },
  'Uttar Pradesh': {
    temperature: '27.8°C',
    humidity: '56%',
    pollution: 'Poor (AQI: 145)',
    rainfall: '760mm annually',
    windSpeed: '6.8 km/h',
  },
  'Gujarat': {
    temperature: '32.4°C',
    humidity: '63%',
    pollution: 'Moderate (AQI: 95)',
    rainfall: '835mm annually',
    windSpeed: '8.2 km/h',
  },
  'Rajasthan': {
    temperature: '33.9°C',
    humidity: '42%',
    pollution: 'Moderate (AQI: 88)',
    rainfall: '650mm annually',
    windSpeed: '9.1 km/h',
  },
  'Karnataka': {
    temperature: '29.7°C',
    humidity: '68%',
    pollution: 'Moderate (AQI: 76)',
    rainfall: '1350mm annually',
    windSpeed: '7.8 km/h',
  },
  'West Bengal': {
    temperature: '30.3°C',
    humidity: '78%',
    pollution: 'Moderate (AQI: 92)',
    rainfall: '1650mm annually',
    windSpeed: '6.4 km/h',
  },
  'Telangana': {
    temperature: '31.2°C',
    humidity: '65%',
    pollution: 'Moderate (AQI: 89)',
    rainfall: '875mm annually',
    windSpeed: '7.9 km/h',
  },
};

// List of all Indian states
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
  'Chandigarh', 'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep'
];

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'नमस्ते! मैं आपका भारतीय जलवायु AI सहायक हूँ। आप मुझसे भारत में जलवायु परिवर्तन, स्थिरता और पर्यावरण संबंधी मुद्दों के बारे में प्रश्न पूछ सकते हैं। मैं आपकी कैसे सहायता कर सकता हूँ?',
    sender: 'bot',
    timestamp: new Date(),
  },
  {
    id: '2',
    text: 'Hello! I\'m your Indian Climate AI assistant. You can ask me questions about climate change, sustainability, and environmental issues in India. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
  }
];

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [chatContext, setChatContext] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to detect state name in the message
  const detectState = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    for (const state of indianStates) {
      if (lowerMessage.includes(state.toLowerCase())) {
        return state;
      }
    }
    return null;
  };

  // Function to detect climate parameter in the message
  const detectClimateParameter = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('temperature') || lowerMessage.includes('hot') || lowerMessage.includes('warm') || lowerMessage.includes('cold')) {
      return 'temperature';
    }
    if (lowerMessage.includes('pollution') || lowerMessage.includes('aqi') || lowerMessage.includes('air quality')) {
      return 'pollution';
    }
    if (lowerMessage.includes('rain') || lowerMessage.includes('rainfall') || lowerMessage.includes('precipitation')) {
      return 'rainfall';
    }
    if (lowerMessage.includes('humidity') || lowerMessage.includes('moist') || lowerMessage.includes('humid')) {
      return 'humidity';
    }
    if (lowerMessage.includes('wind') || lowerMessage.includes('breeze')) {
      return 'windSpeed';
    }
    return null;
  };

  // Generate responses based on message content and context
  const generateResponse = (userMessage: string): string => {
    const messageLower = userMessage.toLowerCase();
    const detectedState = detectState(userMessage);
    const climateParameter = detectClimateParameter(userMessage);
    
    // Update context with this message
    const newContext = [...chatContext];
    if (newContext.length > 5) newContext.shift(); // Keep last 5 messages for context
    newContext.push(userMessage);
    setChatContext(newContext);

    // Check for greetings
    if (/\b(hi|hello|hey|namaste|greetings)\b/i.test(messageLower)) {
      const greetings = [
        "Namaste! How are you doing today? Feel free to ask me about any climate issues in India.",
        "Hello there! I'm happy to assist you with information about India's climate. What would you like to know?",
        "Greetings! I'm here to help with questions about India's environmental challenges. What's on your mind?",
        "Hi! I'm your climate assistant for India. How can I help you today?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Specific state climate data request
    if (detectedState && climateParameter) {
      // Get climate data for the state
      const stateData = stateClimateData[detectedState as keyof typeof stateClimateData];
      
      if (stateData) {
        const climateValue = stateData[climateParameter as keyof typeof stateData];
        
        const responses = [
          `The current ${climateParameter} in ${detectedState} is ${climateValue}.`,
          `Based on the latest data, ${detectedState} is experiencing ${climateValue} for ${climateParameter}.`,
          `In ${detectedState}, the ${climateParameter} is currently recorded as ${climateValue}.`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
      } else {
        return `I don't have the specific climate data for ${detectedState} at the moment. Would you like to know about another state?`;
      }
    }
    
    // If only state is mentioned but no parameter
    if (detectedState && !climateParameter) {
      const stateData = stateClimateData[detectedState as keyof typeof stateClimateData];
      
      if (stateData) {
        return `In ${detectedState}, the current temperature is ${stateData.temperature}, with humidity at ${stateData.humidity}. The air quality index is ${stateData.pollution} and typical annual rainfall is ${stateData.rainfall}. Would you like to know something more specific about ${detectedState}?`;
      } else {
        return `${detectedState} is an important state in India. Would you like to know about its temperature, rainfall, pollution levels, or humidity?`;
      }
    }
    
    // If only climate parameter is mentioned but no state
    if (!detectedState && climateParameter) {
      const responses = [
        `Are you interested in ${climateParameter} data for a specific state in India? You can ask me about any state like Maharashtra, Delhi, Tamil Nadu, or others.`,
        `I can provide ${climateParameter} information for any Indian state. Which state are you interested in?`,
        `I have ${climateParameter} data for all major Indian states. Please specify which state you're curious about.`
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Check for questions about climate change in India
    if (messageLower.includes('climate change') || messageLower.includes('global warming')) {
      const responses = [
        "Climate change is significantly impacting India with rising temperatures, changing monsoon patterns, and more frequent extreme weather events. The average temperature in India has increased by approximately 0.7°C over the past century.",
        "India is particularly vulnerable to climate change impacts. Rising sea levels threaten coastal cities like Mumbai and Chennai, while changing rainfall patterns affect agriculture across the country.",
        "India has committed to ambitious climate goals, including 450 GW of renewable energy capacity by 2030 and reducing carbon intensity by 33-35% from 2005 levels. The country faces unique challenges balancing development needs with climate action."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Check for sustainability or green practices
    if (messageLower.includes('sustainable') || messageLower.includes('green') || messageLower.includes('eco-friendly')) {
      const responses = [
        "India is making significant strides in sustainability. Programs like the Green India Mission aim to increase forest cover, while cities are implementing green building codes and expanding public transportation.",
        "Traditional Indian practices often align with sustainability principles. For example, many households practice water conservation, food waste composting, and utilize natural cooling techniques in architecture.",
        "In India, you can adopt sustainable practices like using public transport or electric vehicles, installing solar panels, harvesting rainwater, and supporting local farmers' markets for reduced food miles."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Check for renewable energy questions
    if (messageLower.includes('renewable') || messageLower.includes('solar') || messageLower.includes('wind power')) {
      const responses = [
        "India's renewable energy capacity has grown remarkably, with solar power leading the way. The country aims to achieve 450 GW of renewable energy capacity by 2030, making it one of the world's most ambitious clean energy programs.",
        "The world's largest solar park is located in Bhadla, Rajasthan, with a capacity of 2245 MW. India's solar prices have dropped significantly, making it one of the most affordable renewable energy sources.",
        "India's renewable energy sector employs over 700,000 people and has attracted billions in investment. The International Solar Alliance, headquartered in India, is bringing together countries to promote solar energy globally."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Check for water-related questions
    if (messageLower.includes('water') || messageLower.includes('river') || messageLower.includes('drought')) {
      const responses = [
        "Water scarcity affects nearly 600 million Indians. Groundwater levels are declining rapidly in states like Punjab, Haryana, and Tamil Nadu due to over-extraction for agriculture. Climate change is exacerbating this with more erratic rainfall patterns.",
        "Traditional water conservation methods like step wells (baolis) and rainwater harvesting are being revived across India. The Jal Jeevan Mission aims to provide tap water to all rural households by 2024.",
        "Chennai's 'Day Zero' in 2019, when the city nearly ran out of water, highlighted India's urban water challenges. Cities are now implementing water recycling, rainwater harvesting, and better demand management."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Check for air pollution questions
    if (messageLower.includes('pollution') || messageLower.includes('air quality') || messageLower.includes('smog')) {
      const responses = [
        "Air pollution is a significant challenge in India, particularly in urban centers. Delhi regularly faces severe air quality issues during winter months due to a combination of vehicular emissions, industrial pollution, crop burning, and unfavorable weather conditions.",
        "India has implemented the National Clean Air Programme (NCAP) targeting a 20-30% reduction in PM2.5 and PM10 concentrations by 2024. Cities are adopting measures like odd-even vehicle schemes and promoting public transport.",
        "Indoor air pollution affects millions in rural India who rely on biomass fuels for cooking. The government's Ujjwala scheme has provided LPG connections to over 80 million households, improving health outcomes and reducing emissions."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // General knowledge about the chatbot
    if (messageLower.includes('who are you') || messageLower.includes('about you') || messageLower.includes('what can you do')) {
      return "I'm an AI assistant focused on India's climate and environmental issues. I can provide information about climate patterns, sustainability initiatives, and environmental challenges across different Indian states. I can also offer data on temperature, rainfall, air quality, and more for specific locations. What would you like to know?";
    }

    // Thank you responses
    if (messageLower.includes('thank') || messageLower.includes('thanks')) {
      const responses = [
        "You're welcome! Feel free to ask if you have more questions about India's climate.",
        "Happy to help! Is there anything else you'd like to know about environmental issues in India?",
        "My pleasure! I'm here anytime you need information about India's climate challenges and solutions."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Fallback responses that ask for clarification
    const fallbackResponses = [
      "I'd love to help you with information about India's climate. Could you be more specific about which aspect you're interested in? Perhaps about a particular state, temperature trends, or sustainability initiatives?",
      "That's an interesting topic related to India's environment. To provide the most helpful information, could you clarify if you're asking about a specific region, climate impact, or environmental initiative?",
      "I'm here to discuss India's climate challenges and solutions. To give you the best information, could you tell me which aspect you'd like to focus on - perhaps a specific state's climate data, national policies, or sustainable practices?",
      "I appreciate your interest in India's climate. To better assist you, could you specify whether you're looking for information about temperature patterns, rainfall, pollution levels, or sustainability efforts in a particular region?"
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Generate response with a realistic delay
    setTimeout(() => {
      const botResponse = generateResponse(newUserMessage.text);
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
      toast.success('New response received');
    }, Math.random() * 1000 + 800); // Random delay between 800-1800ms for more natural feel
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get climate icon based on message content
  const getMessageIcon = (message: Message) => {
    if (message.sender === 'user') {
      return <User className="h-5 w-5" />;
    }
    
    const text = message.text.toLowerCase();
    if (text.includes('temperature') || text.includes('hot') || text.includes('warm') || text.includes('cold')) {
      return <Thermometer className="h-5 w-5" />;
    }
    if (text.includes('rain') || text.includes('water') || text.includes('precipitation')) {
      return <CloudRain className="h-5 w-5" />;
    }
    if (text.includes('humidity') || text.includes('moist')) {
      return <Droplets className="h-5 w-5" />;
    }
    if (text.includes('wind')) {
      return <Wind className="h-5 w-5" />;
    }
    
    return <Bot className="h-5 w-5" />;
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="climate-heading mb-8">Indian Climate AI Assistant</h1>
        
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Climate AI Chatbot
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowInfoDialog(true)}
              >
                How to use
              </Button>
            </CardTitle>
            <CardDescription>
              Ask me anything about climate change, sustainability practices, or environmental data in India.
            </CardDescription>
          </CardHeader>
          
          <Separator />
          
          <ScrollArea className="h-[500px] p-4">
            <div className="space-y-4 px-1">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex max-w-[80%] rounded-lg p-4 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="mr-2 mt-0.5">
                      {getMessageIcon(message)}
                    </div>
                    <div>
                      <div className="text-sm">
                        {message.text}
                      </div>
                      <div className="mt-1 text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] rounded-lg p-4 bg-muted">
                    <div className="mr-2 mt-0.5">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span className="text-sm">Indian Climate AI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <CardFooter className="p-4 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Ask about climate change in India..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center text-muted-foreground text-sm">
          <p>Try asking about temperature in Delhi, rainfall in Kerala, pollution levels in Mumbai, or sustainability initiatives in India.</p>
        </div>

        <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to use the Climate AI Assistant</DialogTitle>
              <DialogDescription>
                Here are some examples of questions you can ask:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 my-4">
              <p><strong>• State-specific climate data:</strong> "What's the temperature in Maharashtra?" or "How much rainfall does Kerala get?"</p>
              <p><strong>• Climate comparisons:</strong> "Which state has better air quality, Delhi or Mumbai?"</p>
              <p><strong>• Climate change impacts:</strong> "How is climate change affecting India's agriculture?"</p>
              <p><strong>• Sustainability practices:</strong> "What are some water conservation methods in India?"</p>
              <p><strong>• Green initiatives:</strong> "Tell me about India's renewable energy projects."</p>
            </div>
            <p className="text-sm text-muted-foreground">The AI assistant provides information about Indian climate issues, environmental challenges, and sustainable solutions.</p>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ChatbotPage;
