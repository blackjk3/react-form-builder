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
      
    const { data, class_name, ...rest } = props;
    setChildData(data);
    let count=data?.fieldsteps?parseInt(data?.fieldsteps):3
    createChild(count, data);
    const currentChilds=childItems;
    console.log("currentChilds",currentChilds)
    console.log("currentChilds",currentChilds.length)
    setchildItems(null);
    let newchild=parseInt(props?.data?.fieldsteps)-currentChilds?currentChilds.length:0;
    console.log("newchild",newchild)
    console.log("props",props)

    
  }
  }, [childChange]);

  useEffect(() => {
    createChild(childCount, props.data);
  }, [childCount]);

  useEffect(() => {
    let re = rerender;
    setRender(re++);
  }, [childItems]);

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
  console.log("controls",controls)
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
        
          {rerender &&
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
                    col={i}
                    parentIndex={index}
                    editModeOn={editModeOn}
                    _onDestroy={() => removeChild(childData, i)}
                    getDataById={getDataById}
                    setAsChild={setAsChild}
                    seq={seq}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
