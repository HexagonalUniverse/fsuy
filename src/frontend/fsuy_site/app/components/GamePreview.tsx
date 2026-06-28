/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/GamePreview.tsx
 * @brief      Game preview's components.
 * @date       06-2026
 */


import { type ReactElement } from "react"

import "../styles/GamePreview.css"

interface GamePreviewArgumetns {
    cover: string,
    name: string,
    gid: number
}

export function GamePreview({cover, name, gid}: GamePreviewArgumetns): ReactElement{
    return (
        <a href={`/games/${gid}`}>
            <div className="game_preview">
                <img src={cover} alt="" />
                <h3> {name} </h3>
            </div>
        </a>
    )
}