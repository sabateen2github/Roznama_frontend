import React from "react";

import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  TabPanel,
  HideOnScroll,
} from "../sharedComponents/commonComponents.js";
import { MainToolbar } from "../sharedComponents/mainToolbar";

import { EventComponent } from "../sharedComponents/eventComp.js";

import { AppBar, Tabs, Tab, IconButton } from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";

import { Theme } from "../../globals.js";

const useStyles = makeStyles((theme) => {
  return {
    grow: {
      flexGrow: 1,
    },
    horizontalLayout: {
      display: "flex",
      flexDirection: "row",
    },
    icon: {
      marginRight: 0,
      [theme.breakpoints.up("sm")]: {
        marginRight: 24,
      },
    },
    gridContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      marginTop: 10,
    },
  };
});

const tabsTheme = createMuiTheme({
  ...Theme,
  palette: {
    primary: {
      light: Theme.palette.custom.white,
      main: Theme.palette.custom.white,
      dark: Theme.palette.custom.white,
    },
  },
});

let styles;

const Main = (props) => {
  styles = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    window.scrollTo(0, 0);
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar className={styles.grow}>
          <MainToolbar />
          <ThemeProvider theme={tabsTheme}>
            <div className={styles.horizontalLayout}>
              <Tabs
                className={styles.grow}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab wrapped label="My upcoming events" />
                <Tab wrapped label="My past events" />
              </Tabs>
              <IconButton className={styles.icon}>
                <TodayIcon color="primary" />
              </IconButton>
            </div>
          </ThemeProvider>
        </AppBar>
      </HideOnScroll>
      <TabPanel value={value} index={0}>
        <TabOneComp />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabTwoComp />
      </TabPanel>
    </React.Fragment>
  );
};
export default Main;

const TabOneComp = (props) => {
  return (
    <div id="TabOne" className={styles.gridContainer}>
      <EventComponent />
      <EventComponent />
      <EventComponent />
      <EventComponent />
      <EventComponent />
      <EventComponent />
    </div>
  );
};
const TabTwoComp = (props) => {
  return (
    <div id="TabTwo" className={styles.gridContainer}>
      <EventComponent />
      <EventComponent />
      <EventComponent />
      <EventComponent />
    </div>
  );
};
