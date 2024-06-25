import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { SimpleTable } from "../../components/simple-table/SimpleTable";
import { SwitchThumbButton } from "../../ui/buttons/SwitchThumbButton";
type TTableData = {
  title: string;
  values: (string | JSX.Element)[];
  width?: string;
}[];

const ListOFEmployees: FC = () => {
  // const [click, setClick] = useState<string | null>(null)
  const { pathname } = useLocation();

  const TableData: TTableData = [
    {
      title: "Xodim",
      values: [
        "Xamadov Otkir Raxmatulayevich",
        "Xamadov Otkir Raxmatulayevich",
        "Xamadov Otkir Raxmatulayevich",
        "Xamadov Otkir Raxmatulayevich",
        "Xamadov Otkir Raxmatulayevich",
        "Xamadov Otkir Raxmatulayevich",
        "Xamadov Otkir Raxmatulayevich",
      ],
    },
    {
      title: "Bo'inma",
      values: [
        "O'quv b'olimi",
        "O'quv b'olimi",
        "O'quv b'olimi",
        "O'quv b'olimi",
        "O'quv b'olimi",
        "O'quv b'olimi",
        "O'quv b'olimi",
      ],
    },
    {
      title: "Lavozim",
      values: ["Dekan", "Dekan", "Dekan", "Dekan", "Dekan", "Dekan", "Dekan"],
    },
    {
      title: "Stavka",
      values: [
        "0.50 stavka",
        "1.00 stavka",
        "0.50 stavka",
        "0.50 stavka",
        "1.00 stavka",
        "0.50 stavka",
        "0.50 stavka",
      ],
    },
    {
      title: "Status",
      values: [
        "Islamoqda",
        "Islamoqda",
        "Islamoqda",
        "Islamoqda",
        "Islamoqda",
        "Islamoqda",
        "Bo'shagan",
      ],
    },
    {
      title: "O'zgartirilgan",
      values: [
        "15.12.2020 15:50:03",
        "15.12.2020 15:50:03",
        "15.12.2020 15:50:03",
        "15.12.2020 15:50:03",
        "15.12.2020 15:50:03",
        "15.12.2020 15:50:03",
        "15.12.2020 15:50:03",
      ],
    },
  ];
  return (
    <>
      <div className="title">
        <p>
          <Link to={"/"}> Asosiy</Link> &#10093;
          <span> {pathname.slice(1)}</span>
        </p>
      </div>
      <SimpleTable tableData={TableData} />
    </>
  );
};
export default ListOFEmployees;
