import { type ReactElement } from "react"

import { NavigationBar } from "../../components/NavigationBar"
import { NewsPreview } from "../../components/NewsPreview"

import "../../styles/news.css"

const placeholder_text: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta mauris sed dolor scelerisque, a fermentum metus auctor. Aenean vulputate pharetra nibh. Duis ut semper justo. Nullam massa ex, vulputate id bibendum eget, elementum non nunc. Vestibulum id finibus leo. Proin rhoncus, nisl id commodo porttitor, mi nisi efficitur lorem, vitae lacinia dolor magna id metus. Suspendisse lacinia finibus velit, at luctus quam. Sed magna ligula, tincidunt id aliquam at, ultricies commodo justo. Morbi scelerisque nisi non tellus dapibus, sed venenatis libero fermentum. Vivamus vitae sapien odio. Donec eu sem dapibus, feugiat mi non, vehicula dolor. Curabitur vulputate turpis purus, at imperdiet purus semper sed. Vivamus sollicitudin lectus vel lacus auctor varius. Morbi eu ultrices erat, ac sagittis magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus sit amet libero luctus, ultricies mauris ullamcorper, interdum odio. Pellentesque ac lectus ullamcorper, aliquam nisi auctor, facilisis enim. Pellentesque elit risus, congue nec aliquam vehicula, iaculis nec leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Aliquam a diam tortor. Ut tempus urna vitae aliquet tincidunt."

export default function NewsPage() {
    return (
        <main>
            <NavigationBar />

            <h2 id="news_upper_title"> Úlitmas Notícias </h2>

            <div className="news_display">
                <NewsPreview 
                    title="Minecraft é muito Bom!!!" 
                    abstract={placeholder_text} 
                    date="01/03/2026"
                    cover="https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg"
                />

                <NewsPreview 
                    title="Simón Bolívar" 
                    abstract={placeholder_text}
                    date="08/06/2026"
                    cover="https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000013704/918c0badde3aeba760e2185f382a2402248a1292322cf540fd8d098eeb292e1e"
                />

                <NewsPreview 
                    title="Hey, Listen!" 
                    abstract={placeholder_text}
                    date="15/08/2026"
                    cover="https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch2/70010000096817/cfe9f8d674be958326d3ba11fc7598a4383e5c5d7809b6239ccac0783aac6cd8"
                />

                <NewsPreview 
                    title="Absolute Greedy" 
                    abstract={placeholder_text}
                    date="25/12/2026"
                    cover="https://image.api.playstation.com/vulcan/ap/rnd/202601/1505/91d47e238a9e2cb5f33e10e4b54c911b4beaafcad3e14a9e.png?w=440"
                    />

                <NewsPreview 
                    title="Jogar videojogos afeta sua cognição?" 
                    abstract={placeholder_text}
                    date="31/12/2026"
                    cover="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/46db/live/38b551a0-eee2-11ed-a142-ab0e42bfd9c3.jpg.webp"
                />
            </div>
        </main>
    )
}