import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./config";

export const createUserProfile = async (userId: string, profileData: any) => {
  try {
    await setDoc(doc(firestore, "profiles", userId), profileData);
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(firestore, "profiles", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, updates: any) => {
  try {
    const docRef = doc(firestore, "profiles", userId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};