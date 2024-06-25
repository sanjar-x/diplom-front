import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFaculties,
  updateFacultyActive,
  saveFaculty,
} from "../../redux/actions";
import { Button, Input, NativeSelect } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { SimpleTable } from "../../components/simple-table/SimpleTable";
import { RootState } from "../../redux/store";
import SwitchThumbButton from "../../ui/buttons/SwitchThumbButton";

type TCode = string;
type TTableData = {
  title: string;
  values: (string | JSX.Element)[];
  width?: string;
};

export const Faculty = () => {
  const [code, setCode] = useState<TCode>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("local"); // Установите начальное значение один раз

  const facultyType: { [key: string]: string } = {
    local: "Mahalliy",
    joint: "Qo'shma",
    division: "Bo'lim",
    other: "Boshqa",
  };

  const faculties = useSelector((state: RootState) => state.faculty.faculties);
  const loading = useSelector((state: RootState) => state.faculty.loading);
  const error = useSelector((state: RootState) => state.faculty.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFaculties());
  }, [dispatch]);

  const handleToggleActive = async (facultyId: string, active: boolean) => {
    try {
      dispatch(updateFacultyActive(facultyId, active));
    } catch (error) {
      console.error("Failed to update faculty active status:", error);
    }
  };

  const handleSaveFaculty = async () => {
    const facultyData = {
      code,
      name,
      type,
    };

    try {
      await dispatch(saveFaculty(facultyData));

      dispatch(fetchFaculties());

      setCode("");
      setName("");
      setType("local");
    } catch (error) {
      console.error("Failed to save faculty:", error);
    }
  };

  const TableData: TTableData = [
    {
      title: "Kod",
      values: faculties.map((item) => item?.code || ""),
    },
    {
      title: "Nomi",
      values: faculties.map((item) => item?.name || ""),
    },
    {
      title: "Turi",
      values: faculties.map(
        (item) => facultyType[item?.type as keyof typeof facultyType] || ""
      ),
    },
    {
      title: "Faol",
      width: "20px",
      values: faculties.map((item) =>
        item ? (
          <SwitchThumbButton
            key={item.faculty_id}
            active={item.active}
            onClick={() => handleToggleActive(item.faculty_id, !item.active)}
          />
        ) : null
      ),
    },
  ];

  return (
    <>
      <div className="layout">
        <div className="right">
          <SimpleTable style={{ width: "100%" }} tableData={TableData} />
        </div>
        <div className="left">
          <div className="create_change">
            <div className="line">
              <p>Nomi</p>
              <Input
                placeholder="Fakultet nomini kiriting"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="line">
              <p>Kod</p>
              <Input
                placeholder="Fakultet kodini kiriting"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="line">
              <p>Turi</p>
              <NativeSelect
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Fakultet turi"
              >
                {Object.keys(facultyType).map((key) => (
                  <option key={key} value={key}>
                    {facultyType[key]}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div className="btns">
              <Button onClick={handleSaveFaculty}>
                <>
                  <IconCheck />
                  Saqlash
                </>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
