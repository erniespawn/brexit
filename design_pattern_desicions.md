### Factory Approach

Every new question (dora) is a new smart contract which is created by the factory. This has two major advantages:
 - Less risk, because one contract only stores the reward for one question asked
 - Lower gas cost when interacting with a question, because it contains less data

### Restricting Access

- Only the owner of a question can pick the best answer
- Only the address of the winning answer is able to withdraw funds
- Only the owner can withdraw deposit and reward if nobody answered the question

- It includes a CredentialsConstrained contract (inherited by all the contracts) to add constraints to ownerOnly or authorizedUsers
- It incorporates the functions isOpenToEveryUser and isClosedToAuthorized users for specific cases
-  It includes the possibility of removing credentials of existing users (only allowed to the contract owner).
-  All modifiers include the _; at the end

### Pull over Push Payments

The address of the best answer needs to withdraw the reward, the funds are not automatically transferred.

### State Machine

The question (dora) has different states from "asked", "answered", "winner picked" to "redeemed". Within each state, only certain interactions with the contract are possible, e.g. the reward can only be withdrawn if the best answer is picked.

### Events and Logs

Every time a question is asked, answered or a winner is picked, an event is logged. Therefore it is possible to show in the UI the questions and answers per user. It is cheaper than storing this information in the contract.


### Circuit Breaker

Implemented, in case something goes wrong and a bug is detected, the smart contract can be paused,
until a solution is found. Functions not affected by the circuit break are view / pure functions and
the withdraw function.

* Circuit Breaker:
    * It includes a Lockable contract (inherited by all the contracts) to freeze the instance in case of a bug or a security alert.
    * It allows the dApp owner to stop the execution of future state updates while keeping the read-only functions still available.
    * The use of modifiers allows to customize which functions are "frozen" and which ones are not if the contract has been locked.
    * Only the contract owner can lock/unlock it.



## Design Pattern Decisions

### Restricting Access
- Only the owner of contract can delete users.
- Owner of the contract can freeze the contract in case something goes wrong.
- Owner of the contract has access to delete the contract from the blockchain and all the contract funds will then be transferred to his address.


### Pull over Push Payments
Withdrawl pattern is used as it protects against re-entrancy and denial of service attacks.


### Events and Logs
Every time a user is created or updated or deleted or a donation is made and event is fired which can be catched at the frontend to make it more interactive and improve the UX.


### Circuit Breaker
In the bugs are detected the owner of the contract can freeze the contract till the bug is resolved.