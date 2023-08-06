import { connectToDB } from "@utlis/database";
import Prompt from "@models/prompt";


export  async function POST (req) {
    const response = await req.json();
    const { userId, prompt, tag } = response;
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator : userId, 
            prompt,
            tag,
        })

        await newPrompt.save();
        return new Response(JSON.stringify({userId, prompt, tag}), {status : 201})
    } catch(error) {
        return new Response("Failed to create a new prompt", {
            status : 500
        })
        console.log(error)
    }
}

// app\api\prompt\new\route.js