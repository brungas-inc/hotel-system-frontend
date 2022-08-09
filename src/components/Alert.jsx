import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { alert, Alert as AlertComponent } from "@material-tailwind/react";

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
  const [time, setTime] = useState();

  const addMessage = (input, time) => {
    setMessage(input);
    setShow(true);
    time && setTime(time);
  };

  const errorMessage = (input, time) => {
    setAlertColor(alertColors.danger);
    addMessage(input, time);
  };

  const successMessage = (input, time) => {
    setAlertColor(alertColors.success);
    addMessage(input, time);
  };

  const warningMessage = (input, time) => {
    setAlertColor(alertColors.warning);
    addMessage(input, time);
  };
  const progressMessage = (input, time) => {
    setAlertColor(alertColors.progress);
    addMessage(input, time);
  };

  useImperativeHandle(ref, () => ({
    showError: (input, time) => errorMessage(input, time),
    showSuccess: (input, time) => successMessage(input, time),
    showWarning: (input, time) => warningMessage(input, time),
    showProgress: (input, time) => progressMessage(input, time),
  }));
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, time || 5000);
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
      icon={
        alertColor === alertColors.progress ? (
          <svg
            class="animate-spin h-5 w-5 mr-3 text-white"
            viewBox="0 0 24 24"
          ></svg>
        ) : null
      }
    >
      {message}
    </AlertComponent>
  );
};

export default forwardRef(Alert);
