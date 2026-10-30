document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       1. LÓGICA DO CARROSSEL DA PÁGINA INICIAL
       ========================================== */
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Só executa se estiver na página inicial (onde existem slides)
    if (slides.length > 0 && dots.length > 0) {
        let indexAtual = 0;
        let intervaloTroca;

        function mostrarSlide(index) {
            slides.forEach(slide => slide.classList.remove('ativo'));
            dots.forEach(dot => dot.classList.remove('ativo'));

            slides[index].classList.add('ativo');
            dots[index].classList.add('ativo');
            
            indexAtual = index;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault(); 
                mostrarSlide(index);
                reiniciarIntervalo(); 
            });
        });

        function iniciarIntervalo() {
            intervaloTroca = setInterval(() => {
                let proximo = (indexAtual + 1) % slides.length;
                mostrarSlide(proximo);
            }, 3000);
        }

        function reiniciarIntervalo() {
            clearInterval(intervaloTroca);
            iniciarIntervalo();
        }

        iniciarIntervalo(); 
    }

    /* ==========================================
       2. LÓGICA DO LIGHTBOX (PORTFÓLIO)
       ========================================== */
    const imagensPortfolio = document.querySelectorAll('.abrir-lightbox');
    const lightbox = document.getElementById('lightbox');
    const imgLightbox = document.getElementById('img-lightbox');
    const fecharLightbox = document.querySelector('.fechar-lightbox');

    // Se estiver na página de portfólio, ativa os cliques
    if (lightbox) {
        // Abrir a imagem ao clicar nela
        imagensPortfolio.forEach(imagem => {
            imagem.addEventListener('click', () => {
                lightbox.classList.add('ativo');
                imgLightbox.src = imagem.src; // Pega a mesma imagem clicada
            });
        });

        // Fechar no "X"
        fecharLightbox.addEventListener('click', () => {
            lightbox.classList.remove('ativo');
        });

        // Fechar ao clicar fora da imagem (no fundo preto)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('ativo');
            }
        });

        // Fechar apertando a tecla "Esc" do teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('ativo')) {
                lightbox.classList.remove('ativo');
            }
        });
    }
});