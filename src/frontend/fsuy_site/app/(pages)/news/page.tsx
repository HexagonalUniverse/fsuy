/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/news/page.tsx
 * @brief      React component for the news' home page.
 * @date       06-2026
 */


import { type ReactElement } from "react";

import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";
import { NewsPreview } from "@/app/components/NewsPreview";
import { NewsCarousel } from "@/app/components/NewsCarousel";
import { EntityNews, EntityNewsPreview } from "@/app/entity_interfaces";

import "@/app/styles/pages/news_home.css";

const placeholder_text: string = "\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta mauris sed dolor scelerisque, a fermentum metus auctor. Aenean vulputate pharetra nibh. Duis ut semper justo. Nullam massa ex, vulputate id bibendum eget, elementum non nunc. Vestibulum id finibus leo. Proin rhoncus, nisl id commodo porttitor, mi nisi efficitur lorem, vitae lacinia dolor magna id metus. Suspendisse lacinia finibus velit, at luctus quam. Sed magna ligula, tincidunt id aliquam at, ultricies commodo justo. Morbi scelerisque nisi non tellus dapibus, sed venenatis libero fermentum. Vivamus vitae sapien odio. Donec eu sem dapibus, feugiat mi non, vehicula dolor. Curabitur vulputate turpis purus, at imperdiet purus semper sed. Vivamus sollicitudin lectus vel lacus auctor varius. Morbi eu ultrices erat, ac sagittis magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus sit amet libero luctus, ultricies mauris ullamcorper, interdum odio. Pellentesque ac lectus ullamcorper, aliquam nisi auctor, facilisis enim. Pellentesque elit risus, congue nec aliquam vehicula, iaculis nec leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Aliquam a diam tortor. Ut tempus urna vitae aliquet tincidunt."

export default function NewsHomePage(): ReactElement {
    const mocked_news: EntityNewsPreview[] = [
        {
            pid: 1,
            title: "Minecraft é muito Bom!!!",
            content_preview: placeholder_text,
            timestamp: "01/03/2026",
            cover: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg",
        },
        {
            pid: 2,
            title: "Simón Bolívar",
            content_preview: placeholder_text,
            timestamp: "08/06/2026",
            cover: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000013704/918c0badde3aeba760e2185f382a2402248a1292322cf540fd8d098eeb292e1e",
        },
        {
            pid: 3,
            title: "Hey, Listen!",
            content_preview: placeholder_text,
            timestamp: "15/08/2026",
            cover: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch2/70010000096817/cfe9f8d674be958326d3ba11fc7598a4383e5c5d7809b6239ccac0783aac6cd8",
        },
        {
            pid: 4,
            title: "Absolute Greedy",
            content_preview: placeholder_text,
            timestamp: "25/12/2026",
            cover: "https://image.api.playstation.com/vulcan/ap/rnd/202601/1505/91d47e238a9e2cb5f33e10e4b54c911b4beaafcad3e14a9e.png?w=440",
        },
        {
            pid: 5,
            title: "Jogar videojogos afeta sua cognição?",
            content_preview: placeholder_text,
            timestamp: "31/12/2026",
            cover: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/46db/live/38b551a0-eee2-11ed-a142-ab0e42bfd9c3.jpg.webp",
        },
        {
            pid: 6,
            title: "Notícia Notícia Notícia Notícia Notícia",
            cover: "https://gifdb.com/images/branded/high/club-penguin-breakdance-pyg7t6tydmr0105b.gif",
            timestamp: "26/04/2026",
            content_preview: "UAAAAAAAAAAAAAAAAAAAAAAAUUUUUUU!!!!",
        },
    ]

    return (
        <div className="page_body">
            <NavigationBar user={ {uid: 413, name: "Victor"} }/>
            
            <main>
                <h2 id="news_upper_title"> Destaques </h2>

                <div >
                    <NewsCarousel carousel_news={mocked_news} frame_interval={6000}/>
                </div>

                <h2 id="news_upper_title"> Úlitmas Notícias </h2>

                <div className="news_display">
                {
                    mocked_news.map((news, i) => (
                        <NewsPreview news={news} key={i}/>
                    ))
                }
                </div>

                <h2 id="news_upper_title"> Veja também </h2>

            </main>

            <FsuyFooter />
        </div>
    )
}