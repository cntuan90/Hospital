import React from "react";
import { ButtonBase, ButtonBaseProps } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    height: "28px",
    width: "210px",
    borderRadius: "25px",
    padding: "10px 22px",
    backgroundColor: "none",
    margin: "0 10px",
    // backgroundColor: "#e0e0e0",
    color: "#53abe0",
    transition: "opacity 0.2s linear",
    "& a": {
      color: "#53abe0",
    },
    "&:hover": {
      backgroundColor: "#606060",
      color: "#ebebeb",
      "& a": {
        backgroundColor: "#606060",
        color: "#ebebeb",
      },
    },
    "&:disabled": {
      backgroundColor: "#e0e0e0",
      color: "#a7a7a7",
    },
  },
});

const ConditionsSearchButton = React.forwardRef<ButtonBaseProps, any>(
  (props, ref) => (
    <>
      <ButtonBase ref={ref} {...props}>
        {props.children}
      </ButtonBase>
    </>
  )
);

export default withStyles(styles)(ConditionsSearchButton);
