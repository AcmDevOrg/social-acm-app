import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req) => {
  try {
    await connect();

    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userMongoId = user?.publicMetadata?.userMongoId;

    if (!userMongoId || typeof userMongoId !== "string") {
      console.error("Missing userMongoId in publicMetadata:", user.publicMetadata);
      return new Response("Missing userMongoId", { status: 400 });
    }

    const data = await req.json();

    const newPost = await Post.create({
      user: userMongoId, // ✅ must be a valid ObjectId string
      name: data.name,
      username: data.username,
      text: data.text,
      profileImg: data.profileImg,
      image: data.image,
    });

    return new Response(JSON.stringify({ newPost }), { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response("Error creating post", { status: 500 });
  }
};
