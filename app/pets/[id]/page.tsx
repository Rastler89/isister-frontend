import PetHealthTracker from "../../../components/pet-health"

interface PetPageProps {
    params: { id: string };
}

const PetProfile = async ({ params }: PetPageProps) => {
    const { id } = await params

    return (
        <main className='flex-1'>
            <PetHealthTracker id={id}/>
        </main>
    )
}

export default PetProfile