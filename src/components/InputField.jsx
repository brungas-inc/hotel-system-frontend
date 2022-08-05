import { Input } from "@material-tailwind/react";
import React, {
  useState,
  useEffect,
  forwardRef,
  createRef,
  useImperativeHandle,
  useRef,
} from "react";

const InputField = (props, ref) => {
  const input = useRef();
  const [value, setValue] = useState("");
  const [error, setError] = useState();
  const [errorMessage, seterrorMessage] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const [hint, setHint] = useState();
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let rules = props.rules || [],
      i = 0;
    for (; i < rules.length; i++) {
      let validate = rules[i](value);
      if (validate !== true) {
        setError(true);
        seterrorMessage(validate);
        return false;
      } else {
        setError(false);
      }
    }
    return true;
  };

  const onChange = (input, validateIt = true) => {
    if (props.onChange) {
      props.onChange(input.value, input);
    }
    setValue(input.value);
  };

  const getInput = () => {
    return this.input;
  };

  const changeValue = (value, validate = false) => {
    setValue(() => {
      input.value = value;
      onChange(input, value, validate);
    });
  };

  useImperativeHandle(ref, () => ({
    changeValue: () => changeValue(),
    getInput: () => getInput(),
    validate: () => validate(),
  }));

  useEffect(() => {
    if (props.hint !== hint) setHint(props.hint);
  }, [props.hint]);

  useEffect(() => {
    if (value) {
      validate();
    }
  }, [value]);

  return (
    <div className="mb-8 relative">
      <Input
        ref={input}
        {...props}
        error={error}
        color="indigo"
        variant="outlined"
        className=""
        size="lg"
        onChange={(e) => onChange(e.target)}
        autoComplete="off"
      />
      {error ? (
        <span className="text-xs text-red-400 shadow-sm absolute -bottom-5 left-3">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

export default forwardRef(InputField);
