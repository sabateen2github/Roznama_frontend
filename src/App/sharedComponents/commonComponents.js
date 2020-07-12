import React from "react";

import { useScrollTrigger, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
  return {
    tabPanel: {
      paddingTop: 125,
    },
    centerer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  };
});

export const HideOnScroll = (props) => {
  const trigger = useScrollTrigger();
  return (
    <Slide direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
};
export function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const styles = useStyles();
  return (
    <div
      className={styles.tabPanel}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <div className={styles.centerer}>{children}</div>
    </div>
  );
}

