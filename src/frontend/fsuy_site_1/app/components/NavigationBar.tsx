import { type ReactElement } from "react"

import "../styles/NavigationBar.css"

export function NavigationBar(): ReactElement {
    return (
        <nav className="navigation_bar">
            <h1> <a href="/"> FSUY </a> </h1>
            <ul>
                <li> <a href="/"> Home </a> </li>
                <li> <a href="/"> Perfil </a> </li>
                <li> <a href="/game/413"> Jogos </a> </li>
                <li> <a href="/news"> Notícias </a> </li>
            </ul>
        </nav>
    );
}