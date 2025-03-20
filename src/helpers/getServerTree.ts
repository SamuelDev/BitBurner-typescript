import { NS, Server } from "@ns";

export function main(ns: NS) {
  // ns.tprint(GetServerTree(ns));
  ns.tprint(GetFlattenedServerTree(ns));
}

export function GetServerTree(ns: NS, excludePurchased = true): ServerNode {
  let visited: string[] = [];
  let home = new ServerNode('home', 0, ns.getServer('home'));
  let queue = [home];

  while (queue.length > 0) {
    let getServer = queue.shift();
    let server = getServer!

    if (visited.includes(server.name)) continue;
    visited.push(server.name);

    let connectedServers = ns.scan(server.name).filter(x => visited.indexOf(x) === -1)
    if (excludePurchased) {
      connectedServers = connectedServers.filter(x => !x.startsWith('dev-'));
    }

    let mappedServers = connectedServers.map(x => new ServerNode(x, server.depth + 1, ns.getServer(x)));

    server.children.push(...mappedServers);

    queue = queue.concat(mappedServers);
  }

  return home;
}

export function GetFlattenedServerTree(ns: NS, excludePurchased = true): Output[] {
  let tree = GetServerTree(ns, excludePurchased);
  let flattenedTree: Output[] = [];
  let queue = [tree];

  while (queue.length > 0) {
    let getNode = queue.shift();
    let node = getNode!

    let outputNode: Output = new Output(node.name, node.gameServerObj.requiredHackingSkill || 0, node.depth, node.gameServerObj.numOpenPortsRequired || 0, node.gameServerObj.maxRam);

    flattenedTree.push(outputNode);

    queue = queue.concat(node.children);
  }

  return flattenedTree;
}

export class ServerNode {
  name: string
  children: ServerNode[]
  depth: number
  gameServerObj: Server

  constructor(name: string, depth: number, gameServerObj: Server) {
    this.name = name;
    this.children = [];
    this.depth = depth;
    this.gameServerObj = gameServerObj;
  }
}

class Output {
  name: string
  hackingSkillReq: number
  distance: number
  portsToNuke: number
  ram: number

  constructor(name: string, hackingSkillReq: number, distance: number, portsToNuke: number, ram: number) {
    this.name = name;
    this.hackingSkillReq = hackingSkillReq;
    this.distance = distance;
    this.portsToNuke = portsToNuke;
    this.ram = ram;
  }
}