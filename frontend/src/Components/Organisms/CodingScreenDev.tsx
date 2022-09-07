import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { EffectRollForm } from '../Molecules/EffectInputForm/EffectRollForm'
import { PositionInputForm } from '../Molecules/PositionInputForm'
import { ColorInputForm } from '../Molecules/ColorInputForm'
import GeneEffectInterface from "../../Utilities/GeneEffects/GeneEffectInterface";
import GeneModelStorage from "src/Utilities/GeneModelStorage";


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
  setReqInstPlayFlg(bool: boolean): void;
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

  const generateEffectInputForm = (geneEffect: GeneEffectInterface) => {
    /**
     * Summary: EffectのIDに応じたコンポーネントを返すメソッド
     */
    if(geneEffect.id == "ROLL"){
      return <EffectRollForm geneEffect = { geneEffect } />
    }
  }


  return(
    <div>

      <h2> CODING </h2>
      <button onClick = { () => { props.onClickAddModelButton(), props.setReqInstPlayFlg(true) } }> ADD MODEL </button>

        <Grid container spacing = { 2 }>

          { props.geneModelStorage.storage.map( (geneModel) => (
            <Grid key = { geneModel.id }  item sm = { 6 } md = { 4 }  lg = { 3 }>
              <Paper variant="outlined">
                <details>
                  <summary> ID: { geneModel.id }</summary>
                    <div> NAME: { geneModel.name }</div>

                    <PositionInputForm
                      geneModel = { geneModel }
                      setReqInstPlayFlg = { props.setReqInstPlayFlg }
                    />

                    <ColorInputForm
                      geneModel = { geneModel }
                      setReqInstPlayFlg = { props.setReqInstPlayFlg }
                    />

                    { geneModel.effectList.map( (geneEffect: any) => (
                      <li key = { geneModel.id + '_' + geneEffect.id } >
                        <span> Effect: { geneEffect.id } </span>
                        { generateEffectInputForm(geneEffect) }
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