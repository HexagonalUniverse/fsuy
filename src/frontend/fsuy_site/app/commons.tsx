/**            -----------------------------------
 * @file       frontend/fsuy_site/app/commons.tsx
 * @brief      Common system types and functions.
 * @date       06-2026
 */

// "use client";

import DOMPurify from "dompurify";
import { marked } from "marked";

// The site's base url defined on the next's enviroment.
export const base_url = process.env.NEXT_PUBLIC_SITE_URL;

// Paramenters for dynamic routed pages
export interface DynamicEntityPageParams {
	params: Promise<{id: string}>
}

/*  Errors / Exceptions
    =================== */

export class APIError extends Error {
    message: string;

    constructor(_message: string) {
        super(_message);
        this.message = "APIError: " + _message;
    }
}

export class ParsingError extends Error {
    message: string;

    constructor(_message: string = "") {
        super(_message);
        this.message = "ParsingError: " + _message;
    }
}

/*  Utilities
    ========= */

export function format_date_time(dat_time_str: string): string {
    const date = new Date(dat_time_str);
    return date.toLocaleDateString("pt-BR", {hour: "2-digit", minute: "2-digit"});
}

export async function api_get_entity<Entity>(entity_endponit: string, id:string): Promise<Entity> {
    const api_url: string = `https://fsuy-server-u68qf.ondigitalocean.app/api/${entity_endponit}/${id}/`

    const res: Response = await fetch(api_url);
    
    if (!res.ok) 
        throw new APIError("Couldn't fetch entity.");
    
    const entity: Entity = await res.json();
    
    if (!entity)
        throw new ParsingError(`response: ${res}`);

    // console.log(entity);
    return entity;
}


interface Page {
    count: number,
    next: string,
    previous: string,
    results: []
}

export async function api_get_page<Entity>(entity_endponit: string, page: string, preview: boolean = false) : Promise<Entity[]> {
    let api_url: string = `https://fsuy-server-u68qf.ondigitalocean.app/api/${entity_endponit}/?`

    if(page !== "all") {
        api_url = `https://fsuy-server-u68qf.ondigitalocean.app/api/${entity_endponit}/?page=${page}`;
    }
    
    if(preview){
        api_url += `&preview=true`
    }

    const res: Response = await fetch(api_url);

    if (!res.ok) 
        throw new APIError(`Couldn't fetch entity ${entity_endponit}'s page.`);
    
    const res_page: Page = await res.json();
    const entities: Entity[] = res_page.results;
    
    if (!entities)
        throw new ParsingError(`response: ${res}`);

    return entities;
}


export async function api_get_posts<Entity>(entity_endpoint: string, post_endpoint: string, pid: string) : Promise<Entity[]> {
    const api_url: string = `https://fsuy-server-u68qf.ondigitalocean.app/api/${entity_endpoint}/${pid}/${post_endpoint}/`;
    console.log(api_url);
    const res: Response = await fetch(api_url);

    if (!res.ok) 
        throw new APIError(`Couldn't fetch reviews for ${pid}'s page.`);
    
    const res_page: Page = await res.json();
    const reviews: Entity[] = res_page.results;
    
    if (!reviews)
        throw new ParsingError(`response: ${res}`);

    return reviews;
}


export function parse_markdown(md_string: string): string {
    const unsafe_html: string = marked.parse(md_string, {async: false});

    if (typeof window === 'undefined') return unsafe_html;

    const purify = DOMPurify(window);

    return purify.sanitize(
        unsafe_html,
        {
            USE_PROFILES: {
                html: true
            }
        }
    );
}


/*
 *
 *  COISA DE AUTENTICAÇÃO (de API e os krl)
 *  @TODO @victorxavier faz a boa aí depois pra nós
 *
 */

const API_ROOT: string = "http://localhost:4817/";
//const API_ROOT: string = "https://fsuy-server-u68qf.ondigitalocean.app/";


/**
 *  Gets the given cookie in the document~
 */
function get_cookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(";").shift() ?? null;
    }

    return null;
}

/**
 *  Requests logout.
 *  Throws an error upon not ok response. (That may be caused on not authenticated users.)
 */
export async function logout() {
    const response = await fetch(
        API_ROOT + "logout/",
        {
            method:         "POST",
            credentials:    "include",
            headers: {
                "Content-Type":     "application/json",
                "X-CSRFToken":      get_cookie("csrftoken"),
            },
        },
    );


    if (! response.ok) {
        const data = await response.json();
        throw new Error(data.error);
        return;
    }


    console.log("Deslogado");
}


/**
 *  Requests login.
 *  Throws an error upon not ok response.
 *  The cause may be various; check `error` field for details.
 */
export async function login(username: string, password: string): Promise<void> {
    const response = await fetch(
        API_ROOT + "login/",
        {
            method:         "POST",
            credentials:    "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken":  get_cookie("csrftoken"),
            },

            body: JSON.stringify({
                username,
                password,
            }),
        },
    );


    if (! response.ok) {
        const data = await response.json();
        throw new Error(data.error);
    }
}


export interface RegisterResult {
    pass_req: string[];
};


/**
 *  Requests to register (the user).
 *  Throws an error upon not ok response.
 *  The cause may be various; check `error` field for details.
 */
export async function register(
        username:       string,
        email:          string,
        password:       string,
        public_name:    string,
    ) : Promise<RegisterResult> {
     const response = await fetch(
         API_ROOT + "register/",
         {
            method:         "POST",
            credentials:    "include",
            headers: {
                "Content-Type":     "application/json",
                "X-CSRFToken":      get_cookie("csrftoken"),
            },

            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password,
                "public_name": public_name,
            }),
    });

    const data = await response.json();
    console.log("REGISTER DATA:", data);
    
    
    const result: RegisterResult = {
        "pass_req": [],
    };
    
    if (data.password_errors?.length > 0) {
        result.pass_req = data.password_errors;
    }


    if (! response.ok) {
        const error = Error(data.error);
        error.status = response.status;
        error.result = result;

        throw error;
    }

    return result;
}


export async function api_me() {
    const response = await fetch(
        API_ROOT + "api/me/",
        {
            method:         "POST",
            credentials:    "include",
            headers: {
                "Content-Type":     "application/json",
                "X-CSRFToken":      get_cookie("csrftoken"),
            },
        },
    );


    if (! response.ok) {
        throw new Error("Fetch failed");
    }


    const data = await response.json();
    return data;
}


