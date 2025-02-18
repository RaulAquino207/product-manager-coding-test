const request = require("supertest");
const app = require('./index'); 

describe("API Products", () => {
  it("Should list all products", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Should filter available products", async () => {
    const response = await request(app).get("/products?available=true");
    expect(response.status).toBe(200);
    expect(response.body.every(p => p.available)).toBe(true);
  });

  it("Should add a new product", async () => {
    const newProduct = { name: "Test Burger", available: true };
    const response = await request(app).post("/products").send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.available).toBe(newProduct.available);
  });

  it("Should update an existing product", async () => {
    const updatedProduct = { name: "Updated Fries", available: false };
    const response = await request(app).put("/products/1").send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedProduct.name);
    expect(response.body.available).toBe(updatedProduct.available);
  });

  it("Should return an error when updating a non-existent product", async () => {
    const response = await request(app).put("/products/999").send({ name: "Doesn't Exist" });
    expect(response.status).toBe(404);
  });

  it("Should delete an available product", async () => {
    const response = await request(app).delete("/products/7");
    expect(response.status).toBe(204);
  });

  it("Should prevent deletion of an unavailable product", async () => {
    const response = await request(app).delete("/products/3");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Product is not available");
  });

  it("Should return an error when trying to delete a non-existent product", async () => {
    const response = await request(app).delete("/products/999");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found");
  });
});