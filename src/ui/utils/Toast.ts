/**
 * Toast 알림 시스템
 *
 * alert()를 대체하는 모던한 Toast UI
 * - 타입별 색상 (info, success, warning, error)
 * - 아이콘 자동 표시 (Phosphor Icons)
 * - 자동 사라짐 (기본 3초)
 * - 부드러운 애니메이션
 */

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;        // 밀리초 (기본 3000ms)
  position?: 'top' | 'bottom'; // 기본 'top'
}

/**
 * Toast 스타일 설정
 */
const TOAST_STYLES: Record<ToastType, {
  gradient: string;
  icon: string;
}> = {
  info: {
    gradient: 'from-blue-500 to-blue-600',
    icon: 'ph-fill ph-info'
  },
  success: {
    gradient: 'from-green-500 to-green-600',
    icon: 'ph-fill ph-check-circle'
  },
  warning: {
    gradient: 'from-yellow-400 to-orange-500',
    icon: 'ph-fill ph-warning'
  },
  error: {
    gradient: 'from-red-500 to-red-600',
    icon: 'ph-fill ph-x-circle'
  }
};

/**
 * Toast 알림 표시
 */
export function showToast(options: ToastOptions): void {
  const {
    message,
    type = 'info',
    duration = 3000,
    position = 'top'
  } = options;

  const style = TOAST_STYLES[type];

  // Toast 컨테이너 생성
  const toast = document.createElement('div');
  toast.className = `
    fixed ${position === 'top' ? 'top-20' : 'bottom-20'} left-1/2 -translate-x-1/2
    z-[100]
    pointer-events-none
    animate-fade-in
  `.trim().replace(/\s+/g, ' ');
  toast.style.top = position === 'top'
    ? 'calc(env(safe-area-inset-top, 0px) + 5rem)'
    : 'auto';
  toast.style.bottom = position === 'bottom'
    ? 'calc(env(safe-area-inset-bottom, 0px) + 5rem)'
    : 'auto';

  // Toast 내용 생성
  const content = document.createElement('div');
  content.className = `
    bg-gradient-to-r ${style.gradient}
    text-white
    px-6 py-4
    rounded-2xl
    shadow-[0_8px_32px_rgba(0,0,0,0.3)]
    backdrop-blur-sm
    flex items-start gap-3
    max-w-sm
    mx-4
  `.trim().replace(/\s+/g, ' ');

  // 아이콘
  const icon = document.createElement('i');
  icon.className = `${style.icon} text-2xl flex-shrink-0 mt-0.5`;

  // 메시지 (여러 줄 지원)
  const messageEl = document.createElement('div');
  messageEl.className = 'text-sm font-semibold leading-relaxed flex-1';
  // \n을 <br>로 변환
  messageEl.innerHTML = message.split('\n').join('<br>');

  content.appendChild(icon);
  content.appendChild(messageEl);
  toast.appendChild(content);

  // DOM에 추가
  document.body.appendChild(toast);

  // 자동 사라짐
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, duration);
}
