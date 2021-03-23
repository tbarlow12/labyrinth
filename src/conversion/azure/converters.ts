import {RoutingRuleSpec, SimpleRoutingRuleSpec} from '../../graph';
import {RuleSpec} from '../../rules';

import {
  AzureIPConfiguration,
  AzureLoadBalancerFrontEndIp,
  AzureNetworkInterface,
  AzureNetworkSecurityGroup,
  AzurePublicIP,
  AzureSubnet,
  AzureVirtualMachine,
  AzureVirtualNetwork,
} from './azure_types';
import {PublicIpRoutes} from './convert_public_ip';
import {GraphServices} from './graph_services';

export interface NSGRuleSpecs {
  readonly outboundRules: RuleSpec[];
  readonly inboundRules: RuleSpec[];
}

// DESIGN NOTE: IConverters exists to allow mocking of individual
// converters with resorting to monkey patching.
//
export interface IConverters {
  ip(
    services: GraphServices,
    spec: AzureIPConfiguration,
    parent: string
  ): SimpleRoutingRuleSpec;
  loadBalancerFrontend(
    services: GraphServices,
    spec: AzureLoadBalancerFrontEndIp,
    publicIpSpec: AzurePublicIP,
    gatewayKey: string
  ): PublicIpRoutes;
  nic(
    services: GraphServices,
    spec: AzureNetworkInterface,
    parent: string,
    vnetSymbol: string
  ): SimpleRoutingRuleSpec;
  nsg(
    spec: AzureNetworkSecurityGroup | undefined,
    vnetSymbol: string
  ): NSGRuleSpecs;
  publicIp(
    services: GraphServices,
    spec: AzurePublicIP,
    gatewayKey: string,
    internetKey: string
  ): PublicIpRoutes;
  resourceGraph(services: GraphServices): void;
  subnet(
    services: GraphServices,
    spec: AzureSubnet,
    parent: string,
    vnetSymbol: string
  ): SimpleRoutingRuleSpec;
  vm(
    services: GraphServices,
    spec: AzureVirtualMachine,
    parentRoute: RoutingRuleSpec
  ): RoutingRuleSpec;
  vnet(
    services: GraphServices,
    spec: AzureVirtualNetwork,
    parent: string
  ): SimpleRoutingRuleSpec;
}
