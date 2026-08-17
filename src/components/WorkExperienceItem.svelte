<script lang="ts">
    export let icon: string;
    export let iconAlt: string;
    export let position: string;
    export let company: string;
    export let years: string;
    export let website: string;
    export let description: string | undefined = undefined;

    let iconFailed = false;
</script>

<a
    class="work-item"
    href={website}
    target="_blank"
    rel="noreferrer"
    aria-label={`${position} at ${company} — open company website`}
>
    <div class="icon-wrap">
        {#if iconFailed}
            <span class="icon-fallback" aria-hidden="true">{company.slice(0, 1)}</span>
        {:else}
            <img
                src={icon}
                alt={iconAlt}
                loading="eager"
                decoding="async"
                on:error={() => iconFailed = true}
            />
        {/if}
    </div>

    <div class="details">
        <h3>{position} <span>@ {company}</span></h3>
        {#if description}
            <p class="description">{description}</p>
        {/if}
    </div>

    <p class="years">{years}</p>
</a>

<style>
    .work-item {
        display: grid;
        grid-template-columns: clamp(1.9rem, 3.2vw, 2.35rem) minmax(0, 1fr) auto;
        align-items: start;
        gap: clamp(0.85rem, 1.8vw, 1.25rem);
        color: inherit;
        text-decoration: none;
        transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .work-item:hover,
    .work-item:focus-visible {
        transform: translateX(0.4rem);
    }

    .icon-wrap {
        width: 100%;
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .work-item:hover .icon-wrap,
    .work-item:focus-visible .icon-wrap {
        transform: scale(1.08) rotate(-2deg);
    }

    img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
    }

    .icon-fallback {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        border: 1px solid color-mix(in srgb, var(--ink) 30%, transparent);
        border-radius: 28%;
        color: var(--muted-ink);
        font-size: clamp(0.85rem, 2vw, 1.1rem);
        font-weight: 700;
        text-transform: uppercase;
    }

    .details {
        min-width: 0;
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

    .work-item:hover h3,
    .work-item:focus-visible h3 {
        color: var(--accent);
    }

    h3 span {
        white-space: nowrap;
    }

    .description {
        margin-top: 0.3rem;
        color: var(--muted-ink);
        font-size: clamp(0.95rem, 2vw, 1.25rem);
        line-height: 1.35;
    }

    .years {
        margin-top: 0;
        text-align: right;
        white-space: nowrap;
        color: var(--muted-ink);
        font-size: clamp(0.9rem, 1.8vw, 1.1rem);
        line-height: 1.55;
    }

    @media (max-width: 560px) {
        .work-item {
            grid-template-columns: 2rem minmax(0, 1fr);
        }

        .years {
            grid-column: 2;
            text-align: left;
            margin-top: -0.35rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .work-item,
        .icon-wrap {
            transition: none;
        }

        .work-item:hover,
        .work-item:focus-visible,
        .work-item:hover .icon-wrap,
        .work-item:focus-visible .icon-wrap {
            transform: none;
        }
    }
</style>
