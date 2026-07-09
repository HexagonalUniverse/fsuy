/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/login/page.tsx
 * @brief      The Login page.
 * @date       07-2026
 */

import { type ReactElement } from "react";

import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";


// import reactLogo from "./assets/react.svg"
import "@/app/styles/pages/home.css";


export default async function LoginPage(): Promise<ReactElement> {
    return (
        <div className="page_body">
            <main>

            </main>

            <FsuyFooter />
        </div>
    );
};