/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/Comment.tsx
 * @brief      Comment's react component.
 * @date       06-2026
 */


"use client";

import { type ReactElement, RefObject, useRef } from "react";

import { EntityComment } from "@/app/entity_interfaces";

import "@/app/styles/Comment.css";
import { UserPreview } from "@/app/components/UserPreview";
import { parse_markdown } from "@/app/commons"

interface CommentParams {
    comment: EntityComment;
    level: number;
}

export function Comment({comment, level}: CommentParams ): ReactElement {
    return (
        <>
        <div className="comment" style={ {"--level": level} as React.CSSProperties } data-level={level}>
            <UserPreview uid={413} name={comment.author} />
            <div className="content" dangerouslySetInnerHTML={{ __html: parse_markdown(comment.content) }} />
        </div>

        {
        comment.children?.map((child: EntityComment, index) => (
            <Comment key={index} comment={child} level={level + 1} />
        ))
        }

        </>
    );
}
