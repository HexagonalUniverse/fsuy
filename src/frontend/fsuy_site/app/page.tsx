/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/GamePreview.tsx
 * @brief      Game preview's components.
 * @date       06-2026
 */

import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { APIError, api_get_page } from "@/app/commons";
import { EntityNewsPreview, EntityGamePreview } from "@/app/entity_interfaces";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";
import { NewsCarousel } from "@/app/components/NewsCarousel";
import { GamePreview } from "./components/GamePreview";


// import reactLogo from "./assets/react.svg"
import "@/app/styles/pages/home.css";


export default async function Home(): Promise<ReactElement> {

	let news: EntityNewsPreview[];
	let games: EntityGamePreview[];
	
	try {
		news = await api_get_page<EntityNewsPreview>("news", "all", true);
		games = await api_get_page<EntityGamePreview>("game", "all", true);

	} catch(error){
		if(error instanceof APIError)
			notFound();

		throw error;
	}
	

	return (
	<div className="page_body">
		<NavigationBar user={ {uid: 3, public_name: "Victor", picture: "", creation_date: "", last_login: ""} } />

		<main>
			<div className="presentation">
				<h1> FSUY </h1>
				<span> Veja as úlitmas notícias, decubra e avalie jogos </span>
			</div>

			<h2 id="upper_title"> Notícias em Destaque </h2>
			<NewsCarousel carousel_news={news} frame_interval={6000} />

			<h2> Jogos Populares </h2>
			<div className="games_display">
				{ games.slice(0,5)?.map((game, i) => ( <GamePreview game={game} key={i}/> )) }
			</div>
			
		</main>

		<FsuyFooter />
	</div>
	);
}
