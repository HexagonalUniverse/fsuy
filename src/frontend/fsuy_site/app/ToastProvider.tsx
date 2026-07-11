

"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";


import "@/app/styles/components/Toast.css";
import Toast from "@/app/components/Toast";



interface ToastData {
    id: number;
    message: string;
}


interface ToastContextType {
    showToast: (message: string) => void;
}


const ToastContext = createContext<ToastContextType | null>(null);


export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastData[]>([]);


    function showToast(message: string) {
        const id = Date.now();

        setToasts((old) => [
            ...old,
            { id, message },
        ]);
    }


    function removeToast(id: number) {
        setToasts((old) =>
            old.filter((toast) => toast.id !== id)
        );
    }


    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="toast-container">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}


export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast must be used inside ToastProvider"
        );
    }

    return context;
}
