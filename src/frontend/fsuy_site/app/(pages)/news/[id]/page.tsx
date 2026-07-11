/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/news/[pid]
 * @brief      React component for a dynamic routed news' page.
 * @date       06-2026
 */

import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { DynamicEntityPageParams, APIError, api_get_entity, api_get_posts, format_date_time, parse_markdown } from "@/app/commons";

import { EntityComment, EntityNews, EntityNewsPreview, EntityTag } from "@/app/entity_interfaces";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";
import { UserPreview } from "@/app/components/UserPreview";
import { NewsPreview, NewsPreview2 } from "@/app/components/NewsPreview";
import { Comment } from "@/app/components/Comment";
import { Tag } from "@/app/components/Tag";
import { MarkdownInputField } from "@/app/components/MarkdownInputField";

import "@/app/styles/pages/news.css";

export default async function NewsPage({params}: DynamicEntityPageParams): Promise<ReactElement> {
    
    const {id} = await params;
    
    let news: EntityNews;
    let comments: EntityComment[];
    
    try {
        news = await api_get_entity<EntityNews>("news", id);
        comments = await api_get_posts<EntityComment>("news", "comments", id);
        // news = await api_get_page<EntityNewsPreview>("news", "all", true);

    } catch(error){
        if(error instanceof APIError)
            notFound();

        throw error;
    }

    return (
        <div className="page_body">
            <NavigationBar />
            <main>
                <article>
                    <header>
                        <div id="timestamp"> <span> Publicado: {format_date_time(news.creation_date)} BTR </span> </div>

                        <h1> {news.title} </h1>

                        <h2 id="description"> {news.description} </h2>
                        
                        <ul className="tags"> 
                            {news.tags?.map( (tag, index) => (
                                <li key={index}> <Tag tag={tag} /> </li>
                            ))}
                        </ul>

                        <UserPreview user={news.author} />

                        <img id="cover" src={news.picture} alt={`news picture for ${news.pid}`} />
                    </header>

                    <div id="content" dangerouslySetInnerHTML={{ __html: parse_markdown(news.content) }} />

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

                    {/* {related_news?.map( (rnews, index) => (
                        <NewsPreview2 key={index} news={rnews} />
                    ))} */}
                </aside>
            </main>

            <FsuyFooter />
        </div>
    );
}