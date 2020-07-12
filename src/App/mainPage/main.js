import React, { useState } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import { Theme } from "../../globals.js";
import { HideOnScroll } from "../sharedComponents/commonComponents.js";
import { EventComponent } from "../sharedComponents/eventComp.js";
import { MainToolbar } from "../sharedComponents/mainToolbar.js";

import { ThemeProvider } from "@material-ui/styles";

import TodayIcon from "@material-ui/icons/Today";
import {
  IconButton,
  Fab,
  AppBar,
  TextField,
  Container,
  CircularProgress,
  Popover,
  FormControlLabel,
  Checkbox,
  Switch,
} from "@material-ui/core";

import { DataModel } from "../presenters/mainPagePresenter";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  horizontalLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
  popoverTitle: {
    fontFamily: "Fredoka One",
    fontSize: 20,
    textAlign: "left",
    color: Theme.palette.primary.dark,
  },
  popoverTextItems: {
    fontFamily: "Roboto Medium",
    fontSize: 16,
    textAlign: "left",
    color: Theme.palette.primary.dark,
  },
  space: { width: "100%", height: 48 },
  popoverHeader: {
    height: 48,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  linearLayout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  containerRoot: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    maxWidth: "100%",
  },
  dateContainer: {
    maxWidth: "315px",
    minWidth: "310px",
    margin: "0 auto",
  },
  headerContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    width: "100%",
    paddingTop: 80,
    backgroundColor: Theme.palette.primary.dark,
    textAlign: "center",
    maxWidth: "100%",
  },
  textFieldRoot: {
    width: "90%",
    margin: "0 auto",
    marginTop: 15,
    marginBottom: 15,
  },
  fabRoot: {
    width: "50%",
    margin: "0 auto",
    height: 40,
    marginBottom: 15,
  },
  filterButton: {
    position: "absolute",
    right: 0,
    marginRight: 10,
  },
  grow: {
    flexGrow: 1,
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  circularProgress: {
    width: "100%",
    height: "100%",
  },
  pleaseWaitText: {
    fontFamily: "Fredoka One",
    fontSize: 14,
    textAlign: "center",
    color: Theme.palette.primary.main,
  },
  popoverLabelControl: {
    fontFamily: "Fredoka One",
    fontSize: 16,
    color: Theme.palette.primary.main,
  },
  sponsorsFabButton: {
    width: 96,
    height: 96,
    margin: 25,
  },
  sponsorsText: {},
});

const dateTheme = createMuiTheme({
  ...Theme,
  palette: {
    primary: {
      light: "#ffff6b",
      main: "#fdd835",
      dark: "#c6a700",
    },
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: { display: "none" },
    },
  },
});

const textFieldTheme = createMuiTheme({
  ...Theme,
  palette: {
    primary: {
      light: Theme.palette.custom.white,
      main: Theme.palette.custom.white,
      dark: Theme.palette.custom.white,
    },
    type: "dark",
  },
});

const fabTheme = createMuiTheme({
  ...Theme,
  palette: {
    primary: {
      light: "#ffff6b",
      main: "#fdd835",
      dark: "#c6a700",
    },
    type: "dark",
  },
});

const MainNotLoaded = (props) => {
  const styles = useStyles();
  return (
    <div className={styles.linearLayout}>
      <h1 className={styles.pleaseWaitText}>Please wait ......</h1>
      <CircularProgress color="primary" className={styles.circularProgress} />
    </div>
  );
};

const PopoverContent = (props) => {
  const styles = useStyles();
  const [orgsChecked, setOrgChecked] = useState(false);
  const [eventsChecked, setEventsChecked] = useState(true);
  const [sponsorsOnly, setSponsorsOnly] = useState(false);

  const popoverContent = (
    <div className={styles.linearLayout}>
      <div className={styles.popoverHeader}>
        <h1 className={styles.popoverTitle}>Filter results</h1>
        <div className={styles.grow} />
        <IconButton>
          <CloseIcon color="primary" onClick={props.onClose} />
        </IconButton>
      </div>
      <div className={styles.space} />
      <FormControlLabel
        classes={{ label: styles.popoverLabelControl }}
        color="primary"
        control={
          <Checkbox
            color="primary"
            checked={orgsChecked}
            onChange={(event) => {
              setOrgChecked(event.target.checked);
              props.onOrgChanged(event.target.checked);
            }}
            name="checkedA"
          />
        }
        label="Organizations"
      />
      <FormControlLabel
        classes={{ label: styles.popoverLabelControl }}
        color="primary"
        control={
          <Checkbox
            color="primary"
            checked={eventsChecked}
            onChange={(event) => {
              setEventsChecked(event.target.checked);
              props.onEventsChanged(event.target.checked);
            }}
            name="checkedB"
          />
        }
        label="Events"
      />
      <FormControlLabel
        classes={{ label: styles.popoverLabelControl }}
        color="primary"
        control={
          <Switch
            color="primary"
            checked={sponsorsOnly}
            onChange={(event) => {
              setSponsorsOnly(event.target.checked);
              props.onSponsorsOnlyChanged(event.target.checked);
            }}
            name="checkedC"
          />
        }
        label="Show events looking for sponsors only"
      />
    </div>
  );

  return popoverContent;
};
const MainLoaded = (props) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const [isDateLoading, setDateLoading] = useState(false);
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [isOrgsShown, setOrgsShown] = useState(false);
  const [isEventsShown, setEventsShown] = useState(true);
  const [isSponsorOnlyLoading, setSponsorOnlyLoading] = useState(false);

  const textFieldRef = React.createRef();

  //builder methods
  const generateEvents = () => {
    const elements = DataModel.events.map((item) => {
      return <EventComponent event={item} />;
    });
    return elements;
  };
  const generateOrganizations = () => {
    const elements = DataModel.organizations.map((item) => {
      return (
        <div>
          <Fab
            color="primary"
            className={styles.sponsorsFabButton}
            href={item.landingPage}
          >
            <img className={styles.logo} src={item.logo} alt="Logo"></img>
          </Fab>
          <h1 className={styles.sponsorsText}>{item.title}</h1>
        </div>
      );
    });
    return elements;
  };

  //callbacks
  const searchCallBack = (success) => {
    setSearchLoading(false);
  };
  const changeDateCallback = (success) => {
    setDateLoading(false);
  };

  //events handlers
  const onSearchClicked = () => {
    const value = textFieldRef.current.value;
    DataModel.setSearchQuery(value, searchCallBack);
    setSearchLoading(true);
  };
  const onDateChanged = (value) => {
    DataModel.setDate(value, changeDateCallback);
    setDateLoading(true);
  };

  const onPopoverClose = () => {
    setAnchorEl(null);
  };

  let mainContent = [];

  if (isOrgsShown && !isSearchLoading) {
    mainContent.push(
      <>
        <div className={styles.gridContainer}>{generateOrganizations()}</div>
        {!DataModel.isMoreOrgs && (
          <Fab
            onClick={() => {}}
            color="primary"
            variant="extended"
            classes={{ root: styles.fabRoot }}
          >
            Load more
          </Fab>
        )}
      </>
    );
  }

  if (isEventsShown && !isSearchLoading) {
    if (isDateLoading || isSponsorOnlyLoading) {
      mainContent.push(<MainNotLoaded />);
    } else {
      mainContent.push(
        <>
          <div className={styles.gridContainer}>{generateEvents()}</div>
          {!DataModel.isMoreEvents && (
            <Fab
              onClick={() => {}}
              color="primary"
              variant="extended"
              classes={{ root: styles.fabRoot }}
            >
              Load more
            </Fab>
          )}
        </>
      );
    }
  }
  if (isSearchLoading) {
    mainContent.push(<MainNotLoaded />);
  }

  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar>
          <MainToolbar />
        </AppBar>
      </HideOnScroll>
      <Container classes={{ root: styles.containerRoot }}>
        <Container classes={{ root: styles.headerContainer }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={dateTheme}>
              <div className={styles.dateContainer}>
                <DatePicker
                  variant="static"
                  value={DataModel.date}
                  onChange={onDateChanged}
                />
              </div>
            </ThemeProvider>
          </MuiPickersUtilsProvider>
          <ThemeProvider theme={textFieldTheme}>
            <TextField
              variant="outlined"
              label="Search"
              ref={textFieldRef}
              classes={{ root: styles.textFieldRoot }}
            />
          </ThemeProvider>
          <div>
            <ThemeProvider theme={fabTheme}>
              <Fab
                onClick={onSearchClicked}
                color="primary"
                variant="extended"
                classes={{ root: styles.fabRoot }}
              >
                Search
              </Fab>
            </ThemeProvider>
            <IconButton classes={{ root: styles.filterButton }}>
              <TodayIcon color="secondary" onClick={() => {}} />
            </IconButton>
          </div>
          <Popover
            open={anchorEl !== null}
            anchorEl={anchorEl}
            onClose={onPopoverClose}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          >
            <PopoverContent
              onClose={onPopoverClose}
              onOrgChanged={(isShown) => {
                setOrgsShown(isShown);
              }}
              onEventsChanged={(isShown) => {
                setEventsShown(isShown);
              }}
              onSponsorsOnlyChanged={(isOnly) => {
                //because it does changed
                setSponsorOnlyLoading(true);
                DataModel.setUnpublishedOnly(isOnly, (success) => {
                  setSponsorOnlyLoading(false);
                });
              }}
            />
          </Popover>
          {mainContent}
        </Container>
      </Container>
    </React.Fragment>
  );
};

const Main = (props) => {
  const styles = useStyles();
  const [isInitDone, setInitDone] = useState(DataModel.isInitDone);

  if (!DataModel.isInitDone) {
    DataModel.registerInitListener(() => {
      setInitDone(true);
    });
    return <MainNotLoaded />;
  } else if (DataModel.isInitError) {
    return <MainNotLoaded />;
  } else {
    return <MainLoaded />;
  }
};

export default Main;
