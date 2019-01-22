App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../ref.json', function(data) {
      var petsRow = $('#petsRow');
      var refTemplate = $('#refTemplate');

      for (i = 0; i < data.length; i ++) {
        refTemplate.find('.panel-title').text(data[i].name);
        refTemplate.find('img').attr('src', data[i].picture);
        refTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(refTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {


// Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
}
web3 = new Web3(App.web3Provider);



    return App.initContract();
  },

  initContract: function() {

/*  Part 1 Begin
$.getJSON('Adoption.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
  var AdoptionArtifact = data;
  App.contracts.Adoption = TruffleContract(AdoptionArtifact);

  // Set the provider for our contract
  App.contracts.Adoption.setProvider(App.web3Provider);

  // Use our contract to retrieve and mark the adopted pets
  return App.markAdopted();
});
Part 1 Ends */ 

$.getJSON('Referendum.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
  var ReferendumArtifact = data;
  App.contracts.Referendum = TruffleContract(ReferendumArtifact);

  // Set the provider for our contract
  App.contracts.Referendum.setProvider(App.web3Provider);

  // Use our contract to retrieve and mark the adopted pets
  return App.markAdopted();
});



    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {

    /* Part 2 Begin
var adoptionInstance;

App.contracts.Adoption.deployed().then(function(instance) {
  adoptionInstance = instance;

  return adoptionInstance.getAdopters.call();
}).then(function(adopters) {
  for (i = 0; i < adopters.length; i++) {
    if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});
Part 2 Ends */

var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];
  console.log("accountID = " + account);

App.contracts.Referendum.deployed().then(function(instance) {
  adoptionInstance = instance;

  return adoptionInstance.voters.call(account);
/* TESTING }).then(function(adopters) {
  // if statment
  for (i = 0; i < adopters.length; i++) {
   if (adopters[0] == true) {
    console.log(adopters);
    $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
    $("#accountAddress").html("You already Voted ");
    console.log(adopters[i]);
   }
   else {
    console.log("niet waar " + adopters[i]);
   };
  }; TESTING */ 

}).then(function(adopters) {
  // if statment
  for (i = 0; i < adopters.length; i++) {
   if (adopters[0] == true) {
    if (adopters[1] == 0) {
      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
      $("#accountAddress1").html("You voted to Stay in EU");
    }
    else {
       $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
       $("#accountAddress2").html("You voted to Leave the EU"); 
      }
   }
   else {
    console.log("niet waar " + adopters[i]);
   };
  };

   
}).catch(function(err) {
  console.log(err.message);
});
/* Start
App.contracts.Election.deployed().then(function(instance) {
  adoptionInstance = instance;
  return adoptionInstance.voters.call(account);
}).then(function(adopters) {
  for (i = 0; i < adopters.length; i++) {
      //console.log("hallo kenny " + adopters[2]);
      if (adopters[2] == 0) {
        if (adopters[0] == false) {
          $("#accountAddress3").html("You Voted Not Voted Yet");
        }
        else { $("#accountAddress1").html("You Voted for Staging in EU"); }
      }
      
    
    
  }
})

// End */
});


  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

/* Part 3 Begin  */
var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Referendum.deployed().then(function(instance) {
    adoptionInstance = instance; 
      
      return adoptionInstance.vote(petId, petId, {from: account});
      
    // Execute adopt as a transaction by sending account
    // return adoptionInstance.adopt(petId, {from: account});
  }).then(function(result) {
    return App.markAdopted();
  }).catch(function(err) {
    console.log(err.message);
  });
});
/* Part 3 Ends */
}
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
