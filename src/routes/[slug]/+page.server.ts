import type { UserWithoutPassword } from '../../types/user.js';
import type { PageParentData } from './$types.js';
import { findUserByUrl } from "../../backendUtils.js";
import { error } from '@sveltejs/kit';
import { dbConn } from '../../dbConn.js';
import {readdir} from 'fs/promises';
import {join} from 'path';


export async function load({parent,params,locals}){
    const layoutData:PageParentData = await parent();
    const urlList = layoutData.URLList;
    const requestedUrl = params.slug;
    const userMinusPassword = locals.authedUser??undefined;
    if(!urlList.includes(requestedUrl)) throw error(404,{code: 404,message:"Not Found"})

    let dbError = {
        hasError: false,
        error: ''
    }

    let displayUser:UserWithoutPassword;
    let userFiles:string[] = [];


    try{
        const collection = await dbConn();
        const tempUser = await findUserByUrl(collection,requestedUrl);
        const {password, ...userWithRemovedPassword} = tempUser;
        displayUser = userWithRemovedPassword;

        const directoryToRead = join('static/',displayUser.URL);

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

        //console.log("from fs promises:", userFiles)
        
    }
    catch(error:any){
       dbError.hasError = true;
       dbError.error = error.message?? 'Error Connecting to DB';
       throw error(500,{code:500,message:""})
    }
    return {requestedUrl,displayUser, userFiles, userMinusPassword}

}