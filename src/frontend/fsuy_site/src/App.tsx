import { useState, useEffect, type ReactElement } from "react"

import { MarkdownInputField } from "./MarkdownInputField.tsx"

// import reactLogo from "./assets/react.svg"
import "./styles/App.css"

function App() {
	const [test_models, setTestModel] = useState([])
	
	useEffect(() => {
		fetch("/api/test_objects")
		.then(res => res.json())			// parsing the response into a json
		.then(data => setTestModel(data)) 	// storing it on the userdata
	}, 
	[]); // [] means it should only be execute once when the component is created.
	
	console.log(test_models);

	return (
		<>
			<h1>
				Doidera doida
			</h1>

			<p>
				realmente
			</p>

			<ul>
				{test_models.map(p => (
					<li key={p.tmid}>{p.name} — ${p.value}</li>
				))}
			</ul>

			<MarkdownInputField />
		</>
	);
}

export default App
