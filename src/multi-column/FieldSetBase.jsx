/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";

import ComponentHeader from "../form-elements/component-header";
import ComponentLabel from "../form-elements/component-label";
import FieldsetDustbin from "./fieldsetDustbin";
import ItemTypes from "../ItemTypes";

const accepts = [ItemTypes.BOX, ItemTypes.CARD];

export default function FieldSetBase(props) {
  const [childCount, setChildCount] = useState(
    props?.childItems?.length ? props?.childItems?.length : 3
  );
  const [childData, setChildData] = useState({});
  const [rerender, setRender] = useState(1);
  const [childItems, setchildItems] = useState(null);

  const childChange=props?.data?.fieldsteps;
  useEffect(() => {
    if(childChange){
      
    let currentChilds=childItems;
    let count =parseInt(props?.data?.fieldsteps);
    if(currentChilds){
      
    // setchildItems(null);
    let newchild=count-currentChilds.length;
      for (let i=0;i<newchild;i++){
        currentChilds.push(null)
      }
      setchildItems(currentChilds)
  }
  
}
  }, [childChange]);
  
  useEffect(() => {
    const { data, class_name, ...rest } = props;
    setChildData(data);
    let count=1;
    createChild(count, data);
    
  }, [props]);

  useEffect(() => {
    createChild(childCount, props.data);
  }, [childCount]);

  useEffect(() => {
    let re = rerender;
    setRender(re++);
  }, [childItems]);


  const addNewChild=()=>{
    let data=props.data;
    let colCount=data.childItems.length+1;
    let oldChilds=data.childItems;
    data.childItems = Array.from({ length: colCount }, (v, i) => {return oldChilds[i]?oldChilds[i]:null});

    setchildItems( data.childItems)
  }

  const onDropSuccess=(droppedIndex)=>{
    const totalChild=childItems?childItems.length:0;
    const isLastChild = totalChild===droppedIndex+1 ;
   

    if(isLastChild)
    {
      addNewChild()
    }
  }
  
  const createChild = (count, data) => {
    const colCount = count;
    const className = data.class_name || "col-md-12";
    if (!data.childItems) {
      // eslint-disable-next-line no-param-reassign
      data.childItems = Array.from({ length: colCount }, (v, i) => null);
      data.isContainer = true;
    }
    setchildItems(data.childItems);
  };
  const {
    controls,
    editModeOn,
    getDataById,
    setAsChild,
    removeChild,
    seq,
    className,
    index,
  } = props;
  const { pageBreakBefore } = childData;
  let baseClasses = "SortableItem rfb-item";
  if (pageBreakBefore) {
    baseClasses += " alwaysbreak";
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} isFieldSet={true} />
      <div>
        <ComponentLabel {...props} />
        <div className="row">
        
          {
            childItems?.map((x, i) => (
              <div key={`${i}_${x || "_"}`} className={"col-md-12"}>
                {controls ? (
                  controls[i]
                ) : (
                  <FieldsetDustbin
                    style={{ width: "100%" }}
                    data={childData}
                    accepts={accepts}
                    items={childItems}
                    key={i}
                    col={i}
                    onDropSuccess={()=> onDropSuccess(i)}
                    parentIndex={index}
                    editModeOn={editModeOn}
                    _onDestroy={() => removeChild(childData, i)}
                    getDataById={getDataById}
                    setAsChild={setAsChild}
                    seq={seq}
                    rowNo={i}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
