import React, { useEffect, useState } from "react";
import { Grid, Paper, Tooltip, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { AddCircleOutline } from '@mui/icons-material';
import GeneGenerator from '../../Utilities/GeneGenerator'
import { EffectID } from '../../Utilities/GlobalVarriables/EffectCatalog'
import { EFFECT_CATALOG } from '../../Utilities/GlobalVarriables/EffectCatalog'
import TDModelSource from "src/GAECore/Source/TDModelSource";
import EffectModelSourceStorage from "../../GAECore/Source/EffectModelSourceStorage";
import SourceGenerator from '../../GAECore/Source/SourceGenerator';

/**
 * Summary	: ジェネラティブアート作品を編集するComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
interface Props{
  tdModelSourceID         : number;
  effectModelSourceStorage: EffectModelSourceStorage;
  updateParentState(...args: any) : void;
}

export const EffectGenerateForm: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ targetIDToGenerate, setTargetIDToGenerate ] = useState<EffectID>('ROLL');   // 新規追加するEffectのID

  // ___ use effect ___ ___ ___ ___ ___

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
  };

  const onClickAddEffectButton = () => {
    // 指定されたEffectを生成・追加
    const effectModelSource = SourceGenerator.generateEffectModelSource(targetIDToGenerate);
    props.effectModelSourceStorage.store(effectModelSource);
    props.updateParentState();
  }

  // ___ method ___ ___ ___ ___ ___
  const test = () => {
    console.log('test');
  }

  return(
    <div>
  
      <Grid container>

        <Grid item xs = { 12 }>

          <FormControl fullWidth>
            <InputLabel>Effect To Add</InputLabel>

            {/** @ts-ignore */}
            <Select value = { targetIDToGenerate } label = "Effect" onChange = { (event: React.ChangeEvent<HTMLInputElement>) => { setTargetIDToGenerate(event.target.value) } }>
              { EFFECT_CATALOG.map( (effect) => {
                return(
                  <MenuItem key = { props.tdModelSourceID + effect.id } value = { effect.id }>
                    { effect.id }
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

        </Grid>

      </Grid>
      
      <Grid container direction = "row-reverse" justifyContent = "flex-start" alignItems = "center">
        <button onClick = { onClickAddEffectButton }> Confirm </button>
      </Grid>

    </div>
  );
};


export default EffectGenerateForm