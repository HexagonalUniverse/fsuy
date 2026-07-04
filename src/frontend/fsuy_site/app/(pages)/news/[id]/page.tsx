/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/news/[pid]
 * @brief      React component for a dynamic routed news' page.
 * @date       06-2026
 */

import { type ReactElement } from "react";

import { APIError, api_get_entity, DynamicEntityPageParams } from "@/app/commons";

import { EntityTag } from "@/app/entity_interfaces";
import { NavigationBar } from "@/app/components/NavigationBar";
import { UserPreview } from "@/app/components/UserPreview";
import { Comment } from "@/app/components/Comment";
import { Tag } from "@/app/components/Tag";
import { MarkdownInputField } from "@/app/components/MarkdownInputField";

import "@/app/styles/pages/news.css"

export default async function NewsPage({params}: DynamicEntityPageParams): Promise<ReactElement> {
    
    // const {id} = await params;
    
    // api_get_entity<News>("news", pid);


    const news_tags: EntityTag[] = [
        { tid: 11, title: "Notícia" },
        { tid: 12, title: "Bacana" }
    ]

    const comments = [
        {   author: { uid: 413, name: "Victor" },
            content: "Eu gosto de jogar minecraft e o HexagonDark é muito ruim. Olha como eu escrevo textos e como o négócio fica maior conforme o mundão gira.",
            tags: [],
            likes: 25, dislikes: 2,
            children: [
                {   author: { uid: 413, name: "Camilo Borges" },
                    content: "Negócios legais, mas nem tanto.",
                    tags: [],
                    likes: 25, dislikes: 2,
                    children: [
                        {   author: { uid: 413, name: "Doido" },
                            content: "Negócios legais, mas nem tanto.",
                            tags: [],
                            likes: 25, dislikes: 2,
                            children: []
                        }
                    ]
                },

                {   author: { uid: 413, name: "Camilo Borges" },
                    content: "Negócios legais, mas nem tanto.",
                    tags: [],
                    likes: 25, dislikes: 2,
                    children: [
                        {   author: { uid: 413, name: "AAAAAAAA" },
                            content: "# Negócios legais \n mas nem tanto.",
                            tags: [],
                            likes: 25, dislikes: 2,
                            children: []
                        }
                    ]
                },
            ]
        },
        
        {   author: { uid: 413, name: "HollowKnight" },
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis temporibus aliquam dolor minus dolore, perspiciatis ipsum odit expedita qui, delectus aperiam alias commodi. Eos, quis temporibus porro iusto facilis molestiae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis temporibus aliquam dolor minus dolore, perspiciatis ipsum odit expedita qui, delectus aperiam alias commodi. Eos, quis temporibus porro iusto facilis molestiae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis temporibus aliquam dolor minus dolore, perspiciatis ipsum odit expedita qui, delectus aperiam alias commodi. Eos, quis temporibus porro iusto facilis molestiae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis temporibus aliquam dolor minus dolore, perspiciatis ipsum odit expedita qui, delectus aperiam alias commodi. Eos, quis temporibus porro iusto facilis molestiae?",
            tags: [],
            likes: 25, dislikes: 2,
            children: []
        },
        
        {   author: { uid: 413, name: "Camilo Borges" },
            content: "Negócios legais, mas nem tanto.",
            tags: [],
            likes: 25, dislikes: 2,
            children: []
        },
    ];

    return (
        <div className="page_body">
            <NavigationBar uid={413} name="Victor"/>
            <main>
                <article>
                    <header>
                        <div id="timestamp"> <span> Publicado: 18 de jun. de 2026, 13:13 BRT </span> </div>

                        <h1> Um Título Muito Chamativo!!! </h1>

                        <h2 id="description"> Uma Descrisão melhor ainda. </h2>
                        
                        <ul className="tags"> 
                            {news_tags.map( (tag) => (
                                <li key={tag.tid}> <Tag tag={tag} /> </li>
                            ))}
                        </ul>

                        <UserPreview uid={25} name="Autor" />

                        <img id="cover" src="https://image.api.playstation.com/vulcan/ap/rnd/202601/1505/91d47e238a9e2cb5f33e10e4b54c911b4beaafcad3e14a9e.png?w=440" alt="" />
                    </header>

                    <div id="content">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint minima delectus natus voluptatem rerum illo facere enim sapiente nesciunt? Beatae enim fuga accusamus doloremque exercitationem a rerum, quae qui debitis. </p>

                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint minima delectus natus voluptatem rerum illo facere enim sapiente nesciunt? Beatae enim fuga accusamus doloremque exercitationem a rerum, quae qui debitis. </p>

                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint minima delectus natus voluptatem rerum illo facere enim sapiente nesciunt? Beatae enim fuga accusamus doloremque exercitationem a rerum, quae qui debitis. </p>
                    </div>

                    <hr />

                    <div className="comments">
                        <h2> Comentários </h2>

                        <MarkdownInputField placeholder="Escreva um comentário..." />

                        {comments.map( (comment, index) => (
                            <Comment key={index} comment={comment} level={0} />
                        ))}
                    </div>
                </article>


                <aside>
                    <h3> Leia Também </h3>
                </aside>
            </main>
        </div>
    );
}