import { FileData } from './files.model';


export interface IProfile{
  _id:string,
  name: string,
  jobTitle:string,
  location?:string,
  shortBio:string,
  about:string,
  socialLinks?:{
    github?: string;
    linkedin?: string;
  }
   contactEmail: string;
  profileImage?: FileData;
  cvFile?: FileData;
  isAvailable: boolean;
}
