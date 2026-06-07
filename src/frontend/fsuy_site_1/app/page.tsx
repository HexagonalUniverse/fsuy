// import { useRouter } from 'next/navigation';

import { type ReactElement } from "react"

import { base_url } from "./commons"
import { type TestModel } from "./types"

import { MarkdownInputField } from "./components/MarkdownInputField"


// import reactLogo from "./assets/react.svg"
import "./styles/App.css"


export default async function Home(): Promise<ReactElement> {

	const res = await fetch(`${base_url}/api/test_objects`, {next: {revalidate: 60}});
	const test_models: TestModel[] = await res.json(); // parsing the response from json
	
	console.log(test_models);

	return (
	<>
		<h1>
		FSUY
		</h1>

		<p>
		realmente
		</p>

		<ul>
		{test_models.map(p => (
			<li key={p.tmid}>{p.name} — ${p.value}</li>
		))}
		</ul>
		
		<a href="/game/413">TestPage</a>

		<MarkdownInputField />

	</>
	);
}
