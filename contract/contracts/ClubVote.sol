// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract ClubVote {
    //--part of the seed for keccak random number--
    uint randNo = 0;

    //--events--
    event userCreated(string username, address addr);
    event voteCreated(string voteName, string[] options);
    event userVoted(uint voteID, uint optionIndex, address addr);

    //--enums--
    enum Status {
        ongoing,
        finished
    }

    //--structs--
    struct User {
        string username;
        bool exists;
        uint[] createdVotes;
    }

    struct Vote {
        address creator;
        bool exists;
        string name;
        string[] voteText;
        uint[] voteCount;
        uint optionsAmount;
        mapping(address => bool) hasVoted;
        Status voteStatus;
    }

    //--mappings--
    mapping(address => User) accounts;
    mapping(uint => Vote) votes;

    //--modifiers--
    modifier isNewUser(address addr) {
        require(!accounts[addr].exists);
        _;
    }

    modifier userExists(address addr) {
        require(accounts[addr].exists);
        _;
    }

    modifier voteExists(uint voteID) {
        require(votes[voteID].exists);
        _;
    }

    modifier singleVote(address addr, uint voteID) {
        require(!votes[voteID].hasVoted[addr]);
        _;
    }

    //--functions--
    function createUser(
        string memory _username
    ) external isNewUser(msg.sender) {
        accounts[msg.sender].username = _username;
        accounts[msg.sender].exists = true;
        emit userCreated(_username, msg.sender);
    }

    function checkUser() external view returns (bool) {
        if (accounts[msg.sender].exists) {
            return true;
        }
        return false;
    }

    function getUserName(address _addr)
        external
        view
        userExists(_addr)
        returns (string memory)
    {
        return accounts[_addr].username;
    }

    function createVote(
        string memory _voteName,
        string[] memory _options
    ) external userExists(msg.sender) {
        uint voteID = uint(
            keccak256(abi.encodePacked(msg.sender, block.timestamp, randNo))
        );
        Vote storage newVote = votes[voteID];
        accounts[msg.sender].createdVotes.push(voteID);
        newVote.creator = msg.sender;
        newVote.exists = true;
        newVote.name = _voteName;
        newVote.optionsAmount = _options.length;
        for (uint i = 0; i < _options.length; i++) {
            newVote.voteCount.push(0);
            newVote.voteText.push(_options[i]);
        }
        newVote.voteStatus = Status.ongoing;
        randNo++;
        emit voteCreated(_voteName, _options);
    }

    function getCreatedVoteIDs(address _addr) external view returns (uint[] memory) {
        return accounts[_addr].createdVotes;
    }

    function getInfoByID(
        uint _voteID
    )
        external
        view
        returns (address, string memory, uint, string[] memory, uint[] memory)
    {
        Vote storage fetchedVote = votes[_voteID];
        return (
            fetchedVote.creator,
            fetchedVote.name,
            fetchedVote.optionsAmount,
            fetchedVote.voteText,
            fetchedVote.voteCount
        );
    }

    function vote(
        uint _voteID,
        uint _optionIndex
    ) external voteExists(_voteID) singleVote(msg.sender, _voteID) userExists(msg.sender) {
        Vote storage fetchedVote = votes[_voteID];
        fetchedVote.voteCount[_optionIndex - 1]++;
        fetchedVote.hasVoted[msg.sender] = true;
        emit userVoted(_voteID, _optionIndex, msg.sender);
    }
}