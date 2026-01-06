export function useJsHook() {
  const user = (n: string, a: number) => {
    const name = n;
    const age = a;
    const nameAge = name + " " + age;

    return nameAge;
  };

  const message = (m?: string) => {
    m = m || "unknown";

    return m;
  };

  const checkAge = (age: number) => {
    if (age >= 18) {
      return "Доступ Получен";
    } else {
      return "Доступ Закрыт";
    }
  };

  return {
    user,
    message,
    checkAge,
  };
}
