/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/victor/page.tsx
 * @brief      easter-egg.
 * @date       07-2026
 */


import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";


export default async function Home(): Promise<ReactElement> {
    return (
    <div className="page_body">
        <NavigationBar user={ {uid: 3, public_name: "Victor", picture: "", creation_date: "", last_login: ""} } />


        <main>
            <img src="https://media.tenor.com/wuyEcsxrvQwAAAAM/club-penguin-ghosthy.gif" alt="" />
            <p> Club Penguing Melhor Jogo do Mundo. </p>
        </main>

        <FsuyFooter />
    </div>
    );
}