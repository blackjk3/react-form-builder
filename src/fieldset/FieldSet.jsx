/* eslint-disable camelcase */
import React from 'react';
import ItemTypes from '../ItemTypes';
import FieldSetBase from "./FieldSetBase"

const accepts = [ItemTypes.BOX, ItemTypes.CARD];

const FieldSet = (props) => { 
  return <FieldSetBase   {...props} />;
};

export { FieldSet };
