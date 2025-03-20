import { NS } from "@ns";

export async function main(ns: NS) {
  let target = ns.args[0] as string
  await ns.hack(target)
}