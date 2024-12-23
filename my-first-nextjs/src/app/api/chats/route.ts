import { NextResponse } from "next/server";
import { Message } from "../../../../models/message";
import dbConnect from "../../../../lib/mongodb";

export async function GET() {
    try {
        await dbConnect();
        const messages = await Message.find({});
        return NextResponse.json(messages);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { user, message } = await req.json();
        await dbConnect();
        const newMessage = await Message.create({ user, message });
        console.log("New message created:", newMessage);
        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        console.error("Error creating message:", error);
        return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
    }
}
