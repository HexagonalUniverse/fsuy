/**            -----------------------------------
 * @file       frontend/fsuy_site/app/entity_interfaces.tsx
 * @brief      Store's the definitions for the system's entities.
 * @date       06-2026
 */

export interface EntityGame {
	gid: number;
	name: string;
	genre: string;
	launch_date: string;
}

export interface EntityComment {
	author: string;
	content: string;
	tags: EntityTag[];
	children: EntityComment[];
}

export interface EntityTag {
	title: string;
}

export interface EntityUser {
	uid: number;
	name: string;
}
