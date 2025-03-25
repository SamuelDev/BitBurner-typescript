import { NS } from "@ns";

export async function main(ns: NS) {
  const target = "n00dles";

  const moneyThresh = ns.getServerMaxMoney(target);

  const securityThresh = ns.getServerMinSecurityLevel(target);

  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
  }

  ns.nuke(target);

  while (true) {
    await ns.sleep(50); // Sleep for 50ms to prevent program freeze on open
    let start = Date.now();

    if (ns.getServerSecurityLevel(target) > securityThresh) {
      let weakenTime = ns.getWeakenTime(target); // Keep outside loop because if hacking level increases it will change
      let pid = ns.run("hacking/actions/weaken.js", 600, target); // 40 threads hardcoded for now, will need to make more dynamic
      while (ns.isRunning(pid)) {
        await ns.sleep(printElapsed(ns, start, weakenTime));
      }
    }
    else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      let growTime = ns.getGrowTime(target); // Keep outside loop because if hacking level increases it will change
      let pid = ns.run("hacking/actions/grow.js", 600, target); // 40 threads hardcoded for now, will need to make more dynamic
      while (ns.isRunning(pid)) {
        await ns.sleep(printElapsed(ns, start, growTime));
      }
    }
    else {
      let hackTime = ns.getHackTime(target); // Keep outside loop because if hacking level increases it will change
      let pid = ns.run("hacking/actions/hack.js", 600, target); // 40 threads hardcoded for now, will need to make more dynamic
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