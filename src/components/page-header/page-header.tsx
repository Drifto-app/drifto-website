import { Settings } from "lucide-react";
import React from "react";

interface PageHeaderProp {
  headerTitle: String;
}

export default function PageHeader({ headerTitle }: PageHeaderProp) {
  return (
    <div>
      <div className=" flex justify-between font-bold">
        <h2 className=" text-4xl">{headerTitle}</h2>
        <a href="setting">
          <Settings size={"25px"} />
        </a>
      </div>
    </div>
  );
}
