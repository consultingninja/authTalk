
import type { UserWithoutPassword } from "./types/user";
import type { Writable } from "svelte/store";
import { writable} from "svelte/store";



export const showModal:Writable<boolean> = writable(false);


export const authToken:Writable<string|undefined> = writable(undefined);

export const user:Writable<UserWithoutPassword|undefined> = writable(undefined);
export const displayUser:Writable<UserWithoutPassword|undefined> = writable(undefined);

export const layout:Writable<string> = writable('top');

export const carousel:Writable<boolean> = writable(false);
export const hero:Writable<boolean> = writable(false);
export const message:Writable<string> = writable('');

export const primaryColor:Writable<string> = writable('#242424');
export const secondaryColor:Writable<string> = writable('#FFFFFF');
export const textColor:Writable<string> = writable('#FFFFFF');


