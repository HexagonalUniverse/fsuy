/**            -------------------------------------------
 * @file       frontend/fsuy_site/app/components/Toast.tsx
 * @brief      ...
 * @date       06-2026
 */


"use client";

import "@/app/styles/components/Toast.css";
import { 
    useEffect, 
    useState,
} from "react";


interface ToastProps {
    message: string;
    onClose: () => void;
}


export default function Toast({
    message,
    onClose,
}: ToastProps) {
    const [removing, setRemoving] = useState(false);

    useEffect(() =>
    {
        const removeTimer = setTimeout(() => {
            setRemoving(true);
        }, 2800);

        const closeTimer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(removeTimer);
            clearTimeout(closeTimer);
        };
    }, [onClose]);


    return (
        <div className={`toast ${removing ? "removing" : ""}`}>
            {message}
        </div>
    );
}