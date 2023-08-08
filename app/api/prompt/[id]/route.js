// Get 
import { connectToDB } from "@utlis/database";
import Prompt from "@models/prompt";

export async function GET(req, {params}) {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) {
            return new Response("Prompt Not Found", {status : 404})
        }
        return new Response(JSON.stringify(prompt), {
            status : 200
        })
    } catch(error) {
        return new Response(JSON.stringify("Failed to search", {
            status : 500,
        }));
        console.log(error)
    }
}
// Edit 

export async function PATCH(req, {params}) {
    const res = await req.json();
    const prompt = res.prompt;
    const tag = res.tag;
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) {
            return new Response("Prompt not found", {status : 404})
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status : 200})
    } catch(err) {
        // return new Response("Failed to response", {status : 500})
        console.log(err)
    }
}
// Delete 

export async function DELETE(req, {params}) {
    try{
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt Deleted Successfully", {status : 200})
    } catch {
        return new Response("Fail to execute", {status : 500})
    }
}