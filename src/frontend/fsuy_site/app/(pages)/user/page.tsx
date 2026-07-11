/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/user/page.tsx
 * @brief      React component for the user's home page.
 * @date       06-2026
 */


import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { APIError, api_get_page } from "@/app/commons";
import { EntityUser } from "@/app/entity_interfaces";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";
import { UserPreview } from "@/app/components/UserPreview";

import "@/app/styles/pages/user_home.css";

export default async function UserHomePage(): Promise<ReactElement> {

    let users: EntityUser[];

    try {
        users = await api_get_page<EntityUser>("user", "all");

    } catch(error){
        if(error instanceof APIError)
            notFound();

        throw error;
    }

    return(
        <div className="page_body">
            <NavigationBar />

            <main>
                <h1> Usuários </h1>

                <div className="user_list">
                    {users?.map((user, key) => (
                        <UserPreview user={user} key={key}/>
                    ))}
                </div>
            </main>

            <FsuyFooter />
        </div>
    );
}