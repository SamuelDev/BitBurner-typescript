import { NS } from "@ns";

export async function main(ns: NS) {
  const homeThreadMultiplier = 0.9;
  let threads = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam('/hacking/prepServer.js') * homeThreadMultiplier);

  ns.exec("hacking/prepServer.js", "home", threads, "joesguns", threads);
  // let target = "joesguns";
  // ns.tprint(ns.getServerMinSecurityLevel(target))
  // ns.tprint(ns.getServerMaxMoney(target));
  // ns.tprint(ns.getServerSecurityLevel(target))
  // ns.tprint(ns.getServerMoneyAvailable(target));
}

export async function runTest1(ns: NS, script: string, host: string, someArg1: string, someArg2: string) {
  ns.tprint(`test1 run start`);
  ns.exec(script, host, 1, someArg1, someArg2);
  ns.tprint(`test1 run complete`);
}