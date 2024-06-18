// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.25 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";


/**
 * Allows voters to cast multiple weighted votes to grants with one transaction
 * This is inspired from BulkCheckout documented over at:
 * https://github.com/gitcoinco/BulkTransactions/blob/master/contracts/BulkCheckout.sol
 *
 * Emits event upon every transfer.
 */
contract ZuPilotVoting is Initializable, ReentrancyGuardUpgradeable {

  using SafeERC20Upgradeable for IERC20Upgradeable;

  string public constant VERSION = "0.2.0";


  struct Vote {
    bool isHelpful;
    uint knowledgeLevel;
  }


  // by noteId
  // already voted
  mapping (uint => address[]) public votedByNoteId;

  


  // true is helpful
  // by noteId
  mapping (uint => mapping(address => Vote)) public votesByNoteId;

  // by noteId
  mapping (uint => mapping(address => bool)) public claimed;

  // by noteId
  mapping (uint => address) public creators;
  
  // --- Event ---

  /// @notice Emitted when a new vote is sent
  event Voted(
    address indexed voter,      
    bool isHelpful,             
    uint indexed noteId       
  );

  // errors
  error AlreadyVoted();
  error AlreadyClaimed();
  
  error VoterCountTooLow();
  error ScoreTooLow();

  // --- Core methods ---

  function initialize() external initializer {
    // empty initializer
  }
  
  // TODO onlyOwner
  function addNote(uint noteId, address creatorAddress) public {
    creators[noteId] = creatorAddress;
  }

  function _calculate(uint noteId) public view returns (uint){
    
    uint score = 0;
    address[] memory voted = votedByNoteId[noteId];

    // given level 1-5
    // simple step function
    // 1,2,3 knowlege level -> 5,4,3 etc.

    for (uint i = 0; i < voted.length; i++) {
        Vote memory _vote = votesByNoteId[noteId][voted[i]];
        if (_vote.isHelpful){
          score = score + 5 - (_vote.knowledgeLevel);
        } else {
          if (_vote.knowledgeLevel >= 3){
              score = score + (_vote.knowledgeLevel);
          }
        }
    }

    return score / voted.length;
  }

  // TODO onlyOwner
  // TODO top-k in leaderboard
  // if reach "helpful" threshold, airdrop
  function airdrop(uint noteId) public {

    uint score = _calculate(noteId);

    address creatorAddress = creators[noteId];


    if (claimed[noteId][creatorAddress]) revert AlreadyClaimed();
    if (votedByNoteId[noteId].length < 3) revert VoterCountTooLow();
    if (score < 2) revert ScoreTooLow();

  
    uint value = 0.01 ether;
    // Profit
    AddressUpgradeable.sendValue(payable(creatorAddress), value);



    
    /// @dev erc20 transfer to grant address
    // slither-disable-next-line arbitrary-send-erc20,reentrancy-events,
    // SafeERC20Upgradeable.safeTransferFrom(
    //   IERC20Upgradeable(_token),
    //   voterAddress,
    //   _creatorAddress,
    //   _amount
    // );
      
  }

  function vote(uint noteId, bool isHelpful, uint knowledgeLevel) public {


    if(votesByNoteId[noteId][msg.sender].knowledgeLevel != 0) revert AlreadyVoted();
    
    votesByNoteId[noteId][msg.sender] = Vote({ isHelpful:isHelpful, knowledgeLevel: knowledgeLevel});
    votedByNoteId[noteId].push(msg.sender);


    emit Voted(
      msg.sender,
      isHelpful,
      noteId
    );
  }



  /**
   * @notice Invoked by RoundImplementation which allows
   * a voted to cast weighted votes to multiple grants during a round
   *
   * @dev
   * - more voters -> higher the gas
   * - this would be triggered when a voter casts their vote via grant explorer
   * - can be invoked by the round
   * - supports ERC20 and Native token transfer
   *
   * @param encodedVotes encoded list of votes
   * @param voterAddress voter address
   */
  // function vote(bytes[] calldata encodedVotes, address voterAddress) external override payable nonReentrant isRoundContract {

  //   /// @dev iterate over multiple donations and transfer funds
  //   for (uint256 i = 0; i < encodedVotes.length; i++) {

  //     /// @dev decode encoded vote
  //     (
  //       address _token,
  //       uint256 _amount,
  //       address _creatorAddress,
  //       bytes32 _projectId
  //     ) = abi.decode(encodedVotes[i], (
  //       address,
  //       uint256,
  //       address,
  //       bytes32
  //     ));

  //     if (_token == address(0)) {
  //       /// @dev native token transfer to grant address
  //       // slither-disable-next-line reentrancy-events
  //       AddressUpgradeable.sendValue(payable(_creatorAddress), _amount);
  //     } else {

  //       /// @dev erc20 transfer to grant address
  //       // slither-disable-next-line arbitrary-send-erc20,reentrancy-events,
  //       SafeERC20Upgradeable.safeTransferFrom(
  //         IERC20Upgradeable(_token),
  //         voterAddress,
  //         _creatorAddress,
  //         _amount
  //       );

  //     }

  //     /// @dev emit event for transfer
  //     emit Voted(
  //       _token,
  //       _amount,
  //       voterAddress,
  //       _creatorAddress,
  //       _projectId,
  //       msg.sender
  //     );

  //   }

  // }
}