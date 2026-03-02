document.addEventListener("DOMContentLoaded", function () {

    fetch("data/events.json")
        .then(response => response.json())
        .then(data => {

            if (!data.timeline_events || !Array.isArray(data.timeline_events)) {
                throw new Error("Invalid JSON structure");
            }

            data.timeline_events.forEach(event => {
                if (!event.year || !event.description) {
                    console.error("Missing required fields in event:", event);
                }
            });
            const source = document.getElementById("timeline-template").innerHTML;

            const template = Handlebars.compile(source);

            const html = template(data);

           
            document.getElementById("timeline-container").innerHTML = html;

        })
        .catch(error => {
            console.error("Error loading timeline:", error);
        });

});