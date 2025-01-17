"use client"

import { useState, useEffect } from "react"
import { Card, CardBody } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { Switch } from "@nextui-org/switch"
import { Input } from "@nextui-org/input"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { GripVertical, Pencil, Trash2, Share2, Star, Mail, LinkIcon, ShoppingBag, BarChart } from 'lucide-react'
import { Twitter } from "../ui/twitter-icon"

export function LinkCard({ link, currentProfileId, onEdit, onDelete, onToggle }) {
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [isEditingUrl, setIsEditingUrl] = useState(false)
    const [title, setTitle] = useState(link.title)
    const [url, setUrl] = useState(link.url)

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

    const handleTitleSubmit = async () => {
        if (title !== link.title) {
            await onEdit(link.id, { title })
        }
        setIsEditingTitle(false)
    }

    const handleUrlSubmit = async () => {
        if (url !== link.url) {
            await onEdit(link.id, { url })
        }
        setIsEditingUrl(false)
    }

    const actionIcons = [
        { icon: Twitter, label: "Share on X" },
        { icon: LinkIcon, label: "Copy link" },
        { icon: Mail, label: "Share via email" },
        { icon: Star, label: "Add to favorites" },
        { icon: Share2, label: "Share" },
        { icon: ShoppingBag, label: "Add to shop" },
        { icon: BarChart, label: "View analytics" },
    ]

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className="mb-4"
        >
            <CardBody className="p-4">
                <div className="grid grid-cols-[auto,1fr,auto] gap-4 items-center">
                    {/* Drag Handle */}
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab active:cursor-grabbing"
                    >
                        <GripVertical className="text-gray-400" />
                    </div>

                    {/* Main Content */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            {isEditingTitle ? (
                                <div className="flex items-center gap-2">
                                    <Input
                                        autoFocus
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        onBlur={handleTitleSubmit}
                                        onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
                                        className="max-w-[200px]"
                                        size="sm"
                                        variant="bordered"
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{title}</span>
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        size="sm"
                                        onPress={() => setIsEditingTitle(true)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {isEditingUrl ? (
                                <div className="flex items-center gap-2">
                                    <Input
                                        autoFocus
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        onBlur={handleUrlSubmit}
                                        onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                                        className="max-w-[300px]"
                                        size="sm"
                                        variant="bordered"
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">{url}</span>
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        size="sm"
                                        onPress={() => setIsEditingUrl(true)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center gap-2">
                            {actionIcons.map((action, index) => (
                                <Button
                                    key={index}
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    className="text-gray-500"
                                >
                                    <action.icon className="w-4 h-4" />
                                </Button>
                            ))}
                            <span className="text-sm text-gray-500 ml-2">
                                {link.clicks} clicks
                            </span>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <Switch
                            isSelected={link.isVisible}
                            onValueChange={(isVisible) => onToggle(link.id, isVisible)}
                            className="mr-2"
                        />
                        <Button
                            isIconOnly
                            variant="light"
                            className="text-gray-400 hover:text-red-500"
                            onPress={() => onDelete(link.id)}
                        >
                            <Trash2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

