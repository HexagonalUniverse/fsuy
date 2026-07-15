/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/Review.tsx
 * @brief      Review's react component.
 * @date       06-2026
 */

"use client";

import { useState, type ReactElement } from "react";

import { get_user_state } from "@/app/UserProvider";
import { EntityReview, EntityComment, EntityTag } from "@/app/entity_interfaces";
import { UserPreview } from "@/app/components/UserPreview";
import { Comment } from "@/app/components/Comment";
import { Tag } from "@/app/components/Tag";
import { api_get_posts, format_date_time, parse_markdown } from "@/app/commons"

import "@/app/styles/components/Review.css";
import "@/app/styles/components/Comment.css";

import { useToast } from "@/app/ToastProvider";

import { delete_post } from "@/app/commons";
import { useRouter } from "next/navigation";


interface ReviewParams {
    review: EntityReview;
}

export function Review({review}: ReviewParams ): Promise<ReactElement> {
    const user_state = get_user_state();

    const [is_open, set_is_open] = useState<boolean>(false);
    const [review_state, set_review] = useState<EntityReview>(review);

    const { showToast } = useToast();

    async function view_comments() {
        let children: EntityComment[];

        set_is_open(!is_open);
        
        if (!is_open){
            try {
                children = await api_get_posts<EntityComment>("review", "comments", `${review.pid}`);
                
                set_review((prev: EntityReview) => ({
                    ...prev,
                    children: children,
                }));

            } catch (error) {
                console.error(error);
            }
        }
    }

    

    const router = useRouter();
    async function DELETE_DELETE(pid: number) {
        try {
            await delete_post(pid);
            router.refresh();

        } catch (error) {
            showToast(error.message);
        }
    }


    return (
        <>
        <div className="review">
            <div className="header">
                <UserPreview user={review_state.author} />
                <span className="rate"> <b>Nota:</b> {review_state.rate} / 10 </span>
                <span className="edit_date"> {format_date_time(review_state.edit_date)} </span>
                {
                (review_state.author.uid === user_state.uid)?
                <button className="delete" onClick={() => DELETE_DELETE(review.pid) }>
                    BAGAÇAR
                </button>
                :
                null
                }
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
                {
                    (review_state.comment_count > 0) ?
                    <button id="display_comments" onClick={view_comments}> 
                        {(is_open) ? "Esconder Comentários" : `Ver Comentários (${review_state.comment_count})`} 
                    </button>
                    : null
                }

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