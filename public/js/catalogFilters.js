document.querySelectorAll('.filter-form select').forEach((select) => {
  select.addEventListener('change', () => {
    select.closest('form')?.requestSubmit();
  });
});
