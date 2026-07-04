/**            -----------------------------------
 * @file       frontend/fsuy_site/app/commons.tsx
 * @brief      Common system types and functions.
 * @date       06-2026
 */

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

export async function api_get_entity<Entity>(entity_endponit: string, id:string): Promise<Entity> {
    const res: Response = await fetch(`https://fsuy-server-u68qf.ondigitalocean.app/api/${entity_endponit}/${id}/`);
    
    const entity: Entity = await res.json();

    if (!res.ok) 
        throw new APIError("Couldn't fetch entity.");
    
    
    if (!entity)
        throw new ParsingError(`response: ${res}`);

    // console.log(entity);
    return entity;
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