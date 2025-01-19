import { Spinner } from "@nextui-org/spinner"

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
            <Spinner size="lg" color="white" />
        </div>
    )
}

