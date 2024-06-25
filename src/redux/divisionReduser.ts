// divisionReducer.ts

import {
  SAVE_DIVISION_REQUEST,
  SAVE_DIVISION_SUCCESS,
  SAVE_DIVISION_FAILURE,
  FETCH_DIVISIONS_REQUEST,
  FETCH_DIVISIONS_SUCCESS,
  FETCH_DIVISIONS_FAILURE,
  UPDATE_DIVISION_ACTIVE_REQUEST,
  UPDATE_DIVISION_ACTIVE_SUCCESS,
  UPDATE_DIVISION_ACTIVE_FAILURE,
} from "./actions";

export interface DivisionState {
  divisions: any[];
  loading: boolean;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: DivisionState = {
  divisions: [],
  loading: false,
  error: null,
};

const divisionReducer = (
  state: DivisionState = initialState,
  action: Action
): DivisionState => {
  switch (action.type) {
    case SAVE_DIVISION_REQUEST:
    case FETCH_DIVISIONS_REQUEST:
    case UPDATE_DIVISION_ACTIVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SAVE_DIVISION_SUCCESS:
      return {
        ...state,
        loading: false,
        divisions: [...state.divisions, action.payload],
      };
    case FETCH_DIVISIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        divisions: action.payload,
      };
    case UPDATE_DIVISION_ACTIVE_SUCCESS:
      const updatedDivisions = state.divisions.map((division) =>
        division.division_id === action.payload.divisionId
          ? { ...division, active: action.payload.active }
          : division
      );
      return {
        ...state,
        loading: false,
        divisions: updatedDivisions,
      };

    case FETCH_DIVISIONS_FAILURE:
    case UPDATE_DIVISION_ACTIVE_FAILURE:
    case SAVE_DIVISION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default divisionReducer;
