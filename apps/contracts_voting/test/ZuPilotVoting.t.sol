// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { Test } from "forge-std/src/Test.sol";
import { console2 } from "forge-std/src/console2.sol";

import { ZuPilotVoting } from "../src/ZuPilotVoting.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

/// @dev If this is your first time with Forge, read this tutorial in the Foundry Book:
/// https://book.getfoundry.sh/forge/writing-tests
contract ZuPilotVotingTest is Test {
    ZuPilotVoting internal zpv;



    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        // Instantiate the contract-under-test.
        zpv = new ZuPilotVoting();




        vm.deal(address(zpv), 1 ether);

        // note 0
        uint noteId = 0;

        zpv.addNote(noteId, makeAddr('creator'));

        vm.prank(makeAddr('alice'));
        zpv.vote(noteId, true, 1);
        vm.prank(makeAddr('bob'));
        zpv.vote(noteId, true, 4);
        vm.prank(makeAddr('charlie'));
        zpv.vote(noteId, true, 2);
        vm.prank(makeAddr('david'));
        zpv.vote(noteId, false, 5);

        // note 1 
        zpv.addNote(1, makeAddr('creator2'));
        vm.prank(makeAddr('alice'));
        zpv.vote(1, false, 1);
        vm.prank(makeAddr('bob'));
        zpv.vote(1, false, 4);
        vm.prank(makeAddr('charlie'));
        zpv.vote(1, false, 2);

        // note 2
        zpv.addNote(2, makeAddr('creator2'));
        vm.prank(makeAddr('alice'));
        zpv.vote(2, false, 1);
        vm.prank(makeAddr('bob'));
        zpv.vote(2, false, 4);

    }

    function test_airdrop() external  {
        console2.log("airdrop");
        zpv.airdrop(0);

        assertEq(makeAddr('creator').balance, 0.01 ether, "incorrect balance");
    }

    function test_airdrop_fail_score() external  {
        vm.expectRevert(ZuPilotVoting.ScoreTooLow.selector);
        zpv.airdrop(1);
    }

    function test_airdrop_fail_count() external  {

        vm.expectRevert(ZuPilotVoting.VoterCountTooLow.selector);
        zpv.airdrop(2);
    
    }

    function test__calculate() external view {
        uint score = zpv._calculate(0);
        assertEq(score, 3, "value mismatch");
    }

}
