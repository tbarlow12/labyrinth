import {RoutingRuleSpec} from '../../graph';

import {AzureVirtualNetwork} from './azure_types';
import {AzureBackboneFriendlyName, AzureBackboneKeyName} from './constants';
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

  // TODO: Allocate internetNodeKey to avoid possible collisions
  const internetKey = services.getInternetKey();
  const backboneOutboundKey = services.nodes.createKeyVariant(
    AzureBackboneKeyName,
    'outbound'
  );

  //
  // Materialize each public ip.
  //

  const internetRoutes: RoutingRuleSpec[] = [];
  const backboneOutboundRoutes: RoutingRuleSpec[] = [];

  // Materialize each virtual network, while saving its NodeKey for later use.
  // Create routes from internet to each virtual network.
  const vNetNodeKeys: string[] = [];
  for (const vnet of services.index.withType(AzureVirtualNetwork)) {
    const vnetResult = services.convert.vnet(
      services,
      vnet,
      backboneOutboundKey,
      internetKey
    );
    const route = vnetResult.route;

    if (route.constraints && route.constraints.destinationIp) {
      vNetNodeKeys.push(route.constraints.destinationIp);
    }

    for (const route of vnetResult.publicRoutes.inbound) {
      internetRoutes.push(route);
    }
    for (const route of vnetResult.publicRoutes.outbound) {
      backboneOutboundRoutes.push(route);
    }
  }

  // Create internet node
  services.nodes.add({
    key: internetKey,
    endpoint: true,
    routes: internetRoutes,
  });

  //
  // Add final default outbound route for the backbone to internet
  //
  backboneOutboundRoutes.push({
    destination: internetKey,
  });

  //
  // Create outbound backbone node
  //
  services.nodes.add({
    key: backboneOutboundKey,
    friendlyName: AzureBackboneFriendlyName,
    routes: backboneOutboundRoutes,
  });

  // Define a service tag for `Internet`, which is referenced in router rules
  // generated by converters like vNetConverter(). Azure defines `Internet` as
  // any ip addresses not in the ranges of the VNets.
  // See https://docs.microsoft.com/en-us/azure/virtual-network/service-tags-overview
  const sourceIp = `except ${vNetNodeKeys.join(',')}`;
  services.symbols.defineServiceTag(internetKey, sourceIp);
}
