import { expect, it } from "vitest";
import generateShortUrl from "../src/hash";

it("throws an error for empty URL", async () => {
  expect(() => {
    generateShortUrl('');
  }).toThrow('Invalid URL');
});

it("create short url", async () => {
  const shortenUrl = generateShortUrl('https://www.youtube.com/');

  // Check the newly created article exists
  expect(shortenUrl).not.toBeNull();

  // Check the length of the short URL
  expect(shortenUrl.length).toBe(16);

  // Check that the short URL only contains lowercase letters and numbers
  expect(/^[a-z0-9]+$/.test(shortenUrl)).toBe(true);
});

it("calls generateShortUrl twice with a short interval and ensures different results", async () => {
  const originalUrl = 'https://www.example.com/';

  // Call generateShortUrl for the first time
  const shortenUrl1 = generateShortUrl(originalUrl);

  // Wait for a short interval (e.g., 100ms)
  await new Promise(resolve => setTimeout(resolve, 100));

  // Call generateShortUrl for the second time
  const shortenUrl2 = generateShortUrl(originalUrl);

  // Check that the two short URLs are different
  expect(shortenUrl1).not.toEqual(shortenUrl2);

  // Check the validity of the first short URL
  expect(shortenUrl1).not.toBeNull();
  expect(shortenUrl1.length).toBe(16);
  expect(/^[a-z0-9]+$/.test(shortenUrl1)).toBe(true);

  // Check the validity of the second short URL
  expect(shortenUrl2).not.toBeNull();
  expect(shortenUrl2.length).toBe(16);
  expect(/^[a-z0-9]+$/.test(shortenUrl2)).toBe(true);
});

