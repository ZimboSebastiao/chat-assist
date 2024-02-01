import { AiChat } from "@nlux/react";
import { useAdapter } from "@nlux/openai-react";

import "@nlux/themes/nova.css";

const adapterConfig = {
  apiKey: "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",
  systemMessage:
    "Crie tasks para desenvolvimento de software segundo as informações passadas pelo usuário." +
    "Escreva respostas concisas. Seja preciso.",
};

export const App = () => {
  const chatGptAdapter = useAdapter(adapterConfig);

  return (
    <AiChat
      adapter={chatGptAdapter}
      promptBoxOptions={{
        placeholder: "How can I help you today?",
      }}
    />
  );
};

export default App;
