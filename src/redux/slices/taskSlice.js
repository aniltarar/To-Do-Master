import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../config/firebaseConfig";
const initialState = {
  status: "idle",
  tasks: [],
  currentTask: {},
  message: "",
};

export const createTask = createAsyncThunk(
  "task/createTask",
  async (data, { rejectWithValue }) => {
    try {
      // Add "tasks" collection
      const taskRef = doc(collection(db, "tasks"));
      const newTaskData = {
        id: taskRef.id,
        ...data,
      };
      await setDoc(taskRef, newTaskData);

      //   add user's tasks array
      const userRef = doc(db, "users", data.uid);
      await updateDoc(userRef, {
        tasks: arrayUnion(newTaskData.id),
      });

      // add categories tasks array

      const categoryRef = doc(db, "categories", data.category.id);
      await updateDoc(categoryRef, {
        tasks: arrayUnion(newTaskData.id),
      });

      toast.success("Task created successfully");
      return newTaskData;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      toast.error("An error occurred while creating the task");
      return rejectWithValue(error.message);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default taskSlice.reducer;
