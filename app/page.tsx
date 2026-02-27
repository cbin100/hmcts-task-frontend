"use client";

import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { fetchTasks } from "@/lib/tasks";
import type { PaginationMeta, Task } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("");

  const load = async (pageNumber = 1, statusFilter = status) => {
    const res = await fetchTasks({ page: pageNumber, status: statusFilter });
    setTasks(res.data);
    setMeta(res.meta);
    setPage(pageNumber);
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>HMCTS Task Manager</h1>

      <TaskForm onTaskCreated={() => load(page)} />

      <div style={{ margin: "20px 0" }}>
        <label>Status: </label>
        <select
          value={status}
          onChange={(e) => {
            const newStatus = e.target.value;
            setStatus(newStatus);
            load(1, newStatus);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <TaskList tasks={tasks} refresh={() => load(page)} />

      {meta && (
        <div style={{ marginTop: "20px" }}>
          <button disabled={page <= 1} onClick={() => load(page - 1)}>
            Previous
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {meta.current_page} of {meta.last_page}
          </span>

          <button
            disabled={page >= meta.last_page}
            onClick={() => load(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}