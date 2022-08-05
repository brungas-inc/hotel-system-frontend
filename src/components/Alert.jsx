import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Alert as AlertComponent } from "@material-tailwind/react";

const Alert = (props, ref) => {
  const alertColors = {
    warning: "amber",
    danger: "red",
    success: "green",
    progress: "blue",
  };
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [alertColor, setAlertColor] = useState(alertColors.progress);

  const addMessage = (input) => {
    setMessage(input);
    setShow(true);
  };

  const errorMessage = (input) => {
    setAlertColor(alertColors.danger);
    addMessage(input);
  };

  const successMessage = (input) => {
    setAlertColor(alertColors.success);
    addMessage(input);
  };

  const warningMessage = (input) => {
    setAlertColor(alertColors.warning);
    addMessage(input);
  };
  const progressMessage = (input) => {
    setAlertColor(alertColors.progress);
    addMessage(input);
  };

  useImperativeHandle(ref, () => ({
    showError: (input) => errorMessage(input),
    showSuccess: (input) => successMessage(input),
    showWarning: (input) => warningMessage(input),
    showProgress: (input) => progressMessage(input),
  }));
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 1500);
    }
  }, [show]);
  return (
    <AlertComponent
      variant="gradient"
      color={alertColor}
      show={show}
      dismissible={{
        onClose: () => setShow(false),
      }}
    >
      {message}
    </AlertComponent>
  );
};

export default forwardRef(Alert);
