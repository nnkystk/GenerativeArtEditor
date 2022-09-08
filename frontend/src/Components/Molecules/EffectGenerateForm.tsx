import React, { useEffect, useState } from "react";
import { Grid, Paper, Tooltip } from "@material-ui/core";
import { AddCircleOutline } from '@mui/icons-material';
import GeneModel from '../../Utilities/GeneModel';
import GeneGenerator from '../../Utilities/GeneGenerator'
import EffectID from '../../Utilities/GlobalVarriables/EffectID'

/**
 * Summary	: ジェネラティブアート作品を編集するComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
interface Props{
  geneModel               : GeneModel;
  updateGeneModelStorage  : any;
  setReqInstPlayFlg(bool: boolean): void;
}

export const EffectGenerateForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');
  const [ generateTargetID, setGenerateTargetID ] = useState<EffectID>('ROLL');

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) }, [ sampleState ] );

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
  };

  const onClickAddEffectButton = () => {
    // Effectを生成・追加
    const effect = GeneGenerator.generateGeneEffect(generateTargetID);
    props.geneModel.effectList.store(effect);
    props.updateGeneModelStorage();
    // 変更を視覚化するために明示的に3D描画を1フレーム分実行
    props.setReqInstPlayFlg(true);
  }

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  return(
    <Tooltip title = "Add Effect">
      <Paper
        variant = "outlined"
        style   = {{ padding: 10, cursor:'pointer' }}
        onClick = { onClickAddEffectButton }
      >
        <AddCircleOutline fontSize = "large" />
      </Paper>
    </Tooltip>
  );
};


export default EffectGenerateForm