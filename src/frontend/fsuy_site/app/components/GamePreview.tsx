/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/GamePreview.tsx
 * @brief      Game preview's components.
 * @date       06-2026
 */

"use client"

import { useRef, useState, type ReactElement } from "react";

import { EntityGamePreview } from "@/app/entity_interfaces";

import "@/app/styles/components/GamePreview.css";

interface GamePreviewArgumetns {
    game: EntityGamePreview;
}

export function GamePreview({game}: GamePreviewArgumetns): ReactElement{

    const game_preview = useRef<HTMLDivElement>(null);
    const [hovered, set_hovered] = useState<boolean>(false);

    return (
        <div className="game_preview_wrapper">
            <a href={`/games/${game.gid}`}>
                <div 
                    className="game_preview" 
                    ref={game_preview}
                    onMouseEnter={() => set_hovered(true)}
                    onMouseLeave={() => set_hovered(false)}
                >
                    <img src={game.portrait} alt={`game_${game.gid}_portrait`} />
                </div>
            </a>
            <span id="title" style={ {opacity: (hovered ? 1 : 0)} }> {game.name} </span>
        </div>
    )
}