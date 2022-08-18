import React, { useEffect, useState } from "react";

/**
 * Summary	: ジェネラティブアート作品を編集するComponent
 * Logic		: - AAAをBBBにする
 *            - 親ComponentからCCCを受け取り、DDDとしたものを子Componentに渡す
 * View			: - KKKをリスト表示する
 */

// Type Declaration of Props
interface Props {
  sampleProp ?: any
  geneModelList: Array<any>
  onClickAddButton(): void
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

  const meshView = (mesh: THREE.Mesh) => {

    console.log(mesh)

  }

  return(
    <div>

        <h2> MODEL </h2>
        <button onClick = { props.onClickAddButton }> Add </button>

        { props.geneModelList.map( (geneModel) => (

          <details key = { geneModel.id }>
            <summary> Name: { geneModel.name }</summary>
              <div> ID: { geneModel.id }</div>
              { geneModel.effectList.map( (effect: any) => (
                <li key = { geneModel.id + '_' + effect.id } > Effect: { effect.id } </li> ))
              }
          </details>
          
          ))
        }

      <h2> INTERACTIONS </h2>

    </div>
  );
};

export default CodingScreenDev
