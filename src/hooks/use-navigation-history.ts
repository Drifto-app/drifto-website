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
        setHistory(prev => [...prev, { screen, title, data }]);
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

    const resetToScreen = useCallback((screen: string, title?: string) => {
        setHistory([{ screen, title }]);
    }, []);

    return {
        history,
        navigateTo,
        goBack,
        getCurrentScreen,
        getPreviousScreen,
        canGoBack,
        resetToScreen
    };
};