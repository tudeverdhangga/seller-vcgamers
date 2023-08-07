import { expect, describe, it } from "vitest";
import {
  capitalizeFirstLetter,
  priceFormat,
  parenthesesNumber,
  dateToTime,
} from "~/utils/format";

describe("priceFormat", () => {
  // It should fails because test runner ICU different
  it.fails("should handle positive number", () => {
    const testValue = 25000;

    const result = priceFormat(testValue);

    expect(result).toBe("Rp 25.000");
  });

  it.fails("should handle negative number", () => {
    const testValue = -25000;

    const result = priceFormat(testValue);

    expect(result).toStrictEqual("-Rp 25.000");
  });

  it.fails("should handle 0", () => {
    const testValue = 0;

    const result = priceFormat(testValue);

    expect(result).toStrictEqual("Rp 0");
  });
});

describe("capitalizeFirstLetter", () => {
  it("should capitalize first letter", () => {
    const testValue = "hello";

    const result = capitalizeFirstLetter(testValue);

    expect(result).toBe("Hello");
  });
});

describe("parenthesesNumber", () => {
  it("should handle 0", () => {
    const testValue = 0;

    const result = parenthesesNumber(testValue);

    expect(result).toBe("");
  });

  it("should handle other than 0", () => {
    const testValue = 1;

    const result = parenthesesNumber(testValue);

    expect(result).toBe("(1)");
  });
});

describe("dateToTime", () => {
  const testValue = "2023-08-04T18:46:37.432Z";

  it("should return correct time", () => {
    const result = dateToTime(testValue);

    expect(result).toBe("18:46");
  });
});
