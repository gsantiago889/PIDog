const React = require("react");
const dispatch = require("react");
const { expect } = require("chai");
const GETALLDOGS = require("./index");
const axios = require("axios");

describe("src/components/CreateDog", () => {
  it("GET responde status 200", () => {
    return axios.get("http://localhost:3001/dogs").then((resp) => {
      dispatch({ type: GETALLDOGS, payload: resp.data })
        .expect(resp)
        .equal(!null);
    });
  });
});
