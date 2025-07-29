import {useMemo} from "react";

export function useSpotGradient(
    colors: [string, string] | null,
    count = 10
): string {
    return useMemo(() => {
        if (!colors || colors.length !== 2) return "";
        const [c1, c2] = colors;
        return Array(count)
            .fill(0)
            .map(() => {
                const x     = Math.random() * 100;
                const y     = Math.random() * 100;
                const size  = Math.random() * 30 + 10;
                const color = Math.random() < 0.5 ? c1 : c2;
                return `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, transparent ${size}%)`;
            })
            .join(",");
    }, [colors, count]);
}