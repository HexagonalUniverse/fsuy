import { useState, type ReactElement } from "react"

import createDOMPurify, { type DOMPurify } from "dompurify";
import { marked } from "marked"

import "./styles/MarkdownInputField.css"

const DOMPurify = createDOMPurify(window);

const md: string = `# título

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


function parse_markdown(md_string: string): string {
    const unsafe_html: string = marked.parse(md_string, {async: false});

    return DOMPurify.sanitize(
        unsafe_html,
        {
            USE_PROFILES: {
                html: true
            }
        }
    );
}


export function MarkdownInputField(): ReactElement {
    const [md_content, set_md_content]      = useState<string>(md);
    const [preview_mode, set_preview_mode]  = useState<boolean>(false);
    const [safe_html, set_safe_html]        = useState<string>("");
    
    function handleClick_preview(): void {
        if(!preview_mode){
            set_safe_html(parse_markdown(md_content));
        }
        
        set_preview_mode(!preview_mode);
    }

    return (
        <div className="md_field">
            <button id="btn_edit" onClick={handleClick_preview} disabled={!preview_mode}> Edit </button>
            <button id="btn_preview" onClick={handleClick_preview} disabled={preview_mode}> Preview </button>

            {
                preview_mode ? 
                <div id="preview" dangerouslySetInnerHTML={{ __html: safe_html }} />
                :
                <textarea value={md_content} onChange={(imputed_text) => set_md_content(imputed_text.target.value)}/>
            }
        </div>
    )
}
