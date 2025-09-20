import {Loader} from "@/components/ui/loader";
import {Suspense} from "react";
import {CreatePostComponent} from "@/components/create-post/create-post-component";

export default function CreatePostPage() {

    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        }>
            <CreatePostComponent />
        </Suspense>
    )
}