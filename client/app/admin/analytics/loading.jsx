import { Spinner } from "@nextui-org/spinner"

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Spinner size="3xl" color="secondary" />
        </div>
    )
}

