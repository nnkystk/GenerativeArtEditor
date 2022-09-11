import React, { useEffect, useState, useRef } from "react";
import { Grid, TextField } from "@material-ui/core";
import CanvasSize from '../../Utilities/GlobalVarriables/CanvasSize'
import ProjectInfo from '../../Utilities/ProjectInfo'

interface Props {
  projectInfo     : ProjectInfo
  setProjectInfo(pi: ProjectInfo): void 
}

export const ProjectSettingScreen: React.FC<Props> = (props: Props) => {
/**
 * Summary: 
 */

  // ___ state ___ ___ ___ ___ ___
  const [ canvasSizeWidth, setCanvasSizeWidth ] = useState<number>(props.projectInfo.canvasSize.width);
  const [ canvasSizeHeight, setCanvasSizeHeight ] = useState<number>(props.projectInfo.canvasSize.height);

  // ___ use effect ___ ___ ___ ___ ___

  // ___ event handler ___ ___ ___ ___ ___
  const handleChangeCanvasSizeWidth = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    setCanvasSizeWidth(newVal);
  }
  const handleChangeCanvasSizeHeight = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.valueAsNumber? event.target.valueAsNumber: 0;
    setCanvasSizeHeight(newVal);
  }
  const onClickConfirmCanvasSize = () => {
    const _projectInfo = { ...props.projectInfo };
    _projectInfo.canvasSize.width   = canvasSizeWidth;
    _projectInfo.canvasSize.height  = canvasSizeHeight;
    props.setProjectInfo(_projectInfo);
  }

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
  }


  return (
    <div>
      
      <Grid container alignItems ="center" spacing = { 2 }>

        <Grid item xs = { 5 }>
          
          <TextField
            variant   = "outlined"
            type      = "number"
            label     = "Width"
            value     = { canvasSizeWidth }
            onChange  = { handleChangeCanvasSizeWidth }
            size      = "small"
            inputProps = {{
              step: "10"
            }}
            InputLabelProps = {{
              shrink: true,
            }}
          />

          <TextField
            variant   = "outlined"
            type      = "number"
            label     = "Width"
            value     = { canvasSizeHeight }
            onChange  = { handleChangeCanvasSizeHeight }
            size      = "small"
            inputProps = {{
              step: "10"
            }}
            InputLabelProps = {{
              shrink: true,
            }}
          />

          <button onClick = { onClickConfirmCanvasSize }> Confirm </button>
        </Grid>
      </Grid>
    </div>
  );

};


export default ProjectSettingScreen
