export default class AccountNumber {
    readonly value: string

    constructor(value: string) {
        if(this.validate(value)) throw new Error("account number not valid")
        this.value = value
    }

    private validate(value: string) {
        return value.length === 6
    }

    static generate() {
        var timestamp = new Date().getTime();
        return new AccountNumber(timestamp.toString().substr(-6))
    }
}
