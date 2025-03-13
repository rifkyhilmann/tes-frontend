"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const EditPost = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("DRAFT");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Ambil data postingan berdasarkan ID
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3001/posts/${id}`);
                setTitle(data.title);
                setContent(data.content);
                setStatus(data.status);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPost();
    }, [id, router]);

    // 🔹 Fungsi untuk update postingan
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            setError("Judul dan Konten harus diisi!");
            return;
        }

        try {
            await axios.put(`http://localhost:3001/posts/${id}`, {
                title,
                content,
                status,
            });

            alert("Post berhasil diperbarui!");
            router.push("/"); // Redirect ke halaman utama
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-6">
            <div className="w-[90%] max-w-[600px] bg-white p-6 shadow-lg rounded-md">
                <h1 className="text-xl font-bold mb-4">✏️ Edit Postingan</h1>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <p className="text-red-500">{error}</p>}

                        {/* 🔹 Input Judul */}
                        <div>
                            <label className="block font-medium">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* 🔹 Input Konten */}
                        <div>
                            <label className="block font-medium">Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={4}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* 🔹 Select Status */}
                        <div>
                            <label className="block font-medium">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                                <option value="ARCHIVED">Archived</option>
                            </select>
                        </div>

                        {/* 🔹 Tombol Submit */}
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                            Simpan Perubahan
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditPost;
