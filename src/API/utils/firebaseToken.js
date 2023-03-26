import firebase from "firebase/compat/app";

export const getToken = async () => {
  try {
    const user = firebase.auth().currentUser;
    return await user.getIdToken();
  } catch (err) {
    console.log("Error getToken", err);
    throw err;
  }
};
