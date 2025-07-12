import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req) => {
    const user = await currentUser();
    try {
        await connect();
        const data = await req.json();
        const postId = await Post.findById(data.postId);
        return new Response(JSON.stringify(postId), { status: 200 });
    } catch (error) {
        console.log('Error getting post:', error);
        return new Response(JSON.stringify({ error: 'Error getting post' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};