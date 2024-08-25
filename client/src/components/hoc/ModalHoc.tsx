import { useState } from "react";

export type HocPropsType = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  triggerFetch:boolean;
  setTriggerFetch:React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalHoc = (Component: React.ComponentType<HocPropsType>) => {
  return () => {
    const [show, setShow] = useState<boolean>(false);
    const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
    const handleClose = () => {
      setShow(false);
    };
    return (
      <Component
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        triggerFetch={triggerFetch}
        setTriggerFetch={setTriggerFetch}
      />
    );
  };
};

export default ModalHoc;
