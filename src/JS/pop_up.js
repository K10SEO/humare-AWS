// 최소한의 수정된 pop_up.js

// 쿠키 관련 함수들
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    console.log('쿠키 생성됨:', name, '=', value);
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// 기존 코드 (수정되지 않음)
const modal = document.querySelector('.pop-up')
const closeIcon = modal.querySelector('.close-icon')

closeIcon.addEventListener("click", function(){
    modal.className = 'ir-hidden';
})

// 새로 추가되는 함수들
function closeModal() {
    modal.className = 'ir-hidden';
}

function hideForToday() {
    setCookie('hideModalToday', 'true', 1);
    modal.className = 'ir-hidden';
}

// 전역 함수로 등록
window.closeModal = closeModal;
window.hideForToday = hideForToday;

// 쿠키가 있을 때만 모달 숨김 (쿠키가 없으면 아무것도 하지 않음)
const hideToday = getCookie('hideModalToday');
if (hideToday === 'true') {
    // 즉시 실행하지 말고 약간의 지연 후 실행
    setTimeout(function() {
        modal.className = 'ir-hidden';
        console.log('쿠키가 있어서 모달을 숨겼습니다.');
    }, 10);
}