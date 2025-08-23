// src/hooks/useNavigationHistory.ts
import { useState, useCallback } from 'react';

interface NavigationState {
    screen: string;
    title?: string;
    data?: any;
}

export const useNavigationHistory = (initialScreen: string = '') => {
    const [history, setHistory] = useState<NavigationState[]>([
        { screen: initialScreen }
    ]);

    const navigateTo = useCallback((screen: string, title?: string, data?: any) => {
        setHistory(prev => {
            // Check if the new screen is the same as current screen
            const currentScreen = prev[prev.length - 1];
            if (currentScreen.screen === screen) {
                // Update the current screen instead of adding a new entry
                const updated = [...prev];
                updated[updated.length - 1] = { screen, title, data };
                return updated;
            }
            return [...prev, { screen, title, data }];
        });
    }, []);

    const goBack = useCallback(() => {
        setHistory(prev => {
            if (prev.length <= 1) return prev;
            return prev.slice(0, -1);
        });
    }, []);

    const getCurrentScreen = useCallback(() => {
        return history[history.length - 1];
    }, [history]);

    const getPreviousScreen = useCallback(() => {
        return history.length > 1 ? history[history.length - 2] : null;
    }, [history]);

    const canGoBack = useCallback(() => {
        return history.length > 1;
    }, [history]);

    const resetToScreen = useCallback((screen: string, title?: string, data?: any) => {
        setHistory([{ screen, title, data }]);
    }, []);

    const replaceCurrentScreen = useCallback((screen: string, title?: string, data?: any) => {
        setHistory(prev => {
            if (prev.length === 0) {
                return [{ screen, title, data }];
            }
            const updated = [...prev];
            updated[updated.length - 1] = { screen, title, data };
            return updated;
        });
    }, []);

    return {
        history,
        navigateTo,
        goBack,
        getCurrentScreen,
        getPreviousScreen,
        canGoBack,
        resetToScreen,
        replaceCurrentScreen
    };
};