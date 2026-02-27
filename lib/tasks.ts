import { apiFetch } from "@/lib/api";
import type { PaginatedResponse, Task, TaskStatus } from "@/types/task";

export async function fetchTasks(params: {
  page?: number;
  status?: string;
}) {
  const q = new URLSearchParams();
  if (params.page) q.set("page", String(params.page));
  if (params.status) q.set("status", params.status);

  const { ok, status, json } = await apiFetch<PaginatedResponse<Task>>(
    `/tasks?${q.toString()}`,
    { method: "GET", headers: { "Content-Type": "application/json" } } // harmless
  );

  if (!ok) throw { status, json };
  return json as PaginatedResponse<Task>;
}

export async function createTask(payload: {
  title: string;
  description?: string;
  status: TaskStatus;
  due_at: string;
}) {
  const { ok, status, json } = await apiFetch<{ data: Task }>(`/tasks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return { ok, status, json };
}

export async function updateTaskStatus(id: string, statusValue: TaskStatus) {
  const { ok, status, json } = await apiFetch(`/tasks/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status: statusValue }),
  });

  return { ok, status, json };
}

export async function deleteTask(id: string) {
  const { ok, status, json } = await apiFetch(`/tasks/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return { ok, status, json };
}