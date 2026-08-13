<div class="projects-container">
    <div class="content">
        <h1>Projects</h1>
    </div>
</div>

<style>
    .projects-container {
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
    }

    .content {
        max-width: 50rem;
        width: 100%;
        min-width: 0;
    }

    h1 {
        font-size: clamp(2.75rem, 8vw, 6rem);
        font-weight: 800;
        margin: 0 0 2rem 0;
        line-height: 1;
        color: var(--ink);
    }

    @supports (-webkit-text-stroke: 1px black) {
        h1 {
            color: transparent;
            -webkit-text-stroke: clamp(1.25px, 0.08em, 3px) var(--ink);
            paint-order: stroke fill;
        }
    }

    @media (max-width: 520px) {
        h1 {
            margin-bottom: 1.5rem;
        }
    }
</style>
