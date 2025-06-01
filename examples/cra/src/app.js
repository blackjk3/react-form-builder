import React from "react";
import { ReactFormBuilder } from "@threehippies/react-form-builder";
import * as variables from "./variables";

const url = "/api/formdata";
const saveUrl = "/api/formdata";

const App = () => (
  <ReactFormBuilder
    variables={variables}
    url={url}
    saveUrl={saveUrl}
    locale="en"
    saveAlways={false}
  />
);

export default App;
