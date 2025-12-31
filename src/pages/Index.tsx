import { Button } from "@/components/ui/button";

const Index = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Welcome to Drifto
                </h1>
                <p className="text-muted-foreground">
                    Your new design starts here.
                </p>
                <Button
                    className="p-6 bg-blue-600"
                >Hey</Button>
            </div>
        </div>
    );
};

export default Index;
