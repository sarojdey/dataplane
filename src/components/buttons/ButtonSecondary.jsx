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
}) => {
  return (
    <Button
      onClick={onButtonClick}
      disableElevation
      disableRipple
      sx={{
        width: "7rem",
        marginTop: "2rem",
        marginRight: "1rem",
        textTransform: "none",
        borderColor: `${buttonColor}.main`,
        fontWeight: "500",
        fontSize: { xs: "14px", md: "16px" },
        "&:hover": {
          backgroundColor: `${buttonColor}.main`,
          color: "white",
        },
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

export default ButtonSecondary;
