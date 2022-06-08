export function useGenericOnChange(name, value) {
  console.log("name", name);

  const e = {
    target: {
      name: name,
      value: value,
      checked: null,
    },
  };
  return e;
}
