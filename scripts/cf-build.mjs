// npm run build entrypoint for the Cloudflare Workers pipeline.
//
// OpenNext's adapter (`opennextjs-cloudflare build`) internally re-invokes
// `npm run build` to build the Next.js app. This guard makes that inner call
// run `next build` only, so the adapter is never invoked recursively, while
// the outer call still produces the `.open-next/` bundle that
// `wrangler deploy` uploads.
import { spawnSync } from "node:child_process";

const isInnerBuild = process.env.TVC0_OPENNEXT_INNER === "1";
const env = isInnerBuild
  ? process.env
  : { ...process.env, TVC0_OPENNEXT_INNER: "1" };
const command = isInnerBuild ? "next build" : "opennextjs-cloudflare build";

const result = spawnSync(command, { stdio: "inherit", shell: true, env });
process.exit(result.status ?? 1);
