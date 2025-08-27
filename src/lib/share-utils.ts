// lib/shareUtils.ts
export interface ShareData {
    title: string;
    url: string;
    text?: string;
}

export type SharePlatform = 'whatsapp' | 'twitter' | 'facebook' | 'linkedin' | 'telegram';

export const isNativeShareSupported = (): boolean => {
    return typeof navigator !== 'undefined' && 'share' in navigator && typeof navigator.share === 'function';
};

export const isMobile = (): boolean => {
    return typeof navigator !== 'undefined' &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
};

export const canUseNativeShare = (): boolean => isNativeShareSupported() && isMobile();

export const shareViaWeb = async (data: ShareData): Promise<boolean> => {
    if (!isNativeShareSupported()) return false;
    try {
        await navigator.share({
            title: data.title,
            text: data.text || '',
            url: data.url,
        });
        return true;
    } catch (error: any) {
        // If the user cancels, treat as handled
        if (error?.name === 'AbortError') return true;
        console.error('Error sharing:', error);
        return false;
    }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
        // Fallback (insecure contexts / older browsers)
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (e) {
        console.error('Error copying to clipboard:', e);
        return false;
    }
};

export const socialShareUrls = {
    whatsapp: (text: string, url: string) =>
        `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,

    twitter: (text: string, url: string) =>
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,

    facebook: (url: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,

    linkedin: (title: string, url: string) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,

    telegram: (text: string, url: string) =>
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
};

export const openSocialShare = (
    platform: SharePlatform,
    title: string,
    url: string,
    text?: string
) => {
    let shareUrl: string;
    switch (platform) {
        case 'whatsapp':
            shareUrl = socialShareUrls.whatsapp(text || title, url);
            break;
        case 'twitter':
            shareUrl = socialShareUrls.twitter(text || title, url);
            break;
        case 'facebook':
            shareUrl = socialShareUrls.facebook(url);
            break;
        case 'linkedin':
            shareUrl = socialShareUrls.linkedin(title, url);
            break;
        case 'telegram':
            shareUrl = socialShareUrls.telegram(text || title, url);
            break;
        default:
            return;
    }
    if (typeof window !== 'undefined') {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
};
