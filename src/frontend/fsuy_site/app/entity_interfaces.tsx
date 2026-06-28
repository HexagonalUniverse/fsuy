/**            -----------------------------------
 * @file       frontend/fsuy_site/app/entity_interfaces.tsx
 * @brief      Store's the definitions for the system's entities.
 * @date       06-2026
 */

export interface EntityGame {
	gid: number;
	name: string;
	description: string;
	genres: string;
	developer: string;
	publisher: string;
	plataforms: string;
	launch_date: string;
	steam_id: number;
}

export interface EntityComment {
	author: EntityUser;
	content: string;
	likes: number;
	dislikes: number;
	children: EntityComment[];
}

export interface EntityReview {
	author: EntityUser;
	content: string;
	tags: EntityTag[];
	children: EntityComment[];
}

export interface EntityTag {
	tid: number;
	title: string;
}

export interface EntityUser {
	uid: number;
	name: string;
}
