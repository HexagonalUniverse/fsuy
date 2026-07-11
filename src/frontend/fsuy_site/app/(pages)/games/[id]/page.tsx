/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/games/[gid]/page.tsx
 * @brief      React component for a dynamic routed game's page.
 * @date       06-2026
 */

import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { type DynamicEntityPageParams, APIError, api_get_entity, api_get_posts, parse_markdown } from "@/app/commons";
import { EntityComment, EntityReview, type EntityGame } from "@/app/entity_interfaces";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";
import { Review } from "@/app/components/Review";
import { MarkdownInputField } from "@/app/components/MarkdownInputField";

import "@/app/styles/pages/games.css";


export default async function GamePage({params}: DynamicEntityPageParams): Promise<ReactElement> {

    const {id} = await params;
    // console.log(`${id}`);
    
    let game: EntityGame;
    let reviews: EntityReview[];
    
    try {
        game = await api_get_entity<EntityGame>("game", id);
        reviews = await api_get_posts<EntityReview>("game", "reviews", id);

    } catch(error){
        if(error instanceof APIError)
            notFound();

        throw error;
    }

    const reviews_with_gid: EntityReview[] = reviews.map(review => ({ ...review, gid: game.gid }));

    console.log(`Review: ${reviews}`);

    return (
        <div className="page_body">
            <NavigationBar />
            <main>
                <aside>
                    <img id="game_portrait" src={game.portrait} alt="game_cover" />

                    <div id="info">
                        <span> <strong> Gêneros: </strong> {game.genres.map((genre) => (genre.name) ).join(", ")} </span>
                        <span> <strong> Developer: </strong> {game.developer} </span>
                        <span> <strong> Publisher: </strong> {game.publisher} </span>
                        <span> <strong> Lançamento: </strong> {game.launch_date} </span>
                        <span> <strong> Plataformas: </strong> {game.platforms.map((plataform) => (plataform.name) ).join(", ")} </span>
                    </div>
                </aside>

                <article>
                    <div className="heading">
                        <img id="game_cover" src={ game.cover } alt="horizontal_cover" />
                        <img id="game_logo" src={ game.logo } alt="game_logo" />
                    </div>

                    <h1>{game.name}</h1>

                    <div className="description" dangerouslySetInnerHTML={{ __html: parse_markdown(game.description) }} />

                    {
                    (game.steam_id)?
                        <div className="steam_widget">
                            <iframe src={`https://store.steampowered.com/widget/${game.steam_id}/`}
                                    width="100%" height="190px">
                            </iframe>
                        </div>
                    : null
                    }

                    <hr />

                    <div className="reviews">
                        <h2> Reviews </h2>

                        <MarkdownInputField placeholder="Escreva uma review..." action_type="review" gid={game.gid}/>

                        {reviews_with_gid?.map( (review, index) => (
                            <Review key={index} review={review} />
                        ))}
                    </div>

                </article>
            </main>

            <FsuyFooter />
        </div>
    );
}