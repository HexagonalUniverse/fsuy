/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/NewsPreview.tsx
 * @brief      News preview's components.
 * @date       06-2026
 */

import { type ReactElement } from "react"

import { format_date_time } from "@/app/commons";
import { EntityNewsPreview } from "@/app/entity_interfaces";

import "@/app/styles/components/NewsPreview.css"

interface NewsPreviewArguments {
    news: EntityNewsPreview
};

export function NewsPreview({news}: NewsPreviewArguments): ReactElement {
    return (
        <a href={`/news/${news.pid}`}>
        <div className="news_preview"> 
            <img src={news.picture} alt="" />
            <h3> {news.title} </h3>
            <p> {news.description} </p>
            <span id="date"> {format_date_time(news.creation_date)} </span>
        </div>
        </a> 
    );
}

export function NewsPreview2({news}: NewsPreviewArguments): ReactElement {
    return (
        <div className="news_preview2"> 
        <a href={`/news/${news.pid}`}>
            <img src={news.picture} alt={`news_${news.pid}_picture`} />
            <div className="info">
                <h3> {news.title} </h3>
                <p id="date"> {format_date_time(news.creation_date)} </p>
            </div>
        </a> 
        </div>
    );
}