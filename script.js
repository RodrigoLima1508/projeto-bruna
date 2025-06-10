document.addEventListener('DOMContentLoaded', () => {

    // --- Bloco 1: Funcionalidade do Aviso de Idade ---
    const ageGate = document.getElementById('age-gate');
    // Só executa este bloco se o elemento #age-gate existir
    if (ageGate) {
        const confirmYesBtn = document.getElementById('age-confirm-yes');
        const confirmNoBtn = document.getElementById('age-confirm-no');

        // Mostra o aviso apenas se a idade ainda não foi confirmada nesta sessão
        if (sessionStorage.getItem('ageConfirmed') === 'true') {
            ageGate.style.display = 'none';
        } else {
            ageGate.style.display = 'flex'; // Garante que ele apareça
        }

        // Adiciona o evento de clique ao botão 'Sim'
        if (confirmYesBtn) {
            confirmYesBtn.addEventListener('click', () => {
                ageGate.style.display = 'none';
                sessionStorage.setItem('ageConfirmed', 'true');
            });
        }

        // Adiciona o evento de clique ao botão 'Não'
        if (confirmNoBtn) {
            confirmNoBtn.addEventListener('click', () => {
                // Redireciona o usuário para um site seguro
                window.location.href = 'https://www.google.com';
            });
        }
    }


    // --- Bloco 2: Menu Mobile (Hambúrguer) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    // Só executa se os elementos do menu mobile existirem
    if (menuToggle && navMenu) {
        const navLinks = navMenu.querySelectorAll('.nav-link');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    // --- Bloco 3: Funcionalidade do Carrossel ---
    const carrosselContainer = document.querySelector('.carrossel-container');
    // Só executa se o carrossel existir
    if (carrosselContainer) {
        const carrossel = carrosselContainer.querySelector('.carrossel');
        const proximoBtn = carrosselContainer.querySelector('.proximo');
        const anteriorBtn = carrosselContainer.querySelector('.anterior');
        const items = carrosselContainer.querySelectorAll('.carrossel-item');
        
        if(carrossel && proximoBtn && anteriorBtn && items.length > 0) {
            const totalItems = items.length;
            let currentIndex = 0;

            proximoBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarrossel();
            });

            anteriorBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarrossel();
            });

            function updateCarrossel() {
                const offset = -currentIndex * 100;
                carrossel.style.transform = `translateX(${offset}%)`;
            }
        }
    }


    // --- Bloco 4: Botão "Voltar ao Topo" ---
    const voltarTopoBtn = document.getElementById('voltarTopo');
    if (voltarTopoBtn) {
        window.onscroll = () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                voltarTopoBtn.style.display = 'block';
            } else {
                voltarTopoBtn.style.display = 'none';
            }
        };

        voltarTopoBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // --- Bloco 5: Marcar link de navegação ativo ao rolar ---
    const sections = document.querySelectorAll('section[id]');
    const menuNavLinks = document.querySelectorAll('.nav-menu a.nav-link');
    if (sections.length > 0 && menuNavLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    menuNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

});