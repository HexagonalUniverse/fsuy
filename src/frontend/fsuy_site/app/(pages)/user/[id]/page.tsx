/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/user/[uid]/page.tsx
 * @brief      React component for a dynamic routed user's page.
 * @date       06-2026
 */


import { type ReactElement } from "react";

import { APIError, api_get_entity } from "@/app/commons";
import { notFound } from "next/navigation";
import { EntityUser } from "@/app/entity_interfaces";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";

import "@/app/styles/pages/user.css"

interface ProfileParams {
    params: Promise<{
        user: EntityUser;
    }>
}

export default async function ProfilePage({params}: ProfileParams): Promise<ReactElement> {

    // const {uid} = await params;

    let user: EntityUser = { uid: 413, name: "Victor" };

    // try {
    //     user = await api_get_entity<EntityUser>("test_objects", uid.toString());

    // } catch(error){
    //     if(error instanceof APIError)
    //         notFound();

    //     throw error;
    // }

    return(
        <div className="page_body">    
            <NavigationBar user={ {uid: 413, name: "Victor"} }/>

            <main>
                <p>{user.uid} - {user.name}</p>
            </main>

            <FsuyFooter />
        </div>
    );
}