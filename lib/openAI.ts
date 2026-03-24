import { OpenAIMessage } from '@/types';
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true  
});

export async function createAssistant(vectorStoreId: string) {
    const assistant = await openai.beta.assistants.create({
        instructions: "You are a friendly and knowledgeable assistant. Engage in normal conversation, answer questions, and provide helpful information across various topics.",
        name: "General Chat Assistant",
        model: 'gpt-4o',
        tools: [{ type: 'file_search' }],
        tool_resources: {
            file_search: {
              vector_store_ids: [vectorStoreId],
            },
        },
    })
    return assistant
}

export async function updateAssistant(assistantId: string, vectorStoreId: string) {
    const assistant = await openai.beta.assistants.update(assistantId, {
        tools: [{ type: 'file_search' }],
        tool_resources: {
            file_search: {
                vector_store_ids: [vectorStoreId],
            },
        },
    })
    return assistant
}

export async function createThread() {
    const thread = await openai.beta.threads.create()
    return thread
}

interface StreamValue {
    text: string;
}
  
export async function runThread(threadId: string, assistantId: string): Promise<StreamValue[]> {
    const fullText: StreamValue[] = [];
    return new Promise((resolve, reject) => {
        openai.beta.threads.runs
            .stream(threadId, {
                assistant_id: assistantId,
            })
            .on('textDelta', (_, snapshot) => {
                fullText.push({ text: snapshot.value }); 
            })
            .on('textDone', (content, _) => {
                fullText.push({ text: content.value });
                resolve(fullText); 
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

export async function removeThread(threadId: string) {
    const thread = await openai.beta.threads.del(threadId)
    return 'success';
}

export async function createMessage(threadId: string, message: OpenAIMessage) {
    const _message = await openai.beta.threads.messages.create(threadId, message)
    return _message
}

export async function listMessages(threadId: string): Promise<OpenAIMessage[]> {
    const response = await openai.beta.threads.messages.list(threadId)
  
    const messages = response.data.map(message => {
      const { text } = message.content[0] as OpenAI.Beta.Threads.Messages.TextContentBlock
      return {
        content: text.value,
        role: message.role,
      } as OpenAIMessage
    })
    messages.reverse()
  
    return messages
}

export async function createVectorStore() {
  const vectorStore = await openai.vectorStores.create({
    name: `rag-store-${new Date().toISOString()}`,
  })

  return vectorStore
}

export async function createFile(formData: FormData) {
    const fileObj = formData.get('file') as File | null
    if (!fileObj) {
      throw new Error('No file provided')
    }
  
    const file = await openai.files.create({
      file: fileObj,
      purpose: 'assistants',
    })
  
    return file
  }
  
  export async function attachFiles(vectorStoreId: string, file_ids: string[]) {
    const fileBatch = await openai.vectorStores.fileBatches.createAndPoll(vectorStoreId, { file_ids })
    return fileBatch
  }