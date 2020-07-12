import { AdminToken, OrdinaryToken, ShareEvent } from "../../globals";
import { sendJsonRequest } from "./utils";
import { CommonModel } from "./commonPresenter";

/**
 * callback are as follows :
 *      function callback(success){}
 */

/**
 * suggestionsCallback function is as follows :
 *
 *  function callback(items )
 *  each item is as follows :
 *    title
 */

export const DataModel = {
  date: new Date(),
  currentQuery: "",
  showPublishedEvents: true,
  nextPageEvents: 0,
  nextPageOrgs: 0,
  isMoreEvents: true,
  isMoreOrgs: true,
  unpublishedOnly: false,
  showOrganizations: false,
  showEvents: true,
  organizations: [],
  events: [],
  //notifications: [],
  //NotificationsListener: null,
  loadingListener: null,
  isInitDone: false,
  isInitError: false,
  init: () => {
    let x = 0;
    const ifDone = () => {
      x++;
      if (x === 3) {
        DataModel.isInitDone = true;
        if (DataModel.loadingListener !== null) {
          DataModel.loadingListener();
        }
      }
    };

    CommonModel.init((success) => {
      if (!success) {
        DataModel.isInitError = true;
        ifDone();
        return;
      }
      ifDone();
    });
    //yyyy-mm-dd
    DataModel.loadMoreEvents((success) => {
      if (!success) {
        DataModel.isInitError = true;
        ifDone();
        return;
      }
      ifDone();
    });
    DataModel.loadMoreOrganizations((success) => {
      if (!success) {
        DataModel.isInitError = true;
        ifDone();

        return;
      }
      ifDone();
    });

    /**Notifications code should be here , however it is delayed */
  },
  //setNotificationsListener: (callback) => {},
  loadMoreOrganizations: (callback) => {
    if (DataModel.isMoreOrgs) {
      sendJsonRequest(
        "/api/getOrganizationsList/?page=" + DataModel.nextPageOrgs,
        { q: DataModel.currentQuery },
        (data) => {
          if (data === null) {
            callback(false);
            return;
          }
          const { count, items, isMore } = data;
          DataModel.nextPageOrgs++;
          DataModel.isMoreOrgs = isMore;
          items.array.forEach((element) => {
            /**
             *
             * organization object is as follows :
             *      logo url
             *      landingPage url
             * 		title
             *
             */
            DataModel.events.push(element);
          });
          callback(true);
        }
      );
    } else {
      //maybe should be false i dont know :<
      callback(true);
    }
  },
  loadMoreEvents: (callback) => {
    if (DataModel.isMoreEvents) {
      sendJsonRequest(
        "/api/getEventstList/?page=" + DataModel.nextPageEvents,
        {
          q: DataModel.currentQuery,
          date: DataModel.date.toString().substr(0, 10),
          sendPublishedEvents: DataModel.showPublishedEvents,
        },
        (data) => {
          if (data === null) {
            callback(false);
            return;
          }
          const { events, count, isMore } = data;
          events.forEach((element) => {
            /**
             * Event object is as follows :
             *  id
             *  timeFrom (hh:mm) will be converted to (hh:mm PM|AM)
             *  timeTo (hh:mm) will be converted to (hh:mm PM|AM)
             *  dateFrom (yyyy-mm-dd) will be converted to (Month dd)
             *  dateTo (yyyy-mm-dd)  will be converted to (Month dd)
             *  imageUrl
             *  videoUrl
             *  interested bool
             *  interestedCount
             *  orgProfilePic
             *  orgName
             *  location
             *  categoriesList
             *  title
             *  description
             *  published (true or false)
             *  isMine
             *  setInterested (a function with callback function)
             *  share (a function with which platform to shareOn)
             *  sponsorsList
             *         list of :
             *              logo
             *              landingPage
             */

            element.setInterested = (isInterested, callback) => {
              const oldValue = element.isInterested;
              element.isInterested = isInterested;
              sendJsonRequest(
                "/api/eventSetInterested/",
                { eventId: element.id, isInterested: isInterested },
                (data) => {
                  if (data === null) {
                    element.isInterested = oldValue;
                    callback(false);
                  } else {
                    callback(true);
                  }
                }
              );
            };
            element.share = () => {
              localStorage.setItem(ShareEvent, element.id);
            };

            DataModel.events.push(element);
          });
          DataModel.isMoreEvents = isMore;
          DataModel.nextPageEvents++;
          callback(true);
        }
      );
    } else {
      callback(true);
    }
  },
  setUnpublishedOnly: (checked, callback) => {
    const isMoreEvents = DataModel.isMoreEvents;
    const nextPageEvents = DataModel.nextPageEvents;
    const events = DataModel.events;
    const unpublishedOnly = DataModel.unpublishedOnly;

    DataModel.isMoreEvents = true;
    DataModel.nextPageEvents = 0;
    DataModel.events = [];
    DataModel.setUnpublishedOnly = checked;

    DataModel.loadMoreEvents((success) => {
      if (success) {
        callback(true);
      } else {
        DataModel.isMoreEvents = isMoreEvents;
        DataModel.nextPageEvents = nextPageEvents;
        DataModel.events = events;
        DataModel.setUnpublishedOnly = unpublishedOnly;
        callback(false);
      }
    });
  },
  setDate: (date, callback) => {
    const oldDate = DataModel.date;
    const isMoreEvents = DataModel.isMoreEvents;
    const nextPageEvents = DataModel.nextPageEvents;
    const events = DataModel.events;

    DataModel.date = date;
    DataModel.isMoreEvents = true;
    DataModel.nextPageEvents = 0;
    DataModel.events = [];

    DataModel.loadMoreEvents((success) => {
      if (success) {
        callback(true);
      } else {
        DataModel.date = oldDate;
        DataModel.isMoreEvents = isMoreEvents;
        DataModel.nextPageEvents = nextPageEvents;
        DataModel.events = events;
        callback(false);
      }
    });
  },

  setSearchQuery: (query, callback) => {
    const oldQuery = DataModel.currentQuery;
    const isMoreEvents = DataModel.isMoreEvents;
    const nextPageEvents = DataModel.nextPageEvents;
    const isMoreOrgs = DataModel.isMoreOrgs;
    const nextPageOrgs = DataModel.nextPageOrgs;
    const events = DataModel.events;
    const orgs = DataModel.organizations;

    DataModel.currentQuery = query;
    DataModel.isMoreEvents = true;
    DataModel.nextPageEvents = 0;
    DataModel.isMoreOrgs = true;
    DataModel.nextPageOrgs = 0;
    DataModel.events = [];
    DataModel.organizations = [];
    let isEvents = false,
      isOrgs = false;

    let x = 0;
    const ifDone = () => {
      x++;
      if (x === 2) {
        if (isEvents && isOrgs) {
          callback(true);
        } else {
          DataModel.currentQuery = oldQuery;
          DataModel.isMoreEvents = isMoreEvents;
          DataModel.nextPageEvents = nextPageEvents;
          DataModel.isMoreOrgs = isMoreOrgs;
          DataModel.nextPageOrgs = nextPageOrgs;
          DataModel.events = events;
          DataModel.organizations = orgs;
          callback(false);
        }
      }
    };

    DataModel.loadMoreEvents((success) => {
      isEvents = success;
      ifDone();
    });
    DataModel.loadMoreOrganizations((success) => {
      isOrgs = success;
      ifDone();
    });
  },
  registerInitListener: (listener) => {
    DataModel.loadingListener = listener;
    if (DataModel.isInitDone) {
      listener();
    }
  },
};

function convertTime(time) {
  let tempDate = new Date("2020-7-11" + "T" + time + ":00");
  let tempAm = true;
  let hours = tempDate.getHours();
  if (hours > 12) {
    tempAm = false;
    hours -= 12;
  } else if (hours === 12) {
    tempAm = false;
  } else if (hours === 0) {
    hours = 12;
  }

  let minutes =
    tempDate.getMinutes() < 10
      ? "0" + tempDate.getMinutes()
      : "" + tempDate.getMinutes();

  return (
    (hours < 10 ? "0" + hours + ":" + minutes : hours + ":" + minutes) +
    " " +
    (tempAm ? "AM" : "PM")
  );
}

function convertDate(date) {
  let tempDate = new Date(date + "T" + "00:00:00");
}
