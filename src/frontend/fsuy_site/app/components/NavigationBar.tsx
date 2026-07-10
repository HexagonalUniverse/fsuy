/**            ---------------------------------------------------
 * @file       frontend/fsuy_site/app/components/NavigationBar.tsx
 * @brief      React components for the site's navigation bar.
 * @date       06-2026
 */

"use client";

import { type ReactElement } from "react";

import "@/app/styles/components/NavigationBar.css";
import {
    login,
    logout,
    } from "@/app/commons";

import { type EntityUser } from "@/app/entity_interfaces";
import { UserPreview } from "./UserPreview";

import {
    get_user_state,
    } from "@/app/UserProvider";


interface NavigationBarParams {
    user: EntityUser;
}



function redirect_to_login() {
    window.location.href = "/login/";
}


function logout_and_refresh() {
    logout();
    window.location.reload();
}



export function NavigationBar({user}: NavigationBarParams): ReactElement {
    const user_state = get_user_state();
    console.log(user_state.authenticated);

    return (
        <nav className="navigation_bar">
            <a href="/"> <h1 className="hebert_logo"> FSUY </h1> </a>
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

                <li> <a href={`/user/${user.uid}`}> 
                    <div className="outer_circle"> <img src="/assets/icon_profile_circle.svg" alt="" /> </div>
                    <span> Perfil </span>
                </a> </li>
            </ul>


            <UserPreview user={user}/>


            <div>
                {   user_state.authenticated ?
                    user_state.public_name :
                    "Anônimo"
                }
            </div>


            {   user_state.authenticated ?

                <button onClick={
                        () => (logout_and_refresh())
                    }
                >

                    Sair
                </button>

                :

                <button onClick={
                    () => (redirect_to_login())
                    }
                >

                    Fazer login
                </button>
            }





            {/* <div id="profile"> 
                <div id="picture">  </div>
            </div> */}
        </nav>
    );
}