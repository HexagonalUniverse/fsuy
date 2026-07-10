/**            -----------------------------------
 * @file       frontend/fsuy_site/app/entity_interfaces.tsx
 * @brief      Store's the definitions for the system's entities.
 * @date       06-2026
 */

export interface EntityGame {
	gid: number;
	name: string;
	description: string;
	developer: string;
	publisher: string;
	platforms: EntityPlataform[];
	genres: EntityGenre[];
	launch_date: string;
	portrait: string;
	cover: string;
	logo: string;
	steam_id: number;
}

export interface EntityGamePreview {
	gid: number;
	name: string;
	portrait: string;
}

interface EntityGenre {
	name: string;
}

interface EntityPlataform {
	name: string;
}


export interface EntityNews {
	pid: number;
	title: string;
	author: EntityUser;
	content: string;
	creation_date: string;
	edit_date: string;
	tags: EntityTag[];
	description: string;
	picture: string;
}

export interface EntityNewsPreview {
	pid: number;
	title: string;
	author: EntityUser;
	creation_date: string;
	edit_date: string;
	tags: EntityTag[];
	description: string;
	picture: string;
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
	creation_date: string;
	edit_date: string;
	rate: number;
}


export interface EntityTag {
	tid: number;
	name: string;
	color: string;
}


export interface EntityUser {
	uid: number;
	public_name: string;
	picture: string;
	creation_date: string;
	last_login: string;
	socials: string;
	steam: string;
	discord: string;
}

interface UserPreview {
	uid: number;
	public_name: string;
}

