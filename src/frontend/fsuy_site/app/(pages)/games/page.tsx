/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/games/page.tsx
 * @brief      React component for the game's home page.
 * @date       06-2026
 */

import { type ReactElement } from "react";

import { EntityGamePreview } from "@/app/entity_interfaces";

import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";
import { GamePreview } from "@/app/components/GamePreview";

import "@/app/styles/pages/games_home.css";

const games_mock: EntityGamePreview[] = [
{
    gid: 0,
    name: "Minecraft",
    portrait: "https://cdn2.steamgriddb.com/grid/d69e0961e0596b45c15879c29cf84096.png"
},
{
    gid: 1,
    name: "Hollow Knight",
    portrait: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900_2x.jpg"
},
{
    gid: 2,
    name: "Hollow Knight: SilkSong",
    portrait: "https://cdn.cloudflare.steamstatic.com/steam/apps/1030300/library_600x900_2x.jpg"
},
{
    gid: 3,
    name: "Sid Meier's Civilization VI",
    portrait: "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/library_600x900_2x.jpg"
},
{
    gid: 4,
    name: "BloonsTD 6",
    portrait: "https://cdn.cloudflare.steamstatic.com/steam/apps/960090/library_600x900_2x.jpg"
},
{
    gid: 5,
    name: "The Legend of Zelda: Breath of the Wild",
    portrait: "https://m.media-amazon.com/images/M/MV5BY2QwOGJlZDQtMDhhNi00M2YwLWFiNzctZGI3NDc4ZGY0OGZjXkEyXkFqcGc@._V1_.jpg"
},
{
    gid: 6,
    name: "Terraria",
    portrait: "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900_2x.jpg"
},
{
    gid: 7,
    name: "Pokémon Emerald",
    portrait: "https://cdn2.steamgriddb.com/thumb/052938e7b425df3acdd9dc4be44404ef.jpg"
},
{
    gid: 8,
    name: "Marvel's Spider-Man",
    portrait: "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900_2x.jpg"
},
{
    gid: 9,
    name: "Geometry Dash",
    portrait: "https://cdn.cloudflare.steamstatic.com/steam/apps/322170/library_600x900_2x.jpg"
}
];

export default function GameHomePage(): ReactElement{

    return (
        <div className="page_body">
            <NavigationBar user={ {uid: 413, name: "Victor", picture: ""} } />

            <main>

                <h2 id="games_upper_title"> Jogos </h2>

                <div className="games_display">
                {
                    games_mock.map((game, i) => (
                        <GamePreview game={game} key={i}/>
                    ))
                }
                </div>
            </main>

            <FsuyFooter />
        </div>
    )
}