<script lang="ts">
    import { onMount } from 'svelte';
    import FaGithub from 'svelte-icons/fa/FaGithub.svelte'
    import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte'
    import FaFileAlt from 'svelte-icons/fa/FaFileAlt.svelte'
    import FaAddressBook from 'svelte-icons/fa/FaAddressBook.svelte'

    let titleEl: HTMLElement | null = null;

    const chars = 'abcdefghijklmnopqrstuvwxyz';
    
    function scrambleText(element: HTMLElement, targetText: string, duration: number = 1000) {
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
                requestAnimationFrame(update);
            } else {
                element.textContent = targetText;
            }
        }
        
        update();
    }

    function handleEnter(){
        if (titleEl) scrambleText(titleEl, 'kershan arulneswaran', 1000);
    }

    function handleLeave(){
        if (titleEl) scrambleText(titleEl, 'k.a.', 600);
    }
</script>

<header>
    <h1 bind:this={titleEl} on:mouseenter={handleEnter} on:mouseleave={handleLeave}>k.a.</h1>
    <div>
    <h2>blog</h2>
    <h2>projects</h2>
    <h2 class="icon"><a href="https://www.github.com/Koops0"><span class="icon-wrap"><FaGithub /></span></a></h2>
    <h2 class="icon"><a href="https://www.linkedin.com/in/kersharul"><span class="icon-wrap"><FaLinkedin /></span></a></h2>
    <h2 class="icon"><a href="https://drive.google.com/file/d/1jPCh-QhYFi3i5vUelo-nUfRa9Tjc3tWD/view?usp=sharing"><span class="icon-wrap"><FaFileAlt /></span></a></h2>
    <h2 class="icon"><a href="mailto:kershan.arulneswaran@gmail.com"><span class="icon-wrap"><FaAddressBook /></span></a></h2>
    </div>

</header>

<style>
    header{
        padding-left: 5%;
        padding-right: 5%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }


div{
    display: flex;
    gap: 2rem;
    align-items: center;
}

.icon-wrap :global(svg) {
    width: 2rem;
    height: 2rem;
    display: inline-block;
    vertical-align: middle;
}

.icon:hover{
    transform: scale(1.1);
    color: rgb(63, 95, 95);
    transition: all 0.3s ease;
}

a{
    text-decoration: none;
    color: inherit;
}

h1{
    text-align: left;
}
h2{
    text-align: right;
}
</style>