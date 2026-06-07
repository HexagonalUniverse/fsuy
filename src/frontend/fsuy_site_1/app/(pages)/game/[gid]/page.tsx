import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { base_url } from "../../../commons"
import { type Game } from "../../../types"

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
        <div>
            <h1>{game.gid} - {game.name}</h1>
            <h2>Genre: {game.genre}</h2>
            <h3>Date: {game.launch_date}</h3>

            <p>contents....</p>

            <a href="/">Back</a>
        </div>
    )
}