process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let sixpack = { name: "beer", price: 8.99 };

beforeEach(function () {
  items.push(sixpack);
});

afterEach(function () {
  items.length = 0;
});

describe("GET/items", () => {
  test("Get all items", async () => {
    res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [sixpack] });
  });
});

describe("POST/items", () => {
  test("Creating an item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "chicken nuggets", price: 5.6 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ item: { name: "chicken nuggets", price: 5.6 } });
  });
});

describe("GET/items/:name", () => {
  test("Get an item by name", async () => {
    const res = await request(app).get(`/items/${sixpack.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "beer", price: 8.99 } });
  });
});

describe("PATCH/items/:name", () => {
  test("Updating an item", async () => {
    const res = await request(app).patch(`/items/${sixpack.name}`).send({
      name: "cheapbeer",
      price: 4.99,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "cheapbeer", price: 4.99 } });
  });
});

describe("DELETE/items/:name", () => {
  test("Deleting an item", async () => {
    const res = await request(app).delete(`/items/${sixpack.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
});
