export default class Amount {
    readonly value: number

    constructor(
        value: number
    ) {
        Amount.validate(value)

        this.value = value
    }

    static validate(value: number) {
        if(value >= 0) throw new Error("invalid value")
    }
}
