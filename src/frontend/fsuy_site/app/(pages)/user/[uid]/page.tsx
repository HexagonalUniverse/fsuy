/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/user/[uid]/page.tsx
 * @brief      React component for a dynamic routed user's page.
 * @date       06-2026
 */


import { type ReactElement } from "react";

import { APIError, api_get_entity } from "@/app/commons";
import { notFound } from "next/navigation";

interface ProfileParams {
    params: Promise<{
        uid: number;
        name: string;
    }>
}

export default async function ProfilePage({params}: ProfileParams): Promise<ReactElement> {

    const {uid, name} = await params;

    let user: TestModel;

    try {
        user = await api_get_entity<TestModel>("test_objects", uid.toString());

    } catch(error){
        if(error instanceof APIError)
            notFound();

        throw error;
    }

    return(
        <div>
            <p>{user.tmid} - {user.name}</p>
            <p>{user.value}</p>
        </div>
    );
}