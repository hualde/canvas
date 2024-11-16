import React, { useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  canvasContent: Record<string, string[]>;
  isOpen: boolean;
  onClose: () => void;
}

export function AIChat({ canvasContent, isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      const initialMessage: Message = {
        role: 'assistant',
        content: t('aiChat.initialMessage')
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, t]);

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;

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
          prompt: t('aiChat.prompt', { inputMessage, canvasContent: JSON.stringify(canvasContent) }),
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
      const errorMessage: Message = { role: 'assistant', content: t('aiChat.errorMessage') };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  }, [inputMessage, canvasContent, t]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-0">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[90vh] sm:h-[80vh] flex flex-col relative">
        <div className="p-3 sm:p-4 border-b flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold">{t('aiChat.title')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={t('aiChat.closeAriaLabel')}
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-3 sm:p-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-3 sm:mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg text-sm sm:text-base ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 sm:p-4 border-t flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t('aiChat.inputPlaceholder')}
            className="flex-grow border rounded-l-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={isProcessing}
            className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-r-lg text-sm sm:text-base hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {t('aiChat.sendButton')}
          </button>
        </div>
      </div>
    </div>
  );
}