import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import '../styles/chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef(null);

  const API_KEY = 'AIzaSyADOwgv1hspa8jR3TArrQ8HC2Y1e1UL2HA';
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: userMessage
            }]
          }]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const botResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {isMinimized ? (
        <div className="chatbot-minimized" onClick={toggleChat}>
          <i className="ri-message-3-line"></i>
        </div>
      ) : (
        <div className="chatbot-container">
          <div className="chatbot-wrapper">
            <div className="chatbot-header">
              <h4>Tour Assistant</h4>
              <button className="minimize-btn" onClick={toggleChat}>
                <i className="ri-close-line"></i>
              </button>
            </div>
            
            <div className="chatbot-messages">
              {messages.length === 0 && (
                <div className="welcome-message">
                  <p>Hello! I'm your tour assistant. How can I help you today?</p>
                  <p>You can ask me about:</p>
                  <ul>
                    <li>Tour packages</li>
                    <li>Booking information</li>
                    <li>Tour locations</li>
                    <li>Pricing details</li>
                  </ul>
                </div>
              )}
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="message bot-message">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <Form onSubmit={handleSubmit} className="chatbot-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about tours..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                <i className="ri-send-plane-fill"></i>
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 