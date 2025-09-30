"use client"

import React from 'react';
import { toast } from 'sonner';
import {FaCheckCircle} from "react-icons/fa";
import {MdOutlineError} from "react-icons/md";

type ToastType = "success" | "error";


export const showTopToast = (type: ToastType, text: string) => {
    const config = {
        icon: type === "error" ? <MdOutlineError size={20} className="text-red-600" /> : <FaCheckCircle size={20} className="text-green-600" />,
        style: {
            border: type === "error" ? '1px solid #dc2626' : '1px solid #16a34a ',
            padding: '16px',
            gap: '8px',
        },
    };
    toast(text, config);
};