import { NS, BasicHGWOptions } from "@ns";

export async function main(ns: NS) {
  let target = ns.args[0] as string
  await ns.grow(target)
}

export async function grow(ns: NS, target: string, threads: number, opts: BasicHGWOptions) {
  let msec = opts.additionalMsec || 0;
  ns.exec("grow.js", target, threads, msec)
}