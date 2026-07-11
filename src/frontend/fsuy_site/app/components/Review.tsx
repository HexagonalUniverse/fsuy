/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/Review.tsx
 * @brief      Review's react component.
 * @date       06-2026
 */

"use client";

import { useState, type ReactElement } from "react";

import { EntityReview, EntityComment, EntityTag } from "@/app/entity_interfaces";
import { UserPreview } from "@/app/components/UserPreview";
import { Comment } from "@/app/components/Comment";
import { Tag } from "@/app/components/Tag";
import { api_get_posts, format_date_time, parse_markdown } from "@/app/commons"

import "@/app/styles/components/Review.css";
import "@/app/styles/components/Comment.css";


interface ReviewParams {
    review: EntityReview;
}

export function Review({review}: ReviewParams ): Promise<ReactElement> {
    const [is_open, set_is_open] = useState<boolean>(false);
    const [review_state, set_review] = useState<EntityReview>(review);

    async function view_comments() {
        let children: EntityComment[];

        try {
           children = await api_get_posts<EntityComment>("review", "comments", `${review.pid}`);
            
        } catch (error) {
            console.error(error);
        }

        set_is_open(!is_open);

        set_review((prev: EntityReview) => ({
            ...prev,
            children: children,
        }));
    }

    return (
        <>
        <div className="review">
            <div className="header">
                <UserPreview user={review_state.author} />
                <span className="rate"> <b>Nota:</b> {review_state.rate} </span>
                <span className="edit_date"> {format_date_time(review_state.edit_date)} </span>
            </div>

            <div className="tags">
            {
                review_state.tags?.map((tag: EntityTag, index) => (
                    <Tag key={index} tag={tag} />
                ))
            }
            </div>

            <div className="content" dangerouslySetInnerHTML={{ __html: parse_markdown(review_state.content) }} />

            <hr />

            <div className="children">
                <button id="display_comments" onClick={view_comments}> 
                    {(is_open) ? "Esconder Comentários" : "Ver Comentários"} 
                </button>

                {is_open ? 
                    (
                        review_state.children?.map((child: EntityComment, index) => (
                            <Comment key={index} comment={child} level={1} />
                        ))
                    )
                    : null
                }
            </div>
        </div>

        </>
    );
}