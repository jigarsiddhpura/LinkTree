"use client"

import { useState } from "react"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
// import { Link, LinkFormData } from "@/types/link"
import { LinkCard } from "./link-card"
import { LinkModal } from "./link-modal"
import { Button } from "@nextui-org/button"
import { Plus } from 'lucide-react'

export function LinkCollection() {
    const [links, setLinks] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingLink, setEditingLink] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            setLinks((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id)
                const newIndex = items.findIndex((i) => i.id === over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    const handleSave = (data) => {
        if (editingLink) {
            setLinks(links.map(link =>
                link.id === editingLink.id
                    ? { ...link, ...data }
                    : link
            ))
            setEditingLink(null)
        } else {
            const newLink = {
                id: Math.random().toString(36).substr(2, 9),
                ...data,
                isActive: true,
                clicks: 0,
                position: links.length,
            }
            setLinks([...links, newLink])
        }
    }

    const handleDelete = (id) => {
        setLinks(links.filter(link => link.id !== id))
    }

    const handleToggle = (id, isActive) => {
        setLinks(links.map(link =>
            link.id === id ? { ...link, isActive } : link
        ))
    }

    return (
        <div>
            <Button
                className="w-full bg-purple-600 text-white mb-8"
                startContent={<Plus className="w-5 h-5" />}
                onPress={() => setIsModalOpen(true)}
            >
                Add
            </Button>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={links}
                    strategy={verticalListSortingStrategy}
                >
                    {links.map((link) => (
                        <LinkCard
                            key={link.id}
                            link={link}
                            onEdit={(link) => {
                                setEditingLink(link)
                                setIsModalOpen(true)
                            }}
                            onDelete={handleDelete}
                            onToggle={handleToggle}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <LinkModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setEditingLink(null)
                }}
                onSave={handleSave}
                initialData={editingLink || undefined}
                title={editingLink ? "Edit Link" : "Add New Link"}
            />
        </div>
    )
}

