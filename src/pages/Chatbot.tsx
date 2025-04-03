
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
    text: 'Hello! I\'m your Climate AI assistant. You can ask me questions about climate change, sustainability, and environmental issues. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
  }
];

// This would be replaced with actual OpenAI API integration
const mockResponses = [
  "Climate change is the long-term alteration of temperature and typical weather patterns. It's primarily caused by human activities, especially the burning of fossil fuels, which release carbon dioxide and other greenhouse gases into the atmosphere.",
  "The global average temperature has increased by about 1.1°C (2.0°F) since the pre-industrial period. This may seem small, but it has significant impacts on our climate systems.",
  "Renewable energy sources include solar, wind, hydroelectric, geothermal, and biomass. These energy sources have a much lower carbon footprint compared to fossil fuels.",
  "To reduce your carbon footprint, consider using public transportation, reducing meat consumption, conserving energy at home, and supporting sustainable businesses.",
  "Ocean acidification is the ongoing decrease in pH of the Earth's oceans, caused by the uptake of carbon dioxide from the atmosphere. It threatens marine organisms, especially those with calcium carbonate shells or skeletons.",
  "Smart thermostats, LED lighting, and energy-efficient appliances can significantly reduce your home's energy consumption and environmental impact.",
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
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
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
        <h1 className="climate-heading mb-8">Climate AI Assistant</h1>
        
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Climate AI Chatbot</CardTitle>
            <CardDescription>
              Ask me anything about climate change, sustainability practices, or environmental data.
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
                      <span className="text-sm">Climate AI is typing...</span>
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
                placeholder="Type your message..."
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
          <p>This chatbot uses simulated responses for demonstration purposes.</p>
          <p>In a production environment, it would connect to AI services like OpenAI or Dialogflow.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotPage;
