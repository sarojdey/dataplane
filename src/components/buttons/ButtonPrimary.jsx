import { Button } from "@mui/material";

const ButtonPrimary = ({
  buttonType,
  buttonVariant,
  buttonColor,
  endIcon,
  startIcon,
  buttonStyles,
  children,
  onButtonClick,
}) => {
  return (
    <Button
      onClick={onButtonClick}
      disableElevation
      disableRipple
      sx={{
        fontWeight: "500",
        fontSize: "16px",
        textTransform: "none",
        ...buttonStyles,
      }}
      type={buttonType}
      variant={buttonVariant}
      color={buttonColor}
      endIcon={endIcon}
      startIcon={startIcon}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
