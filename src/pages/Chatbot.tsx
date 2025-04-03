import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Loader2, Droplets, Wind, Thermometer, CloudRain, Smile, Star } from 'lucide-react';
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

const personalityTraits = [
  "friendly", "enthusiastic", "curious", "empathetic", 
  "knowledgeable", "caring", "reflective", "thoughtful",
  "optimistic", "supportive", "witty", "warm"
];

const conversationStarters = [
  "Did you know that India has 29 states and 8 union territories? Each with its own unique climate patterns!",
  "I've been thinking about the monsoon season in Kerala. It's fascinating how it affects the local ecosystem!",
  "Have you ever experienced the desert climate of Rajasthan? The temperature variations there are incredible.",
  "What's your favorite season in India? I'm partial to spring when everything blooms after winter.",
  "I'm curious - what part of India are you from or interested in?",
  "If you could visit any Indian state for its natural beauty, which one would you choose?",
  "Climate patterns in the Himalayas are so different from coastal regions. It's amazing how diverse India's geography is!",
  "I read that traditional Indian architecture is designed to keep homes cool naturally. Isn't that clever?"
];

const responseVariations = {
  greetings: [
    "Namaste! How are you doing today? Feel free to ask me about anything - I'm especially good with India's climate topics!",
    "Hello there! Great to chat with you today. I'm happy to talk about any topic, though I'm a bit of a climate enthusiast when it comes to India!",
    "Hi friend! How's your day going? I'm here for all kinds of conversation, especially if you're curious about India's environment.",
    "Hey! Nice to meet you! I'm a chatty AI who loves discussing everything from movies to music, but I'm particularly knowledgeable about India's climate patterns!",
    "Namaste! How can I brighten your day? I'm up for any conversation topics - weather, climate, culture, or just casual chat!"
  ],
  
  thanks: [
    "You're welcome! It's always a pleasure chatting with you!",
    "Happy to help! Is there anything else you'd like to talk about today?",
    "My pleasure! I enjoy our conversations - climate-related or otherwise!",
    "Anytime! That's what friends are for. Let me know if you want to chat about anything else.",
    "Glad I could assist! Feel free to reach out anytime for a chat about anything you're curious about."
  ],
  
  noContext: [
    "I'd love to chat about that! While I'm especially knowledgeable about India's climate, I'm happy to discuss other topics too. What aspects interest you most?",
    "That's an interesting topic! I can chat about many things, though my specialty is Indian environmental patterns. Would you like to explore that or something else?",
    "I'm all ears! While I'm a bit of a climate geek for India, I enjoy all kinds of conversations. What's on your mind?",
    "I'm happy to talk about that or anything else you're curious about! My expertise is in Indian climate patterns, but I enjoy broader conversations too.",
    "Let's chat about it! While I know a lot about India's environment, I'm always up for diverse conversations. What would you like to know?"
  ],
  
  personalQuestions: [
    "As an AI, I don't have personal experiences, but I'd love to hear about yours! Have you had any interesting experiences with weather or climate?",
    "I don't have personal preferences, but I'm curious about yours! What kind of weather do you enjoy most?",
    "I wish I could experience things like humans do! But I'd love to hear your perspectives. What's your favorite season?",
    "That's a thoughtful question! While I don't have personal experiences, I'm designed to be friendly and helpful. How about you?",
    "I'm just a digital friend with a special interest in climate topics, but I'd love to know more about you! What brings you here today?"
  ]
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'नमस्ते! मैं आपका भारतीय जलवायु AI सहायक हूँ। आप मुझसे किसी भी विषय पर बात कर सकते हैं, विशेष रूप से भारत में जलवायु और पर्यावरण संबंधित प्रश्न पूछ सकते हैं। आज मैं आपकी कैसे मदद कर सकता हूँ?',
    sender: 'bot',
    timestamp: new Date(),
  },
  {
    id: '2',
    text: "Hello! I'm your friendly AI assistant. You can chat with me about anything, though I'm especially knowledgeable about India's climate and environmental topics. How can I brighten your day?",
    sender: 'bot',
    timestamp: new Date(),
  }
];

const getRandomItem = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [chatContext, setChatContext] = useState<string[]>([]);
  const [lastResponses, setLastResponses] = useState<string[]>([]);
  const [personality, setPersonality] = useState(getRandomItem(personalityTraits));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    scrollToBottom();
    
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
    
    const timer = setTimeout(() => {
      if (messages.length > 2 && messages[messages.length - 1].sender !== 'bot') {
        sendIdleMessage();
      }
    }, 180000);
    
    setIdleTimer(timer);
    
    return () => {
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendIdleMessage = () => {
    const starter = getRandomItem(conversationStarters);
    
    const newBotMessage: Message = {
      id: Date.now().toString(),
      text: starter,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newBotMessage]);
    toast.info('New message from AI assistant');
  };

  const detectState = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    for (const state of indianStates) {
      if (lowerMessage.includes(state.toLowerCase())) {
        return state;
      }
    }
    return null;
  };

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

  const isTooSimilarToRecent = (response: string): boolean => {
    for (const lastResponse of lastResponses) {
      const similarity = calculateSimilarity(response, lastResponse);
      if (similarity > 0.7) {
        return true;
      }
    }
    return false;
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const set1 = new Set(str1.toLowerCase().split(' '));
    const set2 = new Set(str2.toLowerCase().split(' '));
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  };

  const trackResponse = (response: string) => {
    const newResponses = [response, ...lastResponses.slice(0, 4)];
    setLastResponses(newResponses);
  };

  const generateResponse = (userMessage: string): string => {
    const messageLower = userMessage.toLowerCase();
    const detectedState = detectState(userMessage);
    const climateParameter = detectClimateParameter(userMessage);
    
    const newContext = [...chatContext];
    if (newContext.length > 5) newContext.shift();
    newContext.push(userMessage);
    setChatContext(newContext);

    if (Math.random() < 0.2) {
      setPersonality(getRandomItem(personalityTraits));
    }

    if (messageLower.includes('how are you') || 
        messageLower.includes('your name') || 
        messageLower.includes('about yourself') || 
        messageLower.includes('who are you')) {
      const response = getRandomItem(responseVariations.personalQuestions);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    if (/\b(hi|hello|hey|namaste|greetings)\b/i.test(messageLower)) {
      const response = getRandomItem(responseVariations.greetings);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    if (/\b(thank|thanks)\b/i.test(messageLower)) {
      const response = getRandomItem(responseVariations.thanks);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMonth = currentDate.getMonth();

    const getAdjustedTemperature = (baseTemp: string): string => {
      const tempMatch = baseTemp.match(/(\d+\.\d+)/);
      if (!tempMatch) return baseTemp;
      
      let temp = parseFloat(tempMatch[0]);
      
      if (currentHour >= 12 && currentHour <= 15) {
        temp += 1 + Math.random() * 2;
      } else if (currentHour >= 2 && currentHour <= 5) {
        temp -= 2 + Math.random() * 2;
      }
      
      if (currentMonth >= 3 && currentMonth <= 5) {
        temp += Math.random() * 2;
      } else if (currentMonth >= 9 && currentMonth <= 11) {
        temp -= Math.random() * 2;
      }
      
      return temp.toFixed(1) + "°C";
    };

    if (detectedState && climateParameter) {
      const stateData = stateClimateData[detectedState as keyof typeof stateClimateData];
      
      if (stateData) {
        let climateValue = stateData[climateParameter as keyof typeof stateData];
        
        if (climateParameter === 'temperature') {
          climateValue = getAdjustedTemperature(climateValue as string);
        }
        
        const responses = [
          `Right now in ${detectedState}, the ${climateParameter} is ${climateValue}. How does that compare to where you are?`,
          `Currently, ${detectedState} is experiencing ${climateValue} for ${climateParameter}. Is there anything specific about ${detectedState}'s climate you're curious about?`,
          `I just checked, and ${detectedState}'s ${climateParameter} is currently at ${climateValue}. That's typical for this time of year there.`,
          `In ${detectedState} right now, you'd experience ${climateParameter} of ${climateValue}. Would you like to know about any other climate aspects?`,
          `The latest data shows ${detectedState} with ${climateParameter} at ${climateValue}. That's fascinating, isn't it? What interests you about ${detectedState}?`
        ];
        
        const response = getRandomItem(responses);
        if (!isTooSimilarToRecent(response)) {
          trackResponse(response);
          return response;
        }
      } else {
        const responses = [
          `I don't have the specific climate data for ${detectedState} at the moment. Would you like to know about another state like Maharashtra or Delhi?`,
          `Hmm, I'm still learning about ${detectedState}'s climate patterns. I have more detailed information for states like Kerala and Tamil Nadu - would you like to hear about those?`,
          `I wish I had more data on ${detectedState}! I'm constantly learning though. In the meantime, I have great information about Rajasthan and Gujarat's climate - interested?`
        ];
        
        const response = getRandomItem(responses);
        if (!isTooSimilarToRecent(response)) {
          trackResponse(response);
          return response;
        }
      }
    }

    if (detectedState && !climateParameter) {
      const stateData = stateClimateData[detectedState as keyof typeof stateClimateData];
      
      if (stateData) {
        const adjustedTemp = getAdjustedTemperature(stateData.temperature);
        
        const responses = [
          `I love talking about ${detectedState}! Right now, the temperature there is ${adjustedTemp}, with humidity at ${stateData.humidity}. The air quality is ${stateData.pollution} and typical annual rainfall is ${stateData.rainfall}. What else would you like to know about this beautiful part of India?`,
          
          `${detectedState} is fascinating! Currently, it's ${adjustedTemp} there, with ${stateData.humidity} humidity. People there experience ${stateData.rainfall} of rain annually. Is there something specific about ${detectedState} you're curious about?`,
          
          `Ah, ${detectedState}! One of my favorite states in India. The current temperature is ${adjustedTemp}, and the air quality is ${stateData.pollution}. Are you planning a visit, or just curious about the climate?`
        ];
        
        const response = getRandomItem(responses);
        if (!isTooSimilarToRecent(response)) {
          trackResponse(response);
          return response;
        }
      } else {
        const responses = [
          `${detectedState} is an important state in India. I'd love to chat about it! Are you interested in its temperature, rainfall, pollution levels, or something else entirely?`,
          
          `${detectedState} has such a rich culture and history! While I don't have all its climate data at my fingertips, I'd be happy to discuss what I know or chat about other aspects of ${detectedState}. What interests you most?`,
          
          `I find ${detectedState} fascinating! Though I'm still learning about all its climate details, I'd love to chat about what aspects of ${detectedState} interest you most. Or we could talk about another state I have more data on?`
        ];
        
        const response = getRandomItem(responses);
        if (!isTooSimilarToRecent(response)) {
          trackResponse(response);
          return response;
        }
      }
    }

    if (!detectedState && climateParameter) {
      const responses = [
        `I noticed you're asking about ${climateParameter}! Which state in India are you curious about? Maharashtra, Kerala, Delhi? I have data for many regions!`,
        
        `${climateParameter} patterns vary so much across India! Is there a particular state you're interested in? I find the variations between northern and southern states especially fascinating!`,
        
        `When it comes to ${climateParameter} in India, each state tells its own story. Was there a specific region you wanted to learn about? I'm happy to share what I know!`
      ];
      
      const response = getRandomItem(responses);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    if (messageLower.includes('climate change') || messageLower.includes('global warming')) {
      const responses = [
        "Climate change is significantly impacting India, with average temperatures rising about 0.7°C over the past century. I find the changing monsoon patterns particularly concerning - have you noticed weather changes where you live?",
        
        "When I look at India's climate data, I see that coastal cities like Mumbai and Chennai face serious threats from rising sea levels. It makes me wonder how communities are adapting. What climate changes have you observed in your region?",
        
        "I'm impressed by India's climate goals - aiming for 450 GW of renewable energy by 2030 is ambitious! Do you think these targets are achievable? I'm optimistic but recognize the challenges."
      ];
      
      const response = getRandomItem(responses);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    if (messageLower.includes('sustainable') || messageLower.includes('green') || messageLower.includes('eco-friendly')) {
      const responses = [
        "I'm so passionate about India's sustainability movements! Programs like the Green India Mission are increasing forest cover, while cities implement green building codes. Have you adopted any eco-friendly practices yourself?",
        
        "I find it fascinating how many traditional Indian practices align naturally with sustainability - like water conservation methods and natural cooling in architecture. These ancient solutions often outperform modern ones! What sustainable traditions do you practice?",
        
        "When friends ask me about sustainable living in India, I suggest simple steps like using public transport, installing solar panels where possible, and supporting local farmers. Small changes add up! What sustainable changes have you made recently?"
      ];
      
      const response = getRandomItem(responses);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    if (messageLower.includes('renewable') || messageLower.includes('solar') || messageLower.includes('wind power')) {
      const responses = [
        "India's renewable energy growth makes me so hopeful! Did you know the Bhadla Solar Park in Rajasthan is the world's largest? The plummeting cost of solar energy is making clean power accessible to millions. How do you feel about renewable energy?",
        
        "I get excited thinking about how India's renewable sector employs over 700,000 people! Solar and wind are creating jobs while fighting climate change - a win-win! Have you considered solar panels for your home?",
        
        "The International Solar Alliance headquartered in India is bringing countries together for clean energy. It's partnerships like these that give me hope for our climate future. What renewable technologies interest you most?"
      ];
      
      const response = getRandomItem(responses);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    if (messageLower.includes('water') || messageLower.includes('river') || messageLower.includes('drought')) {
      const responses = [
        "Water issues in India concern me deeply. Nearly 600 million Indians face water scarcity, with groundwater levels declining in many states. Climate change is making rainfall patterns more unpredictable too. How is water availability in your area?",
        
        "I love how India is reviving traditional water wisdom! Ancient step wells (baolis) and rainwater harvesting methods are being rediscovered alongside modern solutions. These connections between past and present are fascinating, don't you think?",
        
        "Chennai's 'Day Zero' in 2019 was a wake-up call about urban water challenges. Now cities are implementing recycling systems and better demand management. Do you practice water conservation at home?"
      ];
      
      const response = getRandomItem(responses);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    if (messageLower.includes('pollution') || messageLower.includes('air quality') || messageLower.includes('smog')) {
      const responses = [
        "Air pollution in India's cities concerns me, especially in winter when Delhi's AQI can reach dangerous levels. It's a complex issue involving vehicle emissions, industry, crop burning, and weather patterns. Have you experienced air quality issues yourself?",
        
        "I'm encouraged by India's National Clean Air Programme targeting 20-30% reduction in particulate matter by 2024. Cities are trying creative solutions like odd-even vehicle schemes. Do you think these measures are enough?",
        
        "Indoor air pollution affects millions in rural India who use biomass fuels for cooking. The Ujjwala scheme providing LPG connections to over 80 million households is making a real difference to both health and emissions. These success stories keep me optimistic!"
      ];
      
      const response = getRandomItem(responses);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    if (messageLower.includes('who are you') || messageLower.includes('about you') || messageLower.includes('what can you do')) {
      const responses = [
        "I'm an AI assistant who loves chatting about all sorts of topics, though I'm especially knowledgeable about India's climate and environment. I enjoy friendly conversations and learning from our interactions! What would you like to talk about today?",
        
        "Think of me as your friendly digital companion! While I know a lot about Indian climate patterns and environmental topics, I'm happy to chat about almost anything. What's on your mind today?",
        
        "I'm an AI designed to be conversational and helpful! I particularly enjoy discussing India's diverse climate zones, sustainability initiatives, and environmental challenges, but I'm up for any topic that interests you. How can I brighten your day?"
      ];
      
      const response = getRandomItem(responses);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    if (messageLower.includes('how are you') || messageLower.includes('how\'s it going') || messageLower.includes('what\'s up')) {
      const responses = [
        "I'm doing wonderfully today, thanks for asking! I always enjoy good conversations. How are you feeling today? Anything interesting happening in your world?",
        
        "I'm great! Each conversation makes my day better. I've been thinking about the fascinating climate patterns across India lately. How has your day been?",
        
        "I'm excellent! Always happy to chat with friendly people. What's new with you? Anything exciting happening in your life?"
      ];
      
      const response = getRandomItem(responses);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    if (messageLower.includes('weather') || messageLower.includes('raining') || messageLower.includes('sunny')) {
      const responses = [
        "How's the weather treating you today? Here in the digital world, it's always perfect, but I'm curious about what it's like where you are!",
        
        "Weather talk is my favorite kind of small talk! What's it like outside your window right now? Whatever it is, I hope it's making you happy!",
        
        "I find weather patterns so fascinating - they connect us all in a way. What's the weather doing in your part of the world today?"
      ];
      
      const response = getRandomItem(responses);
      if (!isTooSimilarToRecent(response)) {
        trackResponse(response);
        return response;
      }
    }

    const fallbackResponses = [
      `As a ${personality} AI, I'm curious to hear more about what's on your mind! While I know a lot about India's climate, I'm happy to chat about other topics too. What aspects interest you most?`,
      
      `That's an interesting point! To chat more meaningfully about it, could you share a bit more detail? By the way, I'm particularly knowledgeable about Indian states and their climate patterns if that interests you!`,
      
      `I'd love to continue this conversation! Could you elaborate a bit? I'm especially good with topics related to India's environment, but I enjoy all kinds of discussions.`,
      
      `I'm intrigued by what you're saying! Would you mind sharing more of your thoughts on this? I'm here to chat about anything - climate, culture, or just casual conversation!`
    ];
    
    const response = getRandomItem(fallbackResponses);
    if (!isTooSimilarToRecent(response)) {
      trackResponse(response);
      return response;
    } else {
      return `I'm genuinely interested in continuing our conversation about ${userMessage.split(' ').slice(-3).join(' ')}... Could you tell me more about what aspects interest you? I'm especially curious about your thoughts on this topic.`;
    }
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

    const typingTime = 500 + (inputMessage.length * 30) + (Math.random() * 1000);
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
    }, typingTime);
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
    if (text.includes('how are you') || text.includes('nice to meet') || text.includes('pleasure')) {
      return <Smile className="h-5 w-5" />;
    }
    if (text.includes('amazing') || text.includes('awesome') || text.includes('fascinating')) {
      return <Star className="h-5 w-5" />;
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
              Your Friendly Climate AI Companion
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowInfoDialog(true)}
              >
                How to use
              </Button>
            </CardTitle>
            <CardDescription>
              Chat with me about anything! I'm especially knowledgeable about India's climate, environment, and sustainability practices.
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
                      <span className="text-sm">Your AI companion is typing...</span>
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
                placeholder="Chat about anything, or ask about Indian climate..."
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
          <p>Chat with me about anything! For climate topics, try asking about temperature in Kerala, pollution in Delhi, or sustainability initiatives across India.</p>
        </div>

        <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chat with your AI Companion</DialogTitle>
              <DialogDescription>
                I'm here for friendly conversation and climate expertise!
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 my-4">
              <p><strong>• Casual chat:</strong> "How are you today?" or "What do you think about movies?"</p>
              <p><strong>• Climate data:</strong> "What's the temperature in Maharashtra?" or "How's the air quality in Delhi?"</p>
              <p><strong>• Environmental topics:</strong> "Tell me about water conservation in India" or "How is climate change affecting Indian agriculture?"</p>
              <p><strong>• Sustainability advice:</strong> "What are some eco-friendly practices for Indian households?"</p>
              <p><strong>• General questions:</strong> "What makes the monsoon season special?" or "Why is biodiversity important?"</p>
            </div>
            <p className="text-sm text-muted-foreground">I'm constantly learning and improving my conversation skills. Let's chat!</p>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ChatbotPage;
