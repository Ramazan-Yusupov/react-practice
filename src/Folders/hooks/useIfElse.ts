export function useIfElse() {
  let val = 10;

  if (val > 5) {
    val += 20;
  } else {
    val -= 20;
  }

  const person = {
    name: "",
    age: 25,
  };

  if (!person.name) {
    person.name = "Anonymous";
  }

  const agePerson = person.age;
  if (agePerson >= 18) {
    person.name = "Adult User";
  } else if (agePerson >= 12 && agePerson < 18) {
    person.name = "Teenager";
  } else {
    person.name = "Child";
  }

  const sumPositiveNumbers = (a: number, b: number) => {
    if (typeof a !== "number" || typeof b !== "number") {
      return "Both parameters must be numbers.";
    }

    if (a <= 0 || b <= 0) {
      return "Both numbers must be positive.";
    }

    return a + b;
  };

  /* Conditional Assignment */

  const valueT = -11;
  const resultT = valueT >= 0 ? valueT : -valueT;

  const valueFn1 = 0;
  const valueFn2 = 25;
  const resultFn = valueFn1 && valueFn2 ? "true" : "false";

  return { val, person, sumPositiveNumbers, resultT, resultFn };
}
