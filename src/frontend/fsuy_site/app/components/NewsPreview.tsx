/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/NewsPreview.tsx
 * @brief      News preview's components.
 * @date       06-2026
 */

import { type ReactElement } from "react"

import { EntityNewsPreview } from "@/app/entity_interfaces";

import "@/app/styles/components/NewsPreview.css"

interface NewsPreviewArguments {
    news: EntityNewsPreview
};

export function NewsPreview({news}: NewsPreviewArguments): ReactElement {
    return (
        <a href={`/news/${news.pid}`}>
        <div className="news_preview"> 
            <img src={news.cover} alt="" />
            <h3> {news.title} </h3>
            <p> {news.content_preview} </p>
            <span id="date"> {news.timestamp} </span>
        </div>
        </a> 
    );
}

export function NewsPreview2({news}: NewsPreviewArguments): ReactElement {
    return (
        <div className="news_preview"> 
        <a href={`/news/${news.pid}`}>
            <img src={news.cover} alt="" />
            <h3> {news.title} </h3>
            <p> {news.content_preview} </p>
            <p id="date"> {news.timestamp} </p>
        </a> 
        </div>
    );
}