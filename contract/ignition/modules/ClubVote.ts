import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ClubVoteModule = buildModule("ClubVoteModule", (m) => {
  const clubvote = m.contract("ClubVote");
  return { clubvote };
});

export default ClubVoteModule;
