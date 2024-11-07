let words = [];
let wordIndex = 0;
let startTime = Date.now();

// localStorage에서 최고 점수를 불러오기
let highScore = localStorage.getItem('highScore');
if (!highScore) {
    highScore = Infinity; // 최고 점수가 없을 경우 초기값 설정
} else {
    highScore = parseFloat(highScore); // 숫자로 변환
}


const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const startButton = document.getElementById('start');

const modal = document.getElementById('modal'); // 모달 창 요소
const modalMessage = document.getElementById('modal-message'); // 모달 메시지 요소
const closeModal = document.getElementById('close-modal'); // 닫기 버튼 요소

const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.'
];

// 게임 시작 함수
startButton.addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length); // 무작위 인덱스 선택
    const quote = quotes[quoteIndex]; // 인용문 선택
    words = quote.split(' ');
    wordIndex = 0;

    // 선택한 인용문을 각 단어로 분할하여 span 태그로 감싸기
    const spanWords = words.map(word => `<span>${word} </span>`);
    quoteElement.innerHTML = spanWords.join('');
    quoteElement.childNodes[0].className = 'highlight'; // 첫 번째 단어 강조

    // 메시지 및 입력 필드 초기화
    messageElement.innerText = '';
    typedValueElement.value = '';
    typedValueElement.className = ''; // 입력 필드 오류 스타일 초기화
    typedValueElement.disabled = false; // 입력 필드 활성화
    typedValueElement.focus();
    startTime = new Date().getTime();

    // 입력 이벤트 리스너 추가
    typedValueElement.addEventListener('input', checkInput);
});
typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    // 기본 효과 적용
    typedValueElement.classList.add('input-active');

    if (typedValue === currentWord) {
        // 올바르게 입력된 경우
        typedValueElement.classList.add('input-correct');
        typedValueElement.classList.remove('input-error');
    } else if (currentWord.startsWith(typedValue)) {
        // 부분적으로 맞게 입력 중인 경우 (오류 없음)
        typedValueElement.classList.remove('input-error');
        typedValueElement.classList.add('input-correct');
    } else {
        // 틀리게 입력한 경우
        typedValueElement.classList.add('input-error');
        typedValueElement.classList.remove('input-correct');
    }

    // 입력이 끝나거나 초기화된 경우 효과 제거
    if (typedValue === '' || typedValue === currentWord) {
        typedValueElement.classList.remove('input-active', 'input-correct', 'input-error');
    }
});


// 게임 완료 시 모달 창 표시
function checkInput() {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const message = `Congratulations! Your time is ${(elapsedTime / 1000).toFixed(2)} seconds.`;

        // 모달 창에 메시지 표시 후 모달 열기
        modalMessage.innerText = message;
        modal.style.display = 'block';

        // 게임 완료 후 이벤트 리스너 및 입력 필드 비활성화
        typedValueElement.removeEventListener('input', checkInput);
        typedValueElement.value = '';
        typedValueElement.disabled = true;
    // 게임 완료 후 최고 점수 확인 및 갱신

if ((elapsedTime / 1000) < highScore) {
    highScore = (elapsedTime / 1000).toFixed(2);
    localStorage.setItem('highScore', highScore); // 최고 점수 갱신 및 저장
    modalMessage.innerText = `Congratulations! Your time is ${highScore} seconds. New High Score!`;
} else {
    modalMessage.innerText = `Congratulations! Your time is ${(elapsedTime / 1000).toFixed(2)} seconds.\nHigh Score: ${highScore} seconds.`;
}


    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = '';
    } else {
        typedValueElement.className = 'error';
    }
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none'; // 모달 창 숨기기
        typedValueElement.disabled = false; // 입력 필드 다시 활성화
        typedValueElement.focus(); // 입력 필드에 포커스 설정
    });
    
    
}
