// components/TaskForm.tsx
"use client";

import { useState } from "react";

type ValidationErrors = {
  title?: string[];
  description?: string[];
  due_at?: string[];
  status?: string[];
};

export default function TaskForm({
  onTaskCreated,
}: {
  onTaskCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            status: "pending",
            due_at: dueAt,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors ?? {});
        return;
      }

      // Success
      setTitle("");
      setDescription("");
      setDueAt("");
      onTaskCreated();

    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
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
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title[0]}
          </p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description[0]}
          </p>
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
        {errors.due_at && (
          <p className="text-red-500 text-sm mt-1">
            {errors.due_at[0]}
          </p>
        )}
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