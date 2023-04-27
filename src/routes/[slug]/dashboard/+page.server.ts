import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import type { Options, Palette, UserWithoutPassword } from '../../../types/user.js';
import type { adminFormResponse,basicFormResponse } from '../../../types/form.js';
import { updateUserAdminOptions } from "../../../backendUtils.js";
import { authCheck } from '../../../checkAuth.js';
import { redirect, fail } from '@sveltejs/kit';
import { dbConn } from '../../../dbConn.js';




export async function load({fetch}){

    const authResponse = await authCheck(fetch);

    if(!authResponse.checkAuthResult) throw redirect(302,'/login');

    let userMinusPassword:UserWithoutPassword  = authResponse.userMinusPassword;
    console.log("load user",userMinusPassword)

    return {userMinusPassword}
    
}


export const actions:Actions = {
    saveOptions: async({request,fetch,locals}:RequestEvent): Promise<adminFormResponse|ActionFailure<adminFormResponse> | Redirect> =>{
        const adminFormData = await request.formData();
        const layout = adminFormData.get('layout')??'';
        const primary = adminFormData.get('primary')??'';
        const secondary = adminFormData.get('secondary')??'';
        const text = adminFormData.get('text')??'';
        const carousel = adminFormData.get('carousel')? true: false;
        const hero = adminFormData.get('hero')? true: false;
        const heroImage = adminFormData.get('heroImage')??'';
        const message = adminFormData.get('message')??'';



        const authResponse = await authCheck(fetch);

        let authedUser = authResponse.userMinusPassword;

        const options:Options ={
            layout: layout.toString(),
            carousel: carousel,
            hero: hero,
            heroImage: heroImage.toString(),
            message: message.toString()

        }
        const palette:Palette={
            primary: primary.toString(),
            secondary: secondary.toString(),
            text: text.toString(),
        }
        let adminSaveResponse = {
            layout,
            primary,
            secondary,
            text,
            carousel,
            hero,
            message,
            formMessage: '',
            error: false,

        }


        try{

            const collection = await dbConn();
            authedUser.options = options;
            authedUser.palette = palette;
            const updateUserOptions = await updateUserAdminOptions(collection,authedUser);
            //console.log("updatedOptions",updateUserOptions);
            const updateUserOptionsResult = updateUserOptions.ok === 1? true : false;

            if(!updateUserOptionsResult) {
                adminSaveResponse.error = true;
                adminSaveResponse.message = "Error saving choices, please try again shortly!"
            }
            if(updateUserOptionsResult){
                adminSaveResponse.error = false;
                adminSaveResponse.message = "Admin Options Updated Successfully!"
            }   
        }
        finally{
            return adminSaveResponse
        }
        
    },

}

