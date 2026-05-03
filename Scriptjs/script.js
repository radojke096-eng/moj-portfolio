const projects = [
    { name: "Sistemski GIF 1", file: "assets/tvogif1.gif", type: "Logic" },
    { name: "Sistemski GIF 2", file: "assets/tvogif2.gif", type: "UI" },
    { name: "Tehnička Skica", file: "assets/slika1.jpg", type: "Design" }
];

const container = document.getElementById('grid');
projects.forEach(p => {
    container.innerHTML += `
        <div class="card">
            <img src="${p.file}">
            <div class="info"><strong>${p.name}</strong><br><small>${p.type}</small></div>
        </div>`;
});
