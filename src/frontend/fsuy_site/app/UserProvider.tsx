/**            ---------------------------------------------
 * @file       ...
 * @brief      ...
 * @date       07-2026
 */

"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";


import {
    api_me
    } from "@/app/commons";


export interface UserState {
    authenticated:  boolean;

    uid:            number;
    username:       string;
    public_name:    string;
    picture:        string;
};


const default_user_state: UserState = {
    authenticated:  false,
    uid:            0,
    username:       "",
    public_name:    "",
    picture:        "",
};


export const UserStateContext = createContext<UserState>(default_user_state);


/**
 *  ...
 */
export function UserProvider({ children, }: { children: React.ReactNode; }) {
    const [user_state, set_user_state] = useState<UserState>(default_user_state);

    /**
     *  ...
     */
    async function ctx_update_user_state() {

        try {
            const data = await api_me();

            if (data.authenticated) {
                set_user_state({
                    authenticated:  true,

                    uid:            data.uid,
                    username:       data.username,
                    public_name:    data.public_name,
                    picture:        data.picture,
                });

            } else {
                set_user_state(default_user_state);
                throw new Error("Fetch have failed");
        }

        } catch {
            set_user_state(default_user_state);
        }
    }


    useEffect(() => {
        ctx_update_user_state();//.catch(console.error);
    }, []);


    return (
        <UserStateContext.Provider
            value={user_state}
            >
                {children}
        </UserStateContext.Provider>
    );
}


export function get_user_state(): UserState {
    return useContext(UserStateContext);
}



