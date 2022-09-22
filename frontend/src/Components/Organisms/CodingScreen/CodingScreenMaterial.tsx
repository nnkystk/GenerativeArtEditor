import React, { useEffect, useState } from "react";
import { Grid, Paper, Tooltip, Divider } from "@material-ui/core";
import { AddCircleOutline }   from '@mui/icons-material';
import { BasicModal }         from '../../Atoms/BasicModal'
import { BasicAccordion }     from '../../Atoms/BasicAccordion'
import { EffectRollForm }     from '../../Molecules/EffectInputForm/EffectRollForm'
import { EffectMoveForm }     from '../../Molecules/EffectInputForm/EffectMoveForm'
import { PositionInputForm }  from '../../Molecules/PositionInputForm'
import { ScaleInputForm }     from '../../Molecules/ScaleInputForm'
import { ColorInputForm }     from '../../Molecules/ColorInputForm'
import { EffectGenerateForm } from '../../Molecules/EffectGenerateForm'
import GeneEffectInterface    from "../../../Utilities/GeneEffects/GeneEffectInterface";
import GeneModelStorage       from '../../../Utilities/GeneModel/GeneModelStorage';
import GeneGenerator          from '../../../Utilities/GeneGenerator'
import GeneEffectStorage      from "../../../Utilities/GeneEffects/GeneEffectStorage";
import GeneModel              from '../../../Utilities/GeneModel/GeneModel';

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
  updateGeneModelStorage  : any
  setReqInstPlayFlg(bool: boolean): void;
}

export const CodingScreenMaterial: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) }, [ sampleState ] );

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
  };
  const onClickAddModelButton = () => {
    // Modelを生成・追加
    const mesh      = GeneGenerator.generateMesh();
    const geneModel = GeneGenerator.generateGeneModel(mesh.id, mesh, new GeneEffectStorage() );
    props.geneModelStorage.store(geneModel);
    props.updateGeneModelStorage();
    // 変更を視覚化するために明示的に3D描画を1フレーム分実行
    props.setReqInstPlayFlg(true);
  }

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

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
      <Grid container spacing = { 2 } style = {{ paddingTop: 20 }}>

        {/** Add GeneModel Button */}
        <Grid item xs = { 12 }>
          <Tooltip title = "Add 3DModel">
            <Paper
              variant = "outlined"
              style   = {{ padding: 10, cursor:'pointer' }}
              onClick = { onClickAddModelButton }
            >
              <AddCircleOutline fontSize = "large" />
            </Paper>
          </Tooltip>
        </Grid>

        {/** GeneModel */}
        { props.geneModelStorage.storage.map( (geneModel) => (
          <Grid key = { geneModel.id } item xs = { 12 } sm = { 12 } md = { 12 }  lg = { 12 } xl = { 6 }>

            <BasicAccordion
              label     = { geneModel.id }
              contents  = {
                <GeneModelEditPanel
                  geneModel               = { geneModel}
                  geneModelStorage        = { props.geneModelStorage }
                  updateGeneModelStorage  = { props.updateGeneModelStorage }
                  setReqInstPlayFlg       = { props.setReqInstPlayFlg }
                />
              }
            />
          </Grid>

        ))}
      </Grid>
  );
};


interface PropsGeneModelEditPanel{
  geneModel               : GeneModel;
  geneModelStorage        : GeneModelStorage;
  updateGeneModelStorage  : any;
  setReqInstPlayFlg(bool: boolean): void;
}

const GeneModelEditPanel: React.FC<PropsGeneModelEditPanel> = (props: PropsGeneModelEditPanel) => {

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
        <Grid container style = {{ padding: 20 }}>
          <PositionInputForm
            geneModel = { props.geneModel }
            setReqInstPlayFlg = { props.setReqInstPlayFlg }
          />
        </Grid>

        <Grid container style = {{ padding: 20 }}>
          <ScaleInputForm
            geneModel = { props.geneModel }
            setReqInstPlayFlg = { props.setReqInstPlayFlg }
          />
        </Grid>

        <Grid container style = {{ padding: 20 }}>
          <ColorInputForm
            geneModel = { props.geneModel }
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

export default CodingScreenMaterial