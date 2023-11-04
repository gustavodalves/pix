import Entity from "../../../building-blocks/entity";
import UUID from "../../../building-blocks/value-objects/uuid";
import Code from "./code";

export type CreateBank = {
    name: string
}

export default class Bank extends Entity {
    private constructor(
        id: UUID,
        private readonly code: Code,
        private name: string,
        createdAt: Date,
    ) {
        super(id, createdAt)
    }

    getCode() { return this.code }
    getName() { return this.name }

    setName(name: string) { this.name = name }

    static create(input: CreateBank) {
        return new Bank(
            new UUID(),
            Code.generate(),
            input.name,
            new Date()
        )
    }
}
