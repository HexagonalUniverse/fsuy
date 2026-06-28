/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/games/[gid]/page.tsx
 * @brief      React component for a dynamic routed game's page.
 * @date       06-2026
 */

import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { type DynamicEntityPageParams, APIError, api_get_entity } from "@/app/commons";
import { type EntityGame } from "@/app/entity_interfaces";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Review } from "@/app/components/Review";
import { MarkdownInputField } from "@/app/components/MarkdownInputField";

import "@/app/styles/game.css";
import { title } from "process";



export default async function GamePage({params}: DynamicEntityPageParams): Promise<ReactElement> {

    const reviews = [
        {   author: { uid: 413, name: "Victor" },
            content: "# Muito bom!!!\n\nMuito bom mesmo",
            tags: [ {tid: 23, title: "Legal"}, {tid: 24, title: "Jogo"} ],
            children: [
                {   author: { uid: 413, name: "Camilo Borges" },
                    content: "Negócios legais, mas nem tanto.",
                    tags: [],
                    likes: 25, dislikes: 2,
                    children: [
                        {   author: { uid: 413, name: "Doido" },
                            content: "Negócios legais, mas nem tanto.",
                            tags: [],
                            likes: 25, dislikes: 2,
                            children: []
                        }
                    ]
                },

                {   author: { uid: 413, name: "Camilo Borges" },
                    content: "|Jogo|Legal|Minecraft|\n|---|---|---|\n|Não sei o que | Não Sei o quê lá | Bla Bla Bla |",
                    tags: [],
                    likes: 25, dislikes: 2,
                    children: [
                        {   author: { uid: 413, name: "AAAAAAAA" },
                            content: "# Negócios legais \n mas nem tanto.",
                            tags: [],
                            likes: 25, dislikes: 2,
                            children: []
                        }
                    ]
                },
            ]
        },

        {   author: { uid: 413, name: "Hebert" },
            content: "UAU!",
            tags: [ {tid: 23, title: "Legal"} ],
            children: [
                {   author: { uid: 413, name: "Camilo Borges" },
                    content: "Uau",
                    tags: [],
                    likes: 25, dislikes: 2,
                    children: [
                        {   author: { uid: 413, name: "Doido" },
                            content: "# AAAAAAAAAAAAAAAA",
                            tags: [],
                            likes: 25, dislikes: 2,
                            children: []
                        }
                    ]
                }
            ]
        }
    ]

    // const {id} = await params;

    let game: EntityGame = {
        gid: 413,
        name: "Hollow Knight",
        description: "Forje seu caminho em Hollow Knight! Uma aventura de ação épica em um vasto reino arruinado de insetos e heróis. Explore cavernas serpenteantes, lute contra criaturas malignas e alie-se a insetos bizarros num estilo clássico 2D desenhado à mão.",
        genres: "Sandbox",
        developer: "Team Cherry",
        publisher: "Team Cherry",
        plataforms: "Linux, Mac, Nintendo Switch, Nintendo Switch 2, PC, PlayStation 4, Xbox One",
        launch_date: "24 de Fevereiro de 2017",
        steam_id: 367520
    };

    // try {
    //     game = await api_get_entity<EntityGame>("games", id.toString());

    // } catch(error){
    //     if (error instanceof APIError){
    //         notFound();
    //     }

    //     throw error;
    // }

    return (
        <>
        <NavigationBar uid={413} name="Victor" />
        <main>
            <aside>
                <img id="game_cover" src="https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900_2x.jpg" alt="game_cover" />

                <div id="info">
                    <span> <strong> Gêneros: </strong> {game.genres} </span>
                    <span> <strong> Developer: </strong> {game.developer} </span>
                    <span> <strong> Publisher: </strong> {game.publisher} </span>
                    <span> <strong> Lançamento: </strong> {game.launch_date} </span>
                    <span> <strong> Plataformas: </strong> {game.plataforms} </span>
                </div>
            </aside>

            <article>
                <div className="heading">
                    <img id="horizontal_cover" src="https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_hero.jpg" alt="horizontal_cover" />
                    <img id="logo" src="https://cdn.cloudflare.steamstatic.com/steam/apps/367520/logo.png" alt="game_logo" />
                </div>

                <h1>{game.name}</h1>

                <div className="description"> {game.description} </div>

                <div className="steam_widget">
                    <iframe src={`https://store.steampowered.com/widget/${game.steam_id}/`}
                            width="100%" height="190px">
                    </iframe>
                </div>

                <hr />

                <div className="reviews">
                    <h2> Reviews </h2>

                    <MarkdownInputField placeholder="Escreva uma review..." />

                    {reviews.map( (review, index) => (
                        <Review key={index} review={review} />
                    ))}
                </div>

            </article>
        </main>
        </>
    );
}