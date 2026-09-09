// ── PROJECT DATA ──────────────────────────────────────────
const PROJECTS = {
    twd: {
        title: 'The Walking Dead: Streets of Survival',
        desc: "Arcade brawler set in the world of AMC's The Walking Dead, shipped on Steam, Nintendo Switch, PlayStation and Xbox. I architected and implemented the core gameplay systems of this licensed multi-platform title, working closely with designers to keep everything data-driven and tunable without code changes.",
        studio: { name: 'Odaclick', url: 'https://www.odaclick.com/' },
        links: [
            { url: 'https://store.steampowered.com/app/3777850/The_Walking_Dead_Streets_of_Survival/', label: 'Steam', icon: 'fa-brands fa-steam' },
            { url: 'https://www.nintendo.com/es-ar/store/products/the-walking-dead-streets-of-survival-switch-2/', label: 'Nintendo Switch', icon: 'fa-solid fa-gamepad' },
            { url: 'https://store.playstation.com/es-ar/concept/10019963/', label: 'PlayStation', icon: 'fa-brands fa-playstation' },
            { url: 'https://www.xbox.com/es-AR/games/store/the-walking-dead-streets-of-survival/9NP5QDMCJF5W', label: 'Xbox', icon: 'fa-brands fa-xbox' }
        ],
        tags: ['Professional','Gameplay','Systems','Console','Steamworks','Optimization'],
        features: [
            'Core gameplay systems for a licensed multi-platform title',
            'Flexible save system and dynamic skill tree',
            'Scalable difficulty framework and player abilities',
            'Modular ability systems, designer-friendly and data-driven',
            'Steam SDK (Steamworks): achievements, leaderboards, cloud saves',
            'Bug fixing and stability across PC and console builds up to certification',
            'Performance & memory optimization for Nintendo Switch and PlayStation'
        ],
        video: 'images/gallery/TWD/trailer.mp4',
        gallery: [
            'images/gallery/TWD/header_image.jpg',
            'images/gallery/TWD/screenshot_02.jpg',
            'images/gallery/TWD/screenshot_00.jpg',
            'images/gallery/TWD/screenshot_03.jpg',
            'images/gallery/TWD/screenshot_01.jpg',
            'images/gallery/TWD/screenshot_04.jpg',
            'images/gallery/TWD/screenshot_05.jpg',
            'images/gallery/TWD/screenshot_06.jpg'
        ]
    },
    mokens: {
        title: 'Mokens League',
        desc: 'Multi-platform multiplayer soccer game built with Photon Quantum for deterministic real-time multiplayer. Released on mobile and PC.',
        studio: { name: 'Monster League', url: 'https://monsterleaguestudios.com/' },
        link: 'https://play.google.com/store/apps/details?id=com.mokensleague.mobile.alpha',
        linkLabel: 'Google Play',
        linkIcon: 'fa-brands fa-google-play',
        tags: ['Professional','Multiplayer','Gameplay','Cross Platform','VFX'],
        features: [
            'Photon Quantum deterministic multiplayer',
            'Client-server API communication',
            'VFX with animations & particle systems',
            'Integrated localization system',
            'Mobile CPU & memory optimization'
        ],
        video: 'images/gallery/Mokens/3.mp4',
        gallery: [
            'images/gallery/Mokens/2.mp4',
            'images/gallery/Mokens/vfx.mp4'
        ]
    },
    navalConquest: {
        title: 'Naval Conquest',
        desc: 'Battle Royale game for up to 16 players. Sail your ship and aim your cannons to defeat your foes. This project really challenged me to push myself, and I learned a lot about networking and optimization along the way.',
        studio: { name: 'Eternal Forge', url: 'https://www.linkedin.com/company/eternalforge/' },
        link: 'https://play.google.com/store/apps/details?id=com.QuantumForgeEntertainment.NavalConquest',
        linkLabel: 'Google Play',
        linkIcon: 'fa-brands fa-google-play',
        tags: ['Professional','Multiplayer','Netcode For Gameobjects','Gameplay','Battle Royale','VFX'],
        features: [
            'Gameplay programming',
            'Networked multiplayer',
            'IAP and Unity Services',
            'UI programming',
            'Mobile CPU & memory optimization',
            'Enemy AI state machines',
        ],
        video: 'images/gallery/NavalConquest/5.mp4',
        gallery: [
            'images/gallery/NavalConquest/4.jpg',
            'images/gallery/NavalConquest/2.jpg',
            'images/gallery/NavalConquest/3.jpg',
            'images/gallery/NavalConquest/1.jpg',
        ]
    },
    freelance: {
        title: 'Freelance & Client Work',
        desc: "Since 2022 I've been building advergames and custom game projects for clients, on short deadlines and with a lot of direct back-and-forth to keep the technical side aligned with what they had in mind. Most of this work is covered by NDAs, so I can't show captures of it here — but I'm happy to walk through the technical decisions in a call.",
        // sin link público: la card y el modal ofrecen ir al formulario de contacto
        cta: { label: 'Get in touch', icon: 'fa-solid fa-envelope', section: 'contact-section' },
        tags: ['Freelance','Advergames','Gameplay','UI','Optimization','Under NDA'],
        features: [
            'Advergames and custom client projects on tight deadlines',
            'Gameplay mechanics built to a client brief',
            'UI programming and platform-specific optimization',
            'Direct client communication to align tech with creative vision'
        ]
    },
    bubble: {
        title: 'Bubble Defender',
        desc: 'GGJ 2025 entry. A tower defense about protecting the bubble kingdom, featuring custom shaders and particle VFX.',
        link: 'https://ghastt.itch.io/bubble-defender',
        tags: ['Game Jam','Gameplay','Tower Defense','VFX'],
        features: [
            'Gameplay programming',
            'Particle systems and VFX',
            'Waving shader in ShaderGraph',
            'Tower enemy targeting system'
        ],
        video: 'images/gallery/BubbleDefender/01.mp4',
        gallery: [
            'images/gallery/BubbleDefender/1.jpg',
            'images/gallery/BubbleDefender/3.jpg'
        ]
    },
    parvo: {
        title: 'Parvo',
        desc: 'An adventure platformer about a small knight wielding the biggest sword imaginable. It is one of my favorite projects — I really enjoy how demanding the platforming gets.',
        link: 'https://ghastt.itch.io/parvo',
        tags: ['Personal','Gameplay','Platformer'],
        features: [
            'Gameplay programming',
            'Enemy AI state machines',
            'Level design',
            'Game design'
        ],
        video: 'images/gallery/Parvo/2.mp4',
        gallery: [
            'images/gallery/Parvo/1.png',
            'images/gallery/Parvo/3.mp4'
        ]
    },
    kingwave: {
        title: 'The King Wave',
        desc: 'Tower defense designed with scalability and data-oriented principles. Enemies, waves, and towers managed entirely through scriptable objects. It is a project I keep coming back to, making small improvements over time.',
        link: 'https://ghastt.itch.io/the-king-wave',
        tags: ['Personal','Gameplay','ShaderGraph','Tower Defense'],
        features: [
            'Gameplay programming',
            'UI programming',
            'Data-oriented design',
            'ShaderGraph effects',
            'Object pooling',
            'Scriptable object architecture'
        ],
        video: 'images/gallery/TowerDefense/1.mp4',
        gallery: [
            'images/gallery/TowerDefense/3.jpg',
            'images/gallery/TowerDefense/2.mp4'
        ]
    },
    poltergeist: {
        title: 'Poltergeist',
        desc: "Point 'n click game where you play as a little ghost trying to scare the inhabitants of a house.",
        link: 'https://ghastt.itch.io/poltergeist',
        tags: ['Game Jam','Gameplay'],
        features: [
            'Gameplay programming',
            'Drag and throw mechanic',
            'UI programming',
            'Animator triggering',
            'Game design'
        ],
        video: 'images/gallery/Poltergeist/gameplay.mp4',
        gallery: [
            'images/gallery/Poltergeist/Comic1.mp4',
            'images/gallery/Poltergeist/comic2.png'
        ]
    },
    guau: {
        title: 'Guau! Boutique para perros',
        desc: 'Arcade game about dressing dogs for winter. Features outline shaders, particle VFX, and snappy game feel.',
        link: 'https://ghastt.itch.io/guau-boutique-para-perros',
        tags: ['Game Jam','Gameplay','VFX'],
        features: [
            'Gameplay programming',
            'Particle systems and VFX',
            'Game design',
            'Outline shader with ShaderGraph'
        ],
        video: 'images/gallery/Woof/Tuto.mp4',
        gallery: [
            'images/gallery/Woof/2.mp4',
            'images/gallery/Woof/3.mp4'
        ]
    }
};
