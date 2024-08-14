class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet() {
      const greetingMessage = this.createChatBotMessage("Hello! How can I assist you with your insurance needs today?");
      this.updateChatbotState(greetingMessage);
    }
  
    handleDefault() {
      const defaultMessage = this.createChatBotMessage("I'm not sure how to respond to that. Can you please rephrase?");
      this.updateChatbotState(defaultMessage);
    }
  
    updateChatbotState(message) {
      this.setState(prevState => ({
        ...prevState,
        messages: [...prevState.messages, message]
      }));
    }
  }
  
  export default ActionProvider;
  