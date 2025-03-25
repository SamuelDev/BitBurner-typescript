import { NS } from "@ns";

export async function main(ns: NS) {
  let target = ns.args[0] as string;
  let threads = ns.args[1] as number || 1;

  await PrepPorts(ns, target);
  await PrepMoney(ns, target, threads);
}

export function PrepServer(ns: NS, runOnServer: string, target: string, threads: number) {
  return ns.exec("hacking/prepServer.js", runOnServer, threads, target, threads);
}

async function PrepPorts(ns: NS, target: string) {
  // if (target.hostname === ServerConsts.homeName || target.purchasedByPlayer || ns.hasRootAccess(target.hostname)) {
  //   return true;
  // }

  try {
    var openedPorts = 0;
    if (ns.fileExists("BruteSSH.exe", "home")) {
      ns.brutessh(target);
      await ns.sleep(25);
      openedPorts++;
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(target);
      await ns.sleep(25);
      openedPorts++;
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
      ns.sqlinject(target);
      await ns.sleep(25);
      openedPorts++;
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ns.httpworm(target);
      await ns.sleep(25);
      openedPorts++;
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.relaysmtp(target);
      await ns.sleep(25);
      openedPorts++;
    }
    if (openedPorts >= ns.getServerNumPortsRequired(target)) {
      ns.nuke(target);
      await ns.sleep(25);
      return true;
    }
  } catch (e) {
    ns.tprint('Error opening ports on: ' + target);
    return false;
  }

  ns.tprint('failed to nuke server: ' + target);
  return false;
}

async function PrepMoney(ns: NS, target: string, threads: number) {
  const securityThresh = ns.getServerMinSecurityLevel(target);
  const moneyThresh = ns.getServerMaxMoney(target);

  while (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) ||
    ns.getServerSecurityLevel(target) > securityThresh) {
    await ns.sleep(30); // sleep for safety on game launch

    if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target, { threads: threads });
    }
    else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      await ns.grow(target, { threads: threads });
    }
  }
}