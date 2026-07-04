/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/user/[uid]/page.tsx
 * @brief      React component for a dynamic routed user's page.
 * @date       06-2026
 */


import { type ReactElement } from "react";

import { APIError, api_get_entity } from "@/app/commons";
import { notFound } from "next/navigation";
import { EntityUser } from "@/app/entity_interfaces";

import "@/app/styles/pages/user.css"

interface ProfileParams {
    params: Promise<{
        uid: number;
        name: string;
    }>
}

export default async function ProfilePage({params}: ProfileParams): Promise<ReactElement> {

    const {uid} = await params;

    let user: EntityUser;

    try {
        user = await api_get_entity<EntityUser>("test_objects", uid.toString());

    } catch(error){
        if(error instanceof APIError)
            notFound();

        throw error;
    }

    return(
        <div className="page_body">    
            <div>
                <p>{user.uid} - {user.name}</p>
            </div>
        </div>
    );
}