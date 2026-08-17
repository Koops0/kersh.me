<script lang="ts">
    export let name: string;
    export let demo: string | undefined = undefined;
    export let github: string | undefined = undefined;
    export let description: string;
    export let years: string;
</script>

<article class="project-item">
    <div class="details">
        <div class="heading-row">
            <h3>{name}</h3>

            {#if demo || github}
                <div class="project-links" aria-label={`${name} links`}>
                    {#if demo}
                        <a
                            href={demo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${name} demo`}
                        >demo <span aria-hidden="true">↗</span></a>
                    {/if}
                    {#if github}
                        <a
                            href={github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${name} on GitHub`}
                        >github <span aria-hidden="true">↗</span></a>
                    {/if}
                </div>
            {/if}
        </div>

        <p class="description">{description}</p>
    </div>

    <p class="years">{years}</p>
</article>

<style>
    .project-item {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: start;
        gap: clamp(0.85rem, 1.8vw, 1.25rem);
        transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .project-item:hover,
    .project-item:focus-within {
        transform: translateX(0.4rem);
    }

    .details {
        min-width: 0;
    }

    .heading-row {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 0.45rem clamp(0.8rem, 2vw, 1.25rem);
    }

    h3,
    p {
        margin: 0;
    }

    h3 {
        font-family: var(--font-body);
        font-size: clamp(1.05rem, 2.5vw, 1.55rem);
        font-weight: 700;
        font-stretch: normal;
        font-variation-settings: normal;
        line-height: 1.25;
        transition: color 160ms ease;
    }

    .project-item:hover h3,
    .project-item:focus-within h3 {
        color: var(--accent);
    }

    .project-links {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .project-links a {
        color: var(--muted-ink);
        font-size: clamp(0.8rem, 1.5vw, 0.95rem);
        font-weight: 600;
        line-height: 1;
        text-decoration: none;
        transition: color 160ms ease;
    }

    .project-links a:hover,
    .project-links a:focus-visible {
        color: var(--ink);
    }

    .project-links span {
        display: inline-block;
        transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .project-links a:hover span,
    .project-links a:focus-visible span {
        transform: translate(0.12rem, -0.12rem);
    }

    .description {
        margin-top: 0.3rem;
        color: var(--muted-ink);
        font-size: clamp(0.95rem, 2vw, 1.25rem);
        line-height: 1.35;
    }

    .years {
        text-align: right;
        white-space: nowrap;
        color: var(--muted-ink);
        font-size: clamp(0.9rem, 1.8vw, 1.1rem);
        line-height: 1.55;
    }

    @media (max-width: 560px) {
        .project-item {
            grid-template-columns: minmax(0, 1fr);
            gap: 0.3rem;
        }

        .years {
            text-align: left;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .project-item,
        h3,
        .project-links a,
        .project-links span {
            transition: none;
        }

        .project-item:hover,
        .project-item:focus-within,
        .project-links a:hover span,
        .project-links a:focus-visible span {
            transform: none;
        }
    }
</style>
