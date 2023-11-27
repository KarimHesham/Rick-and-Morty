import { createUser, getOneUser, updateUser } from "../../api/firestore/user";

class DatabaseService {
  server = {
    Firestore: "firestore",
    Rest: "sql",
  };
  constructor(flag) {
    this.flag = flag;
  }

  User = {
    get: (userId) => {
      if (this.flag === this.server.Firestore) {
        return getOneUser(userId);
      } else {
        // Call SQL DB layer
      }
    },
    create: (user) => {
      if (this.flag === this.server.Firestore) {
        return createUser(user);
      } else {
        // Call SQL DB layer
      }
    },
    update: (userDocument, updatedUser) => {
      if (this.flag === this.server.Firestore) {
        return updateUser(userDocument, updatedUser);
      } else {
        // Call SQL DB layer
      }
    },
  };
}

const databaseService = new DatabaseService("firestore");

export default databaseService;
