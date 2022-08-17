/* eslint-disable import/no-extraneous-dependencies */

const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app");
const { Dog, Temperament, conn } = require("../../src/db");

const agent = session(app);
const dog = {
  id: "006a1891-d70e-4b2a-9d8a-bdeb91b53c3d",
  name: "Koda",
  height: "12-25",
  weight: "12-25",
  life_span: "15",
};

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la base de datos", err);
    })
  );

  describe("/dogs", function () {
    it("GET responde con un status 200", function () {
      return agent.get("/dogs").expect(function (res) {
        expect(res.status).equal(200);
      });
    });
  });
  describe("/dogs?name=", function () {
    it("GET responde con status 200 si encuentra un perro", function () {
      return agent.get("/dogs?name=Koda").expect(function (res) {
        expect(res.status).equal(200);
      });
    });
  });
  describe("/dogs/:id", function () {
    it("GET responde con status 200 si encuentra un perro por id", function () {
      return agent.get("/dogs/1").expect(function (res) {
        expect(res.status).equal(200);
      });
    });
  });
  describe("/temperaments", function () {
    it("GET responde con status 200 si encuentra los temperamentos", function () {
      return agent.get("/temperament").expect(function (res) {
        expect(res.status).equal(200);
      });
    });
  });
});
