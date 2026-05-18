/* ============================================
   PORTFOLIO BUT GEII — ARTHUR DELAIS
   Scripts v3 : étoiles 3D, parallaxe, animations
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // 1. PRELOADER
    // ============================================
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => preloader.classList.add('hidden'), 300);
        }
    });

    // ============================================
    // 2. CHAMP D'ÉTOILES 3D (avec profondeur)
    // Les étoiles plus proches sont plus claires, plus grosses,
    // et bougent plus vite que celles du fond — effet parallaxe.
    // ============================================
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        let shootingStars = [];
        let mouse = { x: null, y: null, active: false };
        const STAR_COUNT_BASE = 200;     // dépend de la taille de l'écran
        const NUM_LAYERS = 4;            // 4 couches de profondeur

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        }
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        });
        window.addEventListener('mouseleave', () => { mouse.active = false; });

        class Star {
            constructor() {
                this.reset();
                // À l'init, on les place aléatoirement sur l'écran
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // depth = 0 (très loin) à 1 (très proche)
                this.depth = Math.random();
                // taille selon profondeur (entre 0.4 et 2.4 px)
                this.size = 0.4 + this.depth * 2;
                // luminosité : étoiles proches très claires, lointaines plus sombres
                this.baseAlpha = 0.15 + this.depth * 0.75;
                // vitesse : les étoiles proches bougent plus vite (parallaxe)
                this.vx = (Math.random() - 0.5) * (0.05 + this.depth * 0.35);
                this.vy = (Math.random() - 0.5) * (0.05 + this.depth * 0.35);
                // pulsation : phase aléatoire pour scintillement asynchrone
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.pulseSpeed = 0.01 + Math.random() * 0.03;
                // couleur : majorité cyan, quelques blanches, quelques bleues
                const r = Math.random();
                if (r < 0.7) this.color = [0, 212, 255];          // cyan accent
                else if (r < 0.92) this.color = [232, 238, 247];  // blanc
                else this.color = [77, 217, 255];                 // cyan clair
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.pulsePhase += this.pulseSpeed;

                // Réapparaît de l'autre côté si elle sort
                if (this.x < -10) this.x = canvas.width + 10;
                else if (this.x > canvas.width + 10) this.x = -10;
                if (this.y < -10) this.y = canvas.height + 10;
                else if (this.y > canvas.height + 10) this.y = -10;
            }

            draw() {
                // Scintillement (sinusoïdal autour de baseAlpha)
                const twinkle = 0.7 + 0.3 * Math.sin(this.pulsePhase);
                let alpha = this.baseAlpha * twinkle;

                // Effet souris : les étoiles proches de la souris brillent plus
                if (mouse.active && this.depth > 0.5) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        alpha = Math.min(1, alpha + (1 - dist / 200) * 0.5);
                    }
                }

                const [r, g, b] = this.color;

                // Halo (glow) pour les étoiles les plus proches
                if (this.depth > 0.6) {
                    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
                    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
                    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
                    ctx.fill();
                }

                // L'étoile elle-même
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Étoile filante occasionnelle
        class ShootingStar {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height * 0.5;  // moitié supérieure
                const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;  // ~45°
                const speed = 4 + Math.random() * 4;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.length = 60 + Math.random() * 60;
                this.life = 1;
                this.decay = 0.012 + Math.random() * 0.01;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
            }
            draw() {
                const tailX = this.x - this.vx * (this.length / 8);
                const tailY = this.y - this.vy * (this.length / 8);
                const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${this.life})`);
                gradient.addColorStop(0.4, `rgba(77, 217, 255, ${this.life * 0.6})`);
                gradient.addColorStop(1, `rgba(0, 212, 255, 0)`);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();

                // Tête brillante
                ctx.fillStyle = `rgba(255, 255, 255, ${this.life})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initStars() {
            stars = [];
            // Plus l'écran est grand, plus on met d'étoiles
            const count = Math.min(350, Math.floor((canvas.width * canvas.height) / 6000));
            for (let i = 0; i < count; i++) {
                stars.push(new Star());
            }
        }

        // Connexions entre étoiles proches (uniquement les étoiles "proches")
        function drawConnections() {
            const closeStars = stars.filter(s => s.depth > 0.65);
            for (let i = 0; i < closeStars.length; i++) {
                for (let j = i + 1; j < closeStars.length; j++) {
                    const dx = closeStars[i].x - closeStars[j].x;
                    const dy = closeStars[i].y - closeStars[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const opacity = (1 - dist / 120) * 0.2;
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx.lineWidth = 0.4;
                        ctx.beginPath();
                        ctx.moveTo(closeStars[i].x, closeStars[i].y);
                        ctx.lineTo(closeStars[j].x, closeStars[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Connexions de la souris aux étoiles proches autour
        // Trace des lignes brillantes entre le curseur et les étoiles dans un rayon donné.
        function drawMouseConnections() {
            if (!mouse.active) return;
            const MOUSE_REACH = 220;  // rayon d'attraction visuelle
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                // On vise surtout les étoiles "visibles" (depth > 0.35)
                if (s.depth < 0.35) continue;
                const dx = s.x - mouse.x;
                const dy = s.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_REACH) {
                    const t = 1 - dist / MOUSE_REACH;  // proche = 1, loin = 0
                    // Opacité plus marquée pour les étoiles proches en profondeur ET proches du curseur
                    const opacity = t * (0.4 + s.depth * 0.5);
                    // Dégradé du blanc (à la souris) vers le cyan (à l'étoile)
                    const grad = ctx.createLinearGradient(mouse.x, mouse.y, s.x, s.y);
                    grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
                    grad.addColorStop(1, `rgba(0, 212, 255, ${opacity * 0.6})`);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 0.4 + t * 0.9;  // ligne plus épaisse quand proche
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(s.x, s.y);
                    ctx.stroke();
                }
            }

            // Halo discret autour du curseur lui-même
            const cursorGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 40);
            cursorGrad.addColorStop(0, 'rgba(0, 212, 255, 0.35)');
            cursorGrad.addColorStop(1, 'rgba(0, 212, 255, 0)');
            ctx.fillStyle = cursorGrad;
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2);
            ctx.fill();
        }

        let frameCount = 0;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Étoiles
            stars.forEach(s => { s.update(); s.draw(); });
            drawConnections();
            drawMouseConnections();

            // Étoiles filantes : ~1 toutes les 4-8 secondes
            if (Math.random() < 0.003 && shootingStars.length < 2) {
                shootingStars.push(new ShootingStar());
            }
            shootingStars = shootingStars.filter(s => s.life > 0);
            shootingStars.forEach(s => { s.update(); s.draw(); });

            frameCount++;
            requestAnimationFrame(animate);
        }

        resize();
        animate();
    }

    // ============================================
    // 3. TYPEWRITER (effet machine à écrire)
    // ============================================
    const typeTarget = document.querySelector('[data-typewriter]');
    if (typeTarget) {
        const text = typeTarget.getAttribute('data-typewriter');
        const speed = 80;
        let i = 0;
        typeTarget.innerHTML = '<span class="cursor"></span>';
        const cursor = typeTarget.querySelector('.cursor');

        function typeStep() {
            if (i < text.length) {
                cursor.insertAdjacentText('beforebegin', text.charAt(i));
                i++;
                setTimeout(typeStep, speed);
            }
        }
        setTimeout(typeStep, 400);
    }

    // ============================================
    // 4. REVEAL AU SCROLL
    // ============================================
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(el => observer.observe(el));
    }

    // ============================================
    // 5. COMPTEUR ANIMÉ
    // ============================================
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length > 0) {
        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-counter'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    const duration = 1200;
                    const startTime = performance.now();

                    function step(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(target * eased) + suffix;
                        if (progress < 1) requestAnimationFrame(step);
                    }
                    requestAnimationFrame(step);
                    counterObs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObs.observe(c));
    }

    // ============================================
    // 6. SPOTLIGHT sur les cartes (lueur qui suit la souris)
    // ============================================
    document.querySelectorAll('.competence-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // ============================================
    // 7. LIGHTBOX (clic sur photo = plein écran)
    // ============================================
    const photoCards = document.querySelectorAll('.photo-card img');
    if (photoCards.length > 0) {
        // Création du conteneur lightbox une seule fois
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = '<button class="lightbox-close" aria-label="Fermer">×</button><img alt="" />';
        document.body.appendChild(lightbox);

        const lbImg = lightbox.querySelector('img');
        const lbClose = lightbox.querySelector('.lightbox-close');

        function openLightbox(src, alt) {
            lbImg.src = src;
            lbImg.alt = alt || '';
            lightbox.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }
        function closeLightbox() {
            lightbox.classList.remove('is-open');
            document.body.style.overflow = '';
        }

        photoCards.forEach(img => {
            img.addEventListener('click', () => openLightbox(img.src, img.alt));
        });

        lbClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
        });
    }

})();
