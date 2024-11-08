import React, { useState, useCallback, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  canvasContent: Record<string, string[]>;
}

export function AIChat({ canvasContent }: AIChatProps) {
  const { subscriptionTier } = useAuthWithSubscription();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isChatOpen && subscriptionTier === 'premium') {
      const initialMessage: Message = {
        role: 'assistant',
        content: "Hello! I'm your AI assistant. I have information about your current canvas. How can I help you today?"
      };
      setMessages([initialMessage]);
    }
  }, [isChatOpen, subscriptionTier]);

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || subscriptionTier !== 'premium') return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Based on the following canvas content, please answer this question or provide insights: ${inputMessage}\n\nCanvas Content: ${JSON.stringify(canvasContent)}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.result };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = { role: 'assistant', content: 'I apologize, there was an error processing your message. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  }, [inputMessage, canvasContent, subscriptionTier]);

  const renderChatButton = () => {
    return (
      <button
        onClick={() => subscriptionTier === 'premium' ? setIsChatOpen(true) : alert('This feature is only available for premium users. Please upgrade to access the AI assistant.')}
        className={`fixed bottom-6 right-6 p-3 bg-purple-600 text-white rounded-full shadow-lg transition-all duration-200 flex items-center justify-center z-50 ${
        subscriptionTier === 'premium' ? 'hover:bg-purple-700 hover:scale-110' : 'opacity-50 cursor-not-allowed'
      }`}
        aria-label={subscriptionTier === 'premium' ? 'AI Assistant' : 'AI Assistant (Premium Feature)'}
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  };

  return (
    <>
      {renderChatButton()}

      {isChatOpen && subscriptionTier === 'premium' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[80vh] flex flex-col relative">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">AI Assistant</h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close AI Assistant"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={isProcessing}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}