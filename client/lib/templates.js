export const templates = [
    {
        id: "pet-theme",
        name: "Pet Theme",
        imageUrl: "https://mfe-onboarding.production.linktr.ee/images/33635.8ecf7511cdba6acec395.webp", 
        backgroundColor: "#FFE4E1", // Pink/rose
        description: "Perfect for pet services and animal content"
    },
    {
        id: "minimal-list",
        name: "Minimal List",
        imageUrl: "https://mfe-onboarding.production.linktr.ee/images/96485.cd786845d20d55308151.webp",
        backgroundColor: "#F5F5F5", // Light gray
        description: "Clean and minimal list-style layout"
    },
    {
        id: "photography",
        name: "Photography",
        imageUrl: "https://mfe-onboarding.production.linktr.ee/images/63373.3168aca8cf7a705e29ab.webp",
        backgroundColor: "#8B4513", // Brown
        description: "Showcase your photography portfolio"
    },
    {
        id: "business",
        name: "Business",
        imageUrl: "https://mfe-onboarding.production.linktr.ee/images/37640.27595ccfe1b1af524231.webp",
        backgroundColor: "#FAFAD2", // Light yellow
        description: "Professional business layout with location focus"
    }
]

export const templateColorMap = new Map(
    templates.map(template => [template.id, template.backgroundColor])
)

