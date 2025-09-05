import { Suspense } from "react";
import HomeContent from "@/components/home-component";
import { Loader } from "@/components/ui/loader";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
