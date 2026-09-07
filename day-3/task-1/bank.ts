class BankAccount{
    #bar: string;
    private tsBar: string;
    
    readonly accountNo = '$214211412'
    constructor(public readonly owner: string,private balance: number) {
        this.owner = owner
        this.balance = balance

        this.#bar = 'javascript preserves the # making it private even after compilation'
        this.tsBar = 'ts removes the private field after compilation'
    }

    protected transfer(amount: number) {
       this.balance -= amount 
    }
}

class SavingsAccount extends BankAccount{
    constructor(owner:string,balance:number) {
        super(owner,balance)
    }

    transferAmount() {
        this.transfer(2000)
    }
}

let sa = new SavingsAccount("akshay", 50000)
// sa.transfer(3000)