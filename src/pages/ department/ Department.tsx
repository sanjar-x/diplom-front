import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  updateDepartmentActive,
  saveDepartment,
  fetchFaculties,
} from "../../redux/actions";
import { Button, Input, NativeSelect } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { SimpleTable } from "../../components/simple-table/SimpleTable";
import { RootState } from "../../redux/store";
import SwitchThumbButton from "../../ui/buttons/SwitchThumbButton";
import { Link, useLocation } from "react-router-dom";

type TTableData = {
  title: string;
  values: (string | JSX.Element)[];
  width?: string;
}[];

export const Department = () => {
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [facultyId, setFacultyId] = useState<string>("");

  const departments = useSelector(
    (state: RootState) => state.department.departments
  );
  const faculties = useSelector((state: RootState) => state.faculty.faculties);
  const loading = useSelector(
    (state: RootState) => state.department.loading || state.faculty.loading
  );
  const error = useSelector(
    (state: RootState) => state.department.error || state.faculty.error
  );
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchFaculties());
  }, [dispatch]);

  const handleToggleActive = (departmentId: string, active: boolean) => {
    dispatch(updateDepartmentActive(departmentId, active));
  };

  const handleSaveDepartment = async () => {
    try {
      const departmentData = {
        active: true,
        code,
        name,
        faculty_id: facultyId,
      };

      await dispatch(saveDepartment(departmentData));
      dispatch(fetchDepartments());
      // Сбрасываем поля формы после сохранения
      setCode("");
      setName("");
      setFacultyId("");
    } catch (error) {
      console.error("Failed to save department:", error);
    }
  };

  const TableData: TTableData = [
    {
      title: "Kod",
      values: departments.map((department) => department?.code || ""),
    },
    {
      title: "Nomi",
      values: departments.map((department) => department?.name || ""),
    },

    {
      title: "Fakultet",
      values: departments.map((department) => department?.faculty?.name || ""),
    },
    {
      title: "Faoliyat",
      values: departments.map((department) =>
        department ? (
          <SwitchThumbButton
            key={department.department_id}
            active={department.active}
            onClick={() =>
              handleToggleActive(department.department_id, !department.active)
            }
          />
        ) : null
      ),
    },
  ];

  return (
    <>
      <div className="title">
        <p>
          <Link to={"/"}>Asosiy</Link> &#10093;
          <span>{pathname.slice(1)}</span>
        </p>
      </div>
      <div className="layout">
        <div className="right">
          <SimpleTable style={{ width: "100%" }} tableData={TableData} />
        </div>
        <div className="left">
          <div className="create_change">
            <div className="line">
              <p>Nomi</p>
              <Input
                placeholder="Kafedrani nomini kiriting"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="line">
              <p>Kod</p>
              <Input
                placeholder="Kafedrani kodini kiriting"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="line">
              <p>Fakultet</p>
              {faculties ? (
                <NativeSelect
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  placeholder="Fakultetni tanlang"
                >
                  {faculties.map((faculty) => (
                    <option key={faculty.faculty_id} value={faculty.faculty_id}>
                      {faculty.name}
                    </option>
                  ))}
                </NativeSelect>
              ) : (
                <p>Loading faculties...</p>
              )}
            </div>
            <div className="btns">
              <Button onClick={handleSaveDepartment}>
                <IconCheck />
                Saqlash
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
