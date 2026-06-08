import { type ReactElement } from "react"

import "../styles/GamePreview.css"

interface GamePreviewArgumetns {
    cover: string,
    name: string
}

export function GamePreview({cover, name}: GamePreviewArgumetns): ReactElement{
    return (
        <div className="game_preview">
            <img src={cover} alt="" />
            <h3> {name} </h3>
        </div>
    )
}