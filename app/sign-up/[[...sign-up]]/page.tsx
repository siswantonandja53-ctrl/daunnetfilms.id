import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className=' min-h-screen w-full mx-auto flex justify-center items-center'>
            <SignUp />
        </div>
    )
}