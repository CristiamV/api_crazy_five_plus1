const request = require('supertest');
const app = require('../app');

const mockGetUser = { id_user: 1, user_name: 'test', exists: false };
const mockGetCategories = {
  "categories": {
    "design": {
      "id": 1,
      "skills": {
        "visual": {
          "id": 1,
          "level": 1
        },
      }
    }
  },
};

jest.mock("../services/UserService", () => ({
  get: () => mockGetUser,
  getLevel: () => mockGetCategories,
  setLevels: () => { console.log(); },
}));

jest.mock("../services/CategoriesService", () => ({ get: () => mockGetCategories }));

describe('Testing API routes', () => {
  it('Testing root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  describe("users", () => {
    it("It should return the user and no level if not exists", async () => {
      const response = await request(app).get('/users/test');
      const result = JSON.parse(response.text);

      expect(response.statusCode).toBe(200);
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('categories');
    });

    it("It should return the user and no level if exists", async () => {
      mockGetUser.exists = true;

      const response = await request(app).get('/users/test');
      const result = JSON.parse(response.text);

      expect(response.statusCode).toBe(200);
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('categories');
    });

    it("It should set the levels of the user", async () => {
      mockGetUser.exists = true;

      const response = await request(app).post('/users/levels');

      expect(response.statusCode).toBe(200);
    });
  });
});