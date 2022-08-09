import { Textarea } from "@material-tailwind/react";

const InputField = ({ name, ...rest }) => {
  return (
    <div className="mb-8 relative">
      <Textarea
        {...rest}
        error={errors[name]}
        color={TAILWIND_COLORS.primary}
        variant="outlined"
        size="lg"
        autoComplete="off"
      />
      {errors[name] ? (
        <span className="text-xs text-red-400 shadow-sm absolute -bottom-5 left-3">
          {errors[name]}
        </span>
      ) : null}
    </div>
  );
};

export default InputField;
