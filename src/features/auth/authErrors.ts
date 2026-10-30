interface ClerkLikeError {
  code: string;
  message: string;
  longMessage?: string | undefined;
}

const MESSAGES: Record<string, string> = {
  form_identifier_not_found: 'Неверный email или пароль',
  form_password_incorrect: 'Неверный email или пароль',
  strategy_for_user_invalid: 'Неверный email или пароль',
  form_identifier_exists:
    'Не удалось зарегистрироваться с этим email. Если аккаунт уже есть, войдите или восстановите пароль',
  form_password_pwned: 'Этот пароль найден в утечках. Придумайте другой',
  form_password_length_too_short: 'Пароль слишком короткий',
  form_password_not_strong_enough: 'Пароль слишком простой',
  form_code_incorrect: 'Неверный код',
  verification_expired: 'Код устарел. Запросите новый',
  verification_failed: 'Не удалось подтвердить код. Запросите новый',
  too_many_requests: 'Слишком много попыток. Подождите немного и повторите',
  client_state_invalid: 'Сессия входа устарела. Начните заново',
  captcha_invalid: 'Проверка на бота не пройдена. Повторите попытку',
  captcha_unavailable: 'Проверка на бота недоступна. Отключите блокировщики и повторите',
};

export function pickError(...errors: (ClerkLikeError | null | undefined)[]): string | undefined {
  const error = errors.find((e): e is ClerkLikeError => !!e);
  if (!error) return undefined;
  return MESSAGES[error.code] ?? error.longMessage ?? error.message;
}
