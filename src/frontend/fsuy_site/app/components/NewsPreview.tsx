/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/NewsPreview.tsx
 * @brief      News preview's components.
 * @date       06-2026
 */

import { type ReactElement } from "react"

import "@/app/styles/components/NewsPreview.css"

interface NewsPreviewArguments {
    pid: number,
    title: string,
    abstract: string,
    date: string,
    cover: string
};

export function NewsPreview({pid, title, abstract, date, cover}: NewsPreviewArguments): ReactElement {
    return (
        <a href={`/news/${pid}`}>
        <div className="news_preview"> 
            <img src={cover} alt="" />
            <h3> {title} </h3>
            <p> {abstract} </p>
            <span id="date"> {date} </span>
        </div>
        </a> 
    );
}

export function NewsPreview2({title, abstract, date, cover}: NewsPreviewArguments): ReactElement {
    return (
        <div className="news_preview"> 
        <a href="/news/45">
            <img src={cover} alt="" />
            <h3> {title} </h3>
            <p> {abstract} </p>
            <p id="date"> {date} </p>
        </a> 
        </div>
    );
}