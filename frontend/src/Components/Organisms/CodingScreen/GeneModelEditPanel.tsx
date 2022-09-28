import React, { useEffect, useState } from "react";
import { Grid, Divider } from "@material-ui/core";
import { BasicModal }         from '../../Atoms/BasicModal'
import { EffectRollForm }     from '../../Molecules/EffectInputForm/EffectRollForm'
import { EffectMoveForm }     from '../../Molecules/EffectInputForm/EffectMoveForm'
import { PositionInputForm }  from '../../Molecules/PositionInputForm'
import { ScaleInputForm }     from '../../Molecules/ScaleInputForm'
import { ColorInputForm }     from '../../Molecules/ColorInputForm'
import { EffectGenerateForm } from '../../Molecules/EffectGenerateForm'
import GeneEffectInterface    from "../../../Utilities/GeneEffects/GeneEffectInterface";
import GeneModelStorage       from '../../../Utilities/GeneModel/GeneModelStorage';
import MeshModel              from '../../../Utilities/Mesh/MeshModel';
import GeneModel              from '../../../Utilities/GeneModel/GeneModel';

/**
 * Summary	: ジェネラティブアート作品を編集するComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
interface Props{
  geneModel               : GeneModel;
  geneModelStorage        : GeneModelStorage;
  meshModel              ?: MeshModel;
  updateGeneModelStorage  : any;
  setReqInstPlayFlg(bool: boolean): void;
}
const GeneModelEditPanel: React.FC<Props> = (props: Props) => {

  const generateEffectPropsInputForm = (geneEffect: GeneEffectInterface) => {
    /**
     * Summary: EffectのIDに応じたコンポーネントを返すメソッド
     */
    if(geneEffect.id == "ROLL"){
      return <EffectRollForm geneEffect = { geneEffect } />
    }else if(geneEffect.id == "MOVE"){
      return <EffectMoveForm geneEffect = { geneEffect } />
    }
  }

  return(

    <Grid container spacing = { 2 }>

      <Grid item xs = { 5 } >

        {/** Property */}
        {/** !!! StateにmeshStorageをセットする本仕様はパフォーマンスの低下を招く懸念がある */}
        <Grid container style = {{ padding: 20 }}>
          <PositionInputForm
            geneModel = { props.geneModel }
            meshModel = { props.meshModel }
            setReqInstPlayFlg = { props.setReqInstPlayFlg }
          />
        </Grid>

        <Grid container style = {{ padding: 20 }}>
          <ScaleInputForm
            geneModel = { props.geneModel }
            meshModel = { props.meshModel }
            setReqInstPlayFlg = { props.setReqInstPlayFlg }
          />
        </Grid>

        <Grid container style = {{ padding: 20 }}>
          <ColorInputForm
            geneModel = { props.geneModel }
            meshModel = { props.meshModel }
            setReqInstPlayFlg = { props.setReqInstPlayFlg }
          />
        </Grid>

      </Grid>

      <Divider orientation="vertical" flexItem />

      {/** Effect */}
      <Grid item xs = { 5 }>
        <Grid container style = {{ padding: 20 }}>

          <Grid container spacing = { 2 }>
            <Grid item xs = { 12 }>
              <span> Effect: </span>
            </Grid>
          </Grid>

          {/** Effectを新規登録するフォーム */}
          <Grid container spacing = { 2 }>
            <Grid item xs = { 12 }>
              <BasicModal
                contents = {
                  <EffectGenerateForm
                    geneModel               = { props.geneModel }
                    updateGeneModelStorage  = { props.updateGeneModelStorage }
                    setReqInstPlayFlg       = { props.setReqInstPlayFlg }
                  />
                }
                buttonTexts = "Add Effect"
              />
            </Grid>
          </Grid>

          {/** 登録されているEffectの一覧および、そのPropsを編集するフォーム */}
          { props.geneModel.effectStorage.storage.map( (geneEffect: any) => (
            <span key = { props.geneModel.id + '_' + geneEffect.id } >
              <span> { geneEffect.id } </span>
              { generateEffectPropsInputForm(geneEffect) }
            </span>
            ))
          }
        </Grid>
      </Grid>

      <Divider style = { { width: '100%' } } />

      <Grid item xs = { 12 }>
        <span> Else: </span>
      </Grid>

  </Grid>

  )
}

export default GeneModelEditPanel