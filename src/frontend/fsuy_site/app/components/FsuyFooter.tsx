/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/FsuyFooter.tsx
 * @brief      A footer component for displaying fsuy's info.
 * @date       07-2026
 */

import { type ReactElement } from "react";
import { GitHubIcon } from "@/app/socials"

import "@/app/styles/components/FsuyFooter.css";


export function FsuyFooter(): ReactElement {
    return (
        <footer className="fsuy_footer">
            <div className="about">
                <a href="/"> <h1> FSUY </h1> </a>
                <a href="https://github.com/HexagonalUniverse/fsuy" target="_blank">
                <div className="social_media_link"> <GitHubIcon /> </div>
                </a>
            </div>

            <div className="explore">
                <h2> Explorar </h2>
                <ul>
                    <a href="/"> <li> Home </li> </a>
                    <a href="/games"> <li> Jogos </li> </a>
                    <a href="/news"> <li> Notícias </li> </a>
                    <a href="/"> <li> Perfil </li> </a>
                </ul>
            </div>

            <div className="authors">
                <h2> Desenvolvido por: </h2>

                <a href="https://github.com/HexagonalUniverse" target="_blank">
                <div className="social_media_link complete">
                    <GitHubIcon />
                    HexagonalUniverse
                </div>
                </a>

                <a href="https://github.com/victorxaviercosta" target="_blank">
                <div className="social_media_link complete">
                    <GitHubIcon />
                    Victor Xavier Costa
                </div>
                </a>
            </div>
        </footer>
    );
}