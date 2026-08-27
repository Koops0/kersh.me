<footer class="site-footer">
    <small>
        &copy; 2026 kershan arulneswaran. all rights reserved.
    </small>
    <p>built with love in scarborough.</p>

    <div id="otu-webring">
        <a
            id="webring-prev"
            class="webring-navigation"
            href="https://otu-ring.com/prev.html?from=kersharul.com"
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
            style="display: flex; align-items: center; border: none;"
        >
            <img
                src="/images/ontariotech.svg"
                alt="OTU Webring"
            />
        </a>

        <a
            id="webring-next"
            class="webring-navigation"
            href="https://otu-ring.com/next.html?from=kersharul.com"
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
    gap: 0.75rem;
    margin-top: 0.65rem;
    line-height: 1;
}

.webring-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: none;
    border-radius: 4px;
    color: #71717a;
    background: transparent;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.webring-home {
    width: 2rem;
    height: 2rem;
    justify-content: center;
    line-height: 0;
}

.webring-home img {
    display: block;
    flex: none;
    width: auto;
    height: 20px;
    opacity: 0.7;
    filter: brightness(0);
    transition: opacity 0.2s ease;
}

@media (prefers-color-scheme: dark) {
    .webring-home img {
        filter: brightness(0) invert(1);
    }
}

:global(html.koops-blog-active) .webring-home img,
:global(html.koops-post-page) .webring-home img {
    filter: brightness(0) invert(1);
}

.webring-navigation:hover,
.webring-navigation:focus-visible {
    color: #fafafa;
    background-color: rgba(255, 255, 255, 0.1);
}

</style>
