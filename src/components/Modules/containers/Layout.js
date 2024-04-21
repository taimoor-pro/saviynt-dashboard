import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import ModalLayout from "./ModalLayout";
import { removeNotificationMessage } from "../../../redux/slices/headerSlice";

function Layout() {
  const dispatch = useDispatch();
  const { newNotificationMessage, newNotificationStatus } = useSelector(
    (state) => state.header
  );

  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1)
        NotificationManager.success(newNotificationMessage, "Success");
      if (newNotificationStatus === 0)
        NotificationManager.error(newNotificationMessage, "Error");
      dispatch(removeNotificationMessage());
    }
  }, [newNotificationMessage]);

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <PageContent />
        <LeftSidebar />
      </div>

      {/* For Notification, Like You will use CRUD so this is applies */}
      <NotificationContainer />

      {/* Modals Open */}
      <ModalLayout />
    </>
  );
}

export default Layout;
