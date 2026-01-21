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
    padding: 2rem;
}

.content {
    max-width: 800px;
    width: 100%;
}

h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 900;
    font-style: italic;
    margin: 0 0 2rem 0;
    line-height: 1;
}

h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    margin: 2rem 0 1rem 0;
}

p {
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.6;
    margin-bottom: 1rem;
}

ul {
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.8;
    list-style-position: inside;
}

li {
    margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
    .about-container {
        padding: 1rem;
    }
}
</style>