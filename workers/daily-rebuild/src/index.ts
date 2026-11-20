// Cron-only Worker: POSTs the Pages deploy hook so today's day page gets built.
// No fetch handler and no route, so it never serves web traffic.

export interface Env {
  DEPLOY_HOOK_URL: string; // Worker secret, never in the repo
}

export type FetchFn = (url: string, init: RequestInit) => Promise<Response>;

export const HOOK_TIMEOUT_MS = 10_000;

// no retry here: the second daily cron run is the retry
export async function triggerRebuild(env: Env, fetchFn: FetchFn = fetch): Promise<number> {
  const url = parseHookUrl(env.DEPLOY_HOOK_URL);
  const response = await fetchFn(url, {
    method: "POST",
    redirect: "manual", // a redirect means the hook moved; fail instead of following it
    signal: AbortSignal.timeout(HOOK_TIMEOUT_MS),
  });
  await response.body?.cancel(); // only the status matters; don't buffer the body
  if (response.status < 200 || response.status > 299) {
    throw new Error(`deploy hook answered ${response.status}`);
  }
  return response.status;
}

function parseHookUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("DEPLOY_HOOK_URL is not a URL");
  }
  if (url.protocol !== "https:") throw new Error("DEPLOY_HOOK_URL must be https");
  return url.href;
}

const worker = {
  scheduled: async (_controller: unknown, env: Env): Promise<void> => {
    await triggerRebuild(env);
  },
};

export default worker;
