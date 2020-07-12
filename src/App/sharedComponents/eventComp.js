import React, { useState } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { ThemeProvider, useTheme } from "@material-ui/styles";
import { Theme } from "../../globals.js";

import {
  Fab,
  Button,
  FormControlLabel,
  Checkbox,
  Card,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import logo from "./logo512.jpg";

const useStyles = makeStyles((theme) => {
  return {
    header: {
      backgroundColor: Theme.palette.custom.bluishGreen,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    time: {
      width: "100%",
      textAlign: "center",
      fontFamily: "Ubuntu Medium",
      margin: 0,
      marginTop: 15,
      fontSize: 12,
      color: Theme.palette.custom.white,
    },
    date: {
      width: "100%",
      textAlign: "center",
      fontFamily: "Ubuntu Medium",
      margin: 0,
      fontSize: 20,
      color: Theme.palette.custom.white,
    },
    video: {
      width: "100%",
      height: 150,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    profileAndInterseted: {
      display: "flex",
      flexDirection: "row",
      marginTop: 10,
    },
    editThisEvent: {
      width: "50%",
      margin: "0 auto",
      height: 40,
      marginTop: 15,
    },
    shareThisEvent: {
      width: "60%",
      margin: "0 auto",
      height: 40,
      marginTop: 8,
      marginBottom: 15,
    },
    profileFap: {
      marginLeft: 10,
      boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.0)",
    },
    logo: {
      width: "90%",
      height: "90%",
      borderRadius: "50%",
    },
    profileDetails: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      marginLeft: 10,
    },
    profileName: {
      width: "100%",
      textAlign: "start",
      fontFamily: "Ubuntu Medium",
      margin: 0,
      marginTop: 5,
      fontSize: 12,
      color: Theme.palette.custom.white,
    },
    eventInterestedCount: {
      width: "100%",
      textAlign: "start",
      fontFamily: "Ubuntu Medium",
      margin: 0,
      fontSize: 10,
      color: Theme.palette.custom.white,
    },
    playButton: {
      width: "60%",
      height: "60%",
      color: Theme.palette.custom.white,
      margin: "0 auto",
    },
    interestedButton: {
      marginTop: -16,
    },
    titleOfEvent: {
      fontFamily: "Chewy",
      width: "100%",
      textAlign: "center",
      color: Theme.palette.primary.main,
      fontSize: 20,
    },
    locationText: {
      fontSize: 12,
      fontFamily: "Roboto Regular",
      color: Theme.palette.custom.GreyLight,
      marginTop: 3,
      marginLeft: 6,
    },
    locationContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    categoryTag: {
      margin: 2,
      padding: 8,
      minWidth: "40%",
      paddingLeft: 16,
      paddingRight: 16,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: Theme.palette.primary.main,
      fontSize: 14,
      letterSpacing: 1.5,
      fontFamily: "Fredoka One",
      borderRadius: 25,
      border: "3px solid ",
    },
    tagsContainer: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
    expandButton: {
      minWidth: "70%",
      height: 24,
      marginTop: 24,
      boxShadow: Theme.palette.custom.noShadow,
    },
    expandButtonText: {
      width: "100%",
      fontFamily: "Roboto Medium",
      fontSize: 12,
      color: Theme.palette.custom.white,
      margin: 0,
    },
    eventDescription: {
      fontFamily: "Roboto Regular",
      fontSize: 14,
      color: Theme.palette.custom.GreyLight,
      textAlign: "center",
      padding: 16,
    },
    sponsorsText: {
      fontFamily: "Roboto Medium",
      fontSize: 16,
      color: Theme.palette.custom.Gold,
      textAlign: "center",
    },
    sponsorsContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      width: "100%",
    },
    sponsorsFabButton: {
      width: 96,
      height: 96,
      margin: 25,
    },
    eventCardRoot: {
      paddingBottom: 8,
      marginBottom: 16,
      [theme.breakpoints.between("xs", "sm")]: { width: "95%" },
      [theme.breakpoints.between("sm", "md")]: { width: 360 },
      [theme.breakpoints.up("md")]: { width: 480 },
    },
  };
});

const interestedButtonTheme = createMuiTheme({
  ...Theme,
  palette: {
    primary: {
      light: Theme.palette.custom.white,
      main: Theme.palette.custom.white,
      dark: Theme.palette.custom.white,
    },
    secondary: {
      light: "#ffff6b",
      main: "#fdd835",
      dark: "#c6a700",
    },
  },
  typography: {
    body1: {
      color: Theme.palette.custom.white,
      fontSize: 12,
    },
  },
});

export const EventComponent = (props) => {
  const styles = useStyles();
  const theme = useTheme();
  const isNotSmall = useMediaQuery(theme.breakpoints.up("sm"));

  const [expanded, setExpanded] = useState(isNotSmall);

  const event = props.event;

  //
  let item;
  if (expanded || isNotSmall) {
    item = (
      <React.Fragment>
        <h1 className={styles.eventDescription}>event.description</h1>
        <h1 className={styles.sponsorsText}>Sponsors</h1>
        <div className={styles.sponsorsContainer}>
          {event.sponsorsList.map((item) => {
            <Fab
              color="primary"
              className={styles.sponsorsFabButton}
              href="item.landingPage"
            >
              <img className={styles.logo} src={item.logo} alt="Logo"></img>
            </Fab>;
          })}
        </div>
      </React.Fragment>
    );
  } else {
    item = (
      <Fab
        color="primary"
        variant="extended"
        className={styles.expandButton}
        onClick={() => {
          setExpanded(true);
        }}
      >
        <h1 className={styles.expandButtonText}>Expand</h1>
      </Fab>
    );
  }

  //
  return (
    <Card classes={{ root: styles.eventCardRoot }}>
      <React.Fragment>
        <div className={styles.header}>
          <h1 className={styles.time}>
            {event.timeFrom + " - " + event.timeTo}
          </h1>
          <h1 className={styles.date}>
            {event.dateFrom + " - " + event.dateTo}
          </h1>
          <div className={styles.video}>
            <Button className={styles.playButton}>
              <PlayCircleFilledIcon className={styles.playButton} />
            </Button>
          </div>
          <div className={styles.profileAndInterseted}>
            <Fab size="medium" color="primary" className={styles.profileFap}>
              <img className={styles.logo} src={logo} alt="Logo"></img>
            </Fab>
            <div className={styles.profileDetails}>
              <h1 className={styles.profileName}>by Zain</h1>
              <h1 className={styles.eventInterestedCount}>
                237 are interseted
              </h1>
            </div>
            <ThemeProvider theme={interestedButtonTheme}>
              <FormControlLabel
                className={styles.interestedButton}
                label="Interested"
                labelPlacement="bottom"
                control={
                  <Checkbox
                    icon={<FavoriteBorderIcon color="primary" />}
                    checkedIcon={<FavoriteIcon />}
                    name="Checkedh"
                  />
                }
              />
            </ThemeProvider>
          </div>
          <Fab
            color="primary"
            variant="extended"
            className={styles.editThisEvent}
          ></Fab>
          <Fab
            color="primary"
            variant="extended"
            className={styles.shareThisEvent}
          ></Fab>
        </div>
        <div className={styles.content}>
          <h1 className={styles.titleOfEvent}>Title of Event</h1>
          <div className={styles.locationContainer}>
            <LocationOnIcon color="primary" />
            <h1 className={styles.locationText}>
              Amman , 8th Circle , Al-hussien business park{" "}
            </h1>
          </div>
          <div className={styles.tagsContainer}>
            <h1 className={styles.categoryTag}>Medicine</h1>
            <h1 className={styles.categoryTag}>Information Technology</h1>
            <h1 className={styles.categoryTag}>Chemical Engineering</h1>
            <h1 className={styles.categoryTag}>Business Management</h1>
          </div>
          {item}
        </div>
      </React.Fragment>
    </Card>
  );
};
