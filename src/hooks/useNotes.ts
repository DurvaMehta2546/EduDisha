import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notesService, TextNoteData, FileNoteData } from '@/services/notes.service';
import { toast } from 'sonner';

export const useNotes = (subject?: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', subject],
    queryFn: () => notesService.getNotes(subject)
  });

  const createTextNote = useMutation({
    mutationFn: (data: TextNoteData) => notesService.createTextNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create note');
    }
  });

  const uploadFileNote = useMutation({
    mutationFn: (data: FileNoteData) => notesService.uploadFileNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('File uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upload file');
    }
  });

  const updateNote = useMutation({
    mutationFn: ({ noteId, data }: { noteId: string; data: Partial<TextNoteData> }) =>
      notesService.updateNote(noteId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update note');
    }
  });

  const deleteNote = useMutation({
    mutationFn: (noteId: string) => notesService.deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete note');
    }
  });

  return {
    notes: data?.notes || [],
    isLoading,
    error,
    createTextNote,
    uploadFileNote,
    updateNote,
    deleteNote
  };
};
