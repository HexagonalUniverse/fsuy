/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/GamePreview.tsx
 * @brief      Game preview's components.
 * @date       06-2026
 */

import { type ReactElement } from "react";

import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";


// import reactLogo from "./assets/react.svg"
import "@/app/styles/pages/home.css";


export default async function Home(): Promise<ReactElement> {

	// const res = await fetch(`${base_url}/api/test_objects`, {next: {revalidate: 60}});
	// const test_models: TestModel[] = await res.json(); // parsing the response from json
	
	// console.log(test_models);

	return (
	<div className="page_body">
		<NavigationBar user={ {uid: 413, name: "Victor", picture: ""} } />


		<main>
			<img src="https://media.tenor.com/wuyEcsxrvQwAAAAM/club-penguin-ghosthy.gif" alt="" />
			<p> realmente </p>
		</main>

		<FsuyFooter />
	</div>
	);
}
