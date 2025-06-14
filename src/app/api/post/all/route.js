import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";

export const POST = async (req) => {
    try {
        await connect();
        const feedPosts = await Post.find().sort({ createdAt: -1 });
        return new Response(JSON.stringify(feedPosts), {
            status: 200,
        });
    } catch (error) {
        console.log('Error getting posts:', error);
        return new Response('error getting posts', {
            status: 500,
        });
    }
};