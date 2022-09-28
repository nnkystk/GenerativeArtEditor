import React, { useEffect, useState } from "react";
import { Grid, Paper, Tooltip, Divider } from "@material-ui/core";
import { AddCircleOutline }   from '@mui/icons-material';
import { BasicAccordion }     from '../../Atoms/BasicAccordion'
import { EffectRollForm }     from '../../Molecules/EffectInputForm/EffectRollForm';
import { EffectMoveForm }     from '../../Molecules/EffectInputForm/EffectMoveForm';
import GeneModelEditPanel     from './GeneModelEditPanel';
import GeneEffectInterface    from "../../../Utilities/GeneEffects/GeneEffectInterface";
import GeneModelStorage       from '../../../Utilities/GeneModel/GeneModelStorage';
import MeshStorage            from '../../../Utilities/Mesh/MeshStorage';
import MeshModel              from '../../../Utilities/Mesh/MeshModel';
import GeneGenerator          from '../../../Utilities/GeneGenerator';
import GeneEffectStorage      from "../../../Utilities/GeneEffects/GeneEffectStorage";


/**
 * Summary	: ジェネラティブアート作品を編集するComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
interface Props{
  sampleProp             ?: any;
  geneModelStorage        : GeneModelStorage;
  meshStorage             : MeshStorage;
  updateGeneModelStorage(): void;
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

    const meshModel = new MeshModel(mesh.id, mesh);
    props.meshStorage.store(meshModel);

    const effectStorage = new GeneEffectStorage();

    const geneModel = GeneGenerator.generateGeneModel(mesh.id, effectStorage);
    props.geneModelStorage.store(geneModel);
    props.updateGeneModelStorage();

    // 変更を視覚化するために明示的に3D描画を1フレーム分実行
    props.setReqInstPlayFlg(true);
  }

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
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
          <Grid key = { geneModel.id } item xs = { 12 } xl = { 6 }>

            <BasicAccordion
              label     = { geneModel.id }
              contents  = {
                <GeneModelEditPanel
                  geneModel               = { geneModel}
                  geneModelStorage        = { props.geneModelStorage }
                  meshModel               = { props.meshStorage.getMeshById(geneModel.id) }
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

export default CodingScreenMaterial