<script lang="ts">
    import { onMount } from 'svelte';
    import { navigate } from 'astro:transitions/client';
    import FaGithub from 'svelte-icons/fa/FaGithub.svelte'
    import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte'
    import FaFileAlt from 'svelte-icons/fa/FaFileAlt.svelte'
    import FaAddressBook from 'svelte-icons/fa/FaAddressBook.svelte'

    export let isHomePage = false;
    export let currentPage: 'home' | 'about' | 'blog' | 'projects' | '' = '';

    let titleEl: HTMLElement | null = null;
    let headerEl: HTMLElement | null = null;
    let isMobile = false;
    let menuOpen = false;
    let hasContentBehind = false;
    let scrambleFrame: number | null = null;
    let surfaceFrame: number | null = null;

    const chars = 'abcdefghijklmnopqrstuvwxyz';
    
    function scrambleText(element: HTMLElement, targetText: string, duration: number = 1000) {
        if (scrambleFrame !== null) {
            cancelAnimationFrame(scrambleFrame);
            scrambleFrame = null;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.textContent = targetText;
            return;
        }

        const startTime = Date.now();
        const originalText = element.textContent || '';
        const maxLength = Math.max(originalText.length, targetText.length);
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            let result = '';
            for (let i = 0; i < maxLength; i++) {
                if (i < targetText.length) {
                    if (progress * maxLength > i) {
                        result += targetText[i];
                    } else {
                        result += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
            }
            
            element.textContent = result;
            
            if (progress < 1) {
                scrambleFrame = requestAnimationFrame(update);
            } else {
                element.textContent = targetText;
                scrambleFrame = null;
            }
        }
        
        update();
    }

    function handleEnter(){
        if (!isMobile && titleEl) scrambleText(titleEl, 'kershan arulneswaran', 1000);
    }

    function handleLeave(){
        if (!isMobile && titleEl) scrambleText(titleEl, 'k.a.', 600);
    }

    function handleBrandClick() {
        if (isMobile) {
            const opening = !menuOpen;
            menuOpen = opening;
            if (titleEl) {
                scrambleText(titleEl, opening ? 'kershan arulneswaran' : 'k.a.', opening ? 750 : 450);
            }
        } else if (currentPage === 'home') {
            window.location.reload();
        } else {
            if (scrambleFrame !== null) {
                cancelAnimationFrame(scrambleFrame);
                scrambleFrame = null;
            }
            if (titleEl) titleEl.textContent = 'k.a.';
            void navigate('/');
        }
    }

    function closeMenu() {
        if (menuOpen && isMobile && titleEl) {
            scrambleText(titleEl, 'k.a.', 450);
        }
        menuOpen = false;
    }

    function handlePageLinkClick(
        event: MouseEvent,
        page: 'home' | 'about' | 'blog' | 'projects'
    ) {
        if (currentPage === page) {
            event.preventDefault();
            return;
        }

        if (page === 'home' && isMobile) {
            if (scrambleFrame !== null) {
                cancelAnimationFrame(scrambleFrame);
                scrambleFrame = null;
            }
            menuOpen = false;
            if (titleEl) titleEl.textContent = 'k.a.';
            return;
        }

        closeMenu();
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') closeMenu();
    }

    onMount(() => {
        const mobileQuery = window.matchMedia('(max-width: 820px)');
        const syncHeaderSurface = () => {
            surfaceFrame = null;

            if (currentPage === 'home' || !headerEl) {
                hasContentBehind = false;
                return;
            }

            const contentRoot = document.querySelector<HTMLElement>('.about-container .content, main');
            if (!contentRoot) {
                hasContentBehind = false;
                return;
            }

            const headerBounds = headerEl.getBoundingClientRect();
            const textElements = Array.from(contentRoot.querySelectorAll<HTMLElement>(
                'h1, h2, h3, h4, h5, h6, p, li, blockquote, pre'
            ));
            const textBounds = textElements
                .map((element) => element.getBoundingClientRect())
                .filter((bounds) => bounds.width > 0 && bounds.height > 0);

            if (textBounds.length === 0) {
                hasContentBehind = false;
                return;
            }

            const firstTextTop = Math.min(...textBounds.map((bounds) => bounds.top));
            const lastTextBottom = Math.max(...textBounds.map((bounds) => bounds.bottom));
            hasContentBehind = firstTextTop <= headerBounds.bottom
                && lastTextBottom >= headerBounds.top;
        };
        const queueHeaderSurfaceSync = () => {
            if (surfaceFrame === null) {
                surfaceFrame = requestAnimationFrame(syncHeaderSurface);
            }
        };
        const syncViewport = () => {
            isMobile = mobileQuery.matches;
            if (scrambleFrame !== null) {
                cancelAnimationFrame(scrambleFrame);
                scrambleFrame = null;
            }

            if (!isMobile) {
                menuOpen = false;
            }

            if (titleEl) titleEl.textContent = 'k.a.';
            queueHeaderSurfaceSync();
        };

        syncViewport();
        mobileQuery.addEventListener('change', syncViewport);
        window.addEventListener('scroll', queueHeaderSurfaceSync, { passive: true });
        window.addEventListener('resize', queueHeaderSurfaceSync);
        document.fonts?.ready.then(queueHeaderSurfaceSync);

        return () => {
            mobileQuery.removeEventListener('change', syncViewport);
            window.removeEventListener('scroll', queueHeaderSurfaceSync);
            window.removeEventListener('resize', queueHeaderSurfaceSync);
            if (scrambleFrame !== null) cancelAnimationFrame(scrambleFrame);
            if (surfaceFrame !== null) cancelAnimationFrame(surfaceFrame);
        };
    });
</script>

<svelte:window on:keydown={handleKeydown} />

<header
    bind:this={headerEl}
    class:home-page={isHomePage}
    class:has-content-behind={hasContentBehind}
    class="site-header"
    data-page={currentPage}
>
    <div class="brand-control" data-open={menuOpen}>
        <button
            type="button"
            class="brand"
            aria-label={isMobile ? (menuOpen ? 'Close navigation menu' : 'Open navigation menu') : 'Kershan Arulneswaran — home'}
            aria-controls="site-navigation"
            aria-expanded={isMobile ? menuOpen : undefined}
            on:click={handleBrandClick}
            on:mouseenter={handleEnter}
            on:mouseleave={handleLeave}
        >
            <span bind:this={titleEl}>k.a.</span>
        </button>
    </div>

    <nav
        id="site-navigation"
        class="site-nav"
        data-open={menuOpen}
        aria-label="Primary navigation"
    >
        <div class="page-links">
            <a
                class="home-link"
                class:current-page={currentPage === 'home'}
                href="/"
                aria-current={currentPage === 'home' ? 'page' : undefined}
                on:click={(event) => handlePageLinkClick(event, 'home')}
            >heyo!</a>
            <a
                class:current-page={currentPage === 'about'}
                href="/about"
                aria-current={currentPage === 'about' ? 'page' : undefined}
                on:click={(event) => handlePageLinkClick(event, 'about')}
            >about</a>
            <a
                class:current-page={currentPage === 'blog'}
                href="/blog"
                aria-current={currentPage === 'blog' ? 'page' : undefined}
                on:click={(event) => handlePageLinkClick(event, 'blog')}
            >blog</a>
            <a
                class:current-page={currentPage === 'projects'}
                href="/projects"
                aria-current={currentPage === 'projects' ? 'page' : undefined}
                on:click={(event) => handlePageLinkClick(event, 'projects')}
            >projects</a>
        </div>

        <div class="social-links">
            <a class="icon" href="https://www.github.com/Koops0" aria-label="GitHub" on:click={closeMenu}>
                <span class="icon-wrap" aria-hidden="true"><FaGithub /></span>
            </a>
            <a class="icon" href="https://www.linkedin.com/in/kersharul" aria-label="LinkedIn" on:click={closeMenu}>
                <span class="icon-wrap" aria-hidden="true"><FaLinkedin /></span>
            </a>
            <a class="icon" href="https://drive.google.com/file/d/1jPCh-QhYFi3i5vUelo-nUfRa9Tjc3tWD/view?usp=sharing" aria-label="Resume" on:click={closeMenu}>
                <span class="icon-wrap" aria-hidden="true"><FaFileAlt /></span>
            </a>
            <a class="icon" href="mailto:kershan.arulneswaran@gmail.com" aria-label="Email Kershan" on:click={closeMenu}>
                <span class="icon-wrap" aria-hidden="true"><FaAddressBook /></span>
            </a>
        </div>
    </nav>
</header>

<style>
.site-header {
    width: 100%;
    padding: clamp(1rem, 2.5vw, 2rem) max(clamp(1rem, 5vw, 4.5rem), env(safe-area-inset-left));
    padding-right: max(clamp(1rem, 5vw, 4.5rem), env(safe-area-inset-right));
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: clamp(1rem, 3vw, 3rem);
}

.site-header:not(.home-page) {
    position: sticky;
    top: 0;
    isolation: isolate;
}

.site-header:not(.home-page)::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-color: var(--canvas);
    opacity: 0;
    transition: opacity 180ms ease;
}

.site-header:not(.home-page).has-content-behind::before {
    opacity: 1;
}

.brand-control {
    flex: 1 1 28rem;
    min-width: 5ch;
}

.brand {
    padding: 0;
    border: 0;
    appearance: none;
    background: transparent;
    color: inherit;
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.5vw, 2.5rem);
    font-weight: 800;
    font-stretch: 115%;
    font-variation-settings: 'wdth' 115, 'wght' 800;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
    transition: font-size 0.15s ease;
}

.site-nav,
.page-links,
.social-links {
    display: flex;
    align-items: center;
}

.site-nav {
    min-width: 0;
    justify-content: flex-end;
    gap: clamp(0.75rem, 2.5vw, 2rem);
}

.page-links {
    gap: clamp(0.9rem, 2vw, 2rem);
}

.home-link {
    display: none;
}

.home-page .page-links {
    display: none;
}

.page-links a {
    font-size: clamp(1.1rem, 1.8vw, 1.5rem);
    font-weight: 700;
    transition: color 0.2s ease;
}

.social-links {
    gap: clamp(0.15rem, 0.8vw, 0.75rem);
}

.site-nav a {
    color: inherit;
    text-decoration: none;
}

.icon {
    width: 2.75rem;
    height: 2.75rem;
    display: inline-grid;
    place-items: center;
    border-radius: 50%;
    transition: color 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
}

.icon-wrap {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-grid;
    place-items: center;
}

.icon-wrap :global(svg) {
    width: 100%;
    height: 100%;
    display: block;
}

.icon:hover {
    transform: translateY(-2px);
    color: var(--accent);
    background: var(--icon-hover);
}

.page-links a:hover {
    color: var(--accent);
}

@media (max-width: 820px) {
    .site-header {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 0;
        padding-top: max(1rem, env(safe-area-inset-top));
    }

    .brand-control {
        position: relative;
        grid-column: 2;
        justify-self: center;
        flex-basis: auto;
        min-height: 2.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .brand {
        font-size: 2.25rem;
        text-align: center;
    }

    .brand-control[data-open='true'] .brand {
        font-size: 1rem;
    }

    .site-nav {
        grid-column: 1 / -1;
        justify-self: center;
        width: min(100%, 28rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        max-height: 0;
        margin-top: 0;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(-0.25rem);
        transition:
            max-height 0.2s ease,
            margin-top 0.2s ease,
            opacity 0.15s ease,
            transform 0.15s ease,
            visibility 0s linear 0.2s;
        text-align: center;
    }

    .site-nav[data-open='true'] {
        max-height: 20rem;
        margin-top: 0.75rem;
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
        transition-delay: 0s;
    }

    .page-links,
    .home-page .page-links {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
    }

    .page-links a {
        width: 100%;
        min-height: 2.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        text-align: center;
    }

    .page-links a.current-page {
        display: none;
    }

    .page-links a:hover {
        color: var(--accent);
    }

    .social-links {
        width: 100%;
        margin-inline: auto;
        justify-content: center;
        gap: 0.5rem;
    }
}

@media (max-width: 420px) {
    .brand {
        font-size: 2rem;
    }

    .brand-control[data-open='true'] .brand {
        font-size: 0.95rem;
    }
}
</style>
