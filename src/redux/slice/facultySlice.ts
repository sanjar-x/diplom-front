import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { MAIN_URL } from "../../url/url";

interface FacultyState {
  faculty: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FacultyState = {
  faculty: [],
  loading: false,
  error: null,
};

export const fetchFaculty = createAsyncThunk(
  "faculty/fetchFaculty",
  async () => {
    const response = await axios.get(`${MAIN_URL}/faculties/`);
    return response.data;
  }
);

export const createFaculty = createAsyncThunk(
  "faculty/createFaculty",
  async (facultyData: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.post(`${MAIN_URL}/faculty`, facultyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const deleteFaculty = createAsyncThunk(
  "faculties/deleteFaculties",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      await axios.delete(`${MAIN_URL}/faculties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFaculty.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.faculty = action.payload;
        }
      )
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(createFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFaculty.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.faculty.push(action.payload);
      })
      .addCase(createFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })
      .addCase(deleteFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteFaculty.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.faculty = state.faculty.filter(
            (division) => division.id !== action.payload
          );
        }
      )
      .addCase(deleteFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default facultySlice.reducer;
