/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/games/page.tsx
 * @brief      React component for the game's home page.
 * @date       06-2026
 */

import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { APIError, api_get_page } from "@/app/commons";
import { EntityGamePreview, EntityGame } from "@/app/entity_interfaces";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";
import { GamePreview } from "@/app/components/GamePreview";

import "@/app/styles/pages/games_home.css";


export default async function GameHomePage(): Promise<ReactElement> {

    let games: EntityGamePreview[];

    try {
        games = await api_get_page<EntityGamePreview>("game", "all", true);

    } catch(error){
        if(error instanceof APIError)
            notFound();

        throw error;
    }
    

    return (
        <div className="page_body">
            <NavigationBar user={ {uid: 413, public_name: "Victor", picture: ""} } />

            <main>

                <h2 id="games_upper_title"> Jogos </h2>

                <div className="games_display">
                {
                    games.map((game, i) => (
                        <GamePreview game={game} key={i}/>
                    ))
                }
                </div>
            </main>

            <FsuyFooter />
        </div>
    )
}