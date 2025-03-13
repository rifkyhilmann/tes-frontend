"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


interface Post {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/posts");
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const publishPost = async (id: string) => {
    try {
      await axios.put(`http://localhost:3001/posts/${id}`, { status: "PUBLISHED" });
      alert("berhasil di publiiish");
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      alert('Post berhasil dihapus!')
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-[90%] max-w-[1200px] bg-white p-6 shadow-lg rounded-md">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-xl font-bold">📌 Postingan</h1>
          <Link href={'/tambah'}>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded">
              Tambah
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Konten</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center p-4">Loading...</td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4">Tidak ada data</td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="border-t border-gray-200">
                    <td className="p-3">{post.title}</td>
                    <td className="p-3 truncate max-w-[200px]">{post.content}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded ${
                          post.status === "PUBLISHED" ? "bg-green-500 text-white" : "bg-gray-300"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <Link href={`/edit/${post.id}`}>
                        <button className="px-2 py-1 bg-purple-500 text-white rounded text-xs cursor-pointer">Edit</button>
                      </Link>
                      <button onClick={() => publishPost(post.id)} className="px-2 py-1 bg-green-500 cursor-pointer text-white rounded text-xs">
                        Publish
                      </button>
                      <button onClick={() => deletePost(post.id)} className="px-2 py-1 bg-red-500 cursor-pointer text-white rounded text-xs">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}