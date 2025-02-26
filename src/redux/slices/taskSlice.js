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
  async (data, { rejectWithValue, dispatch }) => {
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
      dispatch(getTasks(data.uid));
      return newTaskData;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      toast.error("An error occurred while creating the task");
      return rejectWithValue(error.message);
    }
  }
);

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (uid, { rejectWithValue }) => {
    try {
      const tasksRef = collection(db, "tasks");
      const taskUserQuery = query(tasksRef, where("uid", "==", uid));
      const tasksSnapshot = await getDocs(taskUserQuery);
      const tasks = tasksSnapshot.docs.map((doc) => doc.data());

      return tasks;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      toast.error("An error occurred while fetching tasks");
      return rejectWithValue(error.message);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(getTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      });
  },
});

export default taskSlice.reducer;
