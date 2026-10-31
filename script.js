document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       1. LÓGICA DO CARROSSEL DA PÁGINA INICIAL
       ========================================== */
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

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

    if (lightbox) {
        imagensPortfolio.forEach(imagem => {
            imagem.addEventListener('click', () => {
                lightbox.classList.add('ativo');
                imgLightbox.src = imagem.src;
            });
        });

        if (fecharLightbox) {
            fecharLightbox.addEventListener('click', () => {
                lightbox.classList.remove('ativo');
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('ativo');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('ativo')) {
                lightbox.classList.remove('ativo');
            }
        });
    }

    /* ==========================================
       3. LÓGICA DE FILTROS DO PORTFÓLIO
       ========================================== */
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    const categoriasProjetos = document.querySelectorAll('.categoria-projeto');

    if (botoesFiltro.length > 0 && categoriasProjetos.length > 0) {
        botoesFiltro.forEach(botao => {
            botao.addEventListener('click', () => {
                botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
                botao.classList.add('ativo');

                const filtro = botao.getAttribute('data-filtro');

                categoriasProjetos.forEach(categoria => {
                    const categoriaProjeto = categoria.getAttribute('data-categoria');

                    if (filtro === 'todos' || categoriaProjeto === filtro) {
                        categoria.classList.remove('oculto');
                    } else {
                        categoria.classList.add('oculto');
                    }
                });
            });
        });
    }

    /* ==========================================
       4. LÓGICA DO BOTÃO VOLTAR AO TOPO
       ========================================== */
    const btnVoltarAoTopo = document.getElementById('btn-voltar-ao-topo');

    if (btnVoltarAoTopo) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnVoltarAoTopo.classList.add('visivel');
            } else {
                btnVoltarAoTopo.classList.remove('visivel');
            }
        });

        btnVoltarAoTopo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});