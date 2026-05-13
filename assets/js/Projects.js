// ── PROJECT DATA ──────────────────────────────────────────
const PROJECTS = {
    mokens: {
        title: 'Mokens League',
        desc: 'Multi-platform multiplayer soccer game built with Photon Quantum for deterministic real-time multiplayer. Released on mobile and PC.',
        link: 'https://play.google.com/store/apps/details?id=com.mokensleague.mobile.alpha',
        linkLabel: 'Google Play',
        linkIcon: 'fa-brands fa-google-play',
        tags: ['Professional','Multiplayer','Gameplay','VFX'],
        features: [
            'Photon Quantum deterministic multiplayer',
            'Client-server API communication',
            'VFX with animations & particle systems',
            'Integrated localization system',
            'Mobile CPU & memory optimization'
        ],
        video: 'images/gallery/Mokens/3.mp4',
        gallery: [
            'images/gallery/Mokens/3.gif',
            'images/gallery/Mokens/2.gif',
            'images/gallery/Mokens/vfx.gif'
        ]
    },
    navalConquest: {
        title: 'Naval Conquest',
        desc: 'Battle Royale game with up to 16 players, Sail your ship and aim your cannons to defeat your foes. This project really challenged me to push my self and learn a lot about networking and optimization',
        linkLabel: 'Google Play',
        linkIcon: 'fa-brands fa-google-play',
        tags: ['Professional','Multiplayer','Netcode For Gameobjects','Gameplay','VFX'],
        features: [
            'Gameplay programming',
            'Networked multiplayer',
            'UI programming',
            'Mobile CPU & memory optimization',
            'Enemy AI state machines',
        ],
        gallery: [
            'images/gallery/NavalConquest/4.jpg',
            'images/gallery/NavalConquest/2.jpg',
            'images/gallery/NavalConquest/3.jpg',
            'images/gallery/NavalConquest/1.jpg',
        ]
    },
    bubble: {
        title: 'Bubble Defender',
        desc: 'GGJ 2025 entry. A tower defense about protecting the bubble kingdom, featuring custom shaders and particle VFX.',
        link: 'https://ghastt.itch.io/bubble-defender',
        tags: ['Game Jam','Gameplay','VFX'],
        features: [
            'Gameplay programming',
            'Particle systems and VFX',
            'Waving shader in ShaderGraph',
            'Tower enemy targeting system'
        ],
        video: 'images/gallery/BubbleDefender/01.mp4',
        gallery: [
            'images/gallery/BubbleDefender/1.jpg',
            'images/gallery/BubbleDefender/01.gif',
            'images/gallery/BubbleDefender/3.jpg'
        ]
    },
    parvo: {
        title: 'Parvo',
        desc: 'An adventure platformer about a small knight wielding the biggest sword imaginable. Features enemy AI and tight game feel.',
        link: 'https://ghastt.itch.io/parvo',
        tags: ['Personal','Gameplay','AI'],
        features: [
            'Gameplay programming',
            'UI programming',
            'Enemy AI state machines',
            'Level design',
            'Game design'
        ],
        video: 'images/gallery/Parvo/2.mp4',
        gallery: [
            'images/gallery/Parvo/1.png',
            'images/gallery/Parvo/2.gif',
            'images/gallery/Parvo/3.gif'
        ]
    },
    kingwave: {
        title: 'The King Wave',
        desc: 'Tower defense designed with scalability and data-oriented principles. Enemies, waves, and towers managed entirely through scriptable objects. This is a project that i often go back to making small improvements over time',
        link: 'https://ghastt.itch.io/the-king-wave',
        tags: ['Personal','Gameplay','ShaderGraph'],
        features: [
            'Gameplay programming',
            'UI programming',
            'Data-oriented design',
            'ShaderGraph effects',
            'Object pooling',
            'Scriptable object architecture'
        ],
        video: 'images/gallery/TowerDefense/1.webm',
        gallery: [
            'images/gallery/TowerDefense/3.jpg',
            'images/gallery/TowerDefense/1.gif',
            'images/gallery/TowerDefense/2.gif'
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
            'images/gallery/Poltergeist/gameplay.gif',
            'images/gallery/Poltergeist/Comic1.gif',
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
            'images/gallery/Woof/Tuto.gif',
            'images/gallery/Woof/2.gif',
            'images/gallery/Woof/3.gif'
        ]
    }
};
