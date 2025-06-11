import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";



export const POST = async (req) => {    
    const user = await currentUser();
    
    try {
        await connect();        
            const data = await req.json();
                if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {                    
            return new Response('Unauthorized', {
                status: 401,
            });
        }
       console.log("User:", user, "Data:", data);
       console.log("Frontend - Sending userMongoId:", user?.publicMetadata?.userMongoId);
       console.log("Backend - Clerk User Metadata:", user?.publicMetadata);

        const newPost = await Post.create({
            user: data.userMongoId,
            name: data.name,
            username: data.username,
            text: data.text,
            profileImg: data.profileImg,
            image: data.image,data
        });      
        
        await newPost.save();
        return new Response(JSON.stringify(newPost), {
            status: 200,
        });
    } catch (error) {        
                console.error("error in Post:", error);
                return new Response("error on Post:", 
                { status: 500, });
  }
};