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
import TDModelSource from "src/GAECore/Source/TDModelSource";
import TDModelSourceStorage from "src/GAECore/Source/TDModelSourceStorage";
import EffectModelSource from "src/GAECore/Source/Effects/EffectModelSource";

/**
 * Summary	: ジェネラティブアート作品を編集するComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
interface Props{
  tdModelSource           : TDModelSource;
  updateTDModelSourceStorage(): void;
}
const TDModelEditPanel: React.FC<Props> = (props: Props) => {

  const generateEffectPropsInputForm = (effectModelSource: EffectModelSource) => {
    /**
     * Summary: EffectのIDに応じたコンポーネントを返すメソッド
     */
    if(effectModelSource.id == "ROLL"){
      return <EffectRollForm
        parameter         = { effectModelSource.parameter }
        updateParentState = { props.updateTDModelSourceStorage }
      />
    }
    else if(effectModelSource.id == "MOVE"){
      return <EffectMoveForm
        parameter         = { effectModelSource.parameter }
        updateParentState = { props.updateTDModelSourceStorage }
      />
    }
     return <span></span>
  }

  return(

    <Grid container spacing = { 2 }>

      <Grid item xs = { 5 } >

        {/** Property */}
        {/** !!! WARN: StateにmeshStorageをセットする本仕様はパフォーマンスの低下を招く懸念がある */}
        <Grid container style = {{ padding: 20 }}>
          <PositionInputForm
            position          = { props.tdModelSource.property.position }
            updateParentState = { props.updateTDModelSourceStorage }
          />
        </Grid>

        <Grid container style = {{ padding: 20 }}>
          <ScaleInputForm
            scale             = { props.tdModelSource.property.scale }
            updateParentState = { props.updateTDModelSourceStorage }
          />
        </Grid>

        {/**
        <Grid container style = {{ padding: 20 }}>
          <ColorInputForm
            color             = { props.tdModelSource.property.color }
            updateParentState = { props.updateTDModelSourceStorage }
          />
        </Grid>
         */}

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
                    tdModelSourceID           = { props.tdModelSource.id }
                    effectModelSourceStorage  = { props.tdModelSource.effectModelSourceStorage }
                    updateParentState         = { props.updateTDModelSourceStorage }
                  />
                }
                buttonTexts = "Add Effect"
              />
            </Grid>
          </Grid>



          {/** 登録されているEffectの一覧および、そのPropsを編集するフォーム */}
          { props.tdModelSource.effectModelSourceStorage.storage.map( (effectModelSource: any) => (
            <span key = { props.tdModelSource.id + '_' + effectModelSource.id } >
              <span> { effectModelSource.id } </span>
              { generateEffectPropsInputForm(effectModelSource) }
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

export default TDModelEditPanel