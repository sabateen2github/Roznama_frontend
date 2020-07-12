import { AdminToken, OrdinaryToken, ShareEvent } from "../../globals";
import { sendJsonRequest } from "./utils";

/***
 *
 * These are internal presenters that do not need any listeners because they are used by other presenters who have listeners
 *
 */

/**
 * callback are as follows :
 *      function callback(success){}
 */

/**
 * CommonModel.accountType can be one of the following:
 *  none admin individual organization
 */

export const CommonModel = {
  isAdminLogged: false,
  isIndividualLoggedIn: false,
  isOrganizationLoggedIn: false,
  profilePic: null,
  isInitError: false,
  init: (callback) => {
    let x = 0;
    const ifDone = () => {
      x++;
      if (x === 2) {
        if (CommonModel.isInitError) {
          callback(false);
        } else {
          callback(true);
        }
      }
    };

    //seperate request is not a good pattern but hey every thing is already fucked up
    sendJsonRequest(
      "/api/checkAdminToken",
      {},
      (data) => {
        if (data === null) {
          CommonModel.isInitError = true;
          ifDone();
          return;
        }
        ifDone();
      },
      true
    );
    sendJsonRequest("/api/getCurrentAccountInfo", {}, (data) => {
      if (data === null) {
        CommonModel.isInitError = true;
        ifDone();
        return;
      }
      ifDone();
    });
  },
  logoutFromAdmin: () => {
    localStorage.removeItem(AdminToken);
    window.location.reload();
  },
  logoutFromAccount: () => {
    localStorage.removeItem(OrdinaryToken);
    window.location.reload();
  },
};
