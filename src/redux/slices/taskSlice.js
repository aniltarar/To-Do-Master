import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
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

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (uid, { rejectWithValue, dispatch }) => {
    dispatch(resetCurrentTask());
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

export const getTaskById = createAsyncThunk(
  "task/getTaskById",
  async (taskId, { rejectWithValue, dispatch }) => {
    dispatch(resetCurrentTask());
    try {
      const taskRef = doc(db, "tasks", taskId);
      const taskSnapshot = await getDoc(taskRef);
      const task = taskSnapshot.data();

      return task;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      toast.error("An error occurred while fetching task");
      return rejectWithValue(error.message);
    }
  }
);

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

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const taskRef = doc(db, "tasks", data.id);
      await updateDoc(taskRef, data);

      toast.success("Task updated successfully");

      dispatch(getTaskById(data.id));
      dispatch(getTasks(data.uid));
      return data;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      toast.error("An error occurred while updating the task");
      return rejectWithValue(error.message);
    }
  }
);

export const updateTaskSubtasks = createAsyncThunk(
  "task/updateTaskSubtasks",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const taskRef = doc(db, "tasks", data.id);

      const subTasks = data.subTasks;
      let allDone = true;
      let anyInProgress = false;

      subTasks.forEach((subTask) => {
        if (subTask.status === "done") {
          anyInProgress = true;
        } else {
          allDone = false;
        }
      });

      if (allDone) {
        data.status = "done";
      } else if (anyInProgress) {
        data.status = "progress";
      }

      await updateDoc(taskRef, data);

      toast.success("Task updated successfully");
      dispatch(getTaskById(data.id));
      return data;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      toast.error("An error occurred while updating the task");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (data, { rejectWithValue, dispatch }) => {
    try {
   
      // task delete from "tasks" collection
      const taskRef = doc(db, "tasks", data.id);
      await deleteDoc(taskRef);

      // task delete from "users" => "tasks"  array
      const userRef = doc(db, "users", data.uid);
      await updateDoc(userRef, {
        tasks: arrayRemove(data.id),
      });

      toast.success("Task deleted successfully");
      dispatch(getTasks(data.uid));
      return data.id;
    } catch (error) {
      console.log(rejectWithValue(error.message));
      toast.error("An error occurred while deleting the task");
      return rejectWithValue(error.message);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetCurrentTask: (state) => {
      state.currentTask = {};
    },
  },
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
      })
      .addCase(getTaskById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentTask = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(updateTaskSubtasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTaskSubtasks.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateTaskSubtasks.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
      });
  },
});

export const { resetCurrentTask } = taskSlice.actions;
export default taskSlice.reducer;
