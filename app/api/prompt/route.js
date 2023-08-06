import { connectToDB } from "@utlis/database";
import Prompt from "@models/prompt";

export async function GET(req) {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {
            status : 200
        })
    } catch(error) {
        return new Response(JSON.stringify("Failed to search", {
            status : 500,
        }));
        console.log(error)
    }
}