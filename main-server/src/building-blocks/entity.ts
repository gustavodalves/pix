import UUID from "./value-objects/uuid";

export default abstract class Entity {
    constructor(
        readonly id: UUID,
        readonly createdAt: Date
    ) {}
}
