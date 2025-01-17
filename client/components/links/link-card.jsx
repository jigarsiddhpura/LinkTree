"use client"

import { useState, useEffect } from "react"
import { Card, CardBody } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { Switch } from "@nextui-org/switch"

import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { GripVertical, Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/dropdown"


export function LinkCard({ link, onEdit, onDelete, onToggle }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: link.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className="mb-4"
        >
            <CardBody className="flex flex-row items-center p-4 gap-4">
                <div {...attributes} {...listeners}>
                    <GripVertical className="cursor-grab text-gray-400" />
                </div>

                <div className="flex-1">
                    <h3 className="font-medium truncate">{link.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{link.url}</p>
                    <p className="text-xs text-gray-400">{link.clicks} clicks</p>
                </div>

                <div className="flex items-center gap-4">
                    <Switch
                        isSelected={link.isVisible}
                        onValueChange={(isActive) => onToggle(link.id, isActive)}
                    />

                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly variant="light">
                                <MoreHorizontal className="w-5 h-5" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Link actions">
                            <DropdownItem
                                startContent={<Pencil className="w-4 h-4" />}
                                onPress={() => onEdit(link)}
                            >
                                Edit
                            </DropdownItem>
                            <DropdownItem
                                startContent={<Trash2 className="w-4 h-4" />}
                                className="text-danger"
                                color="danger"
                                onPress={() => onDelete(link.id)}
                            >
                                Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardBody>
        </Card>
    )
}

