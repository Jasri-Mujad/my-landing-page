const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
    platform: { type: String, required: true }, // For social media logos on homepage: 'tiktok', 'linkedin', 'github', etc.
    url: { type: String, required: true },
    label: { type: String }, // Optional display name
    icon: { type: String }   // Optional icon class or URL
});

const profileSchema = new mongoose.Schema({
    // Existing
    name: { type: String, required: true },
    title: { type: String, required: true }, // e.g., "Cloud Engineer"
    bio: { type: String },
    email: { type: String },
    avatarUrl: { type: String },
    resumeUrl: { type: String },
    socialLinks: [socialLinkSchema],
    isActive: { type: Boolean, default: true },

    // New for About Page
    heroTitle: { type: String, default: "HISTORY OF ALEX TURNER" },
    heroImage: { type: String, default: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEz8-I2zPC3k1fnFJ0eQq9i-jDI5ykCElz4-GmYlfYR_p6BGgD_iaLNjtNcxdOXtuEfzwGP_wsFza2tig1rAKgBufw8FJ9cFKtLvfl8rpTEoohMaIPY6TXlIR3gqsAbnWQF0qVlejhD7jTvLhMv_G6adpvU74r9cC60yoxadqbZ01aXzCIvc83y6v6ko1lqhUB6PRLJMfTkIZsFj3oERuJNCttjXsxSgAEoV0_GofyUAjnz9Z7P8E1vG6SRunz8n4ISu401SMygYPM" },
    bandImage: { type: String, default: "https://lh3.googleusercontent.com/aida-public/AB6AXuALBUXstCOW4WyPYUrUbL01LNB2a8XY0lcEUkX1ukwVsGbXpQl6fzcSSlc6HGfylu6_2j7pzkjmVyyUmk_lzW-x9FYq9OYh8pDj4hrEMv6ME82AuCodt2eDlu1pnFKYJc2GVeqs-88uBR6q6yCJtZowyWlePQltiwoNiEVeTDgHjX74YzBfq9t2NPxiS64JXIIANewhE2Yp3iUesWjvAuWdEvQxauiN3IbKGb2aK0zBVoNjJ5Df0KW-5yFdKNfmUDUwHqq1Ihm-YLAL" },
    genres: { type: String, default: "INDIE ROCK, GARAGE ROCK, PSYCHEDELIC POP" },
    quote: { type: String, default: '"As a child he dreamed of having a band. He was a rocker boy. But when the accident happened, he lost that dream... or so he thought."' }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
