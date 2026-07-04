/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/UserPreview.tsx
 * @brief      User preview's components.
 * @date       06-2026
 */

import { type ReactElement } from "react";

import { EntityUser } from "@/app/entity_interfaces";

import "@/app/styles/components/UserPreview.css";


export function UserPreview({uid, name}: EntityUser): ReactElement {
    return(
        <div className="user_preview"> <a href={`/user/${uid}`}>
            <img src="/assets/default_user.png" alt=""/>
            <span> {name} </span>
        </a> </div>
    );
}