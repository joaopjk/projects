import {v4 as guid} from "uuid"

export abstract class Entity<T = any> {
    public readonly _id: string
    public readonly props: T

    protected constructor(props: T, id: string) {
        this.props = props
        this._id = id ?? guid()
    }

    get id() {
        return this._id
    }

    toJSON(): Required<{ id: string } & T> {
        return {
            id: this._id,
            ...this.props
        } as Required<{ id: string } & T>
    }
}