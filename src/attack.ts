import { NS } from "@ns";
// import { printElapsed }  from "./test"

export async function main(ns: NS) {
  // Defines the "target server", which is the server
  // that we're going to hack. In this case, it's "n00dles"
  const target = "n00dles";

  // Defines how much money a server should have before we hack it
  // In this case, it is set to the maximum amount of money.
  const moneyThresh = ns.getServerMaxMoney(target);

  // Defines the minimum security level the target server can
  // have. If the target's security level is higher than this,
  // we'll weaken it before doing anything else
  const securityThresh = ns.getServerMinSecurityLevel(target);

  // If we have the BruteSSH.exe program, use it to open the SSH Port
  // on the target server
  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
  }

  // Get root access to target server
  ns.nuke(target);

  // Infinite loop that continously hacks/grows/weakens the target server
  while (true) {
    let start = Date.now();

    if (ns.getServerSecurityLevel(target) > securityThresh) {
      let weakenTime = ns.getWeakenTime(target); // Keep outside loop because if hacking level increases it will change
      let pid = ns.run("helpers/actions/weaken.js", 40, target); // 40 threads hardcoded for now, will need to make more dynamic
      while (ns.isRunning(pid)) {
        await ns.sleep(printElapsed(ns, start, weakenTime));
      }
    }
    else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      let growTime = ns.getGrowTime(target); // Keep outside loop because if hacking level increases it will change
      let pid = ns.run("helpers/actions/grow.js", 40, target); // 40 threads hardcoded for now, will need to make more dynamic
      while (ns.isRunning(pid)) {
        await ns.sleep(printElapsed(ns, start, growTime));
      }
    }
    else {
      let hackTime = ns.getHackTime(target); // Keep outside loop because if hacking level increases it will change
      let pid = ns.run("helpers/actions/hack.js", 40, target); // 40 threads hardcoded for now, will need to make more dynamic
      while (ns.isRunning(pid)) {
        await ns.sleep(printElapsed(ns, start, hackTime));
      }
    }
  }
}

function printElapsed(ns: NS, startTime: number, timeNeeded: number) {
  let now = Date.now()
  let elapsed = now - startTime;
  let percentageComplete = elapsed / timeNeeded;
  let remainingTime = timeNeeded - elapsed;
  ns.print(`${(percentageComplete * 100).toFixed(2)}% done`);

  return Math.min(timeNeeded * 0.1, remainingTime) + 2;
}