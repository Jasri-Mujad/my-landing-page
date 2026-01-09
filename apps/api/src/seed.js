const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Feed = require('./models/Feed');
const Mood = require('./models/Mood');
const Profile = require('./models/Profile');
const User = require('./models/User');
const bcrypt = require('bcryptjs');


dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jasri-space')
    .then(() => {
        console.log('Connected to MongoDB');
        seedData();
    })
    .catch(err => console.error(err));

const projects = [
    {
        title: "Personal CMS",
        description: "A full-stack content management system built to manage my blog and portfolio content. Features rich-text editing, media uploads, and role-based access.",
        tags: ["Next.js", "Supabase", "Tailwind"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADRjO7j0NILqzFoCgeoNsQ5GYYn_En4VUPkb0XW87sm0Thss2H1Vi_s-YdHEnLc5cgMMGUvts_HQq3ye00wkU27XA8FrFN-smIzqNCz-WKUsdS_2pN05jzeZ1HD58BwLU5H1_bPGL5PUFFlmVhzLUHPpylh3rSnS0kZo37ah6oTo4xjWtNsTmw4sddAteT-hsohDDqgPzNWanMt8KweyxX_tZPst1r81-O4ofmXpxNuDiBa_Cwi8NpNv4_f3f52XskvqrAmiwMgPg",
        link: "#"
    },
    {
        title: "TaskFlow Tracker",
        description: "Lightweight productivity tool focusing on minimalism and keyboard-first interactions. Includes Pomodoro timer and dark mode support.",
        tags: ["Vue 3", "Firebase", "Pinia"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoIQLSKhxmXUH7usGPjTjQb6MiynUt0VVk8O9dCFpqQevA1KQA_XxgrBKUEjIrFgxrczZkGh0YH8rYENDFC6TjyLquL34Sm8-vDDxea024IadZWLqsBG-EATj6r17r1905wIT72a3-Uwu9Wd1oWT1vdxzyhppZ6driZFiOtLkElTOBWHhNIU-KmgWHXDCLNiSydd1ygGto9jOzDdLCmU7vNkBqvlgnnSn05S9SCvj7c6bJp2gcXSQVr7EYzXSEyHfo7s9VkhF4OMM",
        link: "#"
    },
    {
        title: "CryptoDash",
        description: "Real-time cryptocurrency tracking dashboard connecting to multiple exchange APIs via WebSockets. Visualizes price movements with D3.js.",
        tags: ["React", "D3.js", "WebSockets"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC33MpNeOH1-Of0oGRq-Sl4goF3E6q-1dMbVljaPnzF4veqlTFkqoNx-E6toSDHxyD5LD60EYtn_0c4XIHJbq5yp0BXZd0n8WrqpiGMazyi8t8TLsZnEeyHKeA61Ozr785XoCXQCuCG_TQBtx73LgM0nz_nQQbv_ebXvfz10E1aqsLAjVdu0nCVk5VuRfA5tVufyiUeINDk2m0MO6gnSXb4PuepeFq-dY9qeyBrgYT9mOkLNpfU8sIQO6THAh6jl_kaZNMuqpjtgqQ",
        link: "#"
    },
    {
        title: "DevUI Kit",
        description: "An open-source component library for React applications. Accessible, themable, and built with modern CSS-in-JS practices.",
        tags: ["TypeScript", "Storybook", "NPM"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0YCCMtZVkG_X3gt_pGoKOGRscZ274FGcAZc69twZYsjfpoU8jGJh3NGO5AunI10tsJCFO9Ehdp3I7FovFCU9Ot2x-duBJ6EkpD-U2NcsWY-FQAr1RCt4XrHTVMU4_trIO12Ndawksu1Za0V2ZZT7JNQnSyszBrjFbAs0Fp5zlNad_WWU-U98T4uYWWmRyJOlJt2qJZz7_lMk1BCVpAHOqp2olu9P7q_tu9rtecidXCWsZIPrMPhz1o-z-pv01UzHsLqnUuzH-K9A",
        link: "#"
    },
    {
        title: "ColorAI",
        description: "AI-powered color palette generator. Upload an image to extract dominant colors or generate accessible color combinations based on text input.",
        tags: ["Python", "Flask", "OpenAI"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOS8YbvfLzP3LmGXxCJcJvApaYL4rlHoThaGzP0w4aKlHUBsfRkAuHPgTH7LIPcVn0hjnvGg2eyWhTnn6BVS-xcZb9HUlu36M7tMxMf2CduZl8DcOZMrT2jCKgBeNbHMR8YB-HI5sECq9wwKRrxNsFMcWwY-KlIpp-tOc4sl9vPEZemSEqyyjIlclrxTUkTq3EwgnwOMNcXAUOEBbrAYt52Ex6iBpB8u5JnNZqycUNSbIsDr4o-rWg4VY4nG5-xGz1D_tOaOp4UXo",
        link: "#"
    }
];

const feeds = [
    {
        type: 'Blog',
        title: "Building a CMS in 2024",
        content: "Why I decided to build my own content management system instead of using WordPress or Ghost. A deep dive into the architecture.",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvCRau4tnvq1EAX0ggUNP2-qwvWhkDnaGscHQYzgGAa7lKT-mwpFXphS4Z8ZFs2PrmYQcdxyERkoD0GCDX3ePomozSmZMomkAyLzhClXjY4B4le_OGtYwxt15ljqZjPQAQ90q2fBKaGOGLSfRHgflFmnxHa76xQ0JO9FlH5zru4mp3k97sEfLrLzPxrOstlQsr7550S668C5wiQt5rhJClyvAniYZFFreZL3RJAqXqFE-oPL4uFQ2iD0JJn3hZSnM8_GFmXBFmGNg",
        date: new Date('2024-10-12'),
        link: "#"
    },
    {
        type: 'Project',
        title: "MVP Launch: TaskFlow",
        content: "Finally shipped the first version of my productivity tool. It's rough around the edges but functional. Here is what I learned during the launch week.",
        date: new Date('2024-10-10'),
        link: "#"
    },
    {
        type: 'Photo',
        title: "Weekend in the PNW",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgUJjSjycgBMw__htEOUvrzY-CemsUcN--YN64M4AGisTvXXxLZjpKrE_a-M-FZaJHzlcQg_XZM-xa6G73MRi0tuTH87gLkK7LMsTJXsU5Ze4QAn4EWNtOjMEmEW2C133oZvdlb_Zkmcw20JnZkMk7Uulusacl8priIpjQwFNcFUd-2-0CkVgWizYsXzCERJdniFj16G3wv-dAnPzzvg3-CmF2DAYuGP2VJyov6L4KIP63CUWMuGpGE5k3zwRVYsTIvYtbIi9ugno",
        date: new Date('2024-10-05'),
        meta: { location: "Oregon, USA" },
        link: "#"
    },
    {
        type: 'Note',
        title: "Quick thoughts on LLMs",
        content: "The context window is getting larger, but are we getting smarter about how we use it? Just a quick brain dump on the latest updates.",
        date: new Date('2024-10-03'),
        link: "#"
    }
];

const mood = {
    title: "Coding late into the night lo-fi mix",
    artist: "Lofi Girl",
    sourceUrl: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZQbbQvYCmPYPGN4GpkQTqFYMoXxaRs5lgd7HDDu0qzf2NaFa2a9SF2z932VtqlJHsnekHS_W1-hocWD1XsMYeV8EI5ZmXHXYj6RCiONGfgRqrLMTNGm3c-scrHe2NfYqbgOju8HOP99mmXx_YN5KogJjvsUF6Q4G_yNZRefjU-oUT3s0PLUcuwNXo5tV6dZmOyZdCRRpTw0-_rjhJv1ESY-WtxzAEh4WLoMeSiBBpa__NkXftwfhiUbCfWDE00c4obgbYYOXduHA",
    isActive: true
};

const profile = {
    name: "Jasri Mujad",
    title: "Cloud Engineer",
    bio: "Building cloud infrastructure and creative solutions.",
    socialLinks: [
        { platform: 'tiktok', url: 'https://www.tiktok.com/@jasriiii_?lang=ms-MY', label: 'TikTok' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/jasri-mujad/', label: 'LinkedIn' },
        { platform: 'github', url: 'https://github.com/Jasri-Mujad', label: 'GitHub' }
    ],
    isActive: true
};

async function seedData() {
    try {
        await Project.deleteMany({});
        await Feed.deleteMany({});
        await Mood.deleteMany({});
        await Profile.deleteMany({});
        // Don't delete users to preserve accounts, or strictly reset if dev requires.
        // For this seed, let's ensure admin exists.

        const existingAdmin = await User.findOne({ username: 'admin' });
        if (!existingAdmin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await User.create({
                username: 'admin',
                email: 'admin@jasricozyspace.com',
                password: hashedPassword
            });
            console.log('✅ Admin user created (admin / admin123)');
        }


        await Project.insertMany(projects);
        await Feed.insertMany(feeds);
        await Mood.create(mood);
        await Profile.create(profile);

        console.log('✅ Data seeded successfully');
        process.exit();
    } catch (err) {
        console.error('❌ Error testing:', err);
        process.exit(1);
    }
}
