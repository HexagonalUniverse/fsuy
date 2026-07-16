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
    write_post_comment,
    write_review,
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



export function NavigationBar(): ReactElement {
    const user_state = get_user_state();
    // console.log(user_state.authenticated);

    return (
        <nav className="navigation_bar">
            <a href="/"> <h1 className="hebert_logo"> FSUY </h1> </a>
            <ul>
                <li> <a href="/"> 
                    <div className="outer_circle"> <img src="/assets/icon_home.svg" alt="icon_home" /> </div>
                    <span> Home </span>
                </a> </li>

                <li> <a href="/games/"> 
                    <div className="outer_circle"> <img src="/assets/icon_controler.svg" alt="icon_controler" /> </div>
                    <span> Jogos </span>
                </a> </li>

                <li> <a href="/news"> 
                    <div className="outer_circle"> <img src="/assets/icon_news.svg" alt="icon_news" /> </div>
                    <span> Notícias </span>
                </a> </li>
            </ul>

            {/* <UserPreview user={user}/> */}


            <div className="login_logout">
                <a href={`/user/${user_state.uid}`}> 
                    <div className="outer_circle"> 
                        { user_state.authenticated?
                        <img className="profile_picture" src={`${user_state.picture}`} alt={`${user_state.public_name}'s profile picture`} /> 
                        :
                        <img src="/assets/icon_profile_circle.svg" alt="icon_profile_circle" /> 
                        }
                    </div>
                    <span> { user_state.authenticated? `${user_state.public_name}` : "Perfil" } </span>
                </a>

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
            </div>
        </nav>
    );
}