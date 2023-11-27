import databaseService from "../../../lib/db/DatabaseService";

export const getUser = async (userId) => {
  const getUserRequest = await databaseService.User.get(userId);

  return getUserRequest.docSnapshot;
};

export const createUser = async (user) => {
  await databaseService.User.create(user);
};

export const updateUser = async (userId, payload) => {
  const getUserRequest = await databaseService.User.get(userId);

  await databaseService.User.update(getUserRequest.docRef, payload);
};
