import { useApi, identityApiRef, Page, Header, HeaderLabel, Content, ContentHeader, SupportButton, InfoCard } from '@backstage/core';
import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Table } from 'reactstrap';
import axios from 'axios';

const defaultData = [];
const ExampleFetchComponent = () => {
  const [data, setData] = useState(defaultData);
  const [error, setError] = React.useState("");
  const token = "tawMrtgJ89NGY2Ji2jwx";
  console.log("token", token);
  const config = {
    headers: {Authorization: `Bearer ${token}`}
  };
  useEffect(() => {
    axios.get("https://gitlab.com/api/v4/users/5934500/projects", config).then((response) => {
      setData(response.data);
    }).catch((ex) => {
      const error2 = ex.response.status === 404 ? "Resource Not found" : "An unexpected error has occurred";
      setError(error2);
    });
  }, []);
  console.log(data);
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, data.map((value) => {
    return /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Name"), value.name)));
  }), error && /* @__PURE__ */ React.createElement("p", {
    className: "error"
  }, error)));
};

const ExampleComponent = () => {
  const identityApi = useApi(identityApiRef);
  const userId = identityApi.getUserId();
  const profile = identityApi.getProfile();
  return /* @__PURE__ */ React.createElement(Page, {
    themeId: "tool"
  }, /* @__PURE__ */ React.createElement(Header, {
    title: "Welcome to gitlab-playground!",
    subtitle: "Optional subtitle"
  }, /* @__PURE__ */ React.createElement(HeaderLabel, {
    label: "Owner",
    value: "Team X"
  }), /* @__PURE__ */ React.createElement(HeaderLabel, {
    label: "Lifecycle",
    value: "Alpha"
  })), /* @__PURE__ */ React.createElement(Content, null, /* @__PURE__ */ React.createElement(ContentHeader, {
    title: "Plugin title"
  }, /* @__PURE__ */ React.createElement(SupportButton, null, "A description of your plugin goes here.")), /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 3,
    direction: "column"
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(InfoCard, {
    title: userId
  }, /* @__PURE__ */ React.createElement(Typography, {
    variant: "body1"
  }, `${profile.displayName} | ${profile.email}`))), /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(ExampleFetchComponent, null)))));
};

export { ExampleComponent };
//# sourceMappingURL=index-81a98f4f.esm.js.map
