const GITHUB_API_URL = "https://api.github.com/repos/mouradsellam2/pluginEdge/issues";
const GITHUB_TOKEN = "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"; // Ne jamais exposer le token directement en production
const FILTER = "bug"; // Exemple de filtre (par label, etc.)

async function checkNewIssues() {
    const response = await fetch(`${GITHUB_API_URL}?labels=${FILTER}`, {
        method: "GET",
        headers: {
            "Authorization": `token ${GITHUB_TOKEN}`
        }
    });

    if (!response.ok) {
        console.error('Erreur lors de la récupération des tickets :', response.statusText);
        return;
    }

    const issues = await response.json();
    if (issues.length > 0) {
        notifyUser(issues);
    }
}

function notifyUser(issues) {
    issues.forEach(issue => {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon.png",
            title: "Nouveau ticket GitHub",
            message: `${issue.title}\nURL: ${issue.html_url}`,
            priority: 1
        });
    });
}

// Vérifie les tickets toutes les 5 minutes
setInterval(checkNewIssues, 1 * 15 * 1000);

// Demander la permission pour afficher des notifications
chrome.notifications.onClicked.addListener(function(notificationId) {
    chrome.tabs.create({ url: "https://github.com/{owner}/{repo}/issues" });
});
