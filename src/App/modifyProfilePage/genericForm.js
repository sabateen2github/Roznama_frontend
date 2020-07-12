import React, { useState } from "react";
import {
  AppBar,
  Button,
  TextField,
  useScrollTrigger,
  Fab,
  Input,
  Popover,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "../../globals.js";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import visa from "./svg/011-visa.svg";
import masterCard from "./svg/021-master card.svg";
import americanExpress from "./svg/007-american express.svg";
import discover from "./svg/009-discover.svg";
import cvs from "./svg/cvs.svg";

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
  };
});

let formObj = {
  items: [
    {
      defaultValue: "Alaa",
      label: "Enter text",
      multiline: false,
      onValueCheck: (value) => {
        if (value === "alaa") {
          return [false, "dont write alaa!!"];
        } else {
          return [true, "ok"];
        }
      },
    },
    {
      defaultValue: "Alaa",
      label: "Enter text",
      multiline: false,
      onValueCheck: (value) => {
        if (value === "alaa") {
          return [false, "dont write alaa!!"];
        } else {
          return [true, "ok"];
        }
      },
    },
    {
      defaultValue: "Alaa",
      label: "Enter text",
      multiline: false,
      onValueCheck: (value) => {
        if (value === "alaa") {
          return [false, "dont write alaa!!"];
        } else {
          return [true, "ok"];
        }
      },
    },
    {
      defaultValue: "Alaa",
      label: "Enter text",
      multiline: false,
      onValueCheck: (value) => {
        if (value === "alaa") {
          return [false, "dont write alaa!!"];
        } else {
          return [true, "ok"];
        }
      },
    },
  ],
  onBackClicked: () => {
    console.log("Hello ");
  },
  onSubmit: () => {
    console.log("Bye");
  },
  formTitle: "Hello world",
  backButtonLabel: "Roznama",
  submitButtonLabel: "Save",
};

const Main = (props) => {
  const styles = useStyles();
  const [vv, forceUpdate] = useState(new Date());

  const onBackClicked = () => {
    formObj.onBackClicked();
  };
  const onSubmitClicked = () => {
    let isError = false;
    formObj.items.forEach((value, index, array) => {
      const [pass, msg] = value.onValueCheck(value.tempValue);
      value.errorMsg = msg;
      value.error = !pass;
      if (value.error) {
        isError = true;
      }
    });

    if (isError) {
      forceUpdate(new Date());
    } else {
      formObj.onSubmit();
    }
  };
  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar>
          <h1 className={styles.title}>{formObj.formTitle}</h1>
        </AppBar>
      </ElevationScroll>
      <div className={styles.linearLayout}>
        <BackButton onClick={onBackClicked} label={formObj.backButtonLabel} />
        <CreditCardAddComponent />
        <GroupOfTextField formObj={formObj} />

        <Fab
          variant="extended"
          color="primary"
          className={styles.saveFabButton}
          onClick={onSubmitClicked}
        >
          <h1 className={styles.fabText}>{formObj.submitButtonLabel}</h1>
        </Fab>
      </div>
    </React.Fragment>
  );
};
export default Main;

const GroupOfTextField = (props) => {
  const styles = useStyles();
  const [vv, forceUpdate] = useState(new Date());
  const formObj = props.formObj;
  const comps = formObj.items.map((item, i) => {
    if (item.tempValue === undefined) {
      item.tempValue = item.defaultValue;
      item.error = false;
    }
    return (
      <TextField
        className={styles.textFieldRoot}
        key={i}
        variant="outlined"
        label={item.label}
        onChange={(event) => {
          item.tempValue = event.target.value;
          console.log(item.error);
          if (item.error) {
            item.error = false;
            forceUpdate(new Date());
          }
        }}
        error={item.error}
        helperText={item.error ? item.errorMsg : undefined}
        defaultValue={item.defaultValue}
        multiline={item.multiline}
      />
    );
  });

  return <>{comps}</>;
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

const copyObject = (object) => {
  return Object.assign({}, object);
};

const getCardBrand = (digitsString) => {
  if (digitsString.length === 0) {
    return -1;
  } else if (digitsString.startsWith()) {
    return;
  } else if (digitsString.startsWith()) {
  } else if (digitsString.startsWith()) {
  } else if (digitsString.startsWith()) {
  } else {
    //Error in card
  }
};

/**cardType=-1 means it is not yet known
 * cardTYpe=-2 means there is an error in card number
 * cardType= 1 Visa
 * cardType=2 masterCard
 * cardType=3 american express
 * cardType=4 discover,
 **/
const useIconsOfCardsStyles = makeStyles((theme) => {
  return {
    icon: (props) => {
      if (
        props.currentCard === props.relatedCard ||
        props.currentCard === props.unknownCard
      ) {
        return {
          width: 36,
          height: 36,
          padding: 2,
          transition: "width 0.5s, height 0.5s",
        };
      } else {
        return {
          width: 0,
          height: 0,
          padding: 2,
          transition: "width 0.5s, height 0.5s",
        };
      }
    },
    horizontalLayout: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    linearLayout: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    cardNumberField: {
      marginTop: 15,
      width: "95%",
      [theme.breakpoints.up("sm")]: { width: 480 },
    },
  };
});

const CreditCardAddComponent = (props) => {
  /**cardType=-1 means it is not yet known
   * cardTYpe=-2 means there is an error in card number
   * cardType= 1 Visa
   * cardType=2 masterCard
   * cardType=3 american express
   * cardType=4 discover,
   **/
  const [cardProps, setCardProps] = useState({
    currentCard: -1,
    unknownCard: -1,
    errorCard: -2,
  });
  const styles = useIconsOfCardsStyles();

  const visaStyles = useIconsOfCardsStyles(
    Object.assign(copyObject(cardProps), { relatedCard: 1 })
  );
  const mastercardStyles = useIconsOfCardsStyles(
    Object.assign(copyObject(cardProps), { relatedCard: 2 })
  );
  const discoverStyles = useIconsOfCardsStyles(
    Object.assign(copyObject(cardProps), { relatedCard: 4 })
  );
  const americanExpressStyles = useIconsOfCardsStyles(
    Object.assign(copyObject(cardProps), { relatedCard: 3 })
  );

  const textRef = React.createRef();

  const handleInpuChanges = (value) => {
    let found = false;

    if (!found) {
      const num = parseInt(value.substr(0, 2));

      if (num === 34 || num === 37) {
        found = true;

        //American Express
        const obj = Object.assign(copyObject(cardProps), {
          currentCard: 3,
        });
        setCardProps(obj);
      }
    }
    if (!found) {
      const v = parseInt(value.substr(0, 1));
      found = v === 4;
      if (found) {
        //Visa
        const obj = Object.assign(copyObject(cardProps), {
          currentCard: 1,
        });
        setCardProps(obj);
      }
    }
    if (!found) {
      if (value.length >= 2) {
        const v = parseInt(value.substr(0, 2));
        found = v >= 51 && v <= 55;
      }
      if (!found && value.length >= 4) {
        const v = parseInt(value.substr(0, 4));
        found = v >= 2221 && v <= 2720;
      }
      if (found) {
        //Master Card
        const obj = Object.assign(copyObject(cardProps), {
          currentCard: 2,
        });
        setCardProps(obj);
      }
    }

    if (!found) {
      if (value.length >= 2) {
        found = parseInt(value.substr(0, 2)) === 65;
      }
      if (!found && value.length >= 3) {
        const v = parseInt(value.substr(0, 3));
        found = v >= 644 && v <= 649;
      }
      if (!found && value.length >= 4) {
        const v = parseInt(value.substr(0, 4));
        found = v === 6011;
      }
      if (!found && value.length >= 6) {
        const v = parseInt(value.substr(0, 6));
        found = v >= 622126 && v <= 622925;
      }
      if (found) {
        //Discover
        const obj = Object.assign(copyObject(cardProps), {
          currentCard: 4,
        });
        setCardProps(obj);
      }
    }
    if (!found && value.length >= 6) {
      //error
      const obj = Object.assign(copyObject(cardProps), {
        currentCard: -2,
      });
      setCardProps(obj);
    }
    if (!found && value.length < 6) {
      found = true;
      const obj = Object.assign(copyObject(cardProps), {
        currentCard: -1,
      });
      setCardProps(obj);
    }
  };

  const filterInput = (value) => {
    if (
      (value.length > 0 && value.match(/^[0-9]+$/) === null) ||
      value.length > 20
    ) {
      textRef.current.value = textRef.current.value.substr(
        0,
        textRef.current.value.length - 1
      );
    } else {
      handleInpuChanges(value);
    }
  };

  return (
    <div className={styles.linearLayout}>
      <TextField
        className={styles.cardNumberField}
        variant="outlined"
        label="Card number"
        type="text"
        error={cardProps.currentCard === -2}
        inputRef={textRef}
        onChange={(event) => {
          const value = event.target.value;
          filterInput(value);
        }}
        inputProps={{
          onPaste: (event) => {
            const paste = (event.clipboardData || window.clipboardData).getData(
              "text"
            );
            if (
              paste.match(/^[0-9]+$/) === null ||
              paste.length + textRef.current.value.length > 20
            ) {
              event.preventDefault();
              return false;
            }
            handleInpuChanges(textRef.current.value + paste);
          },
        }}
      />
      <div className={styles.horizontalLayout}>
        <img className={visaStyles.icon} alt="Visa" src={visa} />
        <img
          className={mastercardStyles.icon}
          alt="masterCard"
          src={masterCard}
        />
        <img className={discoverStyles.icon} alt="Discover" src={discover} />
        <img
          className={americanExpressStyles.icon}
          alt="americanExpress"
          src={americanExpress}
        />
      </div>
      <CreditCardMMYYComp />

      <CreditCardCVSComp />
    </div>
  );
};

const useMMYYAndCVSStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
      marginTop: 16,
      width: "95%",
      [theme.breakpoints.up("sm")]: { width: 480 },
    },
    linearLayout: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: 60,
      marginLeft: 16,
    },
    label: {
      fontFamily: "Fredoka One",
      textAlign: "center",
      fontSize: 12,
      margin: 0,
      color: Theme.palette.primary.main,
    },
    expiryHeader: {
      textAlign: "center",
      height: "100%",
      fontSize: 12,
      paddingTop: 16,
      marginLeft: 16,
      color: Theme.palette.custom.GreyLight,
    },
    textField: {
      textAlign: "center",
    },
    textFieldRoot: { height: 24 },
    cvs: {
      textAlign: "start",
      fontFamily: "Roboto Thin",
      fontSize: 14,
      paddingTop: 4,
      color: Theme.palette.custom.GreyLight,
      flexGrow: 1,
    },
    cvsLabel: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: 150,
      marginRight: 16,
    },
    cvsIcon: { width: 24, marginLeft: 4, marginRight: 4 },
    cvsIconPopup: { width: 96, height: 96, marginLeft: 4, marginRight: 4 },
    popover: {
      pointerEvents: "none",
    },
  };
});
const CreditCardMMYYComp = (props) => {
  const styles = useMMYYAndCVSStyles();
  return (
    <div className={styles.root}>
      <h1 className={styles.expiryHeader}>Expiration date </h1>
      <div className={styles.linearLayout}>
        <h1 className={styles.label}>MM</h1>
        <Input
          inputProps={{ maxLength: 2 }}
          variant="outlined"
          label=""
          classes={{ root: styles.textFieldRoot, input: styles.textField }}
        />
      </div>
      <div className={styles.linearLayout}>
        <h1 className={styles.label}>YY</h1>
        <Input
          inputProps={{ maxLength: 2 }}
          variant="outlined"
          label=""
          classes={{ root: styles.textFieldRoot, input: styles.textField }}
        />
      </div>
    </div>
  );
};
const CreditCardCVSComp = (props) => {
  const styles = useMMYYAndCVSStyles();

  const [anchorEl, setAnchor] = useState(null);

  const handleHover = (event) => {
    setAnchor(event.target);
  };

  const handleMouseExit = () => {
    setAnchor(null);
  };

  return (
    <div className={styles.root}>
      <img
        alt="cvs"
        src={cvs}
        className={styles.cvsIcon}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseExit}
      />

      <div className={styles.cvsLabel}>
        <h1 className={styles.label}>CVS</h1>
        <Input
          inputProps={{ maxLength: 3 }}
          variant="outlined"
          label=""
          classes={{ root: styles.textFieldRoot, input: styles.textField }}
        />
      </div>
      <h1 className={styles.cvs}>
        CVC is the last three digits of the number that appears on the back of
        your card in the signature bar.
      </h1>
      <Popover
        className={styles.popover}
        id="mouse-over-popover"
        open={anchorEl !== null}
        anchorEl={anchorEl}
      >
        <img alt="cvs" src={cvs} className={styles.cvsIconPopup} />
      </Popover>
    </div>
  );
};
