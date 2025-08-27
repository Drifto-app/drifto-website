// hooks/useShare.ts
"use client";

import { useState, useCallback } from 'react';
import { canUseNativeShare, shareViaWeb, copyToClipboard as copyUtil } from '@/lib/share-utils';

interface UseShareOptions {
    title: string;
    url: string;
    description?: string;
}

export const useShare = ({ title, url, description = '' }: UseShareOptions) => {
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

    const openShareDialog = useCallback(() => setIsShareDialogOpen(true), []);
    const closeShareDialog = useCallback(() => setIsShareDialogOpen(false), []);

    const handleQuickShare = useCallback(async () => {
        // If native share is good to go, try it; otherwise open dialog
        if (canUseNativeShare()) {
            const ok = await shareViaWeb({ title, url, text: description });
            if (!ok) openShareDialog();
            return;
        }
        openShareDialog();
    }, [title, url, description, openShareDialog]);

    const copyToClipboard = useCallback(async (): Promise<boolean> => {
        return copyUtil(url);
    }, [url]);

    return {
        isShareDialogOpen,
        openShareDialog,
        closeShareDialog,
        handleQuickShare,
        copyToClipboard,
    };
};
