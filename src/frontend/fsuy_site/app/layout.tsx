/**            ---------------------------------------------
 * @file       ...
 * @brief      ...
 * @date       07-2026
 */

import "./styles/index.css";
import { type ReactElement } from "react";

import { UserProvider } from "./UserProvider";
import { ToastProvider } from "./ToastProvider";


export default function RootLayout({
	children,
	}: Readonly<{
	children: React.ReactNode;
}>) {

    return (
        <html
        lang="pt-br"
        // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <head>
            <title> FSUY </title>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous"></link>
            <link href="https://fonts.googleapis.com/css2?family=Castoro+Titling&family=Quicksand:wght@300..700&family=Stack+Sans+Text:wght@200..700&display=swap" rel="stylesheet"></link>
        </head>
        {/* <body className="min-h-full flex flex-col">{children}</body> */}


        <body suppressHydrationWarning>
            <ToastProvider>
            <UserProvider>
                {children}
            </UserProvider>
            </ToastProvider>
        </body>
        </html>
    );
}
