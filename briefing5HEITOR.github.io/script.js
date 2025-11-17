// Sample data - in a real app this would come from a database
const stampsData = [
    { id: 1, name: "Biblioteca", category: "Campus", description: "Visite a biblioteca da faculdade", qrCode: "LIBRARY-001" },
    { id: 2, name: "Laboratório 01", category: "Campus", description: "Faça um experimento no laboratório", qrCode: "LAB-001" },
    { id: 3, name: "Auditório", category: "Campus", description: "Assista a uma palestra no auditório", qrCode: "AUD-001" },
    { id: 4, name: "Palestra de IA", category: "Eventos", description: "Participe da palestra sobre Inteligência Artificial", qrCode: "EVENT-IA-001" },
    { id: 5, name: "Workshop de Carreira", category: "Eventos", description: "Participe do workshop de desenvolvimento de carreira", qrCode: "EVENT-CAREER-001" },
    { id: 6, name: "Feira de Ciências", category: "Eventos", description: "Visite a feira de ciências anual", qrCode: "EVENT-SCIENCE-001" }
];

const eventsData = [
    { id: 1, name: "Palestra: O Futuro da Tecnologia", date: "15/10/2023", time: "19:00", location: "Auditório Principal", description: "Palestra com especialistas sobre as tendências tecnológicas para os próximos anos." },
    { id: 2, name: "Workshop: Desenvolvimento de Carreira", date: "20/10/2023", time: "14:00", location: "Sala 302", description: "Aprenda a construir um plano de carreira eficaz com nossos orientadores." },
    { id: 3, name: "Feira de Ciências Anual", date: "25/10/2023", time: "09:00-17:00", location: "Ginásio", description: "Exposição de projetos científicos desenvolvidos por alunos de diversos cursos." }
];

const studentsData = [
    { ra: "20230001", name: "Ana Silva", stamps: [1, 2, 4, 5] },
    { ra: "20230002", name: "Bruno Oliveira", stamps: [1, 2, 3, 4, 5, 6] },
    { ra: "20230003", name: "Carlos Mendes", stamps: [1, 3] },
    { ra: "20230004", name: "Daniela Costa", stamps: [1, 2, 4] },
    { ra: "20230005", name: "Eduardo Santos", stamps: [1, 2, 3, 4, 5] }
];

// Local storage functions
function getStudentData(ra) {
    // In a real app, this would be an API call
    return studentsData.find(student => student.ra === ra) || { ra, name: "Aluno", stamps: [] };
}

function saveStudentData(student) {
    // In a real app, this would be an API call
    const index = studentsData.findIndex(s => s.ra === student.ra);
    if (index >= 0) {
        studentsData[index] = student;
    } else {
        studentsData.push(student);
    }
}

// Stamp functions
function loadStudentProgress(ra) {
    const student = getStudentData(ra);
    const stampsContainer = document.getElementById('stampsContainer');
    const progressBar = document.getElementById('progressBar');
    const stampCount = document.getElementById('stampCount');
    const totalStamps = document.getElementById('totalStamps');
    
    stampsContainer.innerHTML = '';
    totalStamps.textContent = stampsData.length;
    stampCount.textContent = student.stamps.length;
    
    // Calculate progress percentage
    const progress = Math.round((student.stamps.length / stampsData.length) * 100);
    progressBar.style.width = `${progress}%`;
    
    // Render each stamp card
    stampsData.forEach(stamp => {
        const isCollected = student.stamps.includes(stamp.id);
        const stampCard = document.createElement('custom-stamp-card');
        stampCard.setAttribute('name', stamp.name);
        stampCard.setAttribute('category', stamp.category);
        stampCard.setAttribute('description', stamp.description);
        stampCard.setAttribute('collected', isCollected.toString());
        stampsContainer.appendChild(stampCard);
    });
}

function collectStamp(ra, stampId) {
    const student = getStudentData(ra);
    if (!student.stamps.includes(stampId)) {
        student.stamps.push(stampId);
        saveStudentData(student);
        return true;
    }
    return false;
}

// Event functions
function loadEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = '';
    
    eventsData.forEach(event => {
        const eventCard = document.createElement('custom-event-card');
        eventCard.setAttribute('name', event.name);
        eventCard.setAttribute('date', event.date);
        eventCard.setAttribute('time', event.time);
        eventCard.setAttribute('location', event.location);
        eventCard.setAttribute('description', event.description);
        eventsContainer.appendChild(eventCard);
    });
}

// Ranking functions
function loadRanking() {
    const rankingContainer = document.getElementById('rankingContainer');
    rankingContainer.innerHTML = '';
    
    // Sort students by number of stamps (descending)
    const sortedStudents = [...studentsData].sort((a, b) => b.stamps.length - a.stamps.length);
    
    sortedStudents.forEach((student, index) => {
        const rankItem = document.createElement('custom-ranking-item');
        rankItem.setAttribute('position', (index + 1).toString());
        rankItem.setAttribute('name', student.name);
        rankItem.setAttribute('stamps', student.stamps.length.toString());
        rankItem.setAttribute('total', stampsData.length.toString());
        rankingContainer.appendChild(rankItem);
    });
}

// Scanner functions
function setupScanner() {
    const video = document.getElementById('scanner');
    const resultDiv = document.getElementById('scannerResult');
    const resultMessage = document.getElementById('resultMessage');
    const scanButton = document.getElementById('scanButton');
    
    let scannerActive = false;
    let stream = null;
    
    scanButton.addEventListener('click', async () => {
        if (scannerActive) {
            // Stop scanning
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            scanButton.innerHTML = '<i data-feather="camera" class="mr-2"></i> Iniciar Escaneamento';
            resultDiv.classList.add('hidden');
            scannerActive = false;
            feather.replace();
            return;
        }
        
        // Start scanning
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            video.srcObject = stream;
            scannerActive = true;
            scanButton.innerHTML = '<i data-feather="x" class="mr-2"></i> Parar Escaneamento';
            resultDiv.classList.add('hidden');
            feather.replace();
            
            // Scan for QR codes
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            function scanFrame() {
                if (!scannerActive) return;
                
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });
                    
                    if (code) {
                        // QR code found
                        const ra = localStorage.getItem('studentRA');
                        const stamp = stampsData.find(s => s.qrCode === code.data);
                        
                        if (stamp) {
                            const collected = collectStamp(ra, stamp.id);
                            if (collected) {
                                resultMessage.textContent = `Carimbo "${stamp.name}" adquirido com sucesso!`;
                                resultDiv.classList.remove('hidden');
                                loadStudentProgress(ra);
                            } else {
                                resultMessage.textContent = `Você já possui o carimbo "${stamp.name}".`;
                                resultDiv.classList.remove('hidden');
                            }
                        } else {
                            resultMessage.textContent = "QR Code não reconhecido. Escaneie um código válido.";
                            resultDiv.classList.remove('hidden');
                        }
                        
                        // Stop scanning after success
                        if (stream) {
                            stream.getTracks().forEach(track => track.stop());
                        }
                        scanButton.innerHTML = '<i data-feather="camera" class="mr-2"></i> Iniciar Escaneamento';
                        scannerActive = false;
                        feather.replace();
                        return;
                    }
                }
                
                requestAnimationFrame(scanFrame);
            }
            
            scanFrame();
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Não foi possível acessar a câmera. Verifique as permissões.");
        }
    });
}