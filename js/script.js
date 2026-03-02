document.addEventListener("DOMContentLoaded", function () {

    // Check if Handlebars loaded
    if (typeof Handlebars === "undefined") {
        console.error(" Handlebars not loaded");
        return;
    }

    const templateEl = document.getElementById("timeline-template");
    const container = document.getElementById("timeline-container");

    if (!templateEl || !container) {
        console.error(" Template or container not found");
        return;
    }

    fetch("data/events.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load data/events.json");
            return response.json();
        })
        .then(data => {
            if (!data.timeline_events || !Array.isArray(data.timeline_events)) {
                throw new Error("Invalid JSON - missing timeline_events array");
            }

            const source = templateEl.innerHTML;
            const template = Handlebars.compile(source);
            const html = template(data);

            container.innerHTML = html;
            console.log("Timeline loaded successfully!");
        })
        .catch(error => {
            console.error("Error:", error);
            container.innerHTML = `
                <div style="color:#ff4444; padding:20px; background:#ffe6e6; border-radius:8px; text-align:center;">
                    <strong>Timeline Error</strong><br>
                    ${error.message}<br><br>
                    <small>1. Make sure data/events.json exists<br>
                    2. Run using Live Server (not double-click)</small>
                </div>`;
        });
});