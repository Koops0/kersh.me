<script lang="ts">
    import ProjectItem from './ProjectItem.svelte';
    import WorkExperienceItem from './WorkExperienceItem.svelte';

    type WorkExperience = {
        icon: string;
        iconAlt: string;
        position: string;
        company: string;
        years: string;
        website: string;
        description?: string;
    };

    type Project = {
        name: string;
        demo?: string;
        github?: string;
        description: string;
        years: string;
    };

    const workExperience: WorkExperience[] = [
        {
            icon: '/images/mdaspace_logo.jpeg',
            iconAlt: 'MDA Logo',
            position: 'Software Engineer Intern',
            company: 'MDA Space',
            description: 'canadarm2 ground and canadarm3 flight software development',
            years: '2025-2026',
            website: 'https://mda.space/'
        },
        {
            icon: '/images/CambridgeShield_Cougar.png',
            iconAlt: 'CCIA Logo',
            position: 'STEM Program Manager Intern',
            company: 'Cambridge International Academy',
            description: 'robotics, drone and game dev summer camp development, management and teaching',
            years: '2025',
            website: 'https://www.cciaedu.com/'
        },
        {
            icon: '/images/otu.png',
            iconAlt: 'OTU Logo',
            position: 'Teaching Assistant',
            company: 'Ontario Tech University',
            description: 'lab instructor for csci2020u - software systems development and integration',
            years: '2025',
            website: 'https://www.ontariotechu.ca/'
        },
        {
            icon: '/images/otr.png',
            iconAlt: 'Ontario Tech Robotics Logo',
            position: 'Programming Lead and Mentor',
            company: 'Ontario Tech Robotics',
            description: 'programming lead and mentor for robot in 3 days, arc competition and website',
            years: '2023-2026',
            website: 'https://www.ot-robotics.com'
        }
    ];

    const projects: Project[] = [
        {
         name: 'MechaMind',
        demo: 'https://example.com',
        description: 'honours thesis project, mixed reality application to learn robotics programming',
        years: '2025-2026'
        },
        {
         name: 'Theseus - Ri3D',
        demo: 'https://www.youtube.com/watch?v=ccGA3FD2jmI',
        github: 'https://github.com/otri3d/Rebuilt2026',
        description: 'ri3d robot code for 2026 frc game "rebuilt"',
        years: '2026'
        },
        {
        name: 'PhotoWASH',
        github: 'https://github.com/Koops0/PhotoWASH',
        description: 'diffusion-based image restoration for consumer photo editing',
        years: '2024'
        },
        {
         name: 'Kraken - Ri3D',
        demo: 'https://www.youtube.com/watch?v=_QJr6YzZbPE',
        github: 'https://github.com/otri3d/Reefscape2025',
        description: 'ri3d robot code for 2025 frc game "reefscape"',
        years: '2025'
        },
        {
         name: 'CinemaShots',
        github: 'https://github.com/Koops0/cinemashots',
        description: 'neural filter style transfer for computational photography',
        years: '2024'
        },
        {
         name: 'Ri3D 2024',
        demo: 'https://www.youtube.com/watch?v=NvgQkyxj2QI',
        github: 'https://github.com/otri3d/Crescendo2024',
        description: 'ri3d robot code for 2024 frc game "crescendo". no robot reveal this year',
        years: '2024'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        },
        {
         name: 'Project name',
        demo: 'https://example.com',
        github: 'https://github.com/Koops0/example',
        description: 'What the project does and how it was built',
        years: '2025 - 2026'
        }
    ];
</script>

<div class="experience-container">
    <div class="content">
        <h1>Experience</h1>

        <section class="subsection" aria-labelledby="work-experience-heading">
            <h2 id="work-experience-heading">Work Experience</h2>

            <div class="work-list">
                {#each workExperience as item}
                    <WorkExperienceItem {...item} />
                {/each}
            </div>
        </section>

        <section class="subsection" aria-labelledby="projects-heading">
            <h2 id="projects-heading">Projects</h2>

            <div class="project-list">
                {#each projects as project}
                    <ProjectItem {...project} />
                {/each}
            </div>
        </section>
    </div>
</div>

<style>
    .experience-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        min-height: 100svh;
        padding: clamp(3rem, 6vw, 5rem)
            max(clamp(1rem, 5vw, 4.5rem), env(safe-area-inset-left));
        padding-right: max(
            clamp(1rem, 5vw, 4.5rem),
            env(safe-area-inset-right)
        );
    }

    .content {
        max-width: 70rem;
        width: 100%;
        min-width: 0;
    }

    h1 {
        font-size: clamp(2.75rem, 8vw, 6rem);
        font-weight: 800;
        margin: 0 0 clamp(0.75rem, 1.5vw, 1.25rem);
        line-height: 1;
        color: var(--ink);
        transform: translateX(-0.075em);
    }

    @supports (-webkit-text-stroke: 1px black) {
        h1 {
            color: transparent;
            -webkit-text-stroke: clamp(1.25px, 0.08em, 3px) var(--ink);
            paint-order: stroke fill;
        }
    }

    .subsection + .subsection {
        margin-top: clamp(2rem, 4vw, 3rem);
    }

    h2 {
        margin: 0;
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        line-height: 1.1;
    }

    .work-list,
    .project-list {
        margin-top: clamp(1.75rem, 3vw, 2.5rem);
        display: grid;
        gap: clamp(1.5rem, 3vw, 2.25rem);
    }

    @media (max-width: 520px) {
        h1 {
            margin-bottom: 0.75rem;
        }
    }
</style>
