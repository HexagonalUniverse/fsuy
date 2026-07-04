/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/GamePreview.tsx
 * @brief      Game preview's components.
 * @date       06-2026
 */

"use client"

import { useRef, useState, type ReactElement } from "react"

import "@/app/styles/components/GamePreview.css"

interface GamePreviewArgumetns {
    cover: string,
    name: string,
    gid: number
}

export function GamePreview({cover, name, gid}: GamePreviewArgumetns): ReactElement{

    const game_preview = useRef<HTMLDivElement>(null);
    const [hovered, set_hovered] = useState<boolean>(false);

    return (
        <div className="game_preview_wrapper">
            <a href={`/games/${gid}`}>
                <div 
                    className="game_preview" 
                    ref={game_preview}
                    onMouseEnter={() => set_hovered(true)}
                    onMouseLeave={() => set_hovered(false)}
                >
                    <img src={cover} alt="" />
                </div>
            </a>
            <span id="title" style={ {opacity: (hovered ? 1 : 0)} }> {name} </span>
        </div>
    )
}