export default interface Pet {
    id: number
    user_id: number
    name: string
    gender: string
    birth: string
    code: string
    breed_id: number
    status: number
    image: string
    character: string | number | undefined | readonly string[]
    description: string | null
    created_at: string
    updated_at: string
    hash: string
    is_in_adoption: number
    breed_en: string
    breed_es: string
    specie_id: number
    specie_en: string
    specie_es: string
    scheduleWalks: Array<Array<string>>
    scheduleDiets: Array<Array<string>>
    vaccines: any
    allergies: any
    walkroutines: any
    diets: any
    vetvisits: any
    treatments: any
    surgeries: any
    medicaltests: any
    constants: any
}