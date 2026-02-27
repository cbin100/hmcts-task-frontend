"use client";

import { useState } from "react";
import { createTask } from "@/lib/tasks";
import type { TaskStatus } from "@/types/task";

type ValidationErrors = {
  title?: string[];
  description?: string[];
  due_at?: string[];
  status?: string[];
};

export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const { ok, status, json } = await createTask({
      title,
      description,
      status: "pending" as TaskStatus,
      due_at: dueAt,
    });

    if (!ok) {
      if (status === 422) setErrors(json.errors ?? {});
      setLoading(false);
      return;
    }

    setTitle("");
    setDescription("");
    setDueAt("");
    setLoading(false);
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-3">
      <h2 className="text-lg font-semibold">Create Task</h2>

      <div>
        <input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
      </div>

      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>
        )}
      </div>

      <div>
        <input
          required
          type="datetime-local"
          value={dueAt}
          onChange={(e) => setDueAt(e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.due_at && <p className="text-red-500 text-sm mt-1">{errors.due_at[0]}</p>}
      </div>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}