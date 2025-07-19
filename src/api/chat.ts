// Mock API for development - replace with actual IO Intelligence API call
export async function callChatAPI(messages: any[]) {
  // This would be replaced with actual IO Intelligence API call
  // For now, return a mock response
  
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(1000); // Simulate API delay
  
  return {
    reply: {
      content: "I'm here to support you. This is a mock response - please configure your IO Intelligence API key to get real therapeutic responses."
    }
  };
}