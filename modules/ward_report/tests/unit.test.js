import {jest} from "@jest/globals"; // ✅ Correct way for ES Modules
import { getAllWards } from "../src/controller/ward.controller.js";
import { Ward } from "../src/models/ward.model.js"; // ✅ Ensure this is a named export

test.skip("should return a list of wards", async () => {
 

describe("Ward Controller - Unit Tests", () => {
  afterEach(() => {
    jest.restoreAllMocks(); // ✅ Reset mocks after each test
  });

  it("should return a list of wards", async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // ✅ Ensure `Ward.find` is mocked correctly
    jest.spyOn(Ward, "find").mockResolvedValue([
      { wardNumber: 1, wardName: "General" },
    ]);

    await getAllWards(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          wardNumber: expect.any(Number),
          wardName: expect.any(String),
        }),
      ])
    );
  });
});
});
