import { expect, describe, it } from "vitest";
import { mimeMapper, uid } from "~/utils/mapper";

describe("mimeMapper", () => {
  it("should return IMAGE for image/*", () => {
    const testValue = "image/png";

    const result = mimeMapper(testValue);

    expect(result).toBe("IMAGE");
  });

  it("should return VIDEO for video/*", () => {
    const testValue = "video/mp4";

    const result = mimeMapper(testValue);

    expect(result).toBe("VIDEO");
  });

  it("should return DOCUMENT for any application/*", () => {
    const testValue = "application/pdf";

    const result = mimeMapper(testValue);

    expect(result).toBe("DOCUMENT");
  });

  it("should return DOCUMENT for any unknown type", () => {
    const testValue = "text/plain";

    const result = mimeMapper(testValue);

    expect(result).toBe("DOCUMENT");
  });
});

describe("uid", () => {
  it("should return unique id between each call", () => {
    const result = uid();
    const newResult = uid();

    expect(result).not.toBe(newResult);
  });
});
