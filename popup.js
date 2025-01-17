document.getElementById('setFilterBtn').addEventListener('click', () => {
    const filter = prompt('Entrez le filtre pour les tickets GitHub (par exemple, "bug") :');
    if (filter) {
        // Sauvegarder ce filtre en local (stockage local ou dans chrome.storage)
        chrome.storage.local.set({ filter: filter }, () => {
            alert(`Filtre configuré sur "${filter}"`);
        });
    }
});
