import {faker} from "@faker-js/faker";
import {UserEntity, UserProps} from "@/users/domain/entities/user.entity";

describe("UserEntity unit test", () => {
    let props: UserProps
    let sut: UserEntity
    beforeEach(() => {
        props = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

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
        expect(sut.props.name).toEqual(sut.getName())
        expect(typeof sut.props.name).toBe("string")

        expect(sut.props.email).toBeDefined()
        expect(sut.props.email).toEqual(sut.getEmail())
        expect(typeof sut.props.email).toBe("string")

        expect(sut.props.password).toBeDefined()
        expect(sut.props.password).toEqual(sut.getPassword())
        expect(typeof sut.props.password).toBe("string")

        expect(sut.props.createdAt).toBeDefined()
        expect(sut.props.createdAt).toEqual(sut.getCreatedAt())
        expect( sut.props.createdAt).toBeInstanceOf(Date)
    })
})