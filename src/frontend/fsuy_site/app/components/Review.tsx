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

import "@/app/styles/components/Review.css";
import "@/app/styles/components/Comment.css";

import { useToast } from "@/app/ToastProvider";

import { delete_post } from "@/app/commons";
import { useRouter } from "next/navigation";


interface ReviewParams {
    review: EntityReview;
}


export function Review({review}: ReviewParams ): ReactElement {
    const [is_open, set_is_open] = useState<boolean>(false);
    const { showToast } = useToast();


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
            <UserPreview user={review.author} />
            
            <button className="delete" onClick={() => DELETE_DELETE(review.pid) }>
                BAGAÇAR
            </button>

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

                {/* {is_open ? 
                    (
                        review.children?.map((child: EntityComment, index) => (
                            <Comment key={index} comment={child} level={1} />
                        ))
                    )
                    : null
                } */}
            </div>
        </div>

        </>
    );
}