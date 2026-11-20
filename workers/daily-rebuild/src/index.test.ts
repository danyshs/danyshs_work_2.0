import { afterEach, expect, mock, spyOn, test } from "bun:test";
import worker, { triggerRebuild, type FetchFn } from "./index";

const ENV = { DEPLOY_HOOK_URL: "https://api.cloudflare.com/hook/abc" };

function fakeFetch(status: number) {
  return mock<FetchFn>(() => Promise.resolve(new Response(null, { status })));
}

afterEach(() => {
  mock.restore();
});

test("a 2xx answer returns its status", async () => {
  expect(await triggerRebuild(ENV, fakeFetch(200))).toBe(200);
});

test("a non-2xx answer throws with the status, redirects included", async () => {
  await expect(triggerRebuild(ENV, fakeFetch(500))).rejects.toThrow(/answered 500/);
  await expect(triggerRebuild(ENV, fakeFetch(302))).rejects.toThrow(/answered 302/);
});

test("a missing or non-https hook URL throws before any request", async () => {
  const fetchFn = fakeFetch(200);
  await expect(triggerRebuild({ DEPLOY_HOOK_URL: "" }, fetchFn)).rejects.toThrow(/not a URL/);
  await expect(
    triggerRebuild({ DEPLOY_HOOK_URL: "http://api.cloudflare.com/hook/abc" }, fetchFn),
  ).rejects.toThrow(/must be https/);
  expect(fetchFn).not.toHaveBeenCalled();
});

test("the request is a POST that won't follow redirects and can time out", async () => {
  const fetchFn = fakeFetch(200);
  await triggerRebuild(ENV, fetchFn);
  const call = fetchFn.mock.calls[0];
  if (call === undefined) throw new Error("fetch was not called");
  const [url, init] = call;
  expect(url).toBe(ENV.DEPLOY_HOOK_URL);
  expect(init.method).toBe("POST");
  expect(init.redirect).toBe("manual");
  expect(init.signal).toBeInstanceOf(AbortSignal);
});

// a renamed or unwired handler would pass every other test and never fire
test("the scheduled handler POSTs the hook once", async () => {
  const spy = spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
  await worker.scheduled(null, ENV);
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy.mock.calls[0]?.[0]).toBe(ENV.DEPLOY_HOOK_URL);
});
