import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
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

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      // Delete Category from "categories" collection
      const categoryRef = doc(db, "categories", data.id);
      await deleteDoc(categoryRef);

      // Delete all tasks in the category & user's tasks array
      const tasksRef = collection(db, "tasks");
      const tasksQuery = query(tasksRef, where("category.id", "==", data.id));
      const tasksSnapshot = await getDocs(tasksQuery);
      const waitDeleteTasks = tasksSnapshot.docs.map((doc) => doc.data().id);
      tasksSnapshot.docs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      const userRef = doc(db, "users", data.uid);
      await updateDoc(userRef, {
        categories: arrayRemove(data.id),
        tasks: arrayRemove(...waitDeleteTasks),
      });

      toast.success("Category deleted successfully");
      dispatch(getCategories(data.uid));
      return data.id;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      toast.error("An error occurred while deleting the category");
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const categoryRef = doc(db, "categories", data.id);
      await updateDoc(categoryRef, {
        categoryName: data.categoryName,
        categoryDescription: data.categoryDescription,
        categoryColor: data.categoryColor,
      });

      // tasks > category > categoryChanges
      const tasksRef = collection(db, "tasks");
      const tasksQuery = query(tasksRef, where("category.id", "==", data.id));
      const tasksSnapshot = await getDocs(tasksQuery);
      tasksSnapshot.docs.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          category: {
            id: data.id,
            categoryName: data.categoryName,
            categoryColor: data.categoryColor,
          },
        });
      });

      toast.success("Category updated successfully");
      dispatch(getCategories(data.uid));
      return data;
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the category");
      return rejectWithValue(error.message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    resetCategories: (state) => {
      state.categories = [];
    },
    resetCurrentCategory: (state) => {
      state.currentCategory = {};
    },
  },
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
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { resetCategories, resetCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;
