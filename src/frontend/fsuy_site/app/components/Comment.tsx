/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/Comment.tsx
 * @brief      Comment's react component.
 * @date       06-2026
 */


"use client";

import { type ReactElement, RefObject, useRef, useState } from "react";

import { format_date_time, api_get_posts, parse_markdown } from "@/app/commons";
import { EntityComment } from "@/app/entity_interfaces";

import { UserPreview } from "@/app/components/UserPreview";

import "@/app/styles/components/Comment.css";

interface CommentParams {
    comment: EntityComment;
    level: number;
}

export function Comment({comment, level}: CommentParams ): ReactElement {
    const [comment_state, set_comment] = useState<EntityComment>(comment);
    const [is_open, set_is_open] = useState<boolean>(false);

    
    async function view_comments() {
        let c_children: EntityComment[];

        set_is_open(!is_open);

        if (!is_open){

            try {
                c_children = await api_get_posts<EntityComment>("comments", "children", `${comment_state.cid}`);
                console.log(`c: ${c_children[0].cid}`);
                           
                set_comment((prev: EntityComment) => ({
                    ...prev,
                    children: c_children,
                }));

            } catch (error) {
                console.error(error);
            }        
        }
    }

    return (
        <div className="comment_thread">
            <div className="comment" style={ {"--level": level} as React.CSSProperties } data-level={level}>
                <div className="header">
                    <UserPreview user={comment_state.author} />
                    <span className="edit_date"> {format_date_time(comment_state.edit_date)} </span>
                </div>

                <div className="content" dangerouslySetInnerHTML={{ __html: parse_markdown(comment_state.content) }} />

                <div className="interactions">
                    <div> <button id="like"> <img src="/assets/icon_thumb_up.svg" alt="" /> {comment_state.likes} </button> </div>
                    <div> <button id="dislike"> <img src="/assets/icon_thumb_down.svg" alt="" /> {comment_state.dislikes} </button> </div>
                    <div> <button id="reply"> Responder </button> </div>
                </div>

                <div className="children">
                    { (comment_state.children_count > 0) ?
                        <button id="display_comments" onClick={view_comments}> 
                            {is_open ? `Esconder Respostas (${comment_state.children_count})` : `Ver Respostas (${comment.children_count})`} 
                        </button>
                        : null
                    }

                    {is_open ? 
                        (
                            console.log(`children: ${comment_state.children}`),
                            comment_state.children?.map((child: EntityComment, index) => (
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
