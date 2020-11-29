import {UniverseSpec} from '../dimensions';

export const firewallSpec: UniverseSpec = {
  types: [
    {
      name: 'ip address',
      key: 'ip',
      parser: 'ip',
      formatter: 'ip',
      domain: '0.0.0.0-255.255.255.255',
      values: [
        {symbol: 'internet', range: '0.0.0.0-255.255.255.255'},
        {symbol: 'localhost', range: '127.0.0.1'},
        {symbol: 'loopback', range: '127.0.0.0/8'},
      ],
    },
    {
      name: 'port',
      key: 'port',
      parser: 'default',
      formatter: 'default',
      domain: '00-0xffff',
      values: [
        {symbol: 'ftp', range: '21'},
        {symbol: 'ssh', range: '22'},
        {symbol: 'telnet', range: '23'},
        {symbol: 'smtp', range: '25'},
        {symbol: 'time', range: '37'},
        {symbol: 'whois', range: '43'},
        {symbol: 'dns', range: '53'},
        {symbol: 'gopher', range: '70'},
        {symbol: 'finger', range: '79'},
        {symbol: 'http', range: '80, 443'},
        {symbol: 'mssql', range: '1433,1434'},
        {symbol: 'ephemeral', range: '49152-65535'},
      ],
    },
    {
      name: 'protocol',
      key: 'protocol',
      parser: 'default',
      formatter: 'default',
      domain: '00-0xff',
      values: [
        {symbol: 'ip', range: 'any'},
        {symbol: 'hopopt', range: '0'},
        {symbol: 'icmp', range: '1'},
        {symbol: 'igmp', range: '2'},
        {symbol: 'ggp', range: '3'},
        {symbol: 'ipv4', range: '4'},
        {symbol: 'st', range: '5'},
        {symbol: 'tcp', range: '6'},
        {symbol: 'cbt', range: '7'},
        {symbol: 'egp', range: '8'},
        {symbol: 'igp', range: '9'},
        {symbol: 'bbn_rcc_mon', range: '10'},
        {symbol: 'nvp_ii', range: '11'},
        {symbol: 'pup', range: '12'},
        {symbol: 'emcon', range: '14'},
        {symbol: 'xnet', range: '15'},
        {symbol: 'chaos', range: '16'},
        {symbol: 'udp', range: '17'},
        {symbol: 'mux', range: '18'},
        {symbol: 'dcn_meas', range: '19'},
        {symbol: 'hmp', range: '20'},
        {symbol: 'prm', range: '21'},
        {symbol: 'xns_idp', range: '22'},
        {symbol: 'trunk_1', range: '23'},
        {symbol: 'trunk_2', range: '24'},
        {symbol: 'leaf_1', range: '25'},
        {symbol: 'leaf_2', range: '26'},
        {symbol: 'rdp', range: '27'},
        {symbol: 'irtp', range: '28'},
        {symbol: 'iso_tp4', range: '29'},
        {symbol: 'netblt', range: '30'},
        {symbol: 'mfe_nsp', range: '31'},
        {symbol: 'merit_inp', range: '32'},
        {symbol: 'dccp', range: '33'},
        {symbol: '3pc', range: '34'},
        {symbol: 'idpr', range: '35'},
        {symbol: 'xtp', range: '36'},
        {symbol: 'ddp', range: '37'},
        {symbol: 'idpr_cmtp', range: '38'},
        {symbol: 'tp++', range: '39'},
        {symbol: 'il', range: '40'},
        {symbol: 'ipv6', range: '41'},
        {symbol: 'sdrp', range: '42'},
        {symbol: 'ipv6_route', range: '43'},
        {symbol: 'ipv6_frag', range: '44'},
        {symbol: 'idrp', range: '45'},
        {symbol: 'rsvp', range: '46'},
        {symbol: 'gre', range: '47'},
        {symbol: 'dsr', range: '48'},
        {symbol: 'bna', range: '49'},
        {symbol: 'esp', range: '50'},
        {symbol: 'ah', range: '51'},
        {symbol: 'i_nlsp', range: '52'},
        {symbol: 'narp', range: '54'},
        {symbol: 'mobile', range: '55'},
        {symbol: 'tlsp', range: '56'},
        {symbol: 'skip', range: '57'},
        {symbol: 'ipv6_icmp', range: '58'},
        {symbol: 'ipv6_nonxt', range: '59'},
        {symbol: 'ipv6_opts', range: '60'},
        {symbol: 'cftp', range: '62'},
        {symbol: 'sat_expak', range: '64'},
        {symbol: 'kryptolan', range: '65'},
        {symbol: 'rvd', range: '66'},
        {symbol: 'ippc', range: '67'},
        {symbol: 'sat_mon', range: '69'},
        {symbol: 'visa', range: '70'},
        {symbol: 'ipcv', range: '71'},
        {symbol: 'cpnx', range: '72'},
        {symbol: 'cphb', range: '73'},
        {symbol: 'wsn', range: '74'},
        {symbol: 'pvp', range: '75'},
        {symbol: 'br_sat_mon', range: '76'},
        {symbol: 'sun_nd', range: '77'},
        {symbol: 'wb_mon', range: '78'},
        {symbol: 'wb_expak', range: '79'},
        {symbol: 'iso_ip', range: '80'},
        {symbol: 'vmtp', range: '81'},
        {symbol: 'secure_vmtp', range: '82'},
        {symbol: 'vines', range: '83'},
        {symbol: 'ttp', range: '84'},
        {symbol: 'iptm', range: '84'},
        {symbol: 'nsfnet_igp', range: '85'},
        {symbol: 'dgp', range: '86'},
        {symbol: 'tcf', range: '87'},
        {symbol: 'eigrp', range: '88'},
        {symbol: 'ospfigp', range: '89'},
        {symbol: 'sprite_rpc', range: '90'},
        {symbol: 'larp', range: '91'},
        {symbol: 'mtp', range: '92'},
        {symbol: 'ax.25', range: '93'},
        {symbol: 'ipip', range: '94'},
        {symbol: 'scc_sp', range: '96'},
        {symbol: 'etherip', range: '97'},
        {symbol: 'encap', range: '98'},
        {symbol: 'gmtp', range: '100'},
        {symbol: 'ifmp', range: '101'},
        {symbol: 'pnni', range: '102'},
        {symbol: 'pim', range: '103'},
        {symbol: 'aris', range: '104'},
        {symbol: 'scps', range: '105'},
        {symbol: 'qnx', range: '106'},
        {symbol: 'a/n', range: '107'},
        {symbol: 'ipcomp', range: '108'},
        {symbol: 'snp', range: '109'},
        {symbol: 'compaq_peer', range: '110'},
        {symbol: 'ipx_in_ip', range: '111'},
        {symbol: 'vrrp', range: '112'},
        {symbol: 'pgm', range: '113'},
        {symbol: 'l2tp', range: '115'},
        {symbol: 'ddx', range: '116'},
        {symbol: 'iatp', range: '117'},
        {symbol: 'stp', range: '118'},
        {symbol: 'srp', range: '119'},
        {symbol: 'uti', range: '120'},
        {symbol: 'smp', range: '121'},
        {symbol: 'ptp', range: '123'},
        {symbol: 'fire', range: '125'},
        {symbol: 'crtp', range: '126'},
        {symbol: 'crudp', range: '127'},
        {symbol: 'sscopmce', range: '128'},
        {symbol: 'iplt', range: '129'},
        {symbol: 'sps', range: '130'},
        {symbol: 'pipe', range: '131'},
        {symbol: 'sctp', range: '132'},
        {symbol: 'fc', range: '133'},
        {symbol: 'rsvp_e2e_ignore', range: '134'},
        {symbol: 'udplite', range: '136'},
        {symbol: 'mpls_in_ip', range: '137'},
        {symbol: 'manet', range: '138'},
        {symbol: 'hip', range: '139'},
        {symbol: 'shim6', range: '140'},
        {symbol: 'wesp', range: '141'},
        {symbol: 'rohc', range: '142'},
        {symbol: 'ethernet', range: '143'},
        {symbol: 'reserved', range: '255'},
      ],
    },
  ],
  dimensions: [
    {
      name: 'source ip',
      key: 'sourceIp',
      type: 'ip',
    },
    {
      name: 'source port',
      key: 'sourcePort',
      type: 'port',
    },
    {
      name: 'destination ip',
      key: 'destinationIp',
      type: 'ip',
    },
    {
      name: 'destination port',
      key: 'destinationPort',
      type: 'port',
    },
    {
      name: 'protocol',
      key: 'protocol',
      type: 'protocol',
    },
  ],
};
