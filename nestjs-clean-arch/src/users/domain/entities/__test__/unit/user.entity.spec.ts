import {UserEntity, UserProps} from "@/users/domain/entities/user.entity";
import {UserDataBuilder} from "@/users/domain/testing/helpers/user-data-builder";

describe("UserEntity unit test", () => {
    let props: UserProps
    let sut: UserEntity
    beforeEach(() => {
        props = UserDataBuilder({})
        sut = new UserEntity(props)
    })

    it("Constructor method", () => {
        expect(sut.props.name).toEqual(props.name)
        expect(sut.props.email).toEqual(props.email)
        expect(sut.props.password).toEqual(props.password)
        expect(sut.props.createdAt).toBeInstanceOf(Date)
    })

    it("Getter all fields", () => {
        expect(sut.props.name).toBeDefined()
        expect(sut.props.name).toEqual(sut.name)
        expect(typeof sut.props.name).toBe("string")

        expect(sut.props.email).toBeDefined()
        expect(sut.props.email).toEqual(sut.email)
        expect(typeof sut.props.email).toBe("string")

        expect(sut.props.password).toBeDefined()
        expect(sut.props.password).toEqual(sut.password)
        expect(typeof sut.props.password).toBe("string")

        expect(sut.props.createdAt).toBeDefined()
        expect(sut.props.createdAt).toEqual(sut.createdAt)
        expect( sut.props.createdAt).toBeInstanceOf(Date)
    })
})