
const splashTexts: string[] = [
    "Hello from Plan.it! Plan your next adventure together — with a little help from AI",
    "Hi there! Where will your conversations take you? Let Plan.it and AI decide",
    "Hey travelers! Chat, dream, and let Plan.it find your perfect getaway",
    "Welcome to Plan.it! Turn group chats into travel plans — effortlessly",
    "Greetings from Plan.it — where AI listens, suggests, and books your next escape",
    "Hello! From group banter to booked tickets — all with Plan.it and AI",
    "Hi! Discover destinations born from your conversations with Plan.it",
    "Hey there! Your group chat’s wanderlust, curated by Plan.it's AI",
    "Welcome! Talk trips. Let Plan.it bring them to life",
    "Hello traveler! The future of travel planning: your chats + Plan.it’s AI"
  ];

export default function getSplashText() {
    const randomIndex = Math.floor(Math.random() * splashTexts.length);
    return splashTexts[randomIndex];
}