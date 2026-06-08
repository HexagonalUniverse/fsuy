// import { useRouter } from 'next/navigation';

import { type ReactElement } from "react"

import { base_url } from "./commons"
import { type TestModel } from "./types"

import { MarkdownInputField } from "./components/MarkdownInputField"
import { NavigationBar } from "./components/NavigationBar"


// import reactLogo from "./assets/react.svg"
import "./styles/App.css"
import { NewsPreview } from "./components/NewsPreview"


export default async function Home(): Promise<ReactElement> {

	// const res = await fetch(`${base_url}/api/test_objects`, {next: {revalidate: 60}});
	// const test_models: TestModel[] = await res.json(); // parsing the response from json
	
	// console.log(test_models);

	return (
	<main>
		<NavigationBar />

		<p>
		realmente
		</p>

		{/* <ul>
		{test_models.map(p => (
			<li key={p.tmid}>{p.name} — ${p.value}</li>
		))}
		</ul> */}

		<div className="news_display">
			<NewsPreview 
				title="Minecraft é muito Bom!!!" 
				abstract="mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto" 
				cover="https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg"
			/>

			<NewsPreview 
				title="Civilization" 
				abstract="mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto" 
				cover="https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000013704/918c0badde3aeba760e2185f382a2402248a1292322cf540fd8d098eeb292e1e"
			/>

			<NewsPreview 
				title="Hey, Listen!" 
				abstract="mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto" 
				cover="https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch2/70010000096817/cfe9f8d674be958326d3ba11fc7598a4383e5c5d7809b6239ccac0783aac6cd8"
			/>

			<NewsPreview 
				title="Cavaleiro Vazio" 
				abstract="mucho texto mucho texto mucho texto mucho texto mucho texto mucho texto" 
				cover="https://image.api.playstation.com/vulcan/ap/rnd/202601/1505/91d47e238a9e2cb5f33e10e4b54c911b4beaafcad3e14a9e.png?w=440"
			/>
		</div>

		<MarkdownInputField />

	</main>
	);
}
