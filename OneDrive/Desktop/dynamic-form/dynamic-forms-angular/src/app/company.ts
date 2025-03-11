export interface Company {
    name: string
    locations: LocationDto[]
}

export interface LocationDto {
    city: string
    country: string
    streetAddress: string
    phoneNumbers: Phone[]
}

export interface Phone {
    code: string
    number: string
}