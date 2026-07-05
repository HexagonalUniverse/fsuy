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
	subtitle: string;
	cover: string;
	timestamp: string;
	author: UserPreview;
	content: string;
	tags: EntityTag[];
}

export interface EntityNewsPreview {
	pid: number;
	title: string;
	cover: string;
	timestamp: string;
	content_preview: string;
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

interface UserPreview {
	uid: number;
	name: string;
}

