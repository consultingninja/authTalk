import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import type { Options, Palette, UserWithoutPassword } from '../../../types/user.js';
import type { adminFormResponse,basicFormResponse } from '../../../types/form.js';
import { updateUserAdminOptions } from "../../../backendUtils.js";
import { authCheck } from '../../../checkAuth.js';
import { redirect } from '@sveltejs/kit';
import { dbConn } from '../../../dbConn.js';
import {mkdir,writeFile} from 'fs';
import {readdir,rm} from 'fs/promises';
import {join} from 'path'



export async function load({fetch,params,locals}){
    if(!locals.authedUser) throw redirect(302,'/login');
    const requestedUrl = params.slug;

    let userMinusPassword:UserWithoutPassword | undefined = undefined;
    let userFiles:string[] = [];

    try{
        const authResponse = await authCheck(fetch);
        if(authResponse.status > 200) throw redirect(302,'/login');
        if(!authResponse.checkAuthResult) throw redirect(302,'/login')
        userMinusPassword = authResponse.userMinusPassword;
        if(requestedUrl !== userMinusPassword?.URL) throw redirect(302,`/${userMinusPassword?.URL}/dashboard`)

        const directoryToRead = join('static/',userMinusPassword?.URL);

        async function readFilesFromDirectory(directoryPath: string): Promise<string[]> {
          return readdir(directoryPath).then((files) => {
            //console.log('Files in directory:', files);
            return files.map((file) => file.toString());
          }).catch((error) => {
            //console.error('Error reading directory:', error);
            return [];
          });
        }

        userFiles = await readFilesFromDirectory(directoryToRead);
    }
    finally{
        return {userMinusPassword,userFiles}
    }

}

export const actions:Actions = {
    saveOptions: async({request,fetch}:RequestEvent): Promise<adminFormResponse|ActionFailure<adminFormResponse> | Redirect> =>{
        const adminFormData = await request.formData();
        const layout = adminFormData.get('layout')??'';
        const primary = adminFormData.get('primary')??'';
        const secondary = adminFormData.get('secondary')??'';
        const text = adminFormData.get('text')??'';
        const carousel = adminFormData.get('carousel')? true: false;
        const hero = adminFormData.get('hero')? true: false;
        const heroImage = adminFormData.get('heroImage')??'';
        const message = adminFormData.get('message')??'';

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
        let user:UserWithoutPassword;

        try{
            const checkAuthResonse = await authCheck(fetch);
            //console.log("authedUserDash",checkAuthData.data);
            if(!checkAuthResonse.checkAuthResult) throw redirect(302,'/login')

            user = checkAuthResonse.userMinusPassword;
            const collection = await dbConn();
            user.options = options;
            user.palette = palette;
            const updateUserOptions = await updateUserAdminOptions(collection,user);
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
    uploadPicture: async({request,fetch}:RequestEvent): Promise<basicFormResponse|ActionFailure<basicFormResponse> | Redirect> =>{
        const uploadFormData = await request.formData();

        let UploadResponse:basicFormResponse = {
            error: false,
            message: ''
        }

        try{
            const checkAuthResonse = await authCheck(fetch);
            if(!checkAuthResonse.checkAuthResult) throw redirect(302,'/login');

            const user = checkAuthResonse.userMinusPassword;

            const pictureName = uploadFormData.get('pictureName')?? '';
            const pictureData = uploadFormData.get('pictureData')?? '';

            if(!pictureData || !pictureName){
                UploadResponse.error = true;
                UploadResponse.message = "Use preview button to view a file before uploading!"
            }


            if(pictureName && pictureData){
                const stringData = pictureData.toString();
                //console.log("string file",stringData);
                const directoryToSave = join('static/',user.URL);
                const fullSavePath = join(directoryToSave,`/${pictureName.toString()}`);

                // Make the directory if it doesn't exist
                mkdir(directoryToSave, { recursive: true }, (error) => {
                    if (error) {
                    UploadResponse.error = true;
                    UploadResponse.message = "Error saving image! Try again shortly!";
                    //console.error('Error creating directory:', error);
                    } else {
                    // Write the file to the directory
                    writeFile(fullSavePath, stringData, { encoding: 'base64' }, (error) => {
                        if (error) {
                            UploadResponse.error = true;
                            UploadResponse.message = "Space allotted, but error saving image!";
                        //console.error('Error writing file:', error);
                        } else {
                            UploadResponse.error = false;
                            UploadResponse.message = "Image saved!";
                        //console.log('File saved successfully');
                        }
                    });
                    }
                });

            }

            

        }
        finally{
            return UploadResponse
        }

    },
    delete: async({request,fetch}:RequestEvent): Promise<basicFormResponse|ActionFailure<basicFormResponse> | Redirect> =>{

        const deleteFormData = await request.formData();
        const fileToDelte = deleteFormData.get('imageList')?? '';
        //console.log("File to delete:",fileToDelte)
        let deleteFormResponse:basicFormResponse ={
            error: false,
            message: ''
        }

        try{
            const authCheckResults = await authCheck(fetch);
            if(!authCheckResults.checkAuthResult) throw redirect(302,'/login');
            const user = authCheckResults.userMinusPassword;

            const directoryToSave = join('static/',user.URL);
            const fullDeletePath = join(directoryToSave,`/${fileToDelte.toString()}`);
            console.log("Full Delete Path: ",fullDeletePath);

            const deleteResult = await rm(fullDeletePath);

            if(typeof deleteResult !== 'undefined'){
                console.log("Delete result not undefined")
            }
            if(typeof deleteResult === 'undefined'){
                console.log("Delete result === undefined")
            }





        }
        finally{
            return deleteFormResponse
        }
    }
}

