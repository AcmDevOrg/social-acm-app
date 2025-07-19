import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";

export const GET = async () => {
    try {
        await connect();
        const feedPosts = await Post.find().sort({ createdAt: -1 });
        return new Response(JSON.stringify(feedPosts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log('Error getting posts:', error);
        return new Response(JSON.stringify({error: 'error getting posts'}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};