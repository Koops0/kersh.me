<script lang="ts">
    import { onMount } from 'svelte';

    let firstNameEl: HTMLElement | null = null;
    let lastNameEl: HTMLElement | null = null;
    let professionEl: HTMLElement | null = null;

    const chars = 'abcdefghijklmnopqrstuvwxyz';
    
    function scrambleText(element: HTMLElement, targetText: string, duration: number = 1500) {
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

    onMount(() => {
        setTimeout(() => {
            if (firstNameEl) scrambleText(firstNameEl, 'KERSHAN', 1500);
        }, 300);
        
        setTimeout(() => {
            if (lastNameEl) scrambleText(lastNameEl, 'ARULNESWARAN', 1800);
        }, 1500);
        
        setTimeout(() => {
            if (professionEl) scrambleText(professionEl, 'Software Engineer', 1200);
        }, 100);
    });
</script>

<div class="intro">
    <div class="name-container">
        <h1 bind:this={firstNameEl} class="first-name"></h1>
        <h1 bind:this={lastNameEl} class="last-name"></h1>
    </div>
    
    <div class="info-section">
        <div class="profession-row">
            <p class="profession" bind:this={professionEl}></p>
            <span class="separator">|</span>
            <nav class="sections">
                <a href="/blog">Blog</a>
                <span class="separator">|</span>
                <a href="/projects">Projects</a>
                <span class="separator">|</span>
                <a href="/about">About</a>
            </nav>
        </div>
    </div>
</div>

<style>
    .intro {
        padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem);
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: clamp(1.5rem, 4vw, 3rem);
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
    }
    
    .name-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        width: 100%;
        min-height: clamp(6rem, 20vw, 20rem);
    }
    
    h1 {
        font-size: clamp(3rem, 10vw, 10rem);
        font-weight: 900;
        font-style: italic;
        margin: 0;
        color: inherit;
        text-align: left;
        line-height: 0.95;
        width: 100%;
        overflow-wrap: break-word;
        word-break: break-word;
        min-height: clamp(3rem, 10vw, 10rem);
    }
    
    .info-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }
    
    .profession-row {
        display: flex;
        align-items: center;
        gap: clamp(0.75rem, 2vw, 1.5rem);
        flex-wrap: wrap;
    }
    
    .profession {
        font-size: clamp(1.25rem, 3vw, 3rem);
        font-weight: 600;
        margin: 0;
        color: rgba(0, 0, 0, 0.7);
        text-align: left;
        min-width: 15ch;
    }
    
    .sections {
        display: flex;
        gap: clamp(0.75rem, 2vw, 1.5rem);
        align-items: center;
    }
    
    .sections a {
        font-size: clamp(0.875rem, 2vw, 1.25rem);
        font-weight: 600;
        text-decoration: none;
        color: inherit;
        transition: all 0.3s ease;
    }
    
    .sections a:hover {
        color: rgba(0, 0, 0, 0.6);
        transform: translateY(-2px);
    }
    
    .separator {
        font-size: clamp(0.875rem, 2vw, 1.25rem);
        color: currentColor;
        user-select: none;
    }

    /* Tablet breakpoint */
    @media (max-width: 768px) {
        .intro {
            min-height: 50vh;
        }
        
        .name-container {
            min-height: clamp(5rem, 18vw, 12rem);
        }
        
        h1 {
            font-size: clamp(2.5rem, 9vw, 6rem);
            min-height: clamp(2.5rem, 9vw, 6rem);
        }
        
        .profession {
            font-size: clamp(1rem, 2.5vw, 2rem);
        }
    }

    /* Mobile breakpoint */
    @media (max-width: 480px) {
        .intro {
            padding: 2rem 1rem;
            min-height: auto;
            gap: 1.5rem;
        }
        
        .name-container {
            gap: 0.25rem;
            min-height: clamp(4rem, 16vw, 8rem);
        }
        
        h1 {
            font-size: clamp(2rem, 8vw, 4rem);
            line-height: 1;
            min-height: clamp(2rem, 8vw, 4rem);
        }
        
        .profession {
            font-size: clamp(0.875rem, 2vw, 1.25rem);
            min-width: auto;
        }
        
        .profession-row {
            gap: 0.5rem;
        }
        
        .sections {
            gap: 0.5rem;
        }
        
        .sections a {
            font-size: 0.875rem;
        }
        
        .separator {
            font-size: 0.875rem;
        }
    }
</style>