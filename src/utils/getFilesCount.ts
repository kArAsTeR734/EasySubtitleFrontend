import type {FileData} from "../api/types/api-types.ts";

function getFilesCount(files:FileData[]){
  return files.length == 0;
}

export default getFilesCount;