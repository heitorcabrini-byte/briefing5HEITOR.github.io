class CustomFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    background-color: #f9fafb;
                    border-top: 1px solid #e5e7eb;
                    padding: 1.5rem 0;
                    margin-top: 2rem;
                }
                
                .footer-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                
                .footer-text {
                    color: #6b7280;
                    font-size: 0.875rem;
                    margin-bottom: 0.5rem;
                }
                
                .footer-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 0.5rem;
                }
                
                .footer-link {
                    color: #4f46e5;
                    font-size: 0.875rem;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .footer-link:hover {
                    color: #4338ca;
                    text-decoration: underline;
                }
            </style>
            
            <footer class="footer-container">
                <p class="footer-text">© 2023 PassportEdu. Todos os direitos reservados.</p>
                <div class="footer-links">
                    <a href="#" class="footer-link">Termos de Uso</a>
                    <a href="#" class="footer-link">Política de Privacidade</a>
                    <a href="#" class="footer-link">Contato</a>
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);