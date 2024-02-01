import { AiChat } from "@nlux/react";
import { useAdapter } from "@nlux/openai-react";
import "@nlux/themes/nova.css";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const adapterConfig = {
  apiKey: `${apiKey}`,
  systemMessage:
    "Crie tasks ou casos de teste para software developer segundo as informações passadas pelo usuário." +
    "Separe as respostas em títulos e subtítulos" +
    "Escreva respostas concisas. Seja preciso e criativo.",
};

export const App = () => {
  const chatGptAdapter = useAdapter(adapterConfig);

  return (
    <>
      <h1>Gerador de Tarefa</h1>
      <p className="sty-p">
        Utilize este sistema para gerar tarefas usando o OpenAI como
        inteligência artificial que irá gerar respostas precisas e estruturadas.
      </p>
      <div className="limitador">
        <AiChat
          className="custom-ai-chat-comp"
          adapter={chatGptAdapter}
          personaOptions={{
            bot: {
              name: "Rafiki",
              picture: "/images/imagem.png",
              tagline: "Gerar descrição de tarefa com inteligência artificial!",
            },
          }}
          promptBoxOptions={{
            placeholder: "Como posso te ajudar hoje?",
          }}
        />
      </div>
    </>
  );
};

export default App;
