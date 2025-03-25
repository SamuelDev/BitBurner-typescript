import { NS } from "@ns";

export async function main(ns: NS) {
  let maxNumNodes = ns.args[0] as number;

  // Purchase an initial Hacknet Node if none exist
  if (ns.hacknet.numNodes() === 0) {
    ns.hacknet.purchaseNode();
  }

  while (true) {
    await ns.sleep(30000); // Sleep for 30 seconds before checking again

    let currentMoney = ns.getPlayer().money;

    // check upgrade costs
    // let levelUpgradeCost = ns.hacknet.getLevelUpgradeCost(0, 10);
    // let ramUpgradeCost = ns.hacknet.getRamUpgradeCost(0, 1);
    // let coreUpgradeCost = ns.hacknet.getCoreUpgradeCost(0, 1);

    // Purchase a new node if we are net yet at the max and it is cheper than upgrading a single other node in any 1 category
    if (ns.hacknet.numNodes() < maxNumNodes &&
      // ns.hacknet.getPurchaseNodeCost() < Math.min(levelUpgradeCost, ramUpgradeCost, coreUpgradeCost) &&
      ns.hacknet.getPurchaseNodeCost() < currentMoney) {
      ns.hacknet.purchaseNode();
      continue;
    }

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      // let nodeStats = ns.hacknet.getNodeStats(i);
      
      // // Determine if level should be upgraded (199 levels per node)
      // let levelsToUpgrade = Math.min(10, 200 - nodeStats.level) // Only upgrade 10 levels at a time
      // let levelUpgradeCost = ns.hacknet.getLevelUpgradeCost(i, levelsToUpgrade);

      // // Determine if RAM should be upgraded (6 levels per node)
      // let ramUpgradeCost = ns.hacknet.getRamUpgradeCost(i, 1);

      // // Determine if cores should be upgraded (16 levels per node)
    }
  }
}

function upgradeAllNodeLevels(ns: NS) {

}

function upgradeAllNodeRAM(ns: NS) {

}

function upgradeAllNodeCores(ns: NS) {

}

export function autocomplete(data: string[], args: string[]) {
  return ["maxNumOfNodes"];
}