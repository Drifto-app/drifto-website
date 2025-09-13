import { Settings } from "lucide-react";
import React from "react";
import {useRouter} from "next/navigation";

interface PageHeaderProp {
  headerTitle: string;
}

export default function PageHeader({ headerTitle }: PageHeaderProp) {
    const router = useRouter();

  return (
    <div>
      <div className="w-full flex justify-between font-bold px-4 items-center">
        <h2 className=" text-3xl">{headerTitle}</h2>
        <span onClick={() => router.push(`/m/settings?prev=${encodeURIComponent("/?screen=plans")}`)}>
          <Settings size={"25px"} />
        </span>
      </div>
    </div>
  );
}
