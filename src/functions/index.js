import React from 'react';
import * as PkgTextAreaAutosize from 'react-textarea-autosize';
import * as DraftJs from 'draft-js';
import * as draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import ID from '../UUID';

const generateUUID = () => ID.uuid();

const TextAreaAutosize = (props) => <PkgTextAreaAutosize {...props} />;

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}

export {
 generateUUID, TextAreaAutosize, DraftJs, draftToHtml, Editor, groupBy,
};
