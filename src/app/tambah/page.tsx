"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("DRAFT");
    const [error, setError] = useState("");
    const router = useRouter();

    // 🔹 Fungsi untuk submit data
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            setError("Judul dan Konten harus diisi!");
            return;
        }

        try {
            await axios.post("http://localhost:3001/posts", {
                title,
                content,
                status,
            });

            alert("Post berhasil ditambahkan!");
            router.push("/"); // Redirect ke halaman utama
        } catch (error) {
            alert("Gagal menambahkan post");
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-6">
            <div className="w-[90%] max-w-[600px] bg-white p-6 shadow-lg rounded-md">
                <h1 className="text-xl font-bold mb-4">📝 Tambah Postingan</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 🔹 Input Judul */}
                    <div>
                        <label className="block font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Masukkan judul"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* 🔹 Input Konten */}
                    <div>
                        <label className="block font-medium">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Masukkan konten"
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
                        Tambah Postingan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
