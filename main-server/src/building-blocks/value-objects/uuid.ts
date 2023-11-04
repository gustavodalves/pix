export default class UUID {
    private readonly id: string

    constructor(
        id?: string
    ) {
        this.id = id || this.generate()
    }

    getValue() {
        return this.id
    }

    private generate() {
        return crypto.randomUUID()
    }
}
