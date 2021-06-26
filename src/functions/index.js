import React from 'react';
import * as PkgTextAreaAutosize from 'react-textarea-autosize';
import * as DraftJs from 'draft-js';
import * as draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import ID from '../UUID';

const generateUUID = () => ID.uuid();

const TextAreaAutosize = (props) => <PkgTextAreaAutosize {...props} />;

export {
 generateUUID, TextAreaAutosize, DraftJs, draftToHtml, Editor,
};
