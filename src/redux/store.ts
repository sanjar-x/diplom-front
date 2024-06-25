import { configureStore } from "@reduxjs/toolkit";
import divisionReduser from "./divisionReduser";
import facultyReducer from "./facultyReducer";
import departmentReduser from "./departmentReduser";

export const store = configureStore({
  reducer: {
    division: divisionReduser,
    faculty: facultyReducer,
    department: departmentReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
