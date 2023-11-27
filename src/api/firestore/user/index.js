import { UserStore } from "../FirestoreManager";

export const getOneUser = async (userId) => {
  return UserStore.getOneDocument(userId);
};

export const createUser = async (user) => {
  return UserStore.createDocument(user);
};

export const updateUser = async (userDocument, updatedUser) => {
  return UserStore.updateDocument(userDocument, updatedUser);
};

export const deleteUser = async (userId) => {
  return UserStore.deleteDocument(userId);
};
