import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { changeValue } from "../../hooks/UserPanelHook";
import { DynamicModal } from "../../ui/dynamic-modal/DynamicModal";
import { ImageUploader } from "../../ui/image-uploader/ImageUploader";
import classes from "./UserPanel.module.css";
import { modalData } from "./userData";

export const UserPanel = () => {
  const { pathname } = useLocation();

  const getComponent = (
    type: string,
    placeholder: string,
    data?: string[] | number[]
  ) => {
    return changeValue(type, placeholder, data);
  };

  return (
    <>
      <div className="title">
        <p>
          <Link to={"/"}> Asosiy</Link> &#10093;
          <span> {pathname.slice(1)}</span>
        </p>
      </div>
      <DynamicModal title="Xodim qoshish" buttonName="Xodim qo'shish">
        <div className={classes.modal}>
          <div className={classes.left}>
            <div className={classes.line}>
              {modalData.slice(0, 3).map((el, inx) => (
                <div key={inx} className={classes.input}>
                  <p>{el.p}</p>
                  {getComponent(el.type, el.placeholder, el.data)}
                </div>
              ))}
            </div>
            <div className={classes.line}>
              {modalData.slice(3, 6).map((el, inx) => (
                <div key={inx} className={classes.input}>
                  <p>{el.p}</p>
                  {getComponent(el.type, el.placeholder, el.data)}
                </div>
              ))}
            </div>
            <div className={classes.line}>
              {modalData.slice(6, 9).map((el, inx) => (
                <div key={inx} className={classes.input}>
                  <p>{el.p}</p>
                  {getComponent(el.type, el.placeholder, el.data)}
                </div>
              ))}
            </div>
            <div className={classes.line}>
              {modalData.slice(9, 12).map((el, inx) => (
                <div key={inx} className={classes.input}>
                  <p>{el.p}</p>
                  {getComponent(el.type, el.placeholder, el.data)}
                </div>
              ))}
            </div>
            <div className={classes.line}>
              {modalData.slice(12, 15).map((el, inx) => (
                <div key={inx} className={classes.input}>
                  <p>{el.p}</p>
                  {getComponent(el.type, el.placeholder, el.data)}
                </div>
              ))}
            </div>
          </div>
          <div className={classes.right}>
            <FaRegCircleUser />
            <ImageUploader />
          </div>
        </div>
      </DynamicModal>
    </>
  );
};
