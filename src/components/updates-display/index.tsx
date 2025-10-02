import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import { Tabs } from "./tabs";
import RequestDisplay from "./RequestDisplay";
import NotificationsDisplay from "./NotificationDisplay";

export default function UpdateDisplay() {
  type TabValue = "requests" | "notifications" | null;
  // | "inbox"

  const [activeTab, setActiveTab] = useState<TabValue>("notifications");

  return (
    <div>
      <div className="p-2">
        <PageHeader headerTitle={"Updates"} prev={"/?screen=updates"} />
      </div>
      <Tabs active={activeTab} onClick={setActiveTab} />
      {activeTab == "notifications" ? (
        <NotificationsDisplay />
      ) : activeTab == "requests" ? (
        <RequestDisplay />
      ) : (
        <></>
      )}
    </div>
  );
}
