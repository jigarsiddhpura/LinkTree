"use client"

import { useState, useEffect } from "react"
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
import { LinkCard } from "./link-card"
import { LinkModal } from "./link-modal"
import { Button } from "@nextui-org/button"
import { Plus } from 'lucide-react'

export function LinkCollection({ currentProfileId, links, onLinkChange, linkOrder, onLinkOrderChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingLink, setEditingLink] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        const updateOrder = async () => {
            if (!currentProfileId) return
            try {
                await fetch(`https://api.inflow.chat/api/links/order`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ linkOrder }),
                })
            } catch (error) {
                console.error('Error updating link order:', error)
            }
        }

        const handleBeforeUnload = () => {
            updateOrder()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            updateOrder()
        }
    }, [currentProfileId, linkOrder])

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            onLinkChange((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id)
                const newIndex = items.findIndex((i) => i.id === over.id)
                const newItems = arrayMove(items, oldIndex, newIndex)
                onLinkOrderChange(newItems.map(item => item.id))
                return newItems
            })
        }
    }

    const handleEdit = async (id, updates) => {
        if (!currentProfileId) return
        try {
            const response = await fetch(`https://api.inflow.chat/api/links/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            })

            if (!response.ok) throw new Error('Failed to update link')

            onLinkChange(links.map(link =>
                link.id === id ? { ...link, ...updates } : link
            ))
        } catch (error) {
            console.error('Error updating link:', error)
        }
    }

    const handleCreate = async (newLink) => {
        if (!currentProfileId) return
        try {
            const response = await fetch(`https://api.inflow.chat/api/links`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newLink,
                    profileId: currentProfileId
                }),
            })

            if (!response.ok) throw new Error('Failed to createlink')
            const createdLink = await response.json()

            onLinkChange(prevLinks => [...prevLinks, createdLink])
            onLinkOrderChange(prevOrder => [...prevOrder, createdLink.id])
        } catch (error) {
            console.error('Error creating link:', error)
        }
    }

    const handleDelete = async (id) => {
        if (!currentProfileId) return
        try {
            await fetch(`https://api.inflow.chat/api/links/${id}`, {
                method: 'DELETE',
            })
            onLinkChange(links.filter(link => link.id !== id))
            onLinkOrderChange(linkOrder.filter(linkId => linkId !== id))
        } catch (error) {
            console.error('Error deleting link:', error)
        }
    }

    const handleToggle = async (id, isVisible) => {
        await handleEdit(id, { isVisible })
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
                            currentProfileId={currentProfileId}
                            onEdit={handleEdit}
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
                onSave={handleCreate}
                initialData={editingLink || undefined}
                title={editingLink ? "Edit Link" : "Add New Link"}
            />
        </div>
    )
}

