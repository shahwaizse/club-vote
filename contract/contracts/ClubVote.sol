// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract ClubVote {

    //--events--
    event UserRegistered(address userAddress, string name, string clubName);
    event MemberJoined(address clubAddress, address user);
    event MemberApproved(address clubAddress, address user);
    event VoteCreated(address clubAddress, uint voteId, string voteName);
    event VoteClosed(address clubAddress, uint voteId);
    event VoteCast(address voter, address clubAddress, uint voteId, uint choice);

    //--enums--
    enum voteStatus {Ongoing, Finished}

    //--structs--
    struct User {
        string name;
        address clubAddress;
    }

    struct Vote {
        string name;
        uint optionAmount;
        mapping(uint => string) options;
        mapping(uint => uint) voteCount;
        mapping(address => uint) selectedOption;
        mapping(address => bool) hasVoted;
        voteStatus status;
    }

    struct Club {
        string name;
        mapping(uint => address) members;
        mapping(address => bool) approvedMembers;
        mapping(uint => Vote) currentVotes;
        uint voteCount;
        uint memberCount;
        uint approvedMemberCount;
    }

    //--mappings--
    mapping(address => User) public users;
    mapping(address => Club) public clubs;

    //--functions--

    // called after registration form is submitted with appropriate data
    function newUser(string memory userName, string memory clubName) external {
        // create new club, linked to the user
        clubs[msg.sender].name = clubName;
        clubs[msg.sender].voteCount = 0;
        clubs[msg.sender].memberCount = 0;
        clubs[msg.sender].approvedMemberCount = 0;

        // link user to the created club
        users[msg.sender].name = userName;
        users[msg.sender].clubAddress = msg.sender;

        emit UserRegistered(msg.sender, userName, clubName);
    }

    // user joins club with this function
    function joinClub(address clubAddress) external {
        require(users[msg.sender].clubAddress != clubAddress, "Already a member");
        
        Club storage club = clubs[clubAddress];
        club.members[club.memberCount] = msg.sender;
        club.memberCount++;
        club.approvedMembers[msg.sender] = false; // pending approval
        
        emit MemberJoined(clubAddress, msg.sender);
    }

    // manually approve membership to avoid DDoS and vote skewing
    function approveRequest(address userAddress) external {
        Club storage club = clubs[msg.sender];
        require(!club.approvedMembers[userAddress], "User already approved");

        club.approvedMembers[userAddress] = true;
        club.approvedMemberCount++;

        emit MemberApproved(msg.sender, userAddress);
    }

    // user creates a new vote with this function
    function createVote(string memory _name, string[] memory _options) external {
        Club storage club = clubs[msg.sender];
        uint voteId = club.voteCount;

        Vote storage newVote = club.currentVotes[voteId];
        newVote.name = _name;
        newVote.status = voteStatus.Ongoing;
        newVote.optionAmount = _options.length;

        for (uint i = 0; i < _options.length; i++) {
            newVote.options[i] = _options[i];
            newVote.voteCount[i] = 0;
        }

        club.voteCount++;
        emit VoteCreated(msg.sender, voteId, _name);
    }

    // manually close a vote
    function closeVote(uint voteId) external {
        Club storage club = clubs[msg.sender];
        require(voteId < club.voteCount, "Invalid voteId");

        club.currentVotes[voteId].status = voteStatus.Finished;

        emit VoteClosed(msg.sender, voteId);
    }

    // user casts vote with this function
    function vote(address clubAddress, uint voteId, uint choice) external returns (bool) {
        Club storage club = clubs[clubAddress];
        require(club.approvedMembers[msg.sender], "Not an approved member");

        Vote storage _vote = club.currentVotes[voteId];
        require(_vote.status == voteStatus.Ongoing, "Vote is not ongoing");

        bool hasVoted = _vote.hasVoted[msg.sender];
        require(!hasVoted, "User has already voted");

        _vote.voteCount[choice]++;
        _vote.hasVoted[msg.sender] = true;
        
        emit VoteCast(msg.sender, clubAddress, voteId, choice);
        return true;
    }

    // gets username of a specific address
    function getUsername(address _addr) external view returns (string memory) {
        return users[_addr].name;
    }

    // gets all members of a club
    function getMembers() external view returns (string[] memory, address[] memory) {
        Club storage club = clubs[msg.sender];
        uint count = club.approvedMemberCount;

        string[] memory usernames = new string[](count);
        address[] memory addresses = new address[](count);
        uint index = 0;

        for (uint i = 0; i < club.memberCount; i++) {
            address member = club.members[i];
            if (club.approvedMembers[member]) {
                usernames[index] = users[member].name;
                addresses[index] = member;
                index++;
            }
        }

        return (usernames, addresses);
    }

    // returns all votes
    function getVotes(address addr) external view returns(string[] memory, uint[] memory, voteStatus[] memory) {
        Club storage club = clubs[addr];
        uint voteCount = club.voteCount;

        string[] memory voteNames = new string[](voteCount);
        uint[] memory optionCounts = new uint[](voteCount);
        voteStatus[] memory statuses = new voteStatus[](voteCount);

        for (uint i = 0; i < voteCount; i++) {
            voteNames[i] = club.currentVotes[i].name;
            optionCounts[i] = club.currentVotes[i].optionAmount;
            statuses[i] = club.currentVotes[i].status;
        }

        return (voteNames, optionCounts, statuses);
    }

    // returns all options for a specific vote
    function getOptions(uint voteID) external view returns(string[] memory, uint[] memory) {
        Club storage club = clubs[msg.sender];
        require(voteID < club.voteCount, "Invalid voteID");

        Vote storage _vote = club.currentVotes[voteID];
        string[] memory options = new string[](_vote.optionAmount);
        uint[] memory voteCounts = new uint[](_vote.optionAmount);

        for (uint i = 0; i < _vote.optionAmount; i++) {
            options[i] = _vote.options[i];
            voteCounts[i] = _vote.voteCount[i];
        }

        return (options, voteCounts);
    }

    //removes a member by setting their approval status to false
    function removeMember(address userAddress) external {
        Club storage club = clubs[msg.sender];
        require(club.approvedMembers[userAddress], "User not a member");
        
        club.approvedMembers[userAddress] = false;
        club.approvedMemberCount--;
    }

}
