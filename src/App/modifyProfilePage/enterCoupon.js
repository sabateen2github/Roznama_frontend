import React, { useState } from "react";
import {
  AppBar,
  Button,
  TextField,
  useScrollTrigger,
  Fab,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "../../globals.js";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

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
    msg: {
      fontFamily: "Fredoka One",
      fontSize: 20,
      textAlign: "center",
      color: Theme.palette.primary.main,
      padding: 10,
    },
    couponText: {
      fontFamily: "Fredoka One",
      fontSize: 36,
      [theme.breakpoints.up("sm")]: {     
         fontSize: 40,
      },
      color: Theme.palette.primary.main,
      textAlign: "center",
    },
    couponRoot: {
      width: 50,
      [theme.breakpoints.up("sm")]: {     
        width: 100,
      },
      textAlign: "center",
      margin: 5,
    },
    horizontalLayout: {
      display: "flex",
      flexDirection: "row",
    },
    filledUnderLine: {
      borderBottomColor: Theme.palette.primary.dark,
    },
  };
});

let styles;
const Main = (props) => {
  styles = useStyles();
  const [vv, forceUpdate] = useState(new Date());

  const onBackClicked = () => {};
  const onSubmitClicked = () => {};
  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar>
          <h1 className={styles.title}>Hellow world</h1>
        </AppBar>
      </ElevationScroll>
      <div className={styles.linearLayout}>
        <BackButton onClick={onBackClicked} label="Roznama" />
        <h1 className={styles.msg}>
          Please enter the coupon code to receive a free subscription
        </h1>
        <PinCodeWidget
          autoFocus
          num={5}
          onChange={(array) => {
            array.forEach((item, index) => {
              console.log(index + "  :  " + item);
            });
          }}
        />
        <Fab
          variant="extended"
          color="primary"
          className={styles.saveFabButton}
          onClick={onSubmitClicked}
        >
          <h1 className={styles.fabText}>Create</h1>
        </Fab>
      </div>
    </React.Fragment>
  );
};
export default Main;

const PinCodeWidget = (props) => {
  let fields = [];
  let fieldsValues = [];
  let fieldsRefs = [];

  let i;
  for (i = 0; i < props.num; i++) {
    const staticI = i;
    const ref = React.createRef();
    fieldsValues.push("");

    fieldsRefs.push(ref);
    fields.push(
      <Input
        autoFocus={staticI === 0 ? props.autoFocus : false}
        key={staticI}
        ref={ref}
        inputProps={{
          maxLength: 1,
          onKeyDown: (event) => {
            if (
              fieldsValues[staticI].length === 0 &&
              staticI > 0 &&
              (event.key === "Backspace" || event.key === "Delete")
            ) {
              //set Focus to the previous
              fieldsRefs[staticI - 1].current.click();
            }
          },
        }}
        onChange={(event) => {
          fieldsValues[staticI] = event.target.value;
          if (fieldsValues[staticI].length === 1 && staticI < props.num - 1) {
            fieldsRefs[staticI + 1].current.click();
          }
          props.onChange(fieldsValues.slice());
        }}
        classes={{ root: styles.couponRoot, input: styles.couponText }}
      />
    );
  }

  return <div className={styles.horizontalLayout}>{fields}</div>;
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
