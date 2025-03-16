import { jest } from "@jest/globals"; // ✅ Ensure Jest is available
import { getAllWards } from "../src/controller/ward.controller.js";
import { Ward } from "../src/models/ward.model.js"; // ✅ Named import

describe("Ward Controller - Unit Tests", () => {
  it("should return a list of wards", async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // ✅ Use `jest.spyOn()` to mock `find`
    jest.spyOn(Ward, "find").mockResolvedValue([{ wardNumber: 1, wardName: "General" }]);

    await getAllWards(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
