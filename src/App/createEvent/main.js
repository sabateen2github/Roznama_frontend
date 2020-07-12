import React, { useState } from "react";
import {
  AppBar,
  Button,
  TextField,
  useScrollTrigger,
  Fab,
  Switch,
  FormControlLabel,
  IconButton,
  Popover,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/styles";
import { Theme, Categories } from "../../globals.js";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { DatePicker } from "@material-ui/pickers";
const useStyles = makeStyles((theme) => {
  return {
    linearLayout: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 82,
    },
    buttonContentContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    buttonLabel: {
      fontFamily: "Fredoka One",
      fontSize: 24,
      color: Theme.palette.primary.main,
      textAlign: "center",
      flexGrow: 1,
      margin: 0,
    },
    buttonRoot: {
      width: 250,
      borderRadius: 50,
      border: "1.5px solid",
    },
    textFieldRoot: {
      width: "95%",
      [theme.breakpoints.up("sm")]: { width: 480 },
      marginTop: 24,
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
    saveFabButton: {
      marginBottom: 20,
      marginTop: 15,
      height: 32,
      boxShadow: Theme.palette.custom.noShadow,
    },
    title: {
      fontFamily: "Fredoka One",
      fontSize: 18,
      textAlign: "center",
      width: "100%",
      color: Theme.palette.custom.white,
    },
    categoryItemContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: 25,
      borderColor: Theme.palette.primary.main,
      borderWidth: "2px",
    },
    categoryItemButton: {
      width: 48,
    },
    categoryItemLabel: {
      fontFamily: "Fredoka One",
      fontSize: 14,
      textAlign: "center",
      flexGrow: 1,
    },
    categoryContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    categoryTextField: {},
    categorySuggestionItem: {
      fontFamily: "Fredoka One",
      fontSize: 14,
      width: "100%",
      color: Theme.palette.custom.GreyLight,
      textAlign: "left",
    },
  };
});
const Main = (props) => {
  const styles = useStyles();
  const [isChecked, setChecked] = useState(false);
  const [num, setNum] = useState(0);

  const onBackClicked = () => {};
  const onSubmitClicked = () => {};
  const onSwicthChanged = (event) => {};

  const generateChildren = () => {
    let i;
    let array = [];
    for (i = 0; i < num; i++) {
      array.push(<div className={styles.categoriesItem} />);
    }
    return array;
  };

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar>
          <h1 className={styles.title}>Create Event</h1>
        </AppBar>
      </ElevationScroll>
      <div className={styles.linearLayout}>
        <BackButton onClick={onBackClicked} label="Roznama" />
        <FormControlLabel
          control={<Switch checked={isChecked} onChange={onSwicthChanged} />}
          label="Show for organizations only"
        />
        <h1>
          Enable this option if you want to only show this event for
          organizations , you can change it later. This option is good for you
          if you are looking for sponsors for your event (you only publish your
          events to individuals when you have obtained sponsorships for them
          from organizations).
        </h1>
        <TextField />
        <TextField />
        <Fab
          onClick={() => {
            setNum(num + 1);
          }}
        ></Fab>
        <div className={styles.categoriesContainer}>{generateChildren()}</div>
        <DividerComp title="Categories" hidefab />
        <TextField />
        <div></div>
        <DividerComp title="Date" hidefab />

        <DividerComp title="Time" hidefab />
        <DividerComp title="Location" hidefab />
        <DividerComp title="Sponsor" hidefab />

        <Fab
          variant="extended"
          color="primary"
          className={styles.saveFabButton}
          onClick={onSubmitClicked}
        >
          <h1 className={styles.fabText}>Post</h1>
        </Fab>
      </div>
    </React.Fragment>
  );
};
export default Main;

const CategoriesComp = (props) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const handleClose = () => {};
  const handleOpen = (event) => {};

  const generateSuggestionsComps = () => {
    return suggestions.map((value, index, array) => {
      return <h1 className={styles.categorySuggestionItem}>{value}</h1>;
    });
  };
  const generateSuggestionsData = (value) => {

      
  };

  return (
    <>
      <TextField
        className={styles.categoryTextField}
        onSelect={handleOpen}
        onChange={(event) => {
          generateSuggestionsData(event.target.value);
        }}
      />
      <div className={styles.categoryContainer}></div>
      <Popover
        open={anchorEl !== null}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "cenetr" }}
      >
        <div className={styles.linearLayout}>{generateSuggestionsComps()}</div>
      </Popover>
    </>
  );
};
const CategoriesItemComp = (props) => {
  const styles = useStyles();
  return (
    <div className={styles.categoryItemContainer}>
      <IconButton onClick={props.onClick} className={styles.categoryItemButton}>
        <CloseIcon color="error" />
      </IconButton>
      <h1 className={styles.categoryItemLabel}>props.value</h1>
    </div>
  );
};

const DividerComp = (props) => {
  const styles = useStyles();

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
const ElevationScroll = (props) => {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const BackButton = (props) => {
  const styles = useStyles();

  return (
    <Button
      classes={{ root: styles.buttonRoot }}
      color="primary"
      onClick={props.onClick}
    >
      <div className={styles.buttonContentContainer}>
        <NavigateBeforeIcon color="primary" />
        <h1 className={styles.buttonLabel}>{props.label}</h1>
      </div>
    </Button>
  );
};
