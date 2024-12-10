"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
    _id: string;
    title: string;
    content: string;
    image: string;
}

export default function Home() {
    const [postData, setPostData] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/gets");
                const data = await res.json();
                setPostData(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="container mx-auto my-3">
            <h1 className="text-3xl font-bold text-center">Welcome to my first Next.js app</h1>
            <hr className="my-3" />
            <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                <Link href="/create">Create a new post</Link>
            </button>

            <div className="grid grid-cols-3 mt-5 gap-3">
                {postData.map((post) => (
                    <div key={post._id} className="shadow-xl my-10 p-10 rounded-xl">
                        <h4 className="text-2xl font-bold">{post.title}</h4>
                        <p className="text-lg">{post.content}</p>
                        <p className="text-sm text-gray-500">{post.image}</p>
                        <div className="mt-5">
                            <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 mx-2 rounded">
                                <Link href={`/post/${post._id}`}>View Post</Link>
                            </button>
                            <button className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 mx-2 rounded">
                                <Link href={`/edit/${post._id}`}>Edit Post</Link>
                            </button>
                            <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 mx-2 rounded">
                                <Link href={`/delete/${post._id}`}>Delete Post</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
