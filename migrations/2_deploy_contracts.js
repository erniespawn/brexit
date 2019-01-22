var Referendum = artifacts.require("Referendum");

module.exports = function(deployer) {
  deployer.deploy(Referendum, "UK Referendum for Brexit", "Stay in EU", "Leave EU");
};
