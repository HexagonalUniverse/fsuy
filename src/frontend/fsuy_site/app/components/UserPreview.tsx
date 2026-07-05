/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/UserPreview.tsx
 * @brief      User preview's components.
 * @date       06-2026
 */

import { type ReactElement } from "react";

import { EntityUser } from "@/app/entity_interfaces";

import "@/app/styles/components/UserPreview.css";

interface UserPreviewParams {
    user: EntityUser;
}

export function UserPreview({user}: UserPreviewParams): ReactElement {
    return(
        <div className="user_preview"> <a href={`/user/${user.uid}`}>
            <img src="/assets/default_user.png" alt=""/>
            <span> {user.name} </span>
        </a> </div>
    );
}