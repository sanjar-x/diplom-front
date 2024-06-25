import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDivisions,
  updateDivisionActive,
  saveDivision,
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

export const Division = () => {
  const [code, setCode] = useState<TCode>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("local");

  const divisionType: { [key: string]: string } = {
    local: "Mahalliy",
    division: "Bo'lim",
    center: "Markaz",
    administration: "Boshqarma",
    other: "Boshqa",
  };

  const divisions = useSelector((state: RootState) => state.division.divisions);
  const loading = useSelector((state: RootState) => state.division.loading);
  const error = useSelector((state: RootState) => state.division.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDivisions());
  }, [dispatch]);

  const handleToggleActive = async (divisionId: string, active: boolean) => {
    try {
      dispatch(updateDivisionActive(divisionId, active));
    } catch (error) {
      console.error("Failed to update division active status:", error);
    }
  };

  const handleSaveDivision = async () => {
    const divisionData = {
      code,
      name,
      type,
    };

    try {
      await dispatch(saveDivision(divisionData));

      dispatch(fetchDivisions());

      setCode("");
      setName("");
      setType("local");
    } catch (error) {
      console.error("Failed to save division:", error);
    }
  };

  const TableData: TTableData = [
    {
      title: "Kod",
      values: divisions.map((item) => item?.code || ""),
    },
    {
      title: "Nomi",
      values: divisions.map((item) => item?.name || ""),
    },
    {
      title: "Turi",
      values: divisions.map(
        (item) => divisionType[item?.type as keyof typeof divisionType] || ""
      ),
    },
    {
      title: "Faol",
      width: "20px",
      values: divisions.map((item) =>
        item ? (
          <SwitchThumbButton
            key={item.division_id}
            active={item.active}
            onClick={() => handleToggleActive(item.division_id, !item.active)}
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
                {Object.keys(divisionType).map((key) => (
                  <option key={key} value={key}>
                    {divisionType[key]}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div className="btns">
              <Button onClick={handleSaveDivision}>
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
