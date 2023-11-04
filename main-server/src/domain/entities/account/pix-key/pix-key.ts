import Entity from "../../../../building-blocks/entity";
import UUID from "../../../../building-blocks/value-objects/uuid";

class PixKeyId extends UUID {}

export enum PixKeyStatus {
    "inactive",
    "active",
}

export enum PixKeyKind {
    "taxId",
    "email",
    "random"
}

export type CreatePixKey = {
    key: string,
    kind: string,
    status: string
}

export type RecoverPixKey = {
    id: string,
    key: string,
    kind: string,
    status: string,
    createdAt: Date
}

export default class PixKey extends Entity {
    private constructor(
        id: PixKeyId,
        readonly key: string,
        readonly kind: string,
        private status: string,
        createdAt: Date
    ) {
        super(id, createdAt)
    }

    getStatus() { return this.status }

    static create(input: CreatePixKey) {
        return new PixKey(
            new PixKeyId(),
            input.key,
            input.kind,
            input.status,
            new Date(),
        )
    }
}
