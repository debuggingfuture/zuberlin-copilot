import { uploadFileVectoreStore, generatePromptResponse, createAssistantWithVectoreStore } from "../adapters/openai"

export const generatePrompt = async (vectoreStoreId:string)=>{


  const prompt = 'Given the attached file. Search https://ethereum.org/en/ and https://ethresear.ch/ for extra references. Identify 10 key concepts and explain that in a TLDR ELI5 style less than 300 words. Include hyperlinks if possible.'
  const response = await createAssistantWithVectoreStore(prompt, vectoreStoreId)

  console.log('response', response)
}
