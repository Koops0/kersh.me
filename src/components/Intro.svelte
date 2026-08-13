<script lang="ts">
    import { onMount } from 'svelte';

    let fullNameEl: HTMLElement | null = null;
    let professionEl: HTMLElement | null = null;

    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const professionText = 'Software Engineer. Destructor. Builder.';
    
    function scrambleText(element: HTMLElement, targetText: string, duration: number = 1500) {
        const startTime = Date.now();
        const originalText = element.textContent || '';
        const maxLength = Math.max(originalText.length, targetText.length);
        
        function update() {
            if (window.matchMedia('(max-width: 820px)').matches) {
                element.textContent = targetText;
                return;
            }

            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            let result = '';
            for (let i = 0; i < maxLength; i++) {
                if (i < targetText.length) {
                    if (/\s/.test(targetText[i])) {
                        result += targetText[i];
                    } else if (progress * maxLength > i) {
                        result += targetText[i];
                    } else {
                        result += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
            }
            
            element.textContent = result;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = targetText;
            }
        }
        
        update();
    }

    function startIntroAnimation(delayed: boolean) {
        if (
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            window.matchMedia('(max-width: 820px)').matches
        ) {
            return [];
        }

        return [
            setTimeout(() => {
                if (fullNameEl) scrambleText(fullNameEl, 'KERSHAN\nARULNESWARAN', 2200);
            }, delayed ? 300 : 0),

            setTimeout(() => {
                if (professionEl) scrambleText(professionEl, professionText, 1200);
            }, delayed ? 100 : 0)
        ];
    }

    onMount(() => {
        let timers: ReturnType<typeof setTimeout>[] = [];
        const returningFromAbout = document.documentElement.classList.contains('is-main-arriving');

        const revealMain = () => {
            timers = startIntroAnimation(false);
        };

        if (returningFromAbout) {
            window.addEventListener('site:main-reveal', revealMain, { once: true });
        } else {
            timers = startIntroAnimation(true);
        }

        return () => {
            window.removeEventListener('site:main-reveal', revealMain);
            timers.forEach(clearTimeout);
        };
    });
</script>

<div class="intro">
    <div class="name-container">
        <h1 bind:this={fullNameEl} class="full-name">{'KERSHAN\nARULNESWARAN'}</h1>
    </div>
    
    <div class="info-section">
        <div class="profession-row">
            <p class="profession" bind:this={professionEl}>{professionText}</p>
            <nav class="sections">
                <a href="/about">About</a>
                <span class="separator">|</span>
                <a href="/blog">Blog</a>
                <span class="separator">|</span>
                <a href="/projects">Projects</a>
            </nav>
        </div>
    </div>
</div>

<style>
.intro {
    width: min(100%, 82rem);
    min-width: 0;
    min-height: calc(100vh - 7rem);
    min-height: calc(100svh - 7rem);
    padding: clamp(3rem, 8vh, 7rem) max(clamp(1rem, 5vw, 4.5rem), env(safe-area-inset-left));
    padding-right: max(clamp(1rem, 5vw, 4.5rem), env(safe-area-inset-right));
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: clamp(1.25rem, 3vw, 2.5rem);
    margin: 0 auto;
}
    
.name-container {
    width: 100%;
    min-width: 0;
}
    
.full-name {
    max-width: 100%;
    font-size: 6.5rem;
    font-weight: 800;
    font-stretch: 115%;
    font-variation-settings: 'wdth' 115, 'wght' 800;
    letter-spacing: -0.01em;
    margin: 0;
    color: var(--ink);
    text-align: left;
    line-height: 0.88;
    white-space: pre-line;
}

@supports (-webkit-text-stroke: 1px black) {
    .full-name {
        color: transparent;
        -webkit-text-stroke: clamp(1.25px, 0.12em, 3px) var(--ink);
        paint-order: stroke fill;
    }
}
    
    .info-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        transform: translateY(clamp(-1.25rem, -1.5vw, -0.5rem));
    }
    
    .profession-row {
        display: flex;
        width: fit-content;
        flex-direction: column;
        align-items: center;
        gap: clamp(0.75rem, 2vw, 1.5rem);
        min-width: 0;
    }
    
    .profession {
        font-size: clamp(1.25rem, 3vw, 3rem);
        font-weight: 600;
        margin: 0;
        color: var(--muted-ink);
        text-align: center;
        min-width: 14ch;
    }
    
    .sections {
        display: flex;
        gap: clamp(0.75rem, 2vw, 1.5rem);
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .sections a {
        font-size: clamp(0.875rem, 2vw, 1.25rem);
        font-weight: 600;
        text-decoration: none;
        color: inherit;
        transition: color 0.2s ease, transform 0.2s ease;
    }
    
    .sections a:hover {
        color: var(--accent);
        transform: translateY(-2px);
    }
    
    .separator {
        font-size: clamp(0.875rem, 2vw, 1.25rem);
        color: currentColor;
        user-select: none;
    }

    @media (max-width: 1100px) {
        .full-name {
            font-size: 5.5rem;
        }
    }

    @media (max-width: 900px) {
        .full-name {
            font-size: 5rem;
        }
    }

    @media (max-width: 820px) {
        .intro {
            min-height: calc(100vh - 6rem);
            min-height: calc(100svh - 6rem);
            padding-block: clamp(2.5rem, 7vh, 5rem);
        }

        .full-name {
            font-size: 3rem;
            line-height: 0.92;
        }

        .sections {
            display: none;
        }
    }

    @media (max-width: 560px) {
        .intro {
            gap: 2.25rem;
        }

        .profession-row {
            gap: 1rem;
        }

        .profession {
            min-width: 0;
        }

        .sections {
            gap: 0.65rem;
        }

        .sections a {
            font-size: 1rem;
        }
    }

    @media (max-width: 480px) {
        .full-name {
            font-size: 2.5rem;
        }
    }

    @media (max-width: 380px) {
        .full-name {
            font-size: 2.15rem;
        }
    }

    @media (max-width: 340px) {
        .full-name {
            font-size: 1.9rem;
        }
    }

    @media (max-width: 300px) {
        .full-name {
            font-size: 1.7rem;
        }
    }

    @media (max-height: 560px) and (orientation: landscape) {
        .intro {
            min-height: auto;
            padding-block: 2rem 3rem;
        }
    }
</style>
