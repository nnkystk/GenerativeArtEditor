import React, { useEffect, useState } from "react";
import { Grid, Paper, Tooltip, Divider } from "@material-ui/core";
import { AddCircleOutline }   from '@mui/icons-material';
import { BasicAccordion }     from '../../Atoms/BasicAccordion'
import TDModelEditPanel     from './TDModelEditPanel';
import TDModelSourceStorage from '../../../GAECore/Source/TDModelSourceStorage'
import TDModelSource from '../../../GAECore/Source/TDModelSource'

/**
 * Summary	: ジェネラティブアート作品を編集するComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
interface Props{
  sampleProp             ?: any;
  tdModelSourceStorage    : TDModelSourceStorage;
  updateTDModelSourceStorage(): void;
}

export const CodingScreenMaterial: React.FC<Props> = (props: Props) => {

  // ___ state ___ ___ ___ ___ ___
  const [ sampleState, setSampleState ] = useState<string>('This is SampleState');
  const [ count, setCount ] = useState<number>(1);  // !!! 仮 !!!

  // ___ use effect ___ ___ ___ ___ ___
  useEffect( () => { console.log(sampleState) }, [ sampleState ] );

  // ___ event handler ___ ___ ___ ___ ___
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
  };
  const onClickAddModelButton = () => {
    
    // Modelを生成・追加
    const newTDModelSource = new TDModelSource(count);    // !!! 仮 !!!
    props.tdModelSourceStorage.store(newTDModelSource);

    // UIを更新
    props.updateTDModelSourceStorage();

    setCount((count) => { return count + 1});
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

        {/** TDModel */}
        { props.tdModelSourceStorage.storage.map( (tdModelSource) => (
          <Grid key = { tdModelSource.id } item xs = { 12 } xl = { 6 }>

            <BasicAccordion
              label     = { tdModelSource.id }
              contents  = {
                <TDModelEditPanel
                  tdModelSource               = { tdModelSource }
                  updateTDModelSourceStorage  = { props.updateTDModelSourceStorage }
                />
              }
            />
          </Grid>

        ))}
      </Grid>
  );
};

export default CodingScreenMaterial