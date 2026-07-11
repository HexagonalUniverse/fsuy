/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/news/page.tsx
 * @brief      React component for the news' home page.
 * @date       06-2026
 */


import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { APIError } from "@/app/commons";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";
import { NewsPreview } from "@/app/components/NewsPreview";
import { NewsCarousel } from "@/app/components/NewsCarousel";
import { EntityNewsPreview } from "@/app/entity_interfaces";

import "@/app/styles/pages/news_home.css";
import { api_get_page } from "@/app/commons";

export default async function NewsHomePage(): Promise<ReactElement> {
        
    let news: EntityNewsPreview[];
    
    try {
        news = await api_get_page<EntityNewsPreview>("news", "all", true);

    } catch(error){
        if(error instanceof APIError)
            notFound();

        throw error;
    }

    return (
        <div className="page_body">
            <NavigationBar />
            
            <main>
                <h2 id="news_upper_title"> Destaques </h2>

                <div >
                    <NewsCarousel carousel_news={news} frame_interval={6000}/>
                </div>

                <h2 id="news_upper_title"> Úlitmas Notícias </h2>

                <div className="news_display">
                {
                    news.map((_news, i) => (
                        <NewsPreview news={_news} key={i}/>
                    ))
                }
                </div>

                <h2 id="news_upper_title"> Veja também </h2>

                <h3 style={{ alignSelf: 'center' }}> . . . </h3>

            </main>

            <FsuyFooter />
        </div>
    )
}