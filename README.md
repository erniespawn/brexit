# Referendum Brexit DApp
This is a Referendum platform where users can vote for "Leaving EU" or "Staying in the EU". It runs on a smart contract built with Solidity as the backend.

## Project Flow
  - Users can vote either for leaving the EU or staying in the EU.
  - User can only vote once. 
  - Bounty owner selects a bounty entry and declare it the winner of the bounty.
  - Winner of the bounty claims the reward from the tokens deposited by the bounty owner.

## How to set it up
Requirements:
  - Truffle
  - Node Package Manager (npm)
  - Ganache CLI
  - MetaMask
  
Steps:
  1. Clone the repo
  2. Go into the root directory and run `npm install`
  3. Run Ganache CLI
  4. Run `truffle compile` and `truffle migrate`
  5. Run `npm run start`
  6. Start your browser and authenticate metamask to your local ganache port 9545
  7. Import the seed phrase from Ganache CLI to MetaMask
  8. Start voting for Brexit Referendum

## Test Cases
There are a total of 14 test cases have been written for BountyApp.sol.

The tests cover posting of bounties, submitting of bounty entries, approving of bounty entry and withdrawal of payout. It also covers incorrect / malicious usage of the smart contract. The tests are written to ensure that the flow of the smart contract aligns with the intended flow of the project, and also to ensure that incorrect or malicious usage of the smart contracts are reverted.

Run `truffle test` in the root directory to run the test cases.
