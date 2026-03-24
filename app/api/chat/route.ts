import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const json = await req.json();
  const { message } = json;
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "From now on, you will behave as a friendly person and have a conversation with the user about A social work . You need to chat with warm and engaging tone. You need to ask 5 questions based my json file. And then if questions is ended, give me notice feedback about strengths and weaknesses.Feedback need to start with :::/// to identify and I need only notice and feedback. I need to get this sentence for notice and notice sentence has to be first of your response. 'I’ve put together a detailed report for you. Check your email for insights and next steps!'",
      },
      {
        role: "system",
        content: '[{sentence1:"A social work meets a client who has come to discuss troubling feelings. In session the client initiates very little conversation and there are long periods of silence. The social work should FIRST Patiently wait for the client to proceed.",},{sentence2:"A social work supervisor sees a social worker in a movie theater with a client. When asked directly, the social worker denies that any boundary violation has occurred. The supervisor should NEXT:Discuss ethical guidelines with the social worker",},{sentence3:"A teenager and mother see a social worker because of increased anger, family conflict, and defiance at home. The mother reveals that the teenager was sexually abused at an early age, and has never talked about it with anyone. The teenager denies memory of the abuse. The social worker should FIRST: Normalize the teenager’s reactions",},{sentence4:"A female client is seen by a social worker for feeling depressed. She explains that she does not understand why she feels this way, because she has no problems in her life. She further explains that she has a great job, a nice spouse, and healthy children. The social worker should FIRST:Clarify what the client means by depression",},{sentence5:"A client, diagnosed with borderline personality disorder, is verbalizing destructive thoughts directed at herself. While she does admit to depression, she denies any intention to act on the thoughts. The SWKR should FIRST: Complete a suicide risk assessment",},{"sentence6": "A social worker sees a couple after the birth of their first child. They are very stressed by the demands of parenthood. What should the social worker do FIRST:Ask the couple what family resources are available"},{"sentence7": "A teenager and mother see a social worker because of increased anger, family conflict, and defiance at home.The mother reveals that the teenager was sexually abused at an early age, and has never talked about it with anyone. The teenager denies memory of the abuse.The social worker should FIRST:Normalize the teenager’s reactions"},{"sentence8": "A social worker assesses an adolescent who feels worthless and who recently began failing in school.For the past two months, she has had difficulty sleeping and maintaining concentration in school.The teachers describe her as inattentive, irritable, and agitated.What should the social worker do FIRST:Evaluate the client for depression"},{"sentence9": "A teenager and mother see a social worker because of increased anger, family conflict, and defiance at home. The mother reveals that the teenager was sexually abused at an early age, and has never talked about it with anyone. The teenager denies memory of the abuse. The social worker should FIRST:Normalize the teenager’s reactions"},{"sentence10": "A recently widowed 86 year old man is encouraged by his minister to obtain mental health services. Since the death of his wife of 50 years, he has not been able to sleep, has little energy, and often skips meals. The social worker conducts an interview. The social worker should FIRST:Provide information about depression"},{"sentence11": "During an initial session a client becomes progressively more anxious and overwhelmed while discussing presenting problems. The social worker should FIRST:Assist the client in breaking the concerns down into more manageable parts"},{"sentence12": "A social work meets a client who has come to discuss troubling feelings. In session the client initiates very little conversation and there are long periods of silence. The social work should FIRST Patiently wait for the client to proceed."},{"sentence13": "A social work meets a client who has come to discuss troubling feelings. In session the client initiates very little conversation and there are long periods of silence. The social work should FIRST Patiently wait for the client to proceed."}]',
      },
      ...message,
    ],
  };

  const chatCompletion = await client.chat.completions.create(params);
  const reply = chatCompletion.choices[0]?.message?.content;

  return NextResponse.json({ reply: reply }, { status: 200 });
}
