import dbConnect from "../../../../lib/mongodb";
import Post from "../../../../models/post";

export async function GET() {
    try {
        await dbConnect();

        const data = await Post.find({});

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching data:", error);

        return new Response(
            JSON.stringify({ error: "Failed to fetch data." }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
