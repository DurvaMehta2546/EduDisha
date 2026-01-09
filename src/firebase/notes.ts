import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { firestore, storage } from "./config";

export const uploadNote = async (userId: string, file: File, noteData: any) => {
  try {
    const storageRef = ref(storage, `notes/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(firestore, `users/${userId}/notes`), {
      ...noteData,
      fileURL: downloadURL,
      fileName: file.name,
      type: 'file',
      size: file.size,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    });

    return docRef.id;
  } catch (error) {
    console.error("Error uploading note:", error);
    return null;
  }
};

export const addTextNote = async (userId: string, noteData: any) => {
    try {
        const docRef = await addDoc(collection(firestore, `users/${userId}/notes`), {
            ...noteData,
            type: 'text',
            createdDate: new Date().toISOString(),
            lastModified: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding text note:", error);
        return null;
    }
}

export const getUserNotes = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, `users/${userId}/notes`));
    const notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return notes.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
  } catch (error) {
    console.error("Error getting user notes:", error);
    return [];
  }
};

export const deleteNote = async (userId: string, noteId: string, fileName?: string) => {
  try {
    if (fileName) {
        const storageRef = ref(storage, `notes/${userId}/${fileName}`);
        await deleteObject(storageRef);
    }
    await deleteDoc(doc(firestore, `users/${userId}/notes`, noteId));
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

export const updateNote = async (userId: string, noteId: string, noteData: any) => {
    try {
        const noteRef = doc(firestore, `users/${userId}/notes`, noteId);
        await updateDoc(noteRef, {
            ...noteData,
            lastModified: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error updating note:", error);
    }
};