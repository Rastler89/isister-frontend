import { Suspense } from "react";
import PetHealthTracker from "../../../components/pet-health"
import LoadingPetProfile from "./loading";

interface PetPageProps {
    params: Promise<{ id: string }>;
}

const PetProfile = async ({ params }: PetPageProps) => {
    const { id } = await params

    return (
        <main className='flex-1'>
            <Suspense fallback={<LoadingPetProfile />}>
                <PetHealthTracker id={id}/>t
            </Suspense>
        </main>
    )
}

export default PetProfile