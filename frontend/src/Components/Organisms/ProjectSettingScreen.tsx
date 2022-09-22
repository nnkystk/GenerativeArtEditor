import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { CanvasSizeInputForm } from '../Molecules/CanvasSizeInputForm'
import { BasicModal } from '../Atoms/BasicModal'
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

  // ___ use effect ___ ___ ___ ___ ___

  // ___ event handler ___ ___ ___ ___ ___

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
  }


  return (
    <div>
      
      <Grid container alignItems ="center" spacing = { 2 }>

        <Grid item xs = { 12 }>
          <BasicModal
            contents = {
              <CanvasSizeInputForm
                projectInfo     = { props.projectInfo }
                setProjectInfo  = { props.setProjectInfo }
              />
            }
            buttonTexts = "Canvas size"
          />
        </Grid>

      </Grid>
    </div>
  );

};


export default ProjectSettingScreen
