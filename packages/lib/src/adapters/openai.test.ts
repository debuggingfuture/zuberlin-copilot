import { beforeEach, describe, expect, test } from 'vitest';
import { createAssistantWithVectoreStore, generatePromptResponse, promptAssistant, uploadFile, uploadFileVectoreStore } from './openai';
import path from 'path';
import fs from 'fs';
import { generatePrompt } from '../app/prompt';


describe('openai', () => {
    let filePath = path.resolve(__dirname, '../../../../files/talk_2.pdf')
    let fileStream;
    beforeEach(async ()=>{
        fileStream = fs.createReadStream(filePath);
        // fileStream = await uploadFile(filePath)
    })

    const prompt = "hello";
    test('#generatePromptResponse', async () => {
        const response = await generatePromptResponse(prompt)

        expect(typeof response).toEqual('string')
    })

    test('#uploadFile', async ()=>{
        const res = await uploadFile(path.resolve(__dirname, './openai.ts'))

        expect(res.id.startsWith('file')).toEqual(true)
    })

    
    test('#uploadFileVectorStore', async ()=>{
        const res = await uploadFile(path.resolve(__dirname, './openai.ts'))
        console.log('res', res)
        
        expect(res.id.startsWith('vectore_store')).toEqual(true)
    })


    test.only('#promptAssistant', async ()=>{
        const {vectorStore} = await uploadFileVectoreStore(fileStream)
        console.log('vectorStore', vectorStore)
        const assistant = await createAssistantWithVectoreStore('', vectorStore.id);
        const response = await promptAssistant(assistant.id)
        console.log('response', response)
        expect(typeof response).toEqual('string')
    });

});