function applyPhoneMask(input) {
  input.addEventListener('input', function () {
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10) {
      input.value = value
        .replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3')
        .replace(/-$/, '');
    } else {
      input.value = value
        .replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3')
        .replace(/-$/, '');
    }
  });
}



export { applyPhoneMask};