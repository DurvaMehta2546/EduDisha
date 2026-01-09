import api from './api';

export interface TextNoteData {
  title: string;
  subject: string;
  content?: string;
  tags?: string[];
}

export interface FileNoteData {
  title: string;
  subject: string;
  file: File;
  tags?: string[];
}

export const notesService = {
  createTextNote: async (data: TextNoteData) => {
    const response = await api.post('/notes/text', data);
    return response.data;
  },

  uploadFileNote: async (data: FileNoteData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('subject', data.subject);
    formData.append('file', data.file);
    if (data.tags) {
      formData.append('tags', JSON.stringify(data.tags));
    }

    const response = await api.post('/notes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getNotes: async (subject?: string) => {
    const params = subject ? { subject } : {};
    const response = await api.get('/notes', { params });
    return response.data;
  },

  updateNote: async (noteId: string, data: Partial<TextNoteData>) => {
    const response = await api.put(`/notes/${noteId}`, data);
    return response.data;
  },

  deleteNote: async (noteId: string) => {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  }
};
