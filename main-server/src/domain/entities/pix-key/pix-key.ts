import Entity from "../../../building-blocks/entity";
import UUID from "../../../building-blocks/value-objects/uuid";

class PixKeyId extends UUID {}

export enum PixKeyStatus {
    Inactive = "inactive",
    Active = "active",
}

export enum PixKeyKind {
    TaxId = "taxId",
    Email = "email",
    Random = "random"
}

export type CreatePixKey = {
    key: string,
    kind: PixKeyKind,
    status: PixKeyStatus
}

export type RecoverPixKey = {
    id: string,
    key: string,
    kind: PixKeyKind,
    status: PixKeyStatus
    createdAt: Date
}

export default class PixKey extends Entity {
    private constructor(
        id: PixKeyId,
        readonly key: string,
        readonly kind: PixKeyKind,
        private status: PixKeyStatus,
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

    inactive() {
        this.status = PixKeyStatus.Inactive
    }
}
