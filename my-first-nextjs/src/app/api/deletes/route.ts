import dbConnect from "../../../../lib/mongodb";
import Post from "../../../../models/post";

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return new Response(
                JSON.stringify({ error: "Post ID is required." }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        await dbConnect();

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return new Response(
                JSON.stringify({ error: "Post not found." }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        return new Response(
            JSON.stringify({ message: "Post deleted successfully." }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error deleting post:", error);

        return new Response(
            JSON.stringify({ error: "Failed to delete post." }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
