document.getElementById('optionsForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const keyField = document.getElementById('apiKey');
  const apiKey = keyField.value;
  chrome.storage.sync.set({ apiKey: apiKey }, () => {
    keyField.value = '';

    keyField.style.border = '2px solid green';
    keyField.style.borderRadius = '5px';
    keyField.placeholder = 'API Key saved!';
    keyField.disabled = true;
  });
});