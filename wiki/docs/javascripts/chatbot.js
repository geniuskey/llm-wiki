document.addEventListener("DOMContentLoaded", function() {
    // 1. Create HTML Structure
    const chatbotHTML = `
        <div id="llm-chatbot-window">
            <div id="llm-chatbot-header">
                <span>LLM Wiki Assistant</span>
                <span id="llm-chatbot-close">&times;</span>
            </div>
            <div id="llm-chatbot-messages">
                <div class="chat-message bot">안녕하세요! 위키 문서 기반으로 무엇이든 물어보세요.</div>
            </div>
            <div class="typing-indicator" id="llm-chatbot-typing">
                <span></span><span></span><span></span>
            </div>
            <div id="llm-chatbot-input-area">
                <input type="text" id="llm-chatbot-input" placeholder="질문을 입력하세요..." autocomplete="off" />
                <button id="llm-chatbot-send">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
        <div id="llm-chatbot-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // 2. DOM Elements
    const btn = document.getElementById('llm-chatbot-btn');
    const win = document.getElementById('llm-chatbot-window');
    const closeBtn = document.getElementById('llm-chatbot-close');
    const input = document.getElementById('llm-chatbot-input');
    const sendBtn = document.getElementById('llm-chatbot-send');
    const messages = document.getElementById('llm-chatbot-messages');
    const typingIndicator = document.getElementById('llm-chatbot-typing');

    // Backend API URL (FastAPI)
    // 배포 환경에 따라 이 URL을 변경해야 할 수 있습니다.
    const API_URL = 'http://localhost:8000/ask';

    // 3. Event Listeners
    btn.addEventListener('click', () => {
        win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
        if (win.style.display === 'flex') input.focus();
    });

    closeBtn.addEventListener('click', () => {
        win.style.display = 'none';
    });

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // 4. Functions
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    async function sendMessage() {
        const query = input.value.trim();
        if (!query) return;

        // User message
        appendMessage(query, 'user');
        input.value = '';
        
        // Show loading
        typingIndicator.style.display = 'flex';
        messages.appendChild(typingIndicator); // Move to bottom
        messages.scrollTop = messages.scrollHeight;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: query })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Backend의 응답 구조에 맞게 렌더링
            let replyText = data.answer || data.message || "답변을 받지 못했습니다.";
            
            // 검색된 문서가 있다면 출처로 표시
            if (data.retrieved_documents && data.retrieved_documents.length > 0) {
                 replyText += `\n\n*(참고 문서: ${data.retrieved_documents.length}건 검색됨)*`;
            }

            typingIndicator.style.display = 'none';
            appendMessage(replyText, 'bot');

        } catch (error) {
            console.error('Error:', error);
            typingIndicator.style.display = 'none';
            appendMessage('죄송합니다. 서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.', 'bot');
        }
    }
});