"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Progress } from "@nextui-org/progress"
import { Button } from "@nextui-org/button"
import { templates, templateColorMap } from "@/lib/templates"
import { TemplateCard } from "@/components/templates/template-card"
import { Suspense } from 'react'

export default function TemplatesPage() {
    const router = useRouter()
    // const username = useSearchParams().get('username')
    function UsernameSelector() {
        return useSearchParams().get('username')
    }
    const username = UsernameSelector();

    const [selectedTemplate, setSelectedTemplate] = useState(null)

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template)
    }

    const handleContinue = () => {
        if (selectedTemplate) {
            // Store the selected template and color in localStorage or state management
            localStorage.setItem('selectedTemplate', selectedTemplate.id)
            localStorage.setItem('templateColor', templateColorMap.get(selectedTemplate.id) || '')

            // Navigate to the next page
            router.push(`/new-profile/title-image-bio?username=${username}`)
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="min-h-screen bg-gray-50">
                {/* Progress and Skip */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-white">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                        <div className="flex-1 flex justify-center">
                            <Progress
                                value={33}
                                className="max-w-xs"
                                color="secondary"
                            />
                        </div>
                        <Button
                            variant="light"
                            onPress={() => router.push(`/new-profile/title-image-bio?username=${username}`)}
                        >
                            Skip
                        </Button>
                    </div>
                </div>


                {/* Main Content */}
                <main className="max-w-5xl mx-auto px-4 pt-20 pb-24">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">
                            Select a template
                        </h1>
                        <p className="text-gray-600">
                            Pick the style that feels right - you can add your content later
                        </p>
                    </div>

                    {/* Template Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {templates.map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                isSelected={selectedTemplate?.id === template.id}
                                onSelect={handleTemplateSelect}
                            />
                        ))}
                    </div>
                </main>

                {/* Continue Button */}
                {selectedTemplate && (
                    <div className="fixed bottom-8 left-0 right-0 p-4 flex justify-center">
                        <div className="max-w-7xl mx-auto">
                            <Button
                                color="secondary"
                                size="lg"
                                className="w-[40rem] rounded-full"
                                onPress={handleContinue}
                            >
                                Continue with {selectedTemplate.name}
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </Suspense>
    )
}
