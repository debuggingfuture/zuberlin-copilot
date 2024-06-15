import OpenAI from 'openai';
import fs from 'fs';
import { Uploadable } from 'openai/uploads.mjs';

// https://platform.openai.com/docs/assistants/tools/file-search/quickstart?lang=node.js

// Initialize the OpenAI API client

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is the default and can be omitted
});

export const createAssistantWithVectoreStore = async (prompt:string, vectoreStoreId:string)=>{
  const assistant = await openai.beta.assistants.create({
    name: "Research Tutor",
    instructions: "You are an expert research scientist in Ethereum and now your role now is tutoring. Use you knowledge base to create wiki and answer questions about Ethereum",
    model: "gpt-4o",
    tools: [{ type: "file_search" }],
    response_format : {
      "type": "json_object"
      // type: 'text'
    }
  });

  await openai.beta.assistants.update(assistant.id, {
    tool_resources: { file_search: { vector_store_ids: [vectoreStoreId] } },
  });
  
  return assistant;

}


export const promptAssistant = async (assistantId:string)=>{
  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: "I need tutorial on talk Overload the execution proposer! From MEV-Boost to ePBS to APS"
    }
  );



  // 

  const run = await openai.beta.threads.runs.createAndPoll(
    thread.id,
    { 
      assistant_id: assistantId,
      instructions: "Please search knowledge base, also websites on https://ethereum.org/en/ and https://ethresear.ch/ for extra references. Identify 10 key concepts and explain that in a TLDR ELI5 style less than 300 words. Include hyperlinks if possible."
    }
  );

  console.log('run', run)

  const results = await openai.beta.threads.messages.list(thread.id)
  console.log(JSON.stringify( results.data));
  console.log('results', results.data?.[0]?.content?.[0].text?.value!)
  // console.log(openai.beta.threads.messages)
}

// Function to generate a prompt response
export const generatePromptResponse = async (prompt: string): Promise<string> =>  {
  try {

    const response = await openai.chat.completions.create({
      messages: [{ role: 'system', content: prompt }],
      model: 'gpt-4o',
      response_format : {
        // "type": "json_object"
        type: 'text'
      },

      max_tokens: 150, // Adjust max tokens as needed
      temperature: 0.1, // Adjust temperature as needed
    });

    // Return the text of the first choice
    return response?.choices?.[0]?.message?.content || '';
  } catch (error) {
    console.error("Error generating prompt response:", error);
    throw error;
  }
}


export const uploadFileVectoreStore = async (fileStream:Uploadable) => {

    // Create a vector store including our two files.
    let vectorStore = await openai.beta.vectorStores.create({
      name: "Research Knowledge Base",
    });
    
    const response = await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id,{
      files: [fileStream]
    })


    return {
      vectorStore
    };
}

export const uploadFile = async (filePath:string) => {
  const fileStream = fs.createReadStream(filePath);

  const response = await openai.files.create({
    file: fileStream,
    purpose: 'assistants',  // Specify the purpose of the file
  });



  return response;
}

