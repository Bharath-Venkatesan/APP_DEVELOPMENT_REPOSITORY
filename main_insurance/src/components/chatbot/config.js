import { createChatBotMessage } from 'react-chatbot-kit';

const Config = {
  initialMessages: [createChatBotMessage(`Hi! How can I help you today?`)],
  botName: "InsuranceBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#fc2222",
    },
    chatButton: {
      backgroundColor: "#fc2222",
    },
  },
};

export default Config;
