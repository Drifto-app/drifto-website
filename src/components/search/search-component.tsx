import { ComponentProps } from "react";
import {cn} from "@/lib/utils";

interface SearchComponentProps extends ComponentProps<"div"> {
    searchText?: string;
    setSearchText: (text: string) => void;
}

export const SearchComponent= ({
    searchText, setSearchText, className, ...props
}: SearchComponentProps) => {

    return (
        <div
            className={cn(
                "w-full flex-1",
                className
            )}
            {...props}
        >
            Suggestion
        </div>
    )
}