import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";

export const POST = async (req) => {
  try {
    await connect();
    const data = await req.json();

    const posts = await Post.find({ userMongoId: data.userId }).sort({
      createdAt: -1,
    }).populate("userMongoId");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch the post data", { status: 500 });
  }
};
