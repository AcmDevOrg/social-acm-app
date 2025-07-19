import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
    const user = await currentUser();
    try {
        await connect();
        const { postId } = await req.json();
        const post = await Post.findById(postId).populate('comments');
        return new Response(JSON.stringify(post), {
            status: 200,
            headers: {
                'content-type':'application/json',
            },
        });
    } catch (error) {
        console.log('Error getting post:', error);
        return new Response(JSON.stringify({ error: 'Error getting post' }), {
            status: 500,
            headers: {
                'content-type':'application/json',
            },
        });            
    }
};