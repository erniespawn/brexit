var Referendum = artifacts.require("./Referendum.sol");

contract("Referendum", function(accounts) {
  var electionInstance;

  it("Topic of this referendum", function() {
    return Referendum.deployed().then(function(instance) {
      return instance.name();
    }).then(function(_name) {
      assert.equal(_name, "UK Referendum for Brexit");
    });
  }); 

  it("Should return vote for Staying in the EU", function() {
    return Referendum.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidates(0);
    }).then(function(receipt) {
        var result = receipt[0];
        assert.equal(result, "Stay in EU");
    });
  });


  it("Should return vote for Leaving the EU", function() {
    return Referendum.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidates(1);
    }).then(function(receipt) {
        var result = receipt[0];
        assert.equal(result, "Leave EU");
    });
  });

it("Voted for Staying in the EU", function() {
  return Referendum.deployed().then(function(instance) {
    electionInstance = instance;
    return electionInstance.vote(1,0, { from: accounts[0] });
  }).then(function(receipt) {
      return electionInstance.voters(accounts[0]);
  }).then(function(result) {
    var resultvote = result[2].toNumber();
    assert.equal(resultvote, 0, "Stay in EU");
  });
});


it("Voted for Leaving the EU", function() {
  return Referendum.deployed().then(function(instance) {
    electionInstance = instance;
    return electionInstance.vote(1,1, { from: accounts[1] });
  }).then(function(receipt) {
      return electionInstance.voters(accounts[1]);
  }).then(function(result) {
    var resultvote = result[2].toNumber();
    assert.equal(resultvote, 1, "Leave the EU");
  });
});
})
