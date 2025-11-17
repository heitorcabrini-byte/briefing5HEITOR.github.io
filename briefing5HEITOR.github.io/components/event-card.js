
class CustomEventCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const name = this.getAttribute('name') || '';
        const date = this.getAttribute('date') || '';
        const time = this.getAttribute('time') || '';
        const location = this.getAttribute('location') || '';
        const description = this.getAttribute('description') || '';
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                .card {
                    background-color: white;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                
                .card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .card-header {
                    padding: 1rem;
                    background-color: #f3f4f6;
                    border-bottom: 1px solid #e5e7eb;
                }
                
                .card-title {
                    font-weight: 600;
                    margin: 0;
                    color: #1f2937;
                }
                
                .card-body {
                    padding: 1rem;
                }
                
                .card-detail {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }
                
                .detail-icon {
                    margin-right: 0.5rem;
                    color: #6b7280;
                }
                
                .card-description {
                    color: #4b5563;
                    font-size: 0.875rem;
                    margin: 1rem 0 0;
                }
                
                .card-footer {
                    padding: 0 1rem 1rem;
                    display: flex;
                    justify-content: flex-end;
                }
                
                .card-button {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.375rem 0.75rem;
                    background-color: #4f46e5;
                    color: white;
                    font-size: 0.875rem;
                    border-radius: 0.375rem;
                    text-decoration: none;
                    transition: background-color 0.2s;
                }
                
                .card-button:hover {
                    background-color: #4338ca;
                }
                
                .button-icon {
                    margin-right: 0.375rem;
                }
            </style>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">${name}</h3>
                </div>
                
                <div class="card-body">
                    <div class="card-detail">
                        <i data-feather="calendar" class="detail-icon"></i>
                        <span>${date} • ${time}</span>
                    </div>
                    
                    <div class="card-detail">
                        <i data-feather="map-pin" class="detail-icon"></i>
                        <span>${location}</span>
                    </div>
                    
                    <p class="card-description">${description}</p>
                </div>
                
                <div class="card-footer">
                    <a href="scanner.html" class="card-button">
                        <i data-feather="maximize" class="button-icon"></i>
                        Registrar Presença
                    </a>
                </div>
            </div>
        `;

        // Replace feather icons after the element is connected
        setTimeout(() => {
            if (this.shadowRoot) {
                feather.replace({ shadowRoot: this.shadowRoot });
            }
        }, 0);
    }
}

customElements.define('custom-event-card', CustomEventCard);
