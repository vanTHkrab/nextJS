import { NextResponse } from "next/server";
import Post from "../../../../models/post";
import dbConnect from "../../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const { title, content, image } = await req.json();

        if (!title || !content || !image) {
            return NextResponse.json({ error: "All fields (title, content, image) are required." }, { status: 400 });
        }

        await dbConnect();

        const newPost = await Post.create({ title, content, image });

        newPost.save();

        const baseUrl = process.env.BASE_URL || "http://localhost:3000"; // Use environment variable if available
        return NextResponse.redirect(`${baseUrl}/`);

    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
    }
}
