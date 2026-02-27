// components/TaskList.tsx
"use client";

import { Task } from "@/app/page";

export default function TaskList({
  tasks,
  refresh,
}: {
  tasks: Task[];
  refresh: () => void;
}) {
  const updateStatus = async (id: string, status: string) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );
  refresh();
};

const deleteTask = async (id: string) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
    { method: "DELETE" }
  );
  refresh();
};

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => {
        const overdue = new Date(task.due_at) < new Date();

        return (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              background: overdue ? "#ffe6e6" : "#fff",
            }}
          >
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due: {new Date(task.due_at).toLocaleString()}</p>

            <select
              value={task.status}
              onChange={(e) => updateStatus(task.id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}