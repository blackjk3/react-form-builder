/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";

import ComponentHeader from "../form-elements/component-header";
import ComponentLabel from "../form-elements/component-label";
import FieldsetDustbin from '../multi-column/dustbin';
import ItemTypes from "../ItemTypes";

const accepts = [ItemTypes.BOX, ItemTypes.CARD];

export default function FieldSetBase(props) {
  
  const [childData, setChildData] = useState({});
  const [childItems, setChildItems] = useState(null);

  useEffect(() => {
    const { data, class_name, ...rest } = props;
    setChildData(data);
    let count=1;
    createChild(count, data);
    
  }, [props]);


  const addNewChild=()=>{
    let data=props.data;
    let colCount=data.childItems.length+1;
    let oldChilds=data.childItems;
    data.childItems = Array.from({ length: colCount }, (v, i) => {return oldChilds[i]?oldChilds[i]:null});

    setChildItems( data.childItems)
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
    setChildItems(data.childItems);
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
