import TextField from "@mui/material/TextField";

function SMInput(props) {
  const { label, disabled, onChange ,variant,color,type,className} = props;
  return (
    <>
      <TextField
        color={color}
        onChange={onChange}
        disabled={disabled}
        variant={variant}
        label={label}
        type={type}
        className={className}
      />
    </>
  );
}
export default SMInput;