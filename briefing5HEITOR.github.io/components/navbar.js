class CustomNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const active = this.getAttribute('active') || '';
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    background-color: white;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }
                
                .nav-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    height: 4rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    color: #4f46e5;
                    text-decoration: none;
                }
                
                .logo-icon {
                    margin-right: 0.5rem;
                }
                
                .nav-links {
                    display: flex;
                    gap: 1rem;
                }
                
                .nav-link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 0.5rem 1rem;
                    color: #6b7280;
                    text-decoration: none;
                    font-size: 0.875rem;
                    transition: color 0.2s;
                }
                
                .nav-link:hover {
                    color: #4f46e5;
                }
                
                .nav-link.active {
                    color: #4f46e5;
                    position: relative;
                }
                
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: -6px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background-color: #4f46e5;
                    border-radius: 1px;
                }
                
                @media (max-width: 640px) {
                    .nav-link-text {
                        display: none;
                    }
                }
            </style>
            
            <nav class="nav-container">
                <a href="passport.html" class="logo">
                    <i data-feather="book" class="logo-icon"></i>
                    <span>PassportEdu</span>
                </a>
                
                <div class="nav-links">
                    <a href="passport.html" class="nav-link ${active === 'passport' ? 'active' : ''}">
                        <i data-feather="award"></i>
                        <span class="nav-link-text">Passaporte</span>
                    </a>
                    <a href="events.html" class="nav-link ${active === 'events' ? 'active' : ''}">
                        <i data-feather="calendar"></i>
                        <span class="nav-link-text">Eventos</span>
                    </a>
                    <a href="ranking.html" class="nav-link ${active === 'ranking' ? 'active' : ''}">
                        <i data-feather="bar-chart-2"></i>
                        <span class="nav-link-text">Ranking</span>
                    </a>
                    <a href="scanner.html" class="nav-link">
                        <i data-feather="maximize"></i>
                        <span class="nav-link-text">Escanear</span>
                    </a>
                </div>
            </nav>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);