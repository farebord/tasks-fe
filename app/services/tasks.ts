import { Task } from "../types/task";
import api from "./api";

export const fetchTasks = async () => {
  const response = await api.get<Task[]>("/api/tasks");
  return response.data;
};

export const addTask = async (title: string, deadline: string) => {
  const response = await api.post("/api/tasks", { title, deadline });
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/api/tasks/${id}`);
};

export const toggleTaskComplete = async (id: string) => {
  const response = await api.patch(`/api/tasks/${id}/toggle`);
  return response.data;
};
