export const templates = [
    {
        id: "pet-theme",
        name: "Pet Theme",
        imageUrl: "/brown-template.webp", 
        backgroundColor: "#FFE4E1", // Pink/rose
        description: "Perfect for pet services and animal content"
    },
    {
        id: "minimal-list",
        name: "Minimal List",
        imageUrl: "/blue-template.webp",
        backgroundColor: "#F5F5F5", // Light gray
        description: "Clean and minimal list-style layout"
    },
    {
        id: "photography",
        name: "Photography",
        imageUrl: "/insta-template.webp",
        backgroundColor: "#8B4513", // Brown
        description: "Showcase your photography portfolio"
    },
    {
        id: "business",
        name: "Business",
        imageUrl: "/map-template.webp",
        backgroundColor: "#FAFAD2", // Light yellow
        description: "Professional business layout with location focus"
    }
]

export const templateColorMap = new Map(
    templates.map(template => [template.id, template.backgroundColor])
)

