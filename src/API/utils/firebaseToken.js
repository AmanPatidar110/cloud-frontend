import { getAuth } from "firebase/auth";

export const getToken = async () => {
  try {
    const auth = getAuth();

    return await auth.currentUser.getIdToken();
  } catch (err) {
    console.log("Error getToken", err);
    throw err;
  }
};
