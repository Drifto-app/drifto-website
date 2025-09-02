"use client"

import React from 'react';
import { toast } from 'sonner';
import { XCircle, CheckCircle2 } from 'lucide-react';

type ToastType = "success" | "error";


export const showTopToast = (type: ToastType, text: string) => {
    const config = {
        icon: type === "error" ? <XCircle className="text-red-600" /> : <CheckCircle2 className="text-green-600" />,
        classNames: {
            toast: type === "error"
                ? "bg-red-500 text-white border border-red-600 shadow-lg"
                : "bg-green-500 text-white border border-green-600 shadow-lg",
            title: "text-white",
            description: type === "error" ? "text-red-50" : "text-green-50",
        },
    };

    toast(text, config);
};