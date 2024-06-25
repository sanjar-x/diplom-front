import { Button, ScrollArea, Table, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import cx from "clsx";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SwitchThumbButton from "../../ui/buttons/SwitchThumbButtonOld";
import { DynamicInputDatapciker } from "../../ui/dynamic-input-datapicker/DynamicInputDatapicker";
import { DynamicModal } from "../../ui/dynamic-modal/DynamicModal";
import { DynamicSelect } from "../../ui/dynamic-select/DiynamicSelectOld";
import { MAIN_URL } from "../../url/url";
import classes from "./UserPanel.module.css";

interface UserData {
  user_id: number;
  phone_number: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  birth_date: string;
  passport: string;
}

export const UserPanel = () => {
  const { pathname } = useLocation();

  const data: string[] = ["O'zbekiston", "Chet el", "Fuqaroligi yoq"];
  const titleData: string[] = [
    "Dotsent",
    "Professor",
    "Katta ilmiy xodim",
    "Akademik",
    "Yo'q",
  ];
  const levelData: string[] = ["Fan nomzidi", "Fan doktori", "Yoq"];
  const genderData: string[] = ["Erkak", "Ayol"];
  const yearData: number[] = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [getData, setGetData] = useState<UserData[]>([]);
  const [state, setState] = useState<any>([]);
  const [datapicker, setDatapicker] = useState<any>("");
  const dateObject = new Date(datapicker);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const first = (citizenShip: any) => {
    switch (citizenShip) {
      case "O'zbekiston":
        return "uzbekistan";
      case "Chet el":
        return "foreign";
      case "Fuqaroligi yoq":
        return "without_citizenship";
      default:
        break;
    }
  };

  const second = (scienceDegree: any) => {
    switch (scienceDegree) {
      case "Fan nomzidi":
        return "doctorofphilosophy";
      case "Fan doktori":
        return "doctorofscience";
      case "Yoq":
        return "without";
      default:
        break;
    }
  };
  const third = (scientificTitle: any) => {
    switch (scientificTitle) {
      case "Dotsent":
        return "docent";
      case "Professor":
        return "professor";
      case "Katta ilmiy xodim":
        return "senior_researcher";
      case "Akademik":
        return "academician";
      case "Yo'q":
        return "without";
      default:
        break;
    }
  };

  const form = useForm({
    initialValues: {
      citizenShip: "",
      passportNumber: "",
      JSHPR: "",
      surname: "",
      name: "",
      fatherName: "",
      birthday: "",
      gender: "",
      address: "",
      expertise: "",
      scienceDegree: "",
      scientificTitle: "",
      workYear: "",
      phoneNumber: "",
      password: "",
    },
    validate: {
      passportNumber: (value: any) =>
        /^[A-Z]{2}\d{7}$/.test(value)
          ? null
          : "Passport number must be in format AA0000000",
      JSHPR: (value: any) =>
        /^\d{14}$/.test(value) ? null : "JSHPR code must be 14 digits",
      phoneNumber: (value: any) =>
        /^\+998\d{9}$/.test(value)
          ? null
          : "Phone number must be in format +998XXXXXXXXX",
      password: (value: any) =>
        value.length >= 6
          ? null
          : "Password must be at least 6 characters long",
    },
  });

  const handleSubmit = (values: any) => {
    const userpanelData = {
      role_name: "user",
      phone_number: values.phoneNumber,
      citizenship: first(values.citizenShip),
      passport: values.passportNumber,
      pini: values.JSHPR,
      birth_date: formattedDate,
      gender: values.gender == "Erkak" ? "male" : "female",
      address: values.address,
      specialization: values.expertise,
      science_degree: second(values.scienceDegree),
      scientific_title: third(values.scientificTitle),
      first_name: values.name,
      last_name: values.surname,
      middle_name: values.fatherName,
      password: values.password,
    };

    values.phoneNumber = "";
    values.citizenShip = "";
    values.passportNumber = "";
    values.JSHPR = "";
    setDatapicker("");
    values.gender = "";
    values.address = "";
    values.expertise = "";
    values.scienceDegree = "";
    values.scientificTitle = "";
    values.name = "";
    values.surname = "";
    values.fatherName = "";
    values.password = "";

    axios.post(`${MAIN_URL}/users/`, userpanelData);
    setState(false);
  };

  useEffect(() => {
    axios.get(`${MAIN_URL}/users/`).then((res) => setGetData(res.data));
  }, [state]);

  return (
    <>
      <div className="title">
        <p>
          <Link to={"/"}> Asosiy</Link> &#10093;
          <span> {pathname.slice(1)}</span>
        </p>
      </div>
      <DynamicModal
        title="Xodim qoshish"
        buttonName="Xodim qo'shish"
        modalClose={state}
      >
        <form onSubmit={form.onSubmit(handleSubmit)} className={classes.modal}>
          <div className={classes.line}>
            <div className={classes.input}>
              <p>FUQAROLIK</p>
              <DynamicSelect
                data={data}
                value={form.values.citizenShip}
                setValue={(value: any) =>
                  form.setFieldValue("citizenShip", value)
                }
                label=""
                placeholder="Fuqarolik"
              />
            </div>
            <div className={classes.input}>
              <p>PASPORT RAQAMI</p>
              <TextInput
                placeholder="AA0000001"
                {...form.getInputProps("passportNumber")}
              />
            </div>
            <div className={classes.input}>
              <p>JSHPR-kod</p>
              <TextInput
                placeholder="3453564356345"
                {...form.getInputProps("JSHPR")}
              />
            </div>
          </div>
          <div className={classes.line}>
            <div className={classes.input}>
              <p>FAMILIYA</p>
              <TextInput
                placeholder="Jahongir"
                {...form.getInputProps("surname")}
              />
            </div>
            <div className={classes.input}>
              <p>ISM</p>
              <TextInput
                placeholder="Mirhalikov"
                {...form.getInputProps("name")}
              />
            </div>
            <div className={classes.input}>
              <p>OTASINING ISMI</p>
              <TextInput
                placeholder="Shavkatovich"
                {...form.getInputProps("fatherName")}
              />
            </div>
          </div>
          <div className={classes.line}>
            <div className={classes.input}>
              <p>TUG'ILGAN SANA</p>
              <DynamicInputDatapciker
                placeholder="Nov 23, 2006"
                value={datapicker}
                setValue={setDatapicker}
                label=""
              />
            </div>
            <div className={classes.input}>
              <p>JINS</p>
              <DynamicSelect
                placeholder="Nov 23, 2006"
                label=""
                data={genderData}
                value={form.values.gender}
                setValue={(value: any) => form.setFieldValue("gender", value)}
              />
            </div>
            <div className={classes.input}>
              <p>Uy MANZIL</p>
              <TextInput
                placeholder="Booburshox 25-dom 7-kv"
                {...form.getInputProps("address")}
              />
            </div>
          </div>
          <div className={classes.line}>
            <div className={classes.input}>
              <p>MUTAXASISLIK</p>
              <TextInput
                placeholder="Axborot texonologiyalari"
                {...form.getInputProps("expertise")}
              />
            </div>
            <div className={classes.input}>
              <p>ILMIY DARAJA</p>
              <DynamicSelect
                placeholder="Ilmiy daraja"
                value={form.values.scienceDegree}
                setValue={(value: any) =>
                  form.setFieldValue("scienceDegree", value)
                }
                data={levelData}
                label=""
              />
            </div>
            <div className={classes.input}>
              <p>ILMIY UNVON</p>
              <DynamicSelect
                placeholder="Ilmiy unvon"
                value={form.values.scientificTitle}
                setValue={(value: any) =>
                  form.setFieldValue("scientificTitle", value)
                }
                data={titleData}
                label=""
              />
            </div>
          </div>
          <div className={classes.line}>
            <div className={classes.input}>
              <p>ISHGA KIRGAN YILI</p>
              <DynamicSelect
                placeholder="Ishga kirgan"
                value={form.values.workYear}
                setValue={(value: any) => form.setFieldValue("workYear", value)}
                data={yearData}
                label=""
              />
            </div>
            <div className={classes.input}>
              <p>TELEFON</p>
              <TextInput
                placeholder="+998 90 222 05 36"
                {...form.getInputProps("phoneNumber")}
                type="tel"
              />
            </div>
            <div className={classes.input}>
              <p>Parol</p>
              <TextInput
                placeholder="********"
                {...form.getInputProps("password")}
                type="password"
              />
            </div>
          </div>
          <Button type="submit">Yaratish</Button>
        </form>
      </DynamicModal>
      <ScrollArea
        h={"100dvh"}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead className={cx("header", { ["scrolled"]: scrolled })}>
            <Table.Tr>
              <Table.Th style={{ textAlign: "center" }}>ID raqami</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Toliq ismi</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>
                {" "}
                Tug'ilgan sanasi{" "}
              </Table.Th>
              <Table.Th style={{ textAlign: "center" }}>
                Passport Raqami{" "}
              </Table.Th>
              <Table.Th style={{ textAlign: "center" }}>status </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {getData.map((el: UserData) => (
              <Table.Tr style={{ textAlign: "center" }} key={el.user_id}>
                <Table.Td>{el.phone_number}</Table.Td>
                <Table.Td>{`${el.last_name} ${el.first_name} ${el.middle_name}`}</Table.Td>
                <Table.Td>{el.birth_date}</Table.Td>
                <Table.Td>{el.passport}</Table.Td>
                <Table.Td>
                  <SwitchThumbButton />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
};
