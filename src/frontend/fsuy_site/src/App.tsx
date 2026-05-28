import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'

import { marked } from 'marked'
import createDOMPurify from "dompurify";

const DOMPurify = createDOMPurify(window);

const md = `
# título

texto normal

\`\`\`js
console.log("oi");
\`\`\`


| Nome | Nota | Status |
|---|---|---|
| Mario | 10 | OK |
| Sonic | 7 | Médio |
| Zelda | 9 | Excelente |

$x_2 = e^{54}$

<script>
alert("hack");
</script>
`;

const unsafe_html = marked.parse(md);
const safe_html = DOMPurify.sanitize(
    unsafe_html,
    {
        USE_PROFILES: {
            html: true
        }
    }
);

function App() {
	const [test_models, setTestModel] = useState([])
	
	useEffect(() => {
		fetch("/api/test_objects")
		.then(res => res.json())			// parsing the response into a json
		.then(data => setTestModel(data)) 	// storing it on the userdata
	}, 
	[]) // [] means it should only be execute once when the component is created.
	
	console.log(test_models)

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

			<div id="content"
				dangerouslySetInnerHTML={{
					__html: safe_html
				}}
			/> 
		</>
	)
}

export default App
