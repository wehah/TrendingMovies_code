import React from "react";
const InputItem = React.forwardRef(({ type, placeholder, error }, ref) => {
  return (
    <div className="w-100">
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="form-control"
        style={{
          borderColor: error ? "#F50000" : "",
          backgroundColor: error ? "#FFC2C2" : "white",
        }}
      />
    </div>
  );
});
export default InputItem;