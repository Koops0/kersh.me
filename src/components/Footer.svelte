<script lang="ts">
    import { onMount } from 'svelte';

    let previousSiteUrl = '#';
    let nextSiteUrl = '#';

    onMount(() => {
        const hostname = window.location.hostname.replace(/^www\./, '');
        const encodedHostname = encodeURIComponent(hostname);

        previousSiteUrl = `https://otu-ring.com/prev.html?from=${encodedHostname}`;
        nextSiteUrl = `https://otu-ring.com/next.html?from=${encodedHostname}`;
    });
</script>

<footer class="site-footer">
    <small>
        &copy; 2026 kershan arulneswaran. all rights reserved.
    </small>
    <p>built with love in scarborough.</p>

    <div id="otu-webring">
        <a
            id="webring-prev"
            class="webring-navigation"
            href={previousSiteUrl}
            title="Previous site"
            aria-label="Previous site in the OTU Webring"
        >
            ←
        </a>

        <a
            class="webring-home"
            href="https://otu-ring.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                src="https://otu-ring.com/assets/ontariotech.svg"
                alt="OTU Webring"
            />
        </a>

        <a
            id="webring-next"
            class="webring-navigation"
            href={nextSiteUrl}
            title="Next site"
            aria-label="Next site in the OTU Webring"
        >
            →
        </a>
    </div>
</footer>

<style>
.site-footer {
    padding: 1.25rem max(clamp(1rem, 5vw, 4.5rem), env(safe-area-inset-right));
    padding-bottom: max(1.25rem, env(safe-area-inset-bottom));
    padding-left: max(clamp(1rem, 5vw, 4.5rem), env(safe-area-inset-left));
    text-align: center;
    font-family: var(--font-body);
    font-weight: 600;
    background: transparent;
}

small {
    display: block;
    font-size: clamp(0.8rem, 2.5vw, 0.9rem);
    line-height: 1.4;
}

p {
    margin: 0.2rem 0 0;
    font-size: clamp(0.8rem, 2.5vw, 0.9rem);
    font-weight: 800;
    line-height: 1.4;
}

#otu-webring {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 1rem;
}

.webring-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    color: #71717a;
    background: transparent;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.webring-navigation:hover,
.webring-navigation:focus-visible {
    color: #fafafa;
    background-color: rgba(255, 255, 255, 0.1);
}

.webring-home {
    display: flex;
    align-items: center;
    border: none;
}

.webring-home img {
    width: auto;
    height: 20px;
    opacity: 0.7;
    transition: opacity 0.2s ease;
}

.webring-home:hover img,
.webring-home:focus-visible img {
    opacity: 1;
}
</style>
