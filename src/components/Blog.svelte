<script lang="ts">
    import { onMount } from 'svelte';
    import { navigate } from 'astro:transitions/client';

    type BlogMode = 'kersh' | 'koops';

    const modes = {
        kersh: {
            number: '01',
            title: 'Kersh',
            description: 'The composed side: general tech, job events, coffee chats, side projects, and the hobbies keeping me curious.',
            topics: ['tech', 'work + events', 'coffee chats', 'side projects', 'hobbies']
        },
        koops: {
            number: '02',
            title: 'Koops',
            description: 'The slightly more unhinged side: hobby rabbit holes, strong opinions, rants, reviews, and whatever else refuses to fit neatly.',
            topics: ['rants', 'reviews', 'deep dives', 'hobby lore', 'miscellany']
        }
    } satisfies Record<BlogMode, {
        number: string;
        title: string;
        description: string;
        topics: string[];
    }>;

    let mode: BlogMode = 'kersh';
    let transitionTarget: BlogMode = 'kersh';
    let transitioning = false;
    let modeSwapTimer: number | undefined;
    let modeReleaseTimer: number | undefined;
    let pendingNavigationTimer: number | undefined;
    let selectedTags: Record<BlogMode, string> = {
        kersh: modes.kersh.topics[0],
        koops: modes.koops.topics[0]
    };

    function applyMode(nextMode: BlogMode) {
        mode = nextMode;
        document.documentElement.classList.toggle('koops-blog-active', nextMode === 'koops');
    }

    function selectMode(nextMode: BlogMode) {
        if (nextMode === mode || transitioning) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            applyMode(nextMode);
            return;
        }

        transitionTarget = nextMode;
        transitioning = true;

        modeSwapTimer = window.setTimeout(() => applyMode(nextMode), 320);
        modeReleaseTimer = window.setTimeout(() => {
            transitioning = false;
        }, 820);
    }

    function selectTag(tag: string) {
        selectedTags = { ...selectedTags, [mode]: tag };
    }

    function interceptKoopsNavigation(event: MouseEvent) {
        if (mode !== 'koops' || transitioning || event.defaultPrevented) return;
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!(event.target instanceof Element)) return;

        const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
        const brand = event.target.closest<HTMLButtonElement>('.site-header .brand');
        let destination: URL | undefined;

        if (anchor) {
            const url = new URL(anchor.href, window.location.href);
            const sitePages = new Set(['/', '/about', '/experience']);
            if (url.origin !== window.location.origin || !sitePages.has(url.pathname)) return;
            destination = url;
        } else if (brand && !window.matchMedia('(max-width: 820px)').matches) {
            destination = new URL('/', window.location.origin);
        }

        if (!destination) return;

        event.preventDefault();
        event.stopPropagation();
        selectMode('kersh');

        const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 840;
        pendingNavigationTimer = window.setTimeout(() => {
            void navigate(`${destination.pathname}${destination.search}${destination.hash}`);
        }, delay);
    }

    onMount(() => {
        document.documentElement.classList.add('blog-page-active');
        document.documentElement.classList.remove('koops-blog-active');
        void document.fonts?.load('1rem "KH Menu"');
        void document.fonts?.load('1rem "KH Gummi"');
        window.addEventListener('click', interceptKoopsNavigation, { capture: true });

        return () => {
            if (modeSwapTimer !== undefined) window.clearTimeout(modeSwapTimer);
            if (modeReleaseTimer !== undefined) window.clearTimeout(modeReleaseTimer);
            if (pendingNavigationTimer !== undefined) window.clearTimeout(pendingNavigationTimer);
            window.removeEventListener('click', interceptKoopsNavigation, { capture: true });
            document.documentElement.classList.remove('blog-page-active', 'koops-blog-active');
        };
    });
</script>

<div class:koops-mode={mode === 'koops'} class="blog-container">
    <div class="content">
        <div class="mode-switch" role="group" aria-label="Choose blog mode">
            <button
                type="button"
                class:active={mode === 'kersh'}
                aria-pressed={mode === 'kersh'}
                disabled={transitioning}
                on:click={() => selectMode('kersh')}
            >
                <span class="selection-mark" aria-hidden="true"></span>
                Kersh
            </button>
            <button
                type="button"
                class:active={mode === 'koops'}
                aria-pressed={mode === 'koops'}
                disabled={transitioning}
                on:click={() => selectMode('koops')}
            >
                <span class="selection-mark" aria-hidden="true"></span>
                Koops
            </button>
        </div>

        {#key mode}
            <section
                class:kersh-view={mode === 'kersh'}
                class:koops-view={mode === 'koops'}
                class="mode-view"
                aria-live="polite"
            >
                <p class="mode-label">blog mode / {modes[mode].number}</p>
                <h1>{modes[mode].title}</h1>
                <p class="mode-description">{modes[mode].description}</p>

                <ul class="topic-list" aria-label={`${modes[mode].title} topics`}>
                    {#each modes[mode].topics as topic}
                        <li class:selected={selectedTags[mode] === topic}>
                            <button
                                type="button"
                                aria-pressed={selectedTags[mode] === topic}
                                on:click={() => selectTag(topic)}
                            >
                                <span class="tag-selection" aria-hidden="true"></span>
                                {topic}
                            </button>
                        </li>
                    {/each}
                </ul>

                <div class="entries-heading">
                    <span>entries</span>
                    <span class="entries-rule" aria-hidden="true"></span>
                    <span>00</span>
                </div>
            </section>
        {/key}
    </div>
</div>

{#if transitioning}
    <div
        class:to-koops={transitionTarget === 'koops'}
        class:to-kersh={transitionTarget === 'kersh'}
        class="mode-loader"
        role="status"
        aria-live="assertive"
        aria-label={transitionTarget === 'koops' ? 'Entering Koops mode' : 'Returning to Kersh'}
    >
        <div class="mode-loader-inner">
            <div class="mode-loader-mark" aria-hidden="true">
                {transitionTarget === 'koops' ? 'Entering Koops' : 'Returning to Kersh'}
            </div>
            <div class="mode-loader-track" aria-hidden="true"><span></span></div>
        </div>
    </div>
{/if}

<style>
    @font-face {
        font-family: 'KH Gummi';
        src: url('/fonts/KHGummi.otf') format('opentype');
        font-display: swap;
    }

    @font-face {
        font-family: 'KH Menu';
        src: url('/fonts/KHMenu.otf') format('opentype');
        font-display: swap;
    }

    :global(html.koops-blog-active) {
        color-scheme: dark;
        --ink: #f0f5ff;
        --muted-ink: rgb(221 232 255 / 72%);
        --accent: #8bc2ff;
        --canvas: #030817;
        --backdrop:
            radial-gradient(circle 31rem at 74% 24%, rgb(86 196 255 / 30%) 0%, rgb(28 76 218 / 20%) 34%, transparent 68%),
            radial-gradient(circle 26rem at 18% 82%, rgb(151 200 67 / 21%) 0%, rgb(241 125 30 / 15%) 36%, transparent 68%),
            linear-gradient(145deg, #040818, #09132e 52%, #020511);
        --icon-hover: rgb(116 174 255 / 16%);
    }

    :global(html.koops-blog-active .bg-shape) {
        display: none !important;
    }

    :global(html.koops-blog-active .site-loader.is-koops-exit) {
        color: #eef5ff;
        background:
            radial-gradient(circle at 50% 40%, #17376f, transparent 28rem),
            linear-gradient(145deg, #07132f, #020714);
    }

    :global(html.koops-blog-active .site-loader.is-koops-exit .loader-mark) {
        color: #f7fbff;
        font-family: 'KH Menu', var(--font-body);
        font-size: clamp(1.4rem, 5vw, 2.5rem);
        font-weight: 400;
        font-stretch: normal;
        font-variation-settings: normal;
        letter-spacing: 0.08em;
        text-transform: none;
        -webkit-text-stroke: 0;
        text-shadow: 0 0 1rem rgb(101 165 255 / 48%);
    }

    :global(html.koops-blog-active .site-loader.is-koops-exit .loader-track) {
        color: #a9d0ff;
        background: rgb(169 208 255 / 22%);
    }

    :global(html.blog-page-active .site-header) {
        background: transparent;
        transition:
            color 460ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 180ms ease,
            box-shadow 460ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(html.blog-page-active .site-header.has-content-behind) {
        background-color: var(--canvas);
    }

    :global(html.blog-page-active .site-header::after) {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        border-bottom: 2px solid #143dff;
        background:
            linear-gradient(180deg, #0d235b, #030a2a),
            #050f2a;
        box-shadow:
            inset 0 -1px 0 #0aa7ff,
            0 0.3rem 1.4rem rgb(4 31 255 / 34%);
        transition: opacity 460ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(html.koops-blog-active .site-header) {
        color: #f0f5ff;
        font-family: 'KH Menu', var(--font-body);
    }

    :global(html.koops-blog-active .site-header.has-content-behind::after) {
        opacity: 1;
    }

    :global(html.koops-blog-active .site-header::before) {
        background:
            linear-gradient(180deg, #0d235b, #030a2a),
            #050f2a;
    }

    :global(html.blog-page-active .site-header .brand) {
        border: 0;
        transition:
            font-size 150ms ease,
            padding 460ms cubic-bezier(0.22, 1, 0.36, 1),
            color 460ms ease,
            background-color 460ms ease,
            box-shadow 460ms ease,
            text-shadow 460ms ease;
    }

    :global(html.koops-blog-active .site-header .brand) {
        padding: 0.25rem 0.75rem;
        border-radius: 0.7rem 0.7rem 0.2rem 0.2rem;
        color: #f7fbff;
        background: linear-gradient(180deg, rgb(33 75 183 / 58%), rgb(8 24 82 / 32%));
        font-family: 'KH Gummi', 'KH Menu', sans-serif;
        font-weight: 400;
        font-stretch: normal;
        font-variation-settings: normal;
        letter-spacing: 0.035em;
        text-shadow:
            0 2px 0 #63789d,
            0 0 0.8rem rgb(105 171 255 / 50%);
        box-shadow:
            inset 0 0 0 1px rgb(62 112 255 / 58%),
            inset 0 -1px 0 rgb(20 139 255 / 52%);
    }

    :global(html.blog-page-active .site-header .page-links a) {
        transition:
            padding 460ms cubic-bezier(0.22, 1, 0.36, 1),
            color 460ms ease,
            background-color 460ms ease,
            box-shadow 460ms ease,
            text-shadow 460ms ease;
    }

    :global(html.koops-blog-active .site-header .page-links a) {
        font-family: 'KH Menu', var(--font-body);
        font-weight: 400;
        letter-spacing: 0.035em;
        text-shadow: 0 0 0.65rem rgb(105 171 255 / 24%);
    }

    :global(html.koops-blog-active .site-header .page-links a.current-page) {
        padding: 0.25rem 0.8rem;
        border-radius: 0.7rem 0.7rem 0.2rem 0.2rem;
        color: #fff7df;
        background: linear-gradient(180deg, #bd3e08, #5b1307);
        box-shadow:
            inset 0 0 0 1px #ff8c1a,
            inset 0 1px 0 rgb(255 214 126 / 58%),
            0 0 0.8rem rgb(255 93 15 / 62%);
    }

    :global(html.blog-page-active .site-header .icon) {
        border: 0;
        transition:
            color 200ms ease,
            transform 200ms ease,
            background-color 460ms ease,
            box-shadow 460ms ease;
    }

    :global(html.koops-blog-active .site-header .icon) {
        background: rgb(40 86 172 / 14%);
        box-shadow: inset 0 0 0 1px rgb(164 202 255 / 20%);
    }

    :global(html.blog-page-active .site-footer) {
        position: relative;
        isolation: isolate;
        background: transparent;
        transition:
            color 460ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 460ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(html.blog-page-active .site-footer::before) {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        border-top: 2px solid #143dff;
        background:
            linear-gradient(180deg, rgb(8 23 58 / 90%), rgb(3 8 23 / 96%)),
            #030817;
        box-shadow: inset 0 1px 0 #0aa7ff;
        transition: opacity 460ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(html.koops-blog-active .site-footer) {
        color: rgb(225 235 255 / 82%);
        font-family: 'KH Menu', var(--font-body);
        font-weight: 400;
        letter-spacing: 0.035em;
    }

    :global(html.koops-blog-active .site-footer::before) {
        opacity: 1;
    }

    :global(html.blog-page-active .site-footer p) {
        transition:
            color 460ms ease,
            text-shadow 460ms ease;
    }

    :global(html.koops-blog-active .site-footer p) {
        color: #9fc7ff;
        font-weight: 400;
        text-shadow: 0 0 0.65rem rgb(83 151 255 / 32%);
    }

    :global(html.koops-blog-active.is-page-departing .site-header),
    :global(html.koops-blog-active.is-section-departing .site-header) {
        box-shadow: none;
    }

    :global(html.koops-blog-active.is-page-departing .site-header::after),
    :global(html.koops-blog-active.is-section-departing .site-header::after) {
        opacity: 0;
        transition: none;
    }

    .mode-loader {
        position: fixed;
        inset: 0;
        z-index: 12000;
        display: grid;
        place-items: center;
        padding:
            max(1.25rem, env(safe-area-inset-top))
            max(1.25rem, env(safe-area-inset-right))
            max(1.25rem, env(safe-area-inset-bottom))
            max(1.25rem, env(safe-area-inset-left));
        overflow: hidden;
        animation: mode-loader-cycle 820ms cubic-bezier(0.65, 0, 0.35, 1) both;
    }

    .mode-loader.to-koops {
        color: #eef5ff;
        background:
            radial-gradient(circle at 50% 40%, #17376f, transparent 28rem),
            linear-gradient(145deg, #07132f, #020714);
        font-family: 'KH Menu', var(--font-body);
    }

    .mode-loader.to-kersh {
        --kersh-loader-ink: #172126;
        color: #172126;
        background:
            radial-gradient(ellipse at 50% 35%, #ffffff 0%, #f4f1ea 55%, #e6e1d7 100%),
            #f4f1ea;
        font-family: var(--font-body);
    }

    .mode-loader-inner {
        width: 100%;
        display: grid;
        place-items: center;
        gap: 0.85rem;
        text-align: center;
        animation: mode-loader-content 820ms cubic-bezier(0.65, 0, 0.35, 1) both;
    }

    .mode-loader-mark {
        width: max-content;
        max-width: calc(100vw - 2.5rem);
        display: block;
        font-size: clamp(1.75rem, 6.5vw, 4.5rem);
        line-height: 1;
        text-align: center;
        white-space: nowrap;
    }

    .to-koops .mode-loader-mark {
        color: #f7fbff;
        font-family: 'KH Gummi', 'KH Menu', sans-serif;
        text-shadow:
            0 2px 0 #63789d,
            0 5px 0 #111b31,
            0 0 1.4rem rgb(101 165 255 / 58%);
    }

    .to-kersh .mode-loader-mark {
        color: var(--kersh-loader-ink);
        font-family: var(--font-display);
        font-size: clamp(1.5rem, 5.5vw, 3.75rem);
        font-weight: 800;
        font-stretch: 125%;
        font-variation-settings: 'wdth' 125, 'wght' 800;
    }

    @supports (-webkit-text-stroke: 1px black) {
        .to-kersh .mode-loader-mark {
            color: transparent;
            -webkit-text-stroke: clamp(1.25px, 0.06em, 3px) var(--kersh-loader-ink);
            paint-order: stroke fill;
        }
    }

    .mode-loader-track {
        width: min(11rem, 64vw);
        height: 2px;
        overflow: hidden;
        background: color-mix(in srgb, currentColor 20%, transparent);
    }

    .mode-loader-track span {
        width: 100%;
        height: 100%;
        display: block;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: left;
        animation: mode-loader-progress 680ms 70ms cubic-bezier(0.65, 0, 0.35, 1) both;
    }

    .blog-container {
        --blog-ink: var(--ink);
        --blog-muted: var(--muted-ink);
        --kersh-tag-accent: #70458f;
        position: relative;
        isolation: isolate;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        min-height: 100svh;
        padding: clamp(4rem, 9vw, 8rem)
            max(clamp(1rem, 5vw, 4.5rem), env(safe-area-inset-left));
        padding-right: max(
            clamp(1rem, 5vw, 4.5rem),
            env(safe-area-inset-right)
        );
        color: var(--blog-ink);
    }

    .blog-container::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        background:
            radial-gradient(circle 27rem at 74% 24%, rgb(86 196 255 / 36%) 0%, rgb(28 76 218 / 22%) 34%, transparent 68%),
            radial-gradient(circle 24rem at 18% 82%, rgb(151 200 67 / 24%) 0%, rgb(241 125 30 / 17%) 36%, transparent 68%),
            linear-gradient(145deg, rgb(4 8 24 / 96%), rgb(9 19 46 / 97%) 52%, rgb(2 5 17 / 98%));
        transition: opacity 260ms ease;
    }

    .blog-container.koops-mode {
        --blog-ink: #f0f5ff;
        --blog-muted: rgb(221 232 255 / 72%);
    }

    .blog-container.koops-mode::before {
        opacity: 1;
    }

    .content {
        max-width: 58rem;
        width: 100%;
        min-width: 0;
    }

    .mode-switch {
        width: fit-content;
        display: grid;
        grid-template-columns: repeat(2, minmax(6rem, 1fr));
        gap: 0.25rem;
        margin-bottom: clamp(1.75rem, 4vw, 3rem);
        padding: 0.25rem;
        border: 1px solid color-mix(in srgb, var(--blog-ink) 24%, transparent);
        border-radius: 999px;
        background: color-mix(in srgb, var(--canvas) 56%, transparent);
        backdrop-filter: blur(10px);
        transition: border-color 220ms ease, background-color 220ms ease, border-radius 220ms ease;
    }

    .mode-switch button {
        position: relative;
        min-height: 2.75rem;
        padding: 0.55rem 1rem;
        border: 0;
        border-radius: 999px;
        color: var(--blog-muted);
        background: transparent;
        font-family: var(--font-body);
        font-size: 0.9rem;
        font-weight: 700;
        cursor: pointer;
        transition: color 180ms ease, background-color 180ms ease, text-shadow 180ms ease;
    }

    .mode-switch button.active {
        color: var(--blog-ink);
        background: color-mix(in srgb, var(--blog-ink) 10%, transparent);
    }

    .mode-switch button:disabled {
        cursor: wait;
    }

    .selection-mark {
        display: none;
    }

    .mode-view {
        min-width: 0;
        animation: mode-enter 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    .mode-label {
        margin: 0 0 0.7rem;
        color: var(--blog-muted);
        font-size: clamp(0.75rem, 1.5vw, 0.9rem);
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    h1 {
        margin: 0;
        line-height: 0.95;
    }

    .kersh-view h1 {
        color: var(--ink);
        font-family: var(--font-display);
        font-size: clamp(3.5rem, 10vw, 7.5rem);
        font-weight: 800;
        font-stretch: 125%;
        font-variation-settings: 'wdth' 125, 'wght' 800;
    }

    @supports (-webkit-text-stroke: 1px black) {
        .kersh-view h1 {
            color: transparent;
            -webkit-text-stroke: clamp(1.25px, 0.065em, 3px) var(--ink);
            paint-order: stroke fill;
        }
    }

    .mode-description {
        max-width: 47rem;
        margin: clamp(1.25rem, 3vw, 2rem) 0 0;
        color: var(--blog-muted);
        font-size: clamp(1rem, 2vw, 1.25rem);
        line-height: 1.55;
    }

    .topic-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.55rem;
        margin: clamp(1.4rem, 3vw, 2rem) 0 0;
        padding: 0;
        list-style: none;
    }

    .topic-list li {
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--blog-ink) 24%, transparent);
        border-radius: 999px;
        color: var(--blog-muted);
        font-size: clamp(0.75rem, 1.5vw, 0.9rem);
        line-height: 1;
        transition:
            color 160ms ease,
            border-color 160ms ease,
            background-color 160ms ease,
            box-shadow 160ms ease;
    }

    .topic-list button {
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        min-height: 2.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.45rem;
        padding: 0.42rem 0.72rem;
        border: 0;
        border-radius: 0;
        color: inherit;
        background: none;
        box-shadow: none;
        font: inherit;
        line-height: inherit;
        cursor: pointer;
    }

    .topic-list li:hover,
    .topic-list li:focus-within {
        color: var(--blog-ink);
        border-color: color-mix(in srgb, var(--blog-ink) 48%, transparent);
    }

    .topic-list li.selected {
        color: var(--blog-ink);
        border-color: var(--kersh-tag-accent);
        background: color-mix(in srgb, var(--kersh-tag-accent) 16%, transparent);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--kersh-tag-accent) 18%, transparent);
    }

    .tag-selection {
        display: none;
        width: 0.38rem;
        aspect-ratio: 1;
        flex: 0 0 auto;
        border-radius: 50%;
        background: var(--kersh-tag-accent);
        box-shadow: 0 0 0.45rem color-mix(in srgb, var(--kersh-tag-accent) 58%, transparent);
    }

    .topic-list li.selected .tag-selection {
        display: block;
    }

    .entries-heading {
        display: grid;
        grid-template-columns: auto minmax(2rem, 1fr) auto;
        align-items: center;
        gap: 0.8rem;
        margin-top: clamp(2.75rem, 7vw, 5rem);
        color: var(--blog-muted);
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .entries-rule {
        height: 1px;
        background: color-mix(in srgb, var(--blog-ink) 26%, transparent);
    }

    .koops-mode .content {
        position: relative;
    }

    .koops-mode .mode-switch {
        position: relative;
        width: 100%;
        border: 2px solid #143dff;
        border-radius: 0.85rem 0.85rem 0.2rem 0.2rem;
        background: linear-gradient(180deg, rgb(15 48 142 / 92%), rgb(3 14 67 / 94%));
        box-shadow:
            inset 0 1px 0 #0aa7ff,
            0 0 1.15rem rgb(15 55 255 / 42%);
    }

    .koops-mode .mode-switch::before {
        content: 'menu';
        position: absolute;
        left: 1rem;
        bottom: calc(100% - 0.15rem);
        z-index: 1;
        min-width: 5rem;
        padding: 0.05rem 0.8rem 0.12rem;
        border: 1px solid #536bff;
        border-radius: 0.9rem 0.9rem 0.15rem 0.15rem;
        color: #ffffff;
        background: linear-gradient(180deg, #304bdb, #101469);
        font-family: 'KH Menu', var(--font-body);
        font-size: 0.85rem;
        letter-spacing: 0.08em;
        line-height: 1;
        text-align: center;
        text-transform: uppercase;
        box-shadow: 0 0 0.65rem rgb(45 78 255 / 54%);
    }

    .koops-mode .mode-switch button {
        border: 1px solid transparent;
        border-radius: 0.6rem 0.6rem 0.15rem 0.15rem;
        color: rgb(220 232 255 / 72%);
        font-family: 'KH Menu', var(--font-body);
        font-size: 1rem;
        font-weight: 400;
        letter-spacing: 0.04em;
    }

    .koops-mode .mode-switch button.active {
        border: 1px solid #ff8c1a;
        color: #fff7df;
        background: linear-gradient(180deg, #bd3e08, #5b1307);
        text-shadow: 0 0 0.7rem rgb(255 174 79 / 90%);
        box-shadow:
            inset 0 1px 0 rgb(255 214 126 / 58%),
            0 0 0.75rem rgb(255 93 15 / 58%);
    }

    .koops-mode .mode-switch button.active .selection-mark {
        position: absolute;
        top: 50%;
        left: 0.45rem;
        display: block;
        width: 0.38rem;
        aspect-ratio: 1;
        border: 1px solid #fff1c9;
        background: #ff9a24;
        box-shadow: 0 0 0.6rem #ff6a13;
        transform: translateY(-50%) rotate(45deg);
    }

    .koops-view {
        position: relative;
        padding: clamp(1.4rem, 4vw, 3rem);
        border: 2px solid #143dff;
        border-radius: 1.15rem 1.15rem 0.25rem 0.25rem;
        background:
            linear-gradient(90deg, rgb(10 42 132 / 78%), rgb(3 13 57 / 90%)),
            repeating-linear-gradient(0deg, rgb(255 255 255 / 3%) 0 1px, transparent 1px 4px);
        box-shadow:
            inset 0 1px 0 #0aa7ff,
            inset 0 -1px 0 rgb(6 117 255 / 68%),
            0 0 1.5rem rgb(12 47 255 / 38%);
    }

    .koops-view::before,
    .koops-view::after {
        content: '';
        position: absolute;
        pointer-events: none;
    }

    .koops-view::before {
        top: 0;
        left: clamp(1.2rem, 4vw, 3rem);
        width: min(14rem, 58%);
        height: 2px;
        background: linear-gradient(90deg, #0abaff, transparent);
        box-shadow: 0 0 0.7rem #0868ff;
    }

    .koops-view::after {
        right: 0;
        bottom: clamp(1rem, 4vw, 2.5rem);
        width: 2px;
        height: clamp(3rem, 10vw, 6rem);
        background: linear-gradient(180deg, transparent, #0abaff);
        box-shadow: 0 0 0.7rem #0868ff;
    }

    .koops-view,
    .koops-view .mode-description,
    .koops-view .topic-list,
    .koops-view .entries-heading {
        font-family: 'KH Menu', var(--font-body);
    }

    .koops-view .mode-label {
        color: #ffad55;
        font-family: 'KH Menu', var(--font-body);
        font-weight: 400;
        letter-spacing: 0.18em;
        text-shadow: 0 0 0.65rem rgb(255 104 22 / 66%);
    }

    .koops-view h1 {
        width: fit-content;
        color: #f7fbff;
        font-family: 'KH Gummi', 'KH Menu', sans-serif;
        font-size: clamp(2.8rem, 8vw, 5.5rem);
        font-weight: 400;
        letter-spacing: 0.025em;
        text-shadow:
            0 2px 0 #6e82a6,
            0 5px 0 #17233c,
            0 0 1.2rem rgb(101 165 255 / 44%);
    }

    .koops-view .mode-description {
        color: rgb(225 235 255 / 82%);
        font-size: clamp(1.05rem, 2.2vw, 1.35rem);
        letter-spacing: 0.025em;
    }

    .koops-view .topic-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .koops-view .topic-list li {
        border-color: rgb(37 89 255 / 78%);
        border-radius: 0.65rem 0.65rem 0.15rem 0.15rem;
        color: rgb(223 235 255 / 82%);
        background: linear-gradient(180deg, rgb(24 69 185 / 76%), rgb(5 23 91 / 82%));
        font-size: clamp(0.85rem, 1.7vw, 1rem);
        box-shadow: inset 0 1px 0 rgb(36 174 255 / 38%);
    }

    .koops-view .topic-list li:hover,
    .koops-view .topic-list li:focus-within {
        border-color: #1d7cff;
        color: #ffffff;
        box-shadow:
            inset 0 1px 0 rgb(36 174 255 / 58%),
            0 0 0.55rem rgb(18 72 255 / 40%);
    }

    .koops-view .topic-list li.selected {
        border-color: #ff8c1a;
        color: #fff7df;
        background: linear-gradient(180deg, #bd3e08, #5b1307);
        box-shadow:
            inset 0 1px 0 rgb(255 214 126 / 50%),
            0 0 0.65rem rgb(255 93 15 / 46%);
    }

    .koops-view .tag-selection {
        border: 1px solid #fff1c9;
        border-radius: 0;
        background: #ff9a24;
        box-shadow: 0 0 0.6rem #ff6a13;
        transform: rotate(45deg);
    }

    .koops-view .entries-heading {
        color: #a9c9fa;
        font-weight: 400;
    }

    .koops-view .entries-rule {
        background: linear-gradient(90deg, #84b8ff, rgb(132 184 255 / 8%));
        box-shadow: 0 0 0.5rem rgb(77 147 255 / 50%);
    }

    @keyframes mode-enter {
        from {
            opacity: 0;
            transform: translateY(0.45rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes mode-loader-cycle {
        0% { opacity: 0; }
        20%, 74% { opacity: 1; }
        100% { opacity: 0; }
    }

    @keyframes mode-loader-content {
        0%, 10% {
            opacity: 0;
            transform: translateY(0.6rem);
        }
        30%, 72% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-0.35rem);
        }
    }

    @keyframes mode-loader-progress {
        0% { transform: scaleX(0); }
        100% { transform: scaleX(1); }
    }

    @media (max-width: 520px) {
        .blog-container {
            align-items: flex-start;
            padding-top: clamp(3rem, 12vw, 5rem);
        }

        .mode-switch {
            width: 100%;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-bottom: 1.5rem;
        }

        .koops-view {
            padding: 1.35rem 1rem 1.6rem;
        }

        .koops-view h1 {
            font-size: clamp(3.25rem, 19vw, 5rem);
        }

        .koops-view .topic-list {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    @media (prefers-color-scheme: dark) {
        .blog-container {
            --kersh-tag-accent: #b99add;
        }

        .mode-loader.to-kersh {
            --kersh-loader-ink: #f3f7f6;
            color: #f3f7f6;
            background:
                radial-gradient(ellipse at 50% 35%, #121a20 0%, #080c0f 52%, #030405 100%),
                #050709;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .blog-container::before,
        .mode-switch,
        .mode-switch button,
        .topic-list li,
        .mode-view,
        .mode-loader,
        .mode-loader-inner,
        .mode-loader-track span {
            animation: none;
            transition: none;
        }
    }
</style>
