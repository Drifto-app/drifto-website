import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeader({ headerTitle, prev }: any) {
  const router = useRouter();

  return (
    <div>
      <div className="w-full flex justify-between font-bold px-4 items-center">
        <h2 className="text-xl">{headerTitle}</h2>
        <span
          onClick={() =>
            router.push(`/m/settings?prev=${encodeURIComponent(prev)}`)
          }
        >
          <Settings size={20} />
        </span>
      </div>
    </div>
  );
}
