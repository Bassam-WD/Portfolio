import { FileData } from './files.model';

export interface IProject {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  techStack?: string[];
  coverImage: FileData;
  liveUrl?: string;
  githubUrl?: string;
  isPublished: boolean;
  inHome: boolean;
}
