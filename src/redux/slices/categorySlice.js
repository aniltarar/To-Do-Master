import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import toast from "react-hot-toast";

const initialState = {
  status: "idle",
  categories: [],
  currentCategory: {},
  message: "",
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (uid, { rejectWithValue }) => {
    
    try {
      const categoriesRef = collection(db, "categories");
      const categoryQuery = query(categoriesRef, where("uid", "==", uid));
      const categoriesSnapshot = await getDocs(categoryQuery);
      const categories = categoriesSnapshot.docs.map((doc) => doc.data());

  
      return categories;
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching categories");
      return rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const categoriesRef = doc(collection(db, "categories"));
      const categoryData = {
        id: categoriesRef.id,
        ...data,
        createdAt: new Date(),
      };

      await setDoc(categoriesRef, categoryData);

      const userRef = doc(db, "users", data.uid);
      await updateDoc(userRef, {
        categories: arrayUnion(categoryData.id),
      });

      toast.success("Category created successfully");
      dispatch(getCategories(data.uid));
      return categoryData;
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the category");
      return rejectWithValue(error.message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export default categorySlice.reducer;
