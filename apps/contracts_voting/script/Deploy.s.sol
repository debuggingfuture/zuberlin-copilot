// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { ZuPilotVoting } from "../src/ZuPilotVoting.sol";

import { BaseScript } from "./Base.s.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract Deploy is BaseScript {
    function run() public broadcast returns (ZuPilotVoting zpv) {
        // uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        // vm.startBroadcast(deployerPrivateKey);
        zpv = new ZuPilotVoting();
        
    }
}
