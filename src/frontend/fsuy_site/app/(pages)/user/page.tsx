/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/user/page.tsx
 * @brief      React component for the user's home page.
 * @date       06-2026
 */


import { type ReactElement } from "react";

import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";

export default function UserHomePage(): ReactElement {

    return(
        <div className="page_body">
            <NavigationBar user={ {uid: 413, name: "Victor"} }/>

            <main>

            </main>

            <FsuyFooter />
        </div>
    );
}