import { Button } from "@mui/material";

const ButtonSecondary = ({
  buttonType,
  buttonVariant,
  buttonColor,
  endIcon,
  startIcon,
  buttonStyles,
  children,
  onButtonClick,
  color,
}) => {
  return (
    <Button
      color={color}
      onClick={onButtonClick}
      disableElevation
      disableRipple
      sx={{
        marginTop: "2rem",
        marginRight: "1rem",
        textTransform: "none",
        borderColor: buttonColor,
        backgroundColor: buttonColor,
        fontWeight: "500",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: buttonColor,
        },
        ...buttonStyles,
      }}
      type={buttonType}
      variant={buttonVariant}
      endIcon={endIcon}
      startIcon={startIcon}
    >
      {children}
    </Button>
  );
};

export default ButtonSecondary;
