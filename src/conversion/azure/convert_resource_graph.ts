import {NodeSpec, RoutingRuleSpec} from '../../graph';

import {AzurePublicIP, AzureVirtualNetwork} from './azure_types';
import {GraphServices} from './graph_services';

///////////////////////////////////////////////////////////////////////////////
//
// convertResourceGraph() is responsible for
//   1. Creating the `Internet` node with routes to all public ips.
//   2. Materializing root nodes for VNets, NICs, and possibly compute pools.
//   3. Defining the `Internet` service tag, which is referenced by routing
//      and filtering rules in VNets and NSGs.
//
///////////////////////////////////////////////////////////////////////////////
export function convertResourceGraph(services: GraphServices) {
  // The Azure resource graph is considered to be a forest of AnyAzureObjects,
  // some of which are AzureVirtualNetworks.

  // Materialize each virtual network, while saving its NodeKey for later use.
  // Create routes from internet to each virtual network.
  const vNetNodeKeys: string[] = [];
  const gatewayRoutes: RoutingRuleSpec[] = [];
  const internetRoutes: RoutingRuleSpec[] = [];

  const azureGatewayKey = 'AzureGateway';
  // TODO: Allocate Key to avoid possible collisions
  const internetNodeKey = services.getInternetKey();

  // Convert each VNet.
  for (const vnet of services.index.withType(AzureVirtualNetwork)) {
    const route = services.convert.vnet(services, vnet, azureGatewayKey);
    vNetNodeKeys.push(route.destination);
    gatewayRoutes.push(route);
  }

  // Convert each Public Ips.
  for (const ipSpec of services.index.withType(AzurePublicIP)) {
    const {inbound, outbound} = services.convert.publicIp(
      services,
      ipSpec,
      azureGatewayKey,
      internetNodeKey
    );

    for (const route of inbound) {
      internetRoutes.push(route);
    }

    for (const route of outbound) {
      gatewayRoutes.push(route);
    }
  }

  gatewayRoutes.push({
    destination: internetNodeKey,
  });

  // Define a service tag for `Internet`, which is referenced in router rules
  // generated by converters like vNetConverter(). Azure defines `Internet` as
  // any ip addresses not in the ranges of the VNets.
  // See https://docs.microsoft.com/en-us/azure/virtual-network/service-tags-overview
  const sourceIp = `except ${vNetNodeKeys.join(',')}`;
  services.symbols.defineServiceTag(internetNodeKey, sourceIp);

  // TODO: the routes should really be the routes to all of the public ips, not the vnets.
  const azureGateway: NodeSpec = {
    key: azureGatewayKey,
    routes: gatewayRoutes,
  };
  services.nodes.add(azureGateway);

  // TODO: the routes should really be the routes to all of the public ips, not the vnets.
  const internetNode: NodeSpec = {
    key: internetNodeKey,
    endpoint: true,
    routes: internetRoutes,
  };
  services.nodes.add(internetNode);
}
