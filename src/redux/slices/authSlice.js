import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../config/firebaseConfig";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    console.log("registerUser");
    try {
      const { displayName, email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: displayName });

      const userRef = doc(db, "users", user.uid);
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        categories: [],
        tasks: [],
        role: "user",
        createdAt: new Date(),
      };

      await setDoc(userRef, userData);
      toast.success(
        "Kayıt olma işlemi başarılı. Ana sayfaya yönlendiriliyorsunuz."
      );
      return userData;
    } catch (error) {
      toast.error("Kayıt olunurken bir hata oluştu");
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      toast.success("Giriş işlemi başarılı. Ana sayfaya yönlendiriliyorsunuz.");
      return userData;
    } catch (error) {
      console.log(error);
      toast.error("Giriş yapılırken bir hata oluştu");
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    await auth.signOut();
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
    toast.error("Çıkış yapılırken bir hata oluştu");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.message = "Register success";
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.message = "Login success";
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;
