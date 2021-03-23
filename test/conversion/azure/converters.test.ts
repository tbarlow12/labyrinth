import 'mocha';

import load_balancer from './convert_load_balancer';
import privateIp from './convert_private_ip.test';
import publicIp from './convert_public_ip_test';
import nic from './convert_nic.test';
import resourceGraph from './convert_resource_graph.test';
import subnet from './convert_subnet.test';
import vm from './convert_vm.test';
import vnet from './convert_vnet.test';

export default function test() {
  describe('Converters', () => {
    load_balancer();
    nic();
    privateIp();
    publicIp();
    resourceGraph();
    subnet();
    vm();
    vnet();
  });
}
