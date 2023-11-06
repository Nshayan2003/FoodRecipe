import { Button } from "@mui/material";

const MyButton = ({
  type = "button",
  variant = "contained",
  label,
  onClick,
  ...rest
}) => {
  return (
    <Button type={type} variant={variant} onClick={onClick} {...rest}>
      {label}
    </Button>
  );
};

export default MyButton;
