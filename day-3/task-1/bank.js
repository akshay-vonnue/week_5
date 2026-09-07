"use strict";
class BankAccount {
    owner;
    balance;
    #bar;
    tsBar;
    accountNo = '$214211412';
    constructor(owner, balance) {
        this.owner = owner;
        this.balance = balance;
        this.owner = owner;
        this.balance = balance;
        this.#bar = 'javascript preserves the # making it private even after compilation';
        this.tsBar = 'ts removes the private field after compilation';
    }
    transfer(amount) {
        this.balance -= amount;
    }
}
class SavingsAccount extends BankAccount {
    constructor(owner, balance) {
        super(owner, balance);
    }
    transferAmount() {
        this.transfer(2000);
    }
}
let sa = new SavingsAccount("akshay", 50000);
// sa.transfer(3000)


// https://dev.to/old-starchy/private-vs-private-3cbd