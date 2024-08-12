import {diskStorage} from "multer"
export const storageConfig=(folder:string)=> diskStorage({
    destination:`uploads/${folder}`,
    filename:(req,file,cd)=>{
        cd(null,Date.now()+"-"+file.originalname)
    }
    
})