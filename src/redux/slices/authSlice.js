import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../config/firebaseConfig";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const { fullName, email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: fullName });

      const userRef = doc(db, "users", user.uid);
      const userData = {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName,
        categories: [],
        tasks: [],
        createdAt: new Date(),
      };

      await setDoc(userRef, userData);
      toast.success("Kayıt olma işlemi başarılı. Ana sayfaya yönlendiriliyorsunuz.");
      return userData;
    } catch (error) {
      toast.error("Kayıt olunurken bir hata oluştu");
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

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
      });
  },
});

export default authSlice.reducer;
