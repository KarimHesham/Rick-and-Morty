import {
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../config/firebase";

class FirestoreManager {
  collectionRef;
  collectionName;

  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
    this.collectionName = collectionName;
  }

  createDocument = async (payload) => {
    if (this.collectionName === "User") {
      const newDoc = doc(db, "User", payload.id);

      await setDoc(newDoc, {
        ...payload,
      });

      return newDoc;
    }

    const newDoc = doc(this.collectionRef);

    payload.id = newDoc.id;

    await setDoc(newDoc, {
      ...payload,
    });

    return newDoc;
  };

  getAllDocuments = async (key, queryParam) => {
    const q = query(this.collectionRef, where(key, "==", queryParam));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs;
  };

  getAllDocumentsCompound = async (key1, key2, queryParam1, queryParam2) => {
    const q = query(
      this.collectionRef,
      and(where(key1, "==", queryParam1), where(key2, "==", queryParam2))
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs;
  };

  getOneDocument = async (key) => {
    const docRef = doc(db, this.collectionName, key);

    const docSnapshot = await getDoc(docRef);

    return { docRef, docSnapshot };
  };

  // TODO: move to new implementation to avoid making get call before update
  updateDocument = async (doc, payload) => {
    // ===> Old implementation
    const res = await updateDoc(doc, payload);
    return res;

    // ===> New Implementation
    // const docRef = doc(db, this.collectionName, id);
    // const res = await updateDoc(docRef, payload);
    // return res;
  };

  deleteDocument = async (key) => {
    const res = await deleteDoc(doc(db, this.collectionName, key));

    return res;
  };

  deleteBatchDocuments = async (key, queryParam) => {
    const batch = writeBatch(db);

    const docsQuery = query(this.collectionRef, where(key, "==", queryParam));

    const docsSnapshot = await getDocs(docsQuery);

    docsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  };

  deleteBatchDocumentsCompound = async (
    key1,
    key2,
    key3,
    queryParam1,
    queryParam2,
    queryParam3
  ) => {
    const batch = writeBatch(db);

    const docsQuery = query(
      this.collectionRef,
      where(key1, "==", queryParam1),
      where(key2, "==", queryParam2),
      where(key3, "==", queryParam3)
    );

    const docsSnapshot = await getDocs(docsQuery);

    docsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  };
}

export const UserStore = new FirestoreManager("User");
