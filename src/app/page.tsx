"use client";

import { Table, Button, message } from "antd";
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

  // 🔹 Fetch data dari backend
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/posts");
      setPosts(response.data);
    } catch (error) {
      message.error("Gagal mengambil data");
    }
    setLoading(false);
  };

  // 🔹 Panggil fetchPosts saat halaman dimuat
  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔹 Kolom untuk tabel Ant Design
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Konten",
      dataIndex: "content",
      key: "content",
      ellipsis: true, // Potong teks panjang
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "PUBLISHED" ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Aksi",
      key: "action",
      render: (record: Post) => (
        <div className="flex gap-2">
          <Button className="bg-purple-500" type="link" href={`/edit/${record.id}`}>
            Edit
          </Button>
          <Button type="primary" onClick={() => publishPost(record.id)}>
            Publish
          </Button>
          <Button danger onClick={() => deletePost(record.id)}>
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  // 🔹 Fungsi untuk publish post
  const publishPost = async (id: string) => {
    try {
      await axios.put(`http://localhost:3001/posts/${id}`, { status: "PUBLISHED" });
      message.success("Post berhasil dipublish!");
      fetchPosts();
    } catch (error) {
      message.error("Gagal mempublish post");
    }
  };

  // 🔹 Fungsi untuk hapus post
  const deletePost = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      message.success("Post berhasil dihapus!");
      fetchPosts();
    } catch (error) {
      message.error("Gagal menghapus post");
    }
  };

  return (
    <div className="w-full min-h-screen h-max flex items-center justify-center p-6">
      <div className="w-[90%] max-w-[1200px] h-full bg-white p-6 shadow-lg rounded-md">
        <div className="w-full flex items-center justify-between py-4">
          <h1 className="text-xl font-bold mb-4">📌 Postingan</h1>
          <Link href={'/tambah'}>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs cursor-pointer rounded">
              Tambah 
            </button>
          </Link>
        </div>
        <Table
          columns={columns}
          dataSource={posts}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}
