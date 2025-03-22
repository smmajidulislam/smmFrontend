import { configureStore } from "@reduxjs/toolkit";
import counter from "../feature/slice";

const store = configureStore({
  reducer: {
    counter: counter,
  },
});

export default store;
