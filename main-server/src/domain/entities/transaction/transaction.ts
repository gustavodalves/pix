import Entity from "../../../building-blocks/entity";
import UUID from "../../../building-blocks/value-objects/uuid";
import Account from "../account/account";
import PixKey from "../pix-key/pix-key";
import Amount from "./amount";

export enum TransactionStatus {
    TransactionPending   = "pending",
	TransactionCompleted = "completed",
	TransactionError     = "error",
	TransactionConfirmed = "confirmed",
}

class TransactionId extends UUID {}

type CreateTransactionCommand = {
    accountFrom: Account,
    pixKeyTo: PixKey,
    amount: number,
    description: TransactionStatus
}

export default class Transaction extends Entity {
    private constructor(
        transactionId: TransactionId,
        readonly accountFrom: Account,
        readonly pixKeyTo: PixKey,
        readonly amount: Amount,
        private status: string,
        readonly description: TransactionStatus,
        createdAt: Date,
    ) {
        super(transactionId, createdAt)
    }

    static create(input: CreateTransactionCommand) {
        return new Transaction(
            new TransactionId(),
            input.accountFrom,
            input.pixKeyTo,
            new Amount(input.amount),
            TransactionStatus.TransactionPending,
            input.description,
            new Date()
        )
    }

    getStatus() {
        return this.status
    }

    complete() {
        this.status = TransactionStatus.TransactionCompleted
    }

    cancel() {
        this.status = TransactionStatus.TransactionError
    }
}