import React from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import { Theme } from "../../globals.js";
import { MainToolbar } from "../sharedComponents/mainToolbar.js";
import {
  HideOnScroll,
  TabPanel,
} from "../sharedComponents/commonComponents.js";

import {
  AppBar,
  Tab,
  Tabs,
  Fab,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    linearLayout: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.between("xs", "sm")]: { width: "95%" },
      [theme.breakpoints.between("sm", "md")]: { width: 360 },
      [theme.breakpoints.up("md")]: { width: 480 },
    },
    profileFabButton: {
      width: 96,
      height: 96,
      marginTop: 15,
      marginBottom: 5,
      boxShadow: Theme.palette.custom.noShadow,
    },
    commonFabButton: {
      marginBottom: 5,
      height: 32,
      boxShadow: Theme.palette.custom.noShadow,
    },

    logo: {
      width: "90%",
      height: "90%",
      borderRadius: "50%",
    },
    dividerContainer: {
      display: "flex",
      flexDirection: "row",
      width: "95%",
      marginBottom: 8,
      marginTop: 8,
      alignItems: "center",
      borderBottom: "1px solid " + Theme.palette.custom.GreyLight,
    },
    dividerEditButton: {
      height: 24,
      boxShadow: Theme.palette.custom.noShadow,
      marginBottom: 4,
    },
    fabText: {
      fontFamily: "Fredoka One",
      paddingLeft: 8,
      paddingRight: 8,
      fontSize: 12,
      color: Theme.palette.custom.white,
      [theme.breakpoints.down("350")]: {
        fontSize: 10,
      },
    },
    dividerTitle: {
      fontFamily: "Roboto Medium",
      fontSize: 14,
      color: Theme.palette.custom.GreyLight,
      flexGrow: 1,
      margin: 0,
      paddingLeft: 8,
    },
    editFabsContainer: {
      padding: 4,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    itemContainer: {
      width: "100%",
      paddingLeft: 16,
      paddingRight: 16,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      [theme.breakpoints.up("sm")]: {
        paddingLeft: 32,
        paddingRight: 32,
      },
      [theme.breakpoints.up("md")]: {
        paddingLeft: 64,
        paddingRight: 64,
      },
    },

    itemKeyText: {
      width: "40%",
      fontFamily: "Roboto Medium",
      fontSize: 14,
      color: Theme.palette.custom.GreyLight,
    },
    itemValueText: {
      width: "60%",
      wordBreak: "break-all",
      fontFamily: "Roboto Regular",
      fontSize: 14,
      textAlign: "end",
      color: Theme.palette.custom.GreyLight,
    },
    itemContainerSmall: {
      width: "100%",
      paddingLeft: 16,
      paddingRight: 16,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      [theme.breakpoints.up("sm")]: {
        paddingLeft: 32,
        paddingRight: 32,
      },
      [theme.breakpoints.up("md")]: {
        paddingLeft: 64,
        paddingRight: 64,
      },
    },

    itemKeyTextSmall: {
      width: "40%",
      margin: 2,
      fontFamily: "Roboto Regular",
      fontSize: 12,
      color: Theme.palette.custom.GreyLight,
    },
    itemValueTextSmall: {
      width: "60%",
      margin: 2,
      wordBreak: "break-all",
      fontFamily: "Roboto Regular",
      fontSize: 12,
      textAlign: "end",
      color: Theme.palette.custom.GreyLight,
    },
    itemContainerV: {
      width: "100%",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      [theme.breakpoints.up("sm")]: {
        paddingLeft: 32,
        paddingRight: 32,
      },
      [theme.breakpoints.up("md")]: {
        paddingLeft: 64,
        paddingRight: 64,
      },
    },
    itemKeyTextV: {
      width: "100%",
      fontFamily: "Roboto Medium",
      fontSize: 14,
      color: Theme.palette.custom.GreyLight,
    },
    itemValueTextV: {
      width: "100%",
      fontFamily: "Roboto Regular",
      fontSize: 14,
      textAlign: "start",
      color: Theme.palette.custom.GreyLight,
    },
    singleItem: {
      width: "100%",
      paddingLeft: 16,
      paddingRight: 16,
      [theme.breakpoints.up("sm")]: {
        paddingLeft: 32,
        paddingRight: 32,
      },
      [theme.breakpoints.up("md")]: {
        paddingLeft: 64,
        paddingRight: 64,
      },
      fontFamily: "Roboto Regular",
      fontSize: 14,
      textAlign: "start",
      color: Theme.palette.custom.GreyLight,
    },
    gapFab: {
      [theme.breakpoints.up("sm")]: {
        width: 24,
        height: "100%",
      },
    },
    smallGroup: {
      width: "100%",
      marginTop: 8,
      marginBottom: 24,
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
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar className={styles.root}>
          <MainToolbar />
          <ThemeProvider theme={tabsTheme}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Account details" />
              <Tab label="My subscription" />
            </Tabs>
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

const LogoUsernamePasswordComponent = (props) => {
  const isBigScreen = useMediaQuery(useTheme().breakpoints.up("sm"));
  if (isBigScreen) {
    return (
      <React.Fragment>
        <Fab
          color="primary"
          className={styles.profileFabButton}
          onClick={props.onClick}
        />
        <Fab
          color="primary"
          className={styles.commonFabButton}
          variant="extended"
          onClick={props.onClick}
        >
          <h1 className={styles.fabText}>Change logo</h1>
        </Fab>
        <Fab
          className={styles.commonFabButton}
          variant="extended"
          color="primary"
        >
          <h1 className={styles.fabText}>Change username</h1>
        </Fab>
        <Fab
          className={styles.commonFabButton}
          variant="extended"
          color="primary"
        >
          <h1 className={styles.fabText}>Change password</h1>
        </Fab>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Fab
          color="primary"
          className={styles.profileFabButton}
          onClick={props.onClick}
        />
        <Fab
          color="primary"
          className={styles.commonFabButton}
          variant="extended"
          onClick={props.onClick}
        >
          <h1 className={styles.fabText}>Change logo</h1>
        </Fab>
        <div className={styles.editFabsContainer}>
          <Fab
            className={styles.commonFabButton}
            variant="extended"
            color="primary"
          >
            <h1 className={styles.fabText}>Change username</h1>
          </Fab>
          <Fab
            className={styles.commonFabButton}
            variant="extended"
            color="primary"
          >
            <h1 className={styles.fabText}>Change password</h1>
          </Fab>
        </div>
      </React.Fragment>
    );
  }
};

const DividerComp = (props) => {
  let element = (
    <Fab
      variant="extended"
      color="primary"
      onClick={props.onClick}
      className={styles.dividerEditButton}
    >
      <h1 className={styles.fabText}>Edit</h1>
    </Fab>
  );
  if (props.hidefab === true) {
    element = <></>;
  }

  return (
    <div className={styles.dividerContainer}>
      <h1 className={styles.dividerTitle}>{props.title}</h1>
      {element}
    </div>
  );
};

const ItemCompo = (props) => {
  if (props.variant === "small") {
    return (
      <div className={styles.itemContainerSmall}>
        <h1 className={styles.itemKeyTextSmall}>{props.keyy}</h1>
        <h1 className={styles.itemValueTextSmall}>{props.value}</h1>
      </div>
    );
  }

  if (props.Idirection === "column") {
    return (
      <div className={styles.itemContainerV}>
        <h1 className={styles.itemKeyTextV}>{props.keyy}</h1>
        <h1 className={styles.itemValueTextV}>{props.value}</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.itemContainer}>
        <h1 className={styles.itemKeyText}>{props.keyy}</h1>
        <h1 className={styles.itemValueText}>{props.value}</h1>
      </div>
    );
  }
};

const TabOneComp = (props) => {
  return (
    <ThemeProvider theme={Theme}>
      <Paper className={styles.linearLayout}>
        <LogoUsernamePasswordComponent />

        <DividerComp title={"Account info"} />
        <div className={styles.smallGroup}>
          <ItemCompo variant="small" keyy={"Name : "} value={"Zain"} />
          <ItemCompo
            variant="small"
            keyy={"Phone : "}
            value={"00962 79 4536987"}
          />
          <ItemCompo
            variant="small"
            keyy={"Email : "}
            value={"alaa2sbateen@gmail.com"}
          />
          <ItemCompo
            variant="small"
            keyy={"Landing page : "}
            value={"www.Rozanama.com"}
          />
          <ItemCompo
            variant="small"
            keyy={"Facebook link : "}
            value={"www.facebook.com/fuadwinch"}
          />
          <ItemCompo
            variant="small"
            keyy={"Youtube link : "}
            value={"www.youtube.com/techlead"}
          />
          <ItemCompo
            variant="small"
            keyy={"Linkedin link : "}
            value={"www.linkedin.com/techlead"}
          />
          <ItemCompo
            variant="small"
            keyy={"Twitter link : "}
            value={"www.twitter.com/techlead"}
          />
        </div>
        <ItemCompo
          keyy={"Description : "}
          value={
            "For designers of type, creating the characters is only part of the job. Much of the hidden engineering and heavy lifting comes in fine tuning how letters, ligatures, digits, and punctuation work together in combination— and kerning the white space between them. Many type designers have favorite words and phrases they use to assess and stress-test some of the more unusual letter sequences.Below, some leading type designers describe their favorite test words, which we’ve set in one of their fonts."
          }
          Idirection="column"
        />

        <DividerComp title={"Contacts for individuals"} />
        <div className={styles.smallGroup}>
          <ItemCompo
            variant="small"
            keyy={"Phone : "}
            value={"00962 79 4536987"}
          />
          <ItemCompo
            variant="small"
            keyy={"Email : "}
            value={"00962 79 4536987"}
          />
          <ItemCompo
            variant="small"
            keyy={"Messenger : "}
            value={"https://web.facebook.com/settings"}
          />
          <ItemCompo
            variant="small"
            keyy={"WhatsApp : "}
            value={"00962 79 4536987"}
          />
        </div>

        <DividerComp title={"Contacts for organizations"} />
        <div className={styles.smallGroup}>
          <ItemCompo
            variant="small"
            keyy={"Phone : "}
            value={"00962 79 4536987"}
          />
          <ItemCompo
            variant="small"
            keyy={"Email : "}
            value={"00962 79 4536987"}
          />
          <ItemCompo
            variant="small"
            keyy={"Messenger : "}
            value={"https://web.facebook.com/settings"}
          />
          <ItemCompo
            variant="small"
            keyy={"WhatsApp : "}
            value={"00962 79 4536987"}
          />
        </div>

        <DividerComp title={"Sectors"} />
        <h1 className={styles.singleItem}>1. Information Technology</h1>
        <h1 className={styles.singleItem}>2. Medicine</h1>
        <h1 className={styles.singleItem}>3. Biology</h1>
        <h1 className={styles.singleItem}>4. Chemicals Engineering</h1>
      </Paper>
    </ThemeProvider>
  );
};

const TabTwoComp = (props) => {
  return (
    <Paper className={styles.linearLayout}>
      <DividerComp title={"Current subscription"} hidefab={true} />
      <div className={styles.smallGroup}>
        <ItemCompo
          variant="small"
          keyy={"Expiary date : "}
          value={"2/6/2021"}
        />
        <ItemCompo
          variant="small"
          keyy={"Remaining days : "}
          value={"Mastercard ****8311"}
        />
        <ItemCompo
          variant="small"
          keyy={"Last time exetended : "}
          value={"9/9/2020"}
        />
        <ItemCompo
          variant="small"
          keyy={"Note : "}
          value={"Coupon activation"}
        />
      </div>
      <Fab
        color="primary"
        className={styles.commonFabButton}
        variant="extended"
        onClick={props.onClick}
      >
        <h1 className={styles.fabText}>Enter Coupon Code</h1>
      </Fab>
      <Fab
        color="primary"
        className={styles.commonFabButton}
        variant="extended"
        onClick={props.onClick}
      >
        <h1 className={styles.fabText}>Extend my subscription</h1>
      </Fab>
      <DividerComp title={"2020"} hidefab={true} />
      <div className={styles.smallGroup}>
        <ItemCompo variant="small" keyy={"Month : "} value={"2/6/2021"} />
        <ItemCompo
          variant="small"
          keyy={"Payment : "}
          value={"Mastercard ****8311"}
        />
        <ItemCompo variant="small" keyy={"Amount : "} value={"9/9/2020"} />
        <ItemCompo
          variant="small"
          keyy={"Date of payment : "}
          value={"9/9/2020"}
        />
        <ItemCompo
          variant="small"
          keyy={"Note : "}
          value={"Coupon activation"}
        />
      </div>
      <DividerComp title={"2019"} hidefab={true} />
      <div className={styles.smallGroup}>
        <ItemCompo variant="small" keyy={"Month : "} value={"2/6/2021"} />
        <ItemCompo
          variant="small"
          keyy={"Payment : "}
          value={"Mastercard ****8311"}
        />
        <ItemCompo variant="small" keyy={"Amount : "} value={"9/9/2020"} />
        <ItemCompo
          variant="small"
          keyy={"Date of payment : "}
          value={"9/9/2020"}
        />
        <ItemCompo
          variant="small"
          keyy={"Note : "}
          value={"Coupon activation"}
        />
      </div>
      <div className={styles.smallGroup}>
        <ItemCompo variant="small" keyy={"Month : "} value={"2/6/2021"} />
        <ItemCompo
          variant="small"
          keyy={"Payment : "}
          value={"Mastercard ****8311"}
        />
        <ItemCompo variant="small" keyy={"Amount : "} value={"9/9/2020"} />
        <ItemCompo
          variant="small"
          keyy={"Date of payment : "}
          value={"9/9/2020"}
        />
        <ItemCompo
          variant="small"
          keyy={"Note : "}
          value={"Coupon activation"}
        />
      </div>{" "}
      <div className={styles.smallGroup}>
        <ItemCompo variant="small" keyy={"Month : "} value={"2/6/2021"} />
        <ItemCompo
          variant="small"
          keyy={"Payment : "}
          value={"Mastercard ****8311"}
        />
        <ItemCompo variant="small" keyy={"Amount : "} value={"9/9/2020"} />
        <ItemCompo
          variant="small"
          keyy={"Date of payment : "}
          value={"9/9/2020"}
        />
        <ItemCompo
          variant="small"
          keyy={"Note : "}
          value={"Coupon activation"}
        />
      </div>
    </Paper>
  );
};

export default Main;
