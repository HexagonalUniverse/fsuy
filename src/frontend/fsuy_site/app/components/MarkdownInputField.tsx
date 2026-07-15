/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/MarkdownInput.tsx
 * @brief      React component for a input area that supports markdown with edit and preview modes.
 * @date       06-2026
 */

"use client";

import React, { useState, useRef, type ReactElement, useEffect } from "react";
import { parse_markdown } from "@/app/commons";

import "@/app/styles/components/MarkdownInputField.css"
import { write_review } from "@/app/commons";
import { useRouter } from "next/navigation";
import { useToast } from "../ToastProvider";

// const DOMPurify = createDOMPurify(window);

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


interface MarkdownInputFieldParams {
    placeholder: string;
    action_type: string;
    gid: number;
}




export function MarkdownInputField({ placeholder, action_type, gid }: MarkdownInputFieldParams): ReactElement {
    const { showToast } = useToast();
    
    const [md_content, set_md_content]      = useState<string>("");
    const [preview_mode, set_preview_mode]  = useState<boolean>(false);
    const [is_writing, set_is_writing]      = useState<boolean>(false);
    const [safe_html, set_safe_html]        = useState<string>("");
    
    const textarea_ref = useRef<HTMLTextAreaElement>(null);

    const adjust_textarea_height: () => void = () => {
        const textarea: HTMLTextAreaElement = textarea_ref.current !;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };
    
    function handle_edit_preview(): void {
        if (! preview_mode){
            set_safe_html(parse_markdown(md_content));
        }
        
        set_preview_mode(!preview_mode);
    }

    function handle_writing(imputed_text: React.ChangeEvent<HTMLTextAreaElement>): void {
        set_md_content(imputed_text.target.value); 
        set_is_writing(imputed_text.target.value != "");
        adjust_textarea_height();
    }

    function cancel_writing(): void {
        set_md_content("");
        set_is_writing(false);
    }

    // Adjusting the textarea_height back when changing from preview to edit.
    useEffect(() => {
        if(!preview_mode) 
            adjust_textarea_height();
    }, [preview_mode]);



    const router = useRouter();
    async function send_action(
        action_type:    string,
        gid:            number, 
        content:        string,
    ) {
        if (action_type === "review") {
            try {
                await write_review(gid, content);    
            } catch (error) {
                showToast(error.message);
            }
            

        } else if (action_type === "news") {
            //await write_news(id, content);

        }


        router.refresh();
        cancel_writing();
        //window.location.reload();
    }   


    return (
        <div className="md_input_field">

            <div className="edit_box">
            {
                is_writing ? 
                <div className="edit_preview">
                    <button id="btn_edit" onClick={handle_edit_preview} disabled={!preview_mode}> Edit </button>
                    <button id="btn_preview" onClick={handle_edit_preview} disabled={preview_mode}> Preview </button>
                </div>
                : null
            }

            {
                preview_mode ? 
                <div id="preview" dangerouslySetInnerHTML={{ __html: (safe_html != "")? safe_html : "Nenhum conteúdo para previzualizar" }} />
                :
                <textarea 
                    id="edit_textarea"
                    ref={textarea_ref}
                    value={md_content}
                    onChange={handle_writing}
                    onFocus={() => {set_is_writing(true)}}
                    placeholder={placeholder}
                />
            }
            </div>

            { is_writing?
                <div className="send_cancel">
                    <button id="cancel" onMouseDown={cancel_writing}> Cancelar </button>
                    <button id="send" onClick={() => send_action(
                        action_type,
                        gid,
                        md_content,
                    )}> Enviar </button>
                </div>
                : null
            }

            <button onClick={
                () => { 
                    //write_post_comment(
                    //    2,
                    //    "CONTEÚDO CONTEÚDO",
                    //);
                    send_action(
                        "review", 
                        gid,
                        "# Jogo Ruim\n\nUMA DAS **MELHORES** E MAIS AUTOMÁTICAS **REVIEWS** QUE ESSE MUNDO JÁ VIU!"
                    )
                }
            }
            style={{width: "6rem", margin: "1rem"}}
            >
                BOTÃO
            </button>

        </div>
    );
}
