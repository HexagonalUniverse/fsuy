import { type ReactElement } from "react"

import "../styles/NavigationBar.css"

export function NavigationBar(): ReactElement {
    return (
        <nav className="navigation_bar">
            <h1> <a href="/"> FSUY </a> </h1>
            <ul>
                <li> <a href="/"> Home </a> </li>
                <li> <a href="/"> Perfil </a> </li>
                <li> <a href="/games/"> Jogos </a> </li>
                <li> <a href="/news"> Notícias </a> </li>
            </ul>
        </nav>
    );
}