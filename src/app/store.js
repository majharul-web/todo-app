import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todo/todoSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export default store;
