import * as React from "react";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {IoMdSearch} from "react-icons/io";
import {useRouter} from "next/navigation";

interface HeaderMobileProps extends React.ComponentProps<"div"> {
    activeScreen: string;
    location: string | null;
    setLocation: (location: string) => void;
}

export const HeaderMobile = ({
    activeScreen, className, location, setLocation, ...props
}: HeaderMobileProps) => {
    const router = useRouter();

    const handleSearchClick = () => {
        router.push("/search");
    }

    const handleLocationClick = () => {
        router.push("/location");
    }

    return (
        <div className={cn(
            "w-full flex flex-col items-center justify-center py-4 z-100",
            className,
            activeScreen !== 'events' ? "hidden" : ""
        )} {...props}>
            {location !== null && <div className="h-full w-90 rounded-full shadow-none border-none focus:border-blue-600 focus:border-solid  placeholder:font-black placeholder:text-lg placeholder:text-black placeholder:text-center text-center font-black mb-3" onClick={handleLocationClick}>
                {location}
            </div>}
            <div className="w-9/10 max-w-xl h-13 flex flex-row items-center border rounded-full px-4 shadow-md" onClick={handleSearchClick}>
                <IoMdSearch size={20} />
                <Input
                    className="h-full w-full shadow-none border-none placeholder:font-black placeholder:text-lg placeholder:text-black"
                    placeholder="Search here"
                    disabled
                />
            </div>
        </div>
    )
}