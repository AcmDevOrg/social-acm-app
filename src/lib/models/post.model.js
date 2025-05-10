import mongoose from "mongoose";
// eslint-disable-next-line no-unused-vars
import { comment } from "postcss";

const postSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        image: {
            type: String,           
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profileImg: {
            type: String,
            required: true,
        },
        likes: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            default: [],
        },
        comments: {
            type: [
                {
                    comment: String,
                    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                    name: String,
                    username: String,
                    profileImg: String,
                    createdAt: { type: Date, default: Date.now },
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;