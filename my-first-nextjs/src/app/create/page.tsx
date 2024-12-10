"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Create() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !content || !image) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content, image }),
            });

            if (response.ok) {
                router.push("/");
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Failed to create post");
            }
        } catch (error) {
            console.error("Error during post creation:", error);
            alert("Failed to create post");
        }
    };


    return (
        <div className="container mx-auto py-10">
            <h3 className="text-2xl font-bold">Create a new post</h3>
            <hr className="my-3" />
            <Link
                href="/"
                className="bg-gray-500 inline-block text-white border py-3 px-2 rounded my-2"
            >
                Back to home
            </Link>
            <form onSubmit={handleSubmit} className="my-5"  encType="multipart/form-data">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                    placeholder="Post Title"
                />
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                    placeholder="Post Content"
                ></textarea>
                <input
                    onChange={(e) => setImage(e.target.value)}
                    type="text"
                    className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                    placeholder="Image URL"
                />
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded my-2"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}
