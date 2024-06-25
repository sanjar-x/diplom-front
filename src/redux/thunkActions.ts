// thunkActions.ts

import {
  fetchFacultiesRequest,
  fetchFacultiesSuccess,
  fetchFacultiesFailure,
} from "./actions";

export const fetchFaculties = () => {
  return async (dispatch: any) => {
    dispatch(fetchFacultiesRequest());
    try {
      const response = await fetch(
        "https://diplom-production-49b4.up.railway.app/faculties/"
      );
      const data = await response.json();
      dispatch(fetchFacultiesSuccess(data));
    } catch (error: any) {
      dispatch(fetchFacultiesFailure(error.message));
    }
  };
};
