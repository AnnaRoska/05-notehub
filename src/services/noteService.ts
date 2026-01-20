import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note } from '../types/note.ts';

const API_BASE = 'https://notehub-public.goit.study/api/notes';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE,
  headers: { Authorization: `Bearer ${token}` },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  totalPages: number;
  notes: Note[];
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await api.get('', {
    params: { page, perPage, search },
  });
  return response.data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (payload: CreateNoteParams): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post('', payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/${id}`);
  return response.data;
};