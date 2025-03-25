import { NS } from "@ns";
import { PrepServer } from "./prepServer";

export async function main(ns: NS) {
  await ns.sleep(30);

  // TODO: Identify best target server
  // ns.exec takes 1.3gb, if identification takes more than that apstract it to a new script

  let target = "n00dles";
  const homeThreadMultiplier = 0.95;
  let threads = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam('/hacking/prepServer.js') * homeThreadMultiplier);
  let prepPid = PrepServer(ns, "home", target, threads);

  while (ns.isRunning(prepPid)) {
    await ns.print("Waiting for prep to finish");
    await ns.sleep(5000);
  }

  // TODO: launch hwgw batches on every available server against the target
  // calculate how many threads will be needed to fully (hack), (grow), and (weaken x2) the target (do this inside hwgwBatch, return timestamp of when the last weaken will complete)

  // Simple: dont start the next batch until the previous batch is complete
  // Advanced: The next batch first hack must be calculated to end after the last weaken of the previous batch
  
}

export function autocomplete(data: string[], args: string[]) {
  return ["argument0", "argument1", "argument2"];
}