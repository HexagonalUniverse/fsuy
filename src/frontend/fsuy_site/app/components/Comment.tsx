/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/Comment.tsx
 * @brief      Comment's react component.
 * @date       06-2026
 */


"use client";

import { type ReactElement, RefObject, useRef, useState } from "react";

import { EntityComment } from "@/app/entity_interfaces";

import { UserPreview } from "@/app/components/UserPreview";
import { parse_markdown } from "@/app/commons";

import "@/app/styles/components/Comment.css";

interface CommentParams {
    comment: EntityComment;
    level: number;
}

export function Comment({comment, level}: CommentParams ): ReactElement {
    const [is_open, set_is_open] = useState<boolean>(false);

    return (
        <div className="comment_thread">
            <div className="comment" style={ {"--level": level} as React.CSSProperties } data-level={level}>
                <UserPreview uid={comment.author.uid} name={comment.author.name} />
                <div className="content" dangerouslySetInnerHTML={{ __html: parse_markdown(comment.content) }} />
                <div className="interactions">
                    <div> <button id="like"> <img src="/assets/icon_thumb_up.svg" alt="" /> {comment.likes} </button> </div>
                    <div> <button id="dislike"> <img src="/assets/icon_thumb_down.svg" alt="" /> {comment.dislikes} </button> </div>
                    <div> <button id="reply"> Responder </button> </div>
                </div>

                <div className="children">
                    { (comment.children.length > 0) ?
                        <button id="display_comments" onClick={() => set_is_open(!is_open)}> 
                            {is_open ? "Esconder Respostas" : "Ver Respostas"} 
                        </button>
                        : null
                    }

                    {is_open ? 
                        (
                            comment.children?.map((child: EntityComment, index) => (
                                <Comment key={index} comment={child} level={level + 1} />
                            ))
                        )
                        : null
                    }
                </div>
            </div>

        </div>
    );
}
