// actions.ts

export const SAVE_DIVISION_REQUEST = "SAVE_DIVISION_REQUEST";
export const SAVE_DIVISION_SUCCESS = "SAVE_DIVISION_SUCCESS";
export const SAVE_DIVISION_FAILURE = "SAVE_DIVISION_FAILURE";
export const FETCH_DIVISIONS_REQUEST = "FETCH_DIVISIONS_REQUEST";
export const FETCH_DIVISIONS_SUCCESS = "FETCH_DIVISIONS_SUCCESS";
export const FETCH_DIVISIONS_FAILURE = "FETCH_DIVISIONS_FAILURE";
export const UPDATE_DIVISION_ACTIVE_REQUEST = "UPDATE_DIVISION_ACTIVE_REQUEST";
export const UPDATE_DIVISION_ACTIVE_SUCCESS = "UPDATE_DIVISION_ACTIVE_SUCCESS";
export const UPDATE_DIVISION_ACTIVE_FAILURE = "UPDATE_DIVISION_ACTIVE_FAILURE";

export const SAVE_FACULTY_REQUEST = "SAVE_FACULTY_REQUEST";
export const SAVE_FACULTY_SUCCESS = "SAVE_FACULTY_SUCCESS";
export const SAVE_FACULTY_FAILURE = "SAVE_FACULTY_FAILURE";
export const FETCH_FACULTIES_REQUEST = "FETCH_FACULTIES_REQUEST";
export const FETCH_FACULTIES_SUCCESS = "FETCH_FACULTIES_SUCCESS";
export const FETCH_FACULTIES_FAILURE = "FETCH_FACULTIES_FAILURE";
export const UPDATE_FACULTY_ACTIVE_REQUEST = "UPDATE_FACULTY_ACTIVE_REQUEST";
export const UPDATE_FACULTY_ACTIVE_SUCCESS = "UPDATE_FACULTY_ACTIVE_SUCCESS";
export const UPDATE_FACULTY_ACTIVE_FAILURE = "UPDATE_FACULTY_ACTIVE_FAILURE";

export const SAVE_DEPARTMENT_REQUEST = "SAVE_DEPARTMENT_REQUEST";
export const SAVE_DEPARTMENT_SUCCESS = "SAVE_DEPARTMENT_SUCCESS";
export const SAVE_DEPARTMENT_FAILURE = "SAVE_DEPARTMENT_FAILURE";
export const FETCH_DEPARTMENTS_REQUEST = "FETCH_DEPARTMENTS_REQUEST";
export const FETCH_DEPARTMENTS_SUCCESS = "FETCH_DEPARTMENTS_SUCCESS";
export const FETCH_DEPARTMENTS_FAILURE = "FETCH_DEPARTMENTS_FAILURE";
export const UPDATE_DEPARTMENT_ACTIVE_REQUEST =
  "UPDATE_DEPARTMENT_ACTIVE_REQUEST";
export const UPDATE_DEPARTMENT_ACTIVE_SUCCESS =
  "UPDATE_DEPARTMENT_ACTIVE_SUCCESS";
export const UPDATE_DEPARTMENT_ACTIVE_FAILURE =
  "UPDATE_DEPARTMENT_ACTIVE_FAILURE";

export const saveDivisionRequest = () => ({
  type: SAVE_DIVISION_REQUEST,
});

export const saveDivisionSuccess = () => ({
  type: SAVE_DIVISION_SUCCESS,
});

export const saveDivisionFailure = (error: string) => ({
  type: SAVE_DIVISION_FAILURE,
  payload: error,
});

export const saveFacultyRequest = () => ({
  type: SAVE_FACULTY_REQUEST,
});

export const saveFacultySuccess = () => ({
  type: SAVE_FACULTY_SUCCESS,
});

export const saveFacultyFailure = (error: string) => ({
  type: SAVE_FACULTY_FAILURE,
  payload: error,
});

export const saveDepartmentRequest = () => ({
  type: SAVE_DEPARTMENT_REQUEST,
});

export const saveDepartmentSuccess = () => ({
  type: SAVE_DEPARTMENT_SUCCESS,
});

export const saveDepartmentFailure = (error: string) => ({
  type: SAVE_DEPARTMENT_FAILURE,
  payload: error,
});

export const fetchDivisionsRequest = () => ({
  type: FETCH_DIVISIONS_REQUEST,
});

export const fetchDivisionsSuccess = (divisions: any) => ({
  type: FETCH_DIVISIONS_SUCCESS,
  payload: divisions,
});

export const fetchDivisionsFailure = (error: string) => ({
  type: FETCH_DIVISIONS_FAILURE,
  payload: error,
});

export const fetchFacultiesRequest = () => ({
  type: FETCH_FACULTIES_REQUEST,
});

export const fetchFacultiesSuccess = (faculties: any) => ({
  type: FETCH_FACULTIES_SUCCESS,
  payload: faculties,
});

export const fetchFacultiesFailure = (error: string) => ({
  type: FETCH_FACULTIES_FAILURE,
  payload: error,
});

export const fetchDepartmentsRequest = () => ({
  type: FETCH_DEPARTMENTS_REQUEST,
});

export const fetchDepartmentsSuccess = (departments: any) => ({
  type: FETCH_DEPARTMENTS_SUCCESS,
  payload: departments,
});

export const fetchDepartmentsFailure = (error: string) => ({
  type: FETCH_DEPARTMENTS_FAILURE,
  payload: error,
});

export const updateDivisionActiveRequest = () => ({
  type: UPDATE_DIVISION_ACTIVE_REQUEST,
});

export const updateDivisionActiveSuccess = (
  divisionId: string,
  active: boolean
) => ({
  type: UPDATE_DIVISION_ACTIVE_SUCCESS,
  payload: { divisionId, active },
});

export const updateDivisionActiveFailure = (error: string) => ({
  type: UPDATE_DIVISION_ACTIVE_FAILURE,
  payload: error,
});

export const updateFacultyActiveRequest = () => ({
  type: UPDATE_FACULTY_ACTIVE_REQUEST,
});

export const updateFacultyActiveSuccess = (
  facultyId: string,
  active: boolean
) => ({
  type: UPDATE_FACULTY_ACTIVE_SUCCESS,
  payload: { facultyId, active },
});

export const updateFacultyActiveFailure = (error: string) => ({
  type: UPDATE_FACULTY_ACTIVE_FAILURE,
  payload: error,
});

export const updateDepartmentActiveRequest = () => ({
  type: UPDATE_DEPARTMENT_ACTIVE_REQUEST,
});

export const updateDepartmentActiveFailure = (error: string) => ({
  type: UPDATE_DEPARTMENT_ACTIVE_FAILURE,
  payload: error,
});
export const updateDepartmentActiveSuccess = (
  departmentId: string,
  active: boolean
) => ({
  type: UPDATE_DEPARTMENT_ACTIVE_SUCCESS,
  payload: { departmentId, active },
});

export const saveDivision = (divisionData: any) => {
  return async (dispatch: any) => {
    dispatch(saveDivisionRequest());
    try {
      const response = await fetch(
        "https://diplom-production-49b4.up.railway.app/divisions/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(divisionData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save division");
      }
      dispatch(saveDivisionSuccess());
    } catch (error: any) {
      dispatch(saveDivisionFailure(error.message));
    }
  };
};

export const saveFaculty = (facultyData: any) => {
  return async (dispatch: any) => {
    dispatch(saveFacultyRequest());
    try {
      const response = await fetch(
        "https://diplom-production-49b4.up.railway.app/faculties/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(facultyData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save faculty");
      }
      dispatch(saveFacultySuccess());
    } catch (error: any) {
      dispatch(saveFacultyFailure(error.message));
    }
  };
};
export const saveDepartment = (departmentData: any) => {
  return async (dispatch: any) => {
    dispatch(saveDepartmentRequest());
    try {
      const response = await fetch(
        "https://diplom-production-49b4.up.railway.app/departments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(departmentData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save department");
      }
      dispatch(saveDepartmentSuccess());
    } catch (error: any) {
      dispatch(saveDepartmentFailure(error.message));
    }
  };
};

export const fetchDivisions = () => {
  return async (dispatch: any) => {
    dispatch(fetchDivisionsRequest());
    try {
      const response = await fetch(
        "https://diplom-production-49b4.up.railway.app/divisions/"
      );
      const data = await response.json();
      dispatch(fetchDivisionsSuccess(data));
    } catch (error: any) {
      dispatch(fetchDivisionsFailure(error.message));
    }
  };
};

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

export const fetchDepartments = () => {
  return async (dispatch: any) => {
    dispatch(fetchDepartmentsRequest());
    try {
      const response = await fetch(
        "https://diplom-production-49b4.up.railway.app/departments/"
      );
      const data = await response.json();
      dispatch(fetchDepartmentsSuccess(data));
    } catch (error: any) {
      dispatch(fetchDepartmentsFailure(error.message));
    }
  };
};

export const updateDivisionActive = (divisionId: string, active: boolean) => {
  return async (dispatch: any) => {
    dispatch(updateDivisionActiveRequest());
    try {
      const response = await fetch(
        `https://diplom-production-49b4.up.railway.app/divisions/switch?division_id=${divisionId}&active=${active}`,
        { method: "PATCH" } // или другой метод, в зависимости от вашего API
      );
      if (!response.ok) {
        throw new Error("Failed to update division active status");
      }
      dispatch(updateDivisionActiveSuccess(divisionId, active));
    } catch (error: any) {
      dispatch(updateDivisionActiveFailure(error.message));
    }
  };
};

export const updateFacultyActive = (facultyId: string, active: boolean) => {
  return async (dispatch: any) => {
    dispatch(updateFacultyActiveRequest());
    try {
      const response = await fetch(
        `https://diplom-production-49b4.up.railway.app/faculties/switch?faculty_id=${facultyId}&active=${active}`,
        { method: "PATCH" } // или другой метод, в зависимости от вашего API
      );
      if (!response.ok) {
        throw new Error("Failed to update faculty active status");
      }
      dispatch(updateFacultyActiveSuccess(facultyId, active));
    } catch (error: any) {
      dispatch(updateFacultyActiveFailure(error.message));
    }
  };
};

export const updateDepartmentActive = (
  departmentId: string,
  active: boolean
) => {
  return async (dispatch: any) => {
    dispatch(updateDepartmentActiveRequest());
    try {
      const response = await fetch(
        `https://diplom-production-49b4.up.railway.app/departments/switch?department_id=${departmentId}&active=${active}`,
        { method: "PATCH" } // или другой метод, в зависимости от вашего API
      );
      if (!response.ok) {
        throw new Error("Failed to update department active status");
      }
      dispatch(updateDepartmentActiveSuccess(departmentId, active));
    } catch (error: any) {
      dispatch(updateDepartmentActiveFailure(error.message));
    }
  };
};
