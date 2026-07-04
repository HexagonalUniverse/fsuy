/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/GamePreview.tsx
 * @brief      Game preview's components.
 * @date       06-2026
 */

import { type ReactElement } from "react";

import { MarkdownInputField } from "@/app/components/MarkdownInputField";
import { NavigationBar } from "@/app/components/NavigationBar";


// import reactLogo from "./assets/react.svg"
import "@/app/styles/pages/home.css";


export default async function Home(): Promise<ReactElement> {

	// const res = await fetch(`${base_url}/api/test_objects`, {next: {revalidate: 60}});
	// const test_models: TestModel[] = await res.json(); // parsing the response from json
	
	// console.log(test_models);

	return (
	<main>
		<NavigationBar uid={413} name="Victor" />

		<p>
		realmente
		</p>

		{/* <ul>
		{test_models.map(p => (
			<li key={p.tmid}>{p.name} — ${p.value}</li>
		))}
		</ul> */}


		<MarkdownInputField placeholder=""/>

	</main>
	);
}
