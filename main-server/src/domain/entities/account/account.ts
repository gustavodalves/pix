import AggregateRoot from "../../../building-blocks/aggregate";
import Entity from "../../../building-blocks/entity";
import UUID from "../../../building-blocks/value-objects/uuid";
import Bank from "../bank/bank";
import AccountNumber from "./number";
import PixKey from "./pix-key/pix-key";

class AccountId extends UUID {}

type AccountCreate = {
    bank: Bank
    ownerName: string
}

type AccountRecover = {
    id: string
    bank: Bank
    ownerName: string
    accountNumber: string
    createdAt: Date,
    pixKeys: PixKey[]
}

export default class Account extends AggregateRoot {
    private constructor(
        id: AccountId,
        readonly bank: Bank,
        readonly ownerName: string,
        readonly accountNumber: AccountNumber,
        createdAt: Date,
        readonly pixKeys: PixKey[]
    ) {
        super(id, createdAt)
    }

    static create(
        input: AccountCreate
    ) {
        return new Account(
            new AccountId(),
            input.bank,
            input.ownerName,
            AccountNumber.generate(),
            new Date(),
            []
        )
    }

    static recover(
        input: AccountRecover
    ) {
        return new Account(
            new AccountId(input.id),
            input.bank,
            input.ownerName,
            new AccountNumber(input.accountNumber),
            input.createdAt,
            input.pixKeys
        )
    }

    registerPixKey(key: string, kind: string, status: string) {
        const pixKey = PixKey.create(
            {
                key, kind , status
            }
        )

        this.pixKeys.push(pixKey)
    }
}