import { InfoFiles } from './infofile.model';

export class Rutas{
    Index:number;
    FileName:string;
    TypeFile:string;
    Color:string;
    CreateFile:string;
    Icon:string;
    open:boolean;
    isopen:boolean;
    ispdf:string;
    Child:InfoFiles[] = [];

    constructor(){
        
    }
}