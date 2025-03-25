import { NS } from "@ns";
import { runTest1 } from "./test1";

export async function main(ns: NS, ...args: string[]) {
  runTest1(ns, "test1.js", "home", "a", "b");
  await ns.sleep(1500);
  ns.tprint("test2 complete");
}

export function autocomplete(data: string[], args: string[]) {
  return ["argument0", "argument1", "argument2"];
}