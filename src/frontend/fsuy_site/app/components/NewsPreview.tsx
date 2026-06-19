/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/NewsPreview.tsx
 * @brief      News preview's components.
 * @date       06-2026
 */

import { type ReactElement } from "react"

import "@/app/styles/NewsPreview.css"

interface NewsPreviewArguments {
    title: string,
    abstract: string,
    date: string,
    cover: string
};

export function NewsPreview({title, abstract, date, cover}: NewsPreviewArguments): ReactElement {
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