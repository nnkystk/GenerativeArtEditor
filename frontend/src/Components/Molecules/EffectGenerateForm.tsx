import React, { useEffect, useState } from "react";
import { Grid, Paper, Tooltip, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { AddCircleOutline } from '@mui/icons-material';
import GeneModel from '../../Utilities/GeneModel/GeneModel';
import GeneGenerator from '../../Utilities/GeneGenerator'
import { EffectID } from '../../Utilities/GlobalVarriables/EffectCatalog'
import { EFFECT_CATALOG } from '../../Utilities/GlobalVarriables/EffectCatalog'

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
    <div>
  
      <Grid container>

        <Grid item xs={10}>

          <FormControl fullWidth>
            <InputLabel>Effect To Add</InputLabel>
            {/** @ts-ignore */}
            <Select value = { generateTargetID } label = "Effect" onChange={ (event: React.ChangeEvent<HTMLInputElement>) => { setGenerateTargetID(event.target.value) } }>
              { EFFECT_CATALOG.map( (obj) => {
                return(
                  <MenuItem key = { props.geneModel.id + obj.id } value = { obj.id }> { obj.id } </MenuItem>
                )
              })}

            </Select>
          </FormControl>

        </Grid>

        <Grid item xs={2}>
          <Tooltip title = "Add Effect" style={{}}>
            <AddCircleOutline
              style     = {{ cursor:'pointer' }}
              onClick   = { onClickAddEffectButton }
              fontSize  = "large"
            />
          </Tooltip>
        </Grid>

      </Grid>

    </div>
  );
};


export default EffectGenerateForm