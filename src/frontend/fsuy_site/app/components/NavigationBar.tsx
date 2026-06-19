/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/NavigationBar.tsx
 * @brief      React components for the site's naviagtion bar.
 * @date       06-2026
 */

import { type ReactElement } from "react"
import Image from 'next/image'

import "@/app/styles/NavigationBar.css"

import { type EntityUser } from "@/app/entity_interfaces"
import { UserPreview } from "./UserPreview";

export function NavigationBar({uid, name}: EntityUser): ReactElement {
    return (
        <nav className="navigation_bar">
            <a href="/"> <h1> FSUY </h1> </a>
            <ul>
                <li> <a href="/"> 
                    <div className="outer_circle"> <img src="/assets/icon_home.svg" alt="" /> </div>
                    <span> Home </span>
                </a> </li>

                <li> <a href="/games/"> 
                    <div className="outer_circle"> <img src="/assets/icon_controler.svg" alt="" /> </div>
                    <span> Jogos </span>
                </a> </li>

                <li> <a href="/news"> 
                    <div className="outer_circle"> <img src="/assets/icon_news.svg" alt="" /> </div>
                    <span> Notícias </span>
                </a> </li>

                <li> <a href={`/user/${uid}`}> 
                    <div className="outer_circle"> <img src="/assets/icon_profile_circle.svg" alt="" /> </div>
                    <span> Perfil </span>
                </a> </li>
            </ul>

            <UserPreview uid={uid} name={name}/>

            {/* <div id="profile"> 
                <div id="picture">  </div>
            </div> */}
        </nav>
    );
}