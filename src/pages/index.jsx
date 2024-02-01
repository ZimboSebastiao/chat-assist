import { AiChat } from "@nlux/react";
import { useAdapter } from "@nlux/openai-react";
import "@nlux/themes/nova.css";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const adapterConfig = {
  apiKey: `${apiKey}`,
  systemMessage:
    "Crie tasks para desenvolvimento de software segundo as informações passadas pelo usuário." +
    "Escreva respostas concisas. Seja preciso.",
};

export const App = () => {
  const chatGptAdapter = useAdapter(adapterConfig);

  return (
    <>
      <h1>Gerador de Tarefa</h1>
      <p>
        Utilize este sistema para gerar tarefas usando o OpenAI como
        inteligência artificial que irá gerar respostas precisas e estruturadas.
      </p>
      <div className="limitador">
        <AiChat
          adapter={chatGptAdapter}
          promptBoxOptions={{
            placeholder: "Como posso te ajudar hoje?",
          }}
        />
      </div>
    </>
  );
};

export default App;
