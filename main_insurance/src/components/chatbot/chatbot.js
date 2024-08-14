import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import './chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');
      
      setTimeout(() => processMessage(input), 300); 
    }
  };

  const processMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    let response = '';
    let path = '';

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = 'Hello! How can I assist you today?';
    } else if (lowerMessage.includes('home')) {
      response = 'Navigating to the Home page.';
      path = '/home';
    } 
    else if (lowerMessage.includes('logout')) {
      response = 'Logging you out.';
      path = '/login';
    } 

    else if (lowerMessage.includes('support')) {
      response = 'Navigating to Support Page.';
      path = '/supportform';
    } 
    
    
    else if (lowerMessage.includes('healthinsurance') || lowerMessage.includes('health')) {
      response = 'Navigating to the Health Insurance section.';
      path = '/health-insurance';
    }  else if (lowerMessage.includes('bikeinsurance') || lowerMessage.includes('bike')) {
      response = 'Navigating to the Bike Insurance section.';
      path = '/bike-insurance';
    } 
    else if (lowerMessage.includes('carinsurance') || lowerMessage.includes('car')) {
      response = 'Navigating to the Car Insurance section.';
      path = '/car-insurance';
    } 
    
    else if (lowerMessage.includes('homeinsurance') || lowerMessage.includes('home')) {
      response = 'Navigating to the Home Insurance section.';
      path = '/home-insurance';
    } 
    else if (lowerMessage.includes('travelinsurance') || lowerMessage.includes('travel')) {
      response = 'Navigating to the Travel Insurance section.';
      path = '/travel-insurance';
    } 

    else if (lowerMessage.includes('petinsurance') || lowerMessage.includes('pet')) {
      response = 'Navigating to the Pet Insurance section.';
      path = '/pet-insurance';
    } 
    
    
    else {
      response = "I'm not sure how to help with that.";
    }

    
    setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);

    
    if (path) {
      setTimeout(() => navigate(path), 500); 
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'expanded' : ''}`} onClick={!isOpen ? toggleChatbot : undefined}>
      {!isOpen && (
        <FontAwesomeIcon icon={faRobot} className="chatbot-icon" />
      )}
      {isOpen && (
        <div className="chatbot-content">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <button onClick={toggleChatbot} className="close-btn">X</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              onChange={handleUserInput}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="chatbot-input"
            />
            <button onClick={handleSendMessage} className="chatbot-send-button">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
