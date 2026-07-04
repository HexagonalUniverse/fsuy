/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/games/page.tsx
 * @brief      React component for the game's home page.
 * @date       06-2026
 */

import { type ReactElement } from "react";

import { NavigationBar } from "@/app/components/NavigationBar"
import { GamePreview } from "@/app/components/GamePreview"

import "@/app/styles/pages/games_home.css"

export default function GameHomePage(): ReactElement{
    return (
        <div className="page_body">
            <NavigationBar uid={413} name="Victor" />

            <main>

                <h2 id="games_upper_title"> Jogos </h2>

                <div className="games_display">
                    <GamePreview 
                        cover="https://cdn2.steamgriddb.com/grid/d69e0961e0596b45c15879c29cf84096.png"
                        name="Minecraft"
                        gid={1}
                    />
                    <GamePreview 
                        cover="https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900_2x.jpg"
                        name="Hollow Knight"
                        gid={1}
                    />
                    <GamePreview 
                        cover="https://cdn.cloudflare.steamstatic.com/steam/apps/1030300/library_600x900_2x.jpg"
                        name="SilkSong"
                        gid={1}
                    />
                    <GamePreview 
                        cover="https://cdn.cloudflare.steamstatic.com/steam/apps/289070/library_600x900_2x.jpg"
                        name="Civilization VI"
                        gid={1}
                    />
                    <GamePreview 
                        cover="https://cdn.cloudflare.steamstatic.com/steam/apps/960090/library_600x900_2x.jpg"
                        name="BloonsTD 6"
                        gid={1}
                    />
                    <GamePreview 
                        cover="https://m.media-amazon.com/images/M/MV5BY2QwOGJlZDQtMDhhNi00M2YwLWFiNzctZGI3NDc4ZGY0OGZjXkEyXkFqcGc@._V1_.jpg"
                        name="Breath of the Wild"
                        gid={1}
                    />
                    <GamePreview 
                        cover="https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900_2x.jpg"
                        name="Terraria"
                        gid={1}
                    />
                </div>
            </main>
        </div>
    )
}