import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { EffectRollForm } from '../Molecules/EffectInputForm/EffectRollForm'
import { PositionInputForm } from '../Molecules/PositionInputForm'
import GeneModel from '../../Utilities/GeneModel'
import GeneEffectInterface from "../../Utilities/GeneEffects/GeneEffectInterface";
import GeneModelStorage from "src/Utilities/GeneModelStorage";
import { positions } from "@mui/system";


/**
 * Summary	: ジェネラティブアート作品を編集するComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
interface Props{
  sampleProp             ?: any
  geneModelStorage        : GeneModelStorage
  updateGeneModelStotage  : any
  onClickAddModelButton   : any
}
type Vector = {
  x: number, y: number, z: number
}


export const CodingScreenDev: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) }, [ sampleState ] );

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
  };

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  const getEffectInputForm = (geneModelID: number, geneEffect: GeneEffectInterface) => {
    if(geneEffect.id == "ROLL"){
      return <EffectRollForm
        geneModelStorage  = { props.geneModelStorage }
        geneModelID       = { geneModelID }
        geneEffect        = { geneEffect }
      />
    }
  }


  return(
    <div>

      <h2> CODING </h2>
      <button onClick = { props.onClickAddModelButton }> ADD MODEL </button>

        <Grid container spacing = { 2 }>

          { props.geneModelStorage.storage.map( (geneModel) => (
            <Grid item xs = { 12 } key = { geneModel.id }>
              <Paper variant="outlined">
                <details>
                  <summary> ID: { geneModel.id }</summary>
                    <div> NAME: { geneModel.name }</div>

                    <PositionInputForm
                      geneModelStorage  = { props.geneModelStorage }
                      geneModel         = { geneModel }
                    />

                    { geneModel.effectList.map( (geneEffect: any) => (
                      <li key = { geneModel.id + '_' + geneEffect.id } >
                        <span> Effect: { geneEffect.id } </span>
                        { getEffectInputForm(geneModel.id, geneEffect) }
                      </li>
                      ))
                    }

                </details>
              </Paper>
            </Grid>

          ))}
        </Grid>
    </div>
  );
};


export default CodingScreenDev