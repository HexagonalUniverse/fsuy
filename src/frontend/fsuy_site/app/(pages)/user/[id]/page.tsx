/**            -----------------------------------
 * @file       frontend/fsuy_site/app/(pages)/user/[uid]/page.tsx
 * @brief      React component for a dynamic routed user's page.
 * @date       06-2026
 */


import { type ReactElement } from "react";
import { notFound } from "next/navigation";

import { DynamicEntityPageParams, APIError, api_get_entity, api_get_page, format_date_time } from "@/app/commons"; 
import { SteamIcon, DiscordIcon } from "@/app/socials"; 
import { NavigationBar } from "@/app/components/NavigationBar";
import { FsuyFooter } from "@/app/components/FsuyFooter";
import { Review } from "@/app/components/Review";
import { EntityReview, EntityUser } from "@/app/entity_interfaces";

import "@/app/styles/pages/user.css";


export default async function ProfilePage({params}: DynamicEntityPageParams): Promise<ReactElement> {

    const {id} = await params;

    let user: EntityUser;

    try {
        user = await api_get_entity<EntityUser>("user", id);
        // reviews = await api_get_page<EntityReview>("");

    } catch(error){
        if(error instanceof APIError)
            notFound();

        throw error;
    }

    return(
        <div className="page_body">
            <NavigationBar user={ user }/>

            <main>
                <div className="main_info">
                    <div className="profile_header">
                        <div className="picture_frame"><img src={user.picture} alt={`User's${user.public_name} profile picutre`} /></div>
                        <div className="header_info">
                            <h1> {user.public_name} </h1>
                        </div>
                    </div>

                    <hr />

                    <div className="socials">
                        { user.steam?
                        <a href={`https://steamcommunity.com/id/${user.steam}`} >
                        <div className="social_link"> 
                            <SteamIcon />
                            <span> { user.steam } </span>
                        </div>
                        </a>
                        : null
                        }

                        { user.discord?
                        <div className="social_link"> 
                            <DiscordIcon />
                            <span> { user.discord } </span>
                        </div>
                        : null
                        }
                    </div>

                    {/* <div className="reviews">
                        <Review />
                    </div> */}
                </div>

                <div className="general_info">
                    <h2> Informações Gerais </h2>

                    <div className="info">
                        <h3>Membro desde:</h3>
                        <span className="creation_date"> {format_date_time(user.creation_date)} </span>

                        <h3>Último Login:</h3>
                        <span className="last_login">  {format_date_time(user.last_login)} </span>

                        <h3>Localização:</h3>
                        <span className="last_login">  * Localização * </span>

                        <h3>Reviews:</h3>
                        <span className="last_login">  * nº de reviews * </span>
                    </div>
                </div>
            </main>

            <FsuyFooter />
        </div>
    );
}