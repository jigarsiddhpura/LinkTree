export const templates = [
    {
        id: "pet-theme",
        name: "Pet Theme",
        imageUrl: "/brown-template.webp", 
        // backgroundColor: "linear-gradient(to bottom, #fd1df8, #fc5745)", // Pink/rose
        backgroundColor: "#ddb85a", // Pink/rose
        description: "Perfect for pet services and animal content"
    },
    {
        id: "minimal-list",
        name: "Minimal List",
        imageUrl: "/blue-template.webp",
        // backgroundColor: "linear-gradient(to bottom, #1dfda0, #45a2fc)", // Light gray
        backgroundColor: "#c3c8de", // Light gray
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
        backgroundColor: "linear-gradient(to bottom, #7eed0c, #00ffda)", // Light yellow
        // backgroundColor: "#ffc515", // Light yellow
        description: "Professional business layout with location focus"
    }
]

export const templateColorMap = new Map(
    templates.map(template => [template.id, template.backgroundColor])
)

