"use client"

import { useState } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/modal"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
// import { LinkFormData } from "@/types/link"

// interface LinkModalProps {
//     isOpen: boolean
//     onClose: () => void
//     onSave: (data: LinkFormData) => void
//     initialData?: LinkFormData
//     title?: string
// }

export function LinkModal({
    isOpen,
    onClose,
    onSave,
    initialData,
    title = "Add New Link"
}) {
    const [formData, setFormData] = useState(
        initialData || { title: "", url: "" }
    )
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        if (!formData.title) newErrors.title = "Title is required"
        if (!formData.url) {
            newErrors.url = "URL is required"
        } else {
            try {
                new URL(formData.url)
            } catch {
                newErrors.url = "Please enter a valid URL"
            }
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validateForm()) {
            onSave(formData)
            onClose()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <div className="space-y-4">
                        <Input
                            label="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            errorMessage={errors.title}
                            isInvalid={!!errors.title}
                        />
                        <Input
                            label="URL"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            errorMessage={errors.url}
                            isInvalid={!!errors.url}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="flat" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onPress={handleSubmit}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

