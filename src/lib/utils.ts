import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {authApi} from "@/lib/axios";
import {showTopToast} from "@/components/toast/toast-util";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const usernameRegex: RegExp = /^[a-zA-Z0-9_]+$/

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[A-Za-z\d\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]{8,}$/;


export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

export const uploadMedia = async (file: File, type: string): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("mediaFile", file);
    formData.append(
        "fileData",
        new Blob([JSON.stringify({ mediaFileType: type })], {
          type: "application/json",
        })
    );

    const res = await authApi.post("/file/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!res.data?.success) {
      return null;
    }

    return res.data.data?.url;
  } catch (error: any) {
      throw error
  }
};