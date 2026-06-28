/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/Tag.tsx
 * @brief      Tag's react component.
 * @date       06-2026
 */


import { type ReactElement } from "react";

import { EntityTag } from "@/app/entity_interfaces";

import "@/app/styles/Tag.css";


interface TagParams {
    tag: EntityTag;
}

export function Tag({tag}: TagParams ): ReactElement {
    return (
        <div className="tag"> {tag.title} </div>
    );
}