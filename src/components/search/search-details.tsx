import * as React from "react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {FaArrowLeft} from "react-icons/fa";
import {Input} from "@/components/ui/input";
import {IoOptionsOutline, IoSearchSharp} from "react-icons/io5";
import {SearchSuggestion} from "@/components/search/search-suggestion";
import {useState} from "react";
import {SearchComponent} from "@/components/search/search-component";

interface SearchDetailsProps extends React.ComponentProps<"div"> {
    prev: string | null;
}

export const SearchDetails = ({
    prev, className, ...props
}: SearchDetailsProps) => {
    const router = useRouter();

    const [activeScreen, setActiveScreen] = useState<"suggestion" | "search" | "advance-search">("suggestion");
    const [searchText, setSearchText] = useState<string>("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if(!value) {
            setActiveScreen("suggestion");
        } else {
            setActiveScreen("search");
        }

        setSearchText(value);
    }

    const handleBackClick = () => {
        router.push(prev ?? "/");
    };


    const render = () => {
        switch (activeScreen) {
            case "search":
                return (
                    <div className="w-full">
                        Search
                    </div>
                )
            case "advance-search":
                return (
                    <SearchComponent setSearchText={setSearchText} searchText={searchText} />
                )
            default:
                return (
                    <SearchSuggestion />
                )
        }
    }

    return (
        <div
        className={cn(
            'w-full flex flex-col min-h-[100dvh]',
            className
        )}
        {...props}
        >
            <div
                className={cn(
                    "w-full border-b border-b-neutral-300 flex flex-col gap-6 justify-center pt-6 pb-4 flex-shrink-0"
                )}
            >
                <div className="flex flex-row items-center px-8">
                    <FaArrowLeft
                        size={20}
                        onClick={handleBackClick}
                        className="cursor-pointer hover:text-neutral-700 transition-colors"
                        aria-label="Go back"
                        role="button"
                        tabIndex={0}
                    />
                    <p className="font-semibold text-neutral-950 text-md w-full text-center capitalize truncate ml-4">
                        Search
                    </p>
                </div>
                <div className="flex flex-row items-center px-4 gap-3">
                    <div className="w-full flex items-center rounded-full border-1 border-neutral-400 px-4 h-14">
                        <IoSearchSharp size={30} className="text-neutral-400" />
                        <Input
                            name="city"
                            type="text"
                            className="w-full h-full outline-none border-none shadow-none placeholder:text-neutral-400 placeholder:font-semibold text-lg"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="rounded-full p-3 border-1 border-neutral-400">
                        <IoOptionsOutline size={25} className="text-neutral-700" />
                    </div>
                </div>
            </div>
            {render()}
        </div>
    )
}
