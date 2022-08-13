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

        <h2> GeneModels </h2>

          { props.geneModelList.map( (geneModel) => (
            <span key = { geneModel.id }>
              <h3>Model</h3>
              <span>{ geneModel.id } </span>

              <h3>Effects</h3>
              { geneModel.effectList.map( (effect: any) => (
                <span key = { geneModel.id + '_' + effect }>
                  <span>{ effect } </span>
                </span> ))
              }
            </span>
            
            ))
          }

      <h2> Interactions </h2>
    </div>
  );
};

export default CodingScreenDev
