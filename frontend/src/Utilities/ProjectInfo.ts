import CanvasSize from "./GlobalVarriables/CanvasSize";

export class ProjectInfo{
  
  projectName : string;
  canvasSize  : CanvasSize;

  constructor(projectName?: string, canvasSize?: CanvasSize){
    this.projectName  = projectName? projectName: "NoName";
    this.canvasSize   = canvasSize? canvasSize: { width: 960, height: 540 };
  }

}

export default ProjectInfo