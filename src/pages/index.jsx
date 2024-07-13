import { AiChat } from "@nlux/react";
import { useAdapter } from "@nlux/openai-react";
import "@nlux/themes/nova.css";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
console.log('API Key:', apiKey);

const adapterConfig = {
  apiKey: `${apiKey}`,
  systemMessage:
    "Crie tasks ou casos de teste para software developer segundo as informações passadas pelo usuário." +
    "Separe as respostas em títulos e subtítulos." +
    "Escreva respostas concisas. Seja preciso e criativo.",
};

const fetchWithRetry = async (url, options, retries = 3, backoff = 3000) => {
  try {
    const response = await fetch(url, options);
    if (response.status === 429 && retries > 0) {
      console.warn(`Too many requests. Retrying in ${backoff / 1000} seconds...`);
      await new Promise(res => setTimeout(res, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    throw error;
  }
};

export const App = () => {
  const chatGptAdapter = useAdapter({
    ...adapterConfig,
    fetchFunction: async (url, options) => fetchWithRetry(url, options),
  });

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
