<script lang="ts">
    // About component
</script>

<div class="about-container">
    <div class="content">
        <h1>Heyo!</h1>
        <p>My name is Kershan Arulneswaran.</p>
        <p>
            I'm the guy who intentionally breaks low- and high level shit,
            because I'd rather find out exactly how something fails before the
            real world does it for me.
        </p>
        <p>
            I'm the guy who can jump from embedded systems and real-time
            software to computer vision, robotics, AI, and larger software
            systems without pretending those layers exist in separate universes.
        </p>
        <p>
            I'm the guy who likes software most when it has to deal with actual
            hardware, actual constraints, and all the weird shit that happens
            when reality doesn't care what the documentation promised.
        </p>
        <p>
            I'm the guy who treats debugging like engineering: reproduce the
            failure, isolate it, push it until something gives, figure out which
            assumptions were right and what were bullshit, and make sure the
            next version is harder to kill.
        </p>
        <p>
            I'm the guy who genuinely loves AI and machine learning, but hates
            AI slop. If the entire pitch is "we added AI", then I probably don't
            give a shit unless it actually makes the product smarter, faster,
            safer, more useful, or more interesting.
        </p>
        <p>
            I'm the guy who still builds things because they're fun, whether
            that's experimenting with computer vision, making software play
            games for me, messing around with AI, or spending an unreasonable
            amount of time making a boring solution way cooler than it needed to
            be.
        </p>
        <p>
            I'm the guy who loves robotics and engineering as much as I love
            games, cinema, motorsports, basketball, martial arts, and figuring
            out how the hell people built the systems, experiences, and stories
            behind them.
        </p>
        <p>
            I'm also the guy who likes the people side of all this too: coffee
            chats, job events, hackathons, random conversations, swapping ideas,
            hearing how other people got where they are, and occasionally
            turning a five-minute introduction into a friendship, a
            collaboration, or a completely different way of looking at
            something.
        </p>
        <p>
            I'm the guy who wants to work on difficult systems, ambitious
            projects, and the kind of engineering problems where "good enough"
            eventually comes back to bite you.
        </p>
        <p>
            I'm the guy who cares a lot more about whether something actually
            works than whether it looks impressive in a demo.
        </p>
        <p>
            Oh, and I'm the guy who actually reads cold emails, so if you're
            building something difficult, weird, ambitious, slightly ridiculous,
            or just genuinely cool, send me one.
        </p>
    </div>
</div>

<style>
    .about-container {
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

    p {
        font-size: clamp(1.05rem, 2vw, 1.25rem);
        line-height: 1.6;
        margin: 0 0 1rem;
        overflow-wrap: anywhere;
    }

    @media (max-width: 520px) {
        h1 {
            margin-bottom: 1.5rem;
        }
    }
</style>
