// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  due_at: string;
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("");

  const fetchTasks = async (
    pageNumber = 1,
    statusFilter = status
  ) => {
    const query = new URLSearchParams();

    query.append("page", pageNumber.toString());

    if (statusFilter) {
      query.append("status", statusFilter);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks?${query.toString()}`
    );

    const data = await res.json();

    setTasks(data.data);
    setMeta(data.meta);
    setPage(pageNumber);
  };

  useEffect(() => {
    fetchTasks(1);
  }, []);

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>HMCTS Task Manager</h1>

      <TaskForm onTaskCreated={() => fetchTasks(page)} />

      <div style={{ margin: "20px 0" }}>
        <label>Status: </label>
        <select
          value={status}
          onChange={(e) => {
            const newStatus = e.target.value;
            setStatus(newStatus);
            fetchTasks(1, newStatus);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <TaskList tasks={tasks} refresh={() => fetchTasks(page)} />

      {meta && (
        <div style={{ marginTop: "20px" }}>
          <button
            disabled={page <= 1}
            onClick={() => fetchTasks(page - 1)}
          >
            Previous
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {meta.current_page} of {meta.last_page}
          </span>

          <button
            disabled={page >= meta.last_page}
            onClick={() => fetchTasks(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}