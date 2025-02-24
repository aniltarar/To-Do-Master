import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "react-router-dom";

export const roleLoader = (requiredRoles) => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userRoleData = userSnap.data().role;
          if (requiredRoles.includes(userRoleData)) {
            resolve(null);
          } else {
            resolve(redirect("/auth/login"));
          }
        } else {
          resolve(redirect("/auth/login"));
        }
      } else {
        resolve(redirect("/auth/login"));
      }
    });
  });
};
