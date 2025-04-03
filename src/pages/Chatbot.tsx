
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

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

// India-focused mock responses with more conversational tone
const indiaResponses = [
  {
    keywords: ["hello", "hi", "hey", "namaste", "greetings"],
    responses: [
      "Namaste! How are you doing today? Feel free to ask me about any climate issues in India.",
      "Hello there! It's a pleasure to assist you. What would you like to know about India's climate?",
      "Greetings! I'm here to help with any questions about India's environmental challenges. What's on your mind?"
    ]
  },
  {
    keywords: ["monsoon", "rain", "rainfall", "precipitation"],
    responses: [
      "The Indian monsoon is critical to the country's agriculture and water security. In recent years, we've seen more erratic patterns, with some regions experiencing floods while others face drought conditions. This changing pattern is one of the key concerns for climate scientists in India.",
      "India's monsoon season typically runs from June to September, bringing about 70-90% of annual rainfall. Climate change has been causing increased variability in monsoon patterns, which affects millions of farmers across the country.",
      "Did you know that the Indian monsoon is considered one of the most complex weather systems in the world? Climate models predict that monsoon rainfall could increase by 14% by the end of this century, leading to more extreme rainfall events."
    ]
  },
  {
    keywords: ["temperature", "warming", "heat", "hot"],
    responses: [
      "India has been experiencing rising temperatures across all regions. The average temperature has increased by approximately 0.7°C over the past century. Heat waves have become more frequent, especially in regions like Rajasthan, Punjab, Haryana, and Delhi NCR.",
      "Urban areas in India face higher temperatures due to the urban heat island effect. Cities like Delhi, Mumbai, and Chennai can be 3-5°C warmer than surrounding rural areas during summer months. Green initiatives like urban forests are helping to mitigate this effect in some cities.",
      "The Himalayan region in India is warming at a rate higher than the global average, leading to accelerated glacial melt. This has serious implications for water security in North India, as many major rivers originate in the Himalayas."
    ]
  },
  {
    keywords: ["pollution", "air quality", "air pollution", "smog"],
    responses: [
      "Air pollution is a significant challenge in India, particularly in urban centers. Delhi regularly faces severe air quality issues, especially during winter months due to a combination of vehicular emissions, industrial pollution, crop burning in neighboring states, and unfavorable weather conditions.",
      "India has implemented the National Clean Air Programme (NCAP) targeting a 20-30% reduction in PM2.5 and PM10 concentrations by 2024. Cities are also adopting measures like odd-even vehicle schemes, promoting public transport, and transitioning to cleaner fuels.",
      "Indoor air pollution affects millions in rural India who rely on biomass fuels for cooking. The government's Ujjwala scheme has provided LPG connections to over 80 million households to address this issue, improving both health outcomes and reducing black carbon emissions."
    ]
  },
  {
    keywords: ["renewable", "solar", "wind", "clean energy"],
    responses: [
      "India has made remarkable progress in renewable energy. The country aims to achieve 450 GW of renewable energy capacity by 2030. Solar power has seen exponential growth, with the cost of solar electricity dropping by over 80% in the last decade.",
      "The world's largest solar park is located in Bhadla, Rajasthan, with a capacity of 2245 MW. India is leveraging its abundant sunshine to become a global leader in solar energy, creating jobs and reducing carbon emissions simultaneously.",
      "India's renewable energy transition is creating economic opportunities while addressing climate change. The sector employs over 700,000 people and has attracted billions in investment. The International Solar Alliance, headquartered in India, is bringing together countries to promote solar energy globally."
    ]
  },
  {
    keywords: ["water", "drought", "scarcity", "groundwater"],
    responses: [
      "Water scarcity affects nearly 600 million Indians. Groundwater levels are declining rapidly in states like Punjab, Haryana, and Tamil Nadu due to over-extraction for agriculture. Climate change is exacerbating this issue with more erratic rainfall patterns.",
      "The Jal Jeevan Mission aims to provide tap water to all rural households by 2024. Meanwhile, traditional water conservation methods like step wells (baolis) and rainwater harvesting are being revived across India to address water security challenges.",
      "Chennai's 'Day Zero' in 2019, when the city nearly ran out of water, highlighted India's urban water challenges. Cities across India are now implementing water recycling, rainwater harvesting, and demand management to build resilience against future water crises."
    ]
  },
  {
    keywords: ["forest", "deforestation", "biodiversity", "wildlife"],
    responses: [
      "India has managed to increase its forest cover in recent years, bucking global trends. The country aims to create an additional carbon sink of 2.5 to 3 billion tonnes of CO2 equivalent through forest and tree cover by 2030 as part of its climate commitments.",
      "The Western Ghats and Eastern Himalayas are two of the world's biodiversity hotspots located in India. These regions face threats from development projects, but community-led conservation efforts have shown promising results in many areas.",
      "India's mangrove forests, particularly in the Sundarbans, provide crucial protection against cyclones and storm surges while sequestering carbon. Conservation and restoration of these ecosystems is a nature-based solution to climate change that also supports local livelihoods."
    ]
  },
  {
    keywords: ["farming", "agriculture", "crops", "farmers"],
    responses: [
      "Climate change is affecting India's agricultural sector, which employs nearly half the workforce. Changing rainfall patterns, increasing temperatures, and extreme weather events pose challenges to food security. Climate-resilient agriculture practices are being promoted across various states.",
      "Traditional farming knowledge is being combined with modern science in India to develop sustainable agricultural practices. Methods like System of Rice Intensification (SRI), which reduces water usage while increasing yields, are gaining popularity among farmers.",
      "Millets, once considered 'poor man's food,' are making a comeback in India as climate-resilient crops. These grains require less water, can grow in poor soil conditions, and offer nutritional benefits. India has been promoting 2023 as the International Year of Millets."
    ]
  },
  {
    keywords: ["coastal", "sea level", "ocean", "cyclone"],
    responses: [
      "India's 7,500 km coastline is vulnerable to sea level rise, with cities like Mumbai and Kolkata at particular risk. Coastal erosion is already affecting communities in states like Odisha, West Bengal, and Kerala.",
      "The frequency and intensity of cyclones affecting India's east coast have increased in recent years. The India Meteorological Department has improved early warning systems, helping to significantly reduce casualties during recent cyclones like Phailin and Fani.",
      "Coastal communities in India are adapting to climate threats through ecosystem-based approaches like mangrove restoration and sustainable fishing practices. The Blue Economy approach is being promoted to balance economic development with coastal and marine conservation."
    ]
  },
  {
    keywords: ["action", "solution", "what can i do", "how to help"],
    responses: [
      "Individual actions matter! You can reduce your carbon footprint by using public transport, minimizing single-use plastics, conserving water and electricity, and supporting local, sustainable businesses. Every small action contributes to India's climate resilience.",
      "Community-led initiatives are making a difference across India. You could join local environmental groups, participate in tree planting drives, or start a community composting project. The Swachh Bharat Mission has shown how collective action can create nationwide impact.",
      "Staying informed and spreading awareness is crucial. Understanding local climate impacts and solutions helps communities prepare and adapt. You can advocate for climate-friendly policies with local representatives and support climate education in schools and colleges."
    ]
  }
];

// Fallback responses when no keyword match is found
const fallbackResponses = [
  "That's an interesting question about India's climate situation. The impacts of climate change vary widely across India's diverse regions. Could you specify which aspect you'd like to know more about?",
  "India faces unique climate challenges given its geography and population. I'd be happy to provide more specific information. Could you clarify which environmental issue you're most interested in?",
  "Climate action in India involves both traditional knowledge and modern technology. Is there a particular solution or approach you'd like to explore further?",
  "India's climate initiatives range from large-scale renewable energy projects to community-based adaptation. What specific area would you like me to focus on?",
  "That's a good question. India's environmental policies aim to balance development needs with sustainability goals. Would you like to know more about a specific policy or initiative?"
];

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findRelevantResponse = (userMessage: string) => {
    const messageLower = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const category of indiaResponses) {
      for (const keyword of category.keywords) {
        if (messageLower.includes(keyword)) {
          // Return a random response from the matching category
          return category.responses[Math.floor(Math.random() * category.responses.length)];
        }
      }
    }
    
    // If no keywords matched, use a fallback response
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

    // Simulate AI response with delay
    setTimeout(() => {
      const aiResponse = findRelevantResponse(newUserMessage.text);
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
      toast.success('New response received');
    }, 1500);
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

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="climate-heading mb-8">Indian Climate AI Assistant</h1>
        
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Climate AI Chatbot</CardTitle>
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
                      {message.sender === 'user' ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
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
          <p>This chatbot uses simulated responses focused on Indian climate issues for demonstration purposes.</p>
          <p>Try asking about monsoons, air pollution in Delhi, renewable energy in India, or water scarcity challenges.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotPage;
