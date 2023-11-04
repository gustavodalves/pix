export default class Code {
    readonly value: string

    constructor(value: string) {
        if(!this.validate(value)) throw new Error("bank code not valid")
        this.value = value
    }

    private validate(value: string) {
        return value.length === 4
    }

    static generate() {
        var timestamp = new Date().getTime();
        return new Code(timestamp.toString().substr(-4))
    }
}
