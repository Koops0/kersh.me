<script lang="ts">
    // About component
</script>

<div class="about-container">
    <div class="content">
        <h1>Hello There!</h1>
        <p>I'm Kershan Arulneswaran, a software engineer passionate about all things tech.</p>
        
        <h2>What I Do</h2>
        <p>I specialize in full-stack development, with a focus on modern web technologies and user experience design.</p>
        
        <h2>Skills</h2>
        <ul>
            <li>JavaScript/TypeScript</li>
            <li>React, Svelte, Astro</li>
            <li>Node.js</li>
            <li>UI/UX Design</li>
        </ul>
        
        <h2>Get In Touch</h2>
        <p>Feel free to reach out if you'd like to collaborate or just chat about tech!</p>
    </div>
</div>

<style>
.about-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-height: 100svh;
    padding: clamp(4rem, 9vw, 8rem) max(clamp(1rem, 5vw, 4.5rem), env(safe-area-inset-left));
    padding-right: max(clamp(1rem, 5vw, 4.5rem), env(safe-area-inset-right));
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
}

h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 800;
    margin: 2rem 0 1rem 0;
}

p {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.6;
    margin: 0 0 1rem;
    overflow-wrap: anywhere;
}

ul {
    padding-left: 1.25rem;
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.8;
}

li {
    margin-bottom: 0.5rem;
}

@media (max-width: 520px) {
    h1 {
        margin-bottom: 1.5rem;
    }

    h2 {
        margin-top: 1.75rem;
    }
}
</style>
