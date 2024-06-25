// facultyReducer.ts

import {
  SAVE_DEPARTMENT_REQUEST,
  SAVE_DEPARTMENT_SUCCESS,
  SAVE_DEPARTMENT_FAILURE,
  FETCH_DEPARTMENTS_REQUEST,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAILURE,
  UPDATE_DEPARTMENT_ACTIVE_REQUEST,
  UPDATE_DEPARTMENT_ACTIVE_SUCCESS,
  UPDATE_DEPARTMENT_ACTIVE_FAILURE,
} from "./actions";

export interface DepartmentState {
  departments: any;
  loading: boolean;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: DepartmentState = {
  departments: [],
  loading: false,
  error: null,
};

const departmentReducer = (
  state: DepartmentState = initialState,
  action: Action
): DepartmentState => {
  switch (action.type) {
    case SAVE_DEPARTMENT_REQUEST:
    case FETCH_DEPARTMENTS_REQUEST:
    case UPDATE_DEPARTMENT_ACTIVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SAVE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: [...state.departments, action.payload],
      };
    case FETCH_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: action.payload,
      };
    case UPDATE_DEPARTMENT_ACTIVE_SUCCESS:
      const updatedDepartments = state.departments.map(
        (department: { department_id: any }) =>
          department.department_id === action.payload.departmentId
            ? { ...department, active: action.payload.active }
            : department
      );
      return {
        ...state,
        loading: false,
        departments: updatedDepartments,
      };

    case FETCH_DEPARTMENTS_FAILURE:
    case UPDATE_DEPARTMENT_ACTIVE_FAILURE:
    case SAVE_DEPARTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default departmentReducer;
