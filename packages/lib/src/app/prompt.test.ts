import { describe, expect, test } from 'vitest';
import { generatePromptResponse, uploadFile } from '../adapters/openai';
import path from 'path';
import { generatePrompt } from './prompt';


describe('prompt', () => {

    const prompt = "hello";
    test('#generatePrompt', async () => {
        
        // const res = await uploadFile(path.resolve(__dirname, '../../../../files/talk_2.pdf'))

        // const response = await generatePrompt(res.id)

        // console.log('response', response)
        // expect(typeof response).toEqual('string')
    })



});