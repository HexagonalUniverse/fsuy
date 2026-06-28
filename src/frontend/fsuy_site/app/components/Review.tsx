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
import { parse_markdown } from "@/app/commons"

import "@/app/styles/Review.css";
import "@/app/styles/Comment.css";


interface ReviewParams {
    review: EntityReview;
}

export function Review({review}: ReviewParams ): ReactElement {
    const [is_open, set_is_open] = useState<boolean>(false);

    return (
        <>
        <div className="review">
            <UserPreview uid={review.author.uid} name={review.author.name} />
            
            <div className="tags">
            {
                review.tags?.map((tag: EntityTag, index) => (
                    <Tag key={index} tag={tag} />
                ))
            }
            </div>

            <div className="content" dangerouslySetInnerHTML={{ __html: parse_markdown(review.content) }} />

            <hr />

            <div className="children">
                <button id="display_comments" onClick={() => set_is_open(!is_open)}> 
                    {is_open ? "Esconder Comentários" : "Ver Comentários"} 
                </button>

                {is_open ? 
                    (
                        review.children?.map((child: EntityComment, index) => (
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