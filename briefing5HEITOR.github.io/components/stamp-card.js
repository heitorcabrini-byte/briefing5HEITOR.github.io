class CustomStampCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const name = this.getAttribute('name') || '';
        const category = this.getAttribute('category') || '';
        const description = this.getAttribute('description') || '';
        const collected = this.getAttribute('collected') === 'true';
        
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
                    height: 100%;
                }
                
                .card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .card-header {
                    padding: 1rem;
                    background-color: ${collected ? '#4f46e5' : '#f3f4f6'};
                    color: ${collected ? 'white' : '#6b7280'};
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .card-title {
                    font-weight: 600;
                    margin: 0;
                }
                
                .card-category {
                    font-size: 0.75rem;
                    background-color: ${collected ? '#4338ca' : '#e5e7eb'};
                    color: ${collected ? '#e0e7ff' : '#4b5563'};
                    padding: 0.25rem 0.5rem;
                    border-radius: 9999px;
                }
                
                .card-body {
                    padding: 1rem;
                }
                
                .card-description {
                    color: #4b5563;
                    font-size: 0.875rem;
                    margin: 0;
                }
                
                .card-footer {
                    padding: 0 1rem 1rem;
                    display: flex;
                    justify-content: flex-end;
                }
                
                .card-status {
                    display: flex;
                    align-items: center;
                    font-size: 0.75rem;
                    color: ${collected ? '#10b981' : '#9ca3af'};
                }
                
                .status-icon {
                    margin-right: 0.25rem;
                }
            </style>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-category">${category}</span>
                </div>
                
                <div class="card-body">
                    <p class="card-description">${description}</p>
                </div>
                
                <div class="card-footer">
                    <span class="card-status">
                        <i data-feather="${collected ? 'check-circle' : 'x-circle'}" class="status-icon"></i>
                        ${collected ? 'Conquistado' : 'Não conquistado'}
                    </span>
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

customElements.define('custom-stamp-card', CustomStampCard);