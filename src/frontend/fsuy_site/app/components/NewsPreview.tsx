import { type ReactElement } from "react"

import "../styles/NewsPreview.css"

interface NewsPreviewArguments {
    title: string,
    abstract: string,
    date: string,
    cover: string
};

export function NewsPreview({title, abstract, date, cover}: NewsPreviewArguments): ReactElement {
    return (
        <div className="news_preview">
            <img src={cover} alt="" />
            <h3> {title} </h3>
            <p> {abstract} </p>
            <p id="date"> {date} </p>
        </div>
    );
}