// facultyReducer.ts

import {
  SAVE_FACULTY_REQUEST,
  SAVE_FACULTY_SUCCESS,
  SAVE_FACULTY_FAILURE,
  FETCH_FACULTIES_REQUEST,
  FETCH_FACULTIES_SUCCESS,
  FETCH_FACULTIES_FAILURE,
  UPDATE_FACULTY_ACTIVE_REQUEST,
  UPDATE_FACULTY_ACTIVE_SUCCESS,
  UPDATE_FACULTY_ACTIVE_FAILURE,
} from "./actions";

export interface FacultyState {
  faculties: any[];
  loading: boolean;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: FacultyState = {
  faculties: [],
  loading: false,
  error: null,
};

const facultyReducer = (
  state: FacultyState = initialState,
  action: Action
): FacultyState => {
  switch (action.type) {
    case SAVE_FACULTY_REQUEST:
    case FETCH_FACULTIES_REQUEST:
    case UPDATE_FACULTY_ACTIVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SAVE_FACULTY_SUCCESS:
      return {
        ...state,
        loading: false,
        faculties: [...state.faculties, action.payload],
      };
    case FETCH_FACULTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        faculties: action.payload,
      };
    case UPDATE_FACULTY_ACTIVE_SUCCESS:
      const updatedFaculties = state.faculties.map((faculty) =>
        faculty.faculty_id === action.payload.facultyId
          ? { ...faculty, active: action.payload.active }
          : faculty
      );
      return {
        ...state,
        loading: false,
        faculties: updatedFaculties,
      };

    case FETCH_FACULTIES_FAILURE:
    case UPDATE_FACULTY_ACTIVE_FAILURE:
    case SAVE_FACULTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default facultyReducer;
