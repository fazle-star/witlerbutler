
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth mouse parallax effect
            let mouseX = 0, mouseY = 0;
            let currentX = 0, currentY = 0;

            document.addEventListener('mousemove', function(e) {
                mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            });

            function animate() {
                currentX += (mouseX - currentX) * 0.1;
                currentY += (mouseY - currentY) * 0.1;

                const orbs = document.querySelectorAll('.floating-orb');
                orbs.forEach((orb, index) => {
                    const speed = (index + 1) * 0.3;
                    const x = currentX * speed * 10;
                    const y = currentY * speed * 10;
                    orb.style.transform = `translate(${x}px, ${y}px)`;
                });

                requestAnimationFrame(animate);
            }
            animate();

            // Enhanced button interaction
            const sawerButton = document.querySelector('.sawer-button');
            sawerButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            });

            sawerButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });

            // Elegant skill tag stagger effect on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.skill-tag').forEach(tag => {
                observer.observe(tag);
            });
        });