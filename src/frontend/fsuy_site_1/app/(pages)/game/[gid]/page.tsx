import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { base_url } from "../../../commons"
import { type Game } from "../../../types"

import { NavigationBar } from "../../../components/NavigationBar"
import { GamePreview } from "../../../components/GamePreview"

import "../../../styles/game.css"

interface Params {
    params: Promise<{gid: string}>
}

export default async function GamePage({params}: Params): Promise<ReactElement> {

    const {gid} = await params;

    const res = await fetch(`${base_url}/api/games/${gid}`);

    console.log(`url: ${base_url}/api/games/${gid}`);

    if (!res.ok) notFound();

    const game: Game = await res.json();

    if (!game) notFound();

    return (
        <main>
            <NavigationBar />

            <h2 id="games_upper_title"> Jogos </h2>

            <div className="games_display">
                <GamePreview 
                    cover="https://cdn2.steamgriddb.com/grid/d69e0961e0596b45c15879c29cf84096.png"
                    name={game.name}
                />
                <GamePreview 
                    cover="https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900_2x.jpg"
                    name="Hollow Knight"
                />
                <GamePreview 
                    cover="https://cdn.cloudflare.steamstatic.com/steam/apps/1030300/library_600x900_2x.jpg"
                    name="SilkSong"
                />
                <GamePreview 
                    cover="https://cdn.cloudflare.steamstatic.com/steam/apps/289070/library_600x900_2x.jpg"
                    name="Civilization VI"
                />
                <GamePreview 
                    cover="https://cdn.cloudflare.steamstatic.com/steam/apps/960090/library_600x900_2x.jpg"
                    name="BloonsTD 6"
                />
                <GamePreview 
                    cover="https://m.media-amazon.com/images/M/MV5BY2QwOGJlZDQtMDhhNi00M2YwLWFiNzctZGI3NDc4ZGY0OGZjXkEyXkFqcGc@._V1_.jpg"
                    name="Breath of the Wild"
                />
                <GamePreview 
                    cover="https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900_2x.jpg"
                    name="Terraria"
                />
            </div>
            
            <div>
                <h1>{game.gid} - {game.name}</h1>
                <h2>Genre: {game.genre}</h2>
                <h3>Date: {game.launch_date}</h3>
            </div>
        </main>
    )
}