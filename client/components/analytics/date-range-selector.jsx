"use client"

import { useState } from "react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown"
import { Button } from "@nextui-org/button"
import { ChevronDown, Calendar } from 'lucide-react'
import { format, subDays } from "date-fns"

// interface DateRangeSelectorProps {
//     value: DateRange
//     onChange: (range: DateRange) => void
// }

export function DateRangeSelector({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false)

    const presetRanges = [
        {
            key: "7days",
            label: "Last 7 days",
            range: {
                start: subDays(new Date(), 7),
                end: new Date()
            }
        },
        {
            key: "14days",
            label: "Last 14 days",
            range: {
                start: subDays(new Date(), 14),
                end: new Date()
            }
        },
        // Add custom range option in future
    ]

    const formatDateRange = (range) => {
        return `${format(range.start, "MMM d")} to ${format(range.end, "MMM d")}`
    }

    return (
        <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
            <DropdownTrigger>
                <Button
                    variant="flat"
                    endContent={<ChevronDown className="w-4 h-4" />}
                    startContent={<Calendar className="w-4 h-4" />}
                >
                    {formatDateRange(value)}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Date range options"
                onAction={(key) => {
                    const preset = presetRanges.find(r => r.key === key)
                    if (preset) {
                        onChange(preset.range)
                    }
                }}
            >
                {presetRanges.map((range) => (
                    <DropdownItem key={range.key}>
                        {range.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

