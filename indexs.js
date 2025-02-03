document.getElementById("btn").addEventListener("click", createTable);

function createTable() {
    const rows = parseInt(document.getElementById("rows").value);
    if (isNaN(rows) || rows <= 0) {
        alert("Please enter a valid number of rows.");
        return;
    }

    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = ""; // Clear previous table

    const table = document.createElement("table");

    // Table Header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Row", "B1 Seats", "B2 Seats"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table Body
    const tbody = document.createElement("tbody");
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("td");
            if (j === 0) {
                cell.textContent = `R${i + 1}`;
            } else {
                const input = document.createElement("input");
                input.type = "number";
                input.value = (i + 1) * 2 + 4; // Default seat numbers
                cell.appendChild(input);
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableContainer.appendChild(table);

    // Generate Button
    let generateBtn = document.getElementById("generate-btn");
    if (!generateBtn) {
        generateBtn = document.createElement("button");
        generateBtn.id = "generate-btn";
        generateBtn.textContent = "Generate Layout";
        generateBtn.addEventListener("click", createArrangement);
        tableContainer.appendChild(generateBtn);
    }
}

function createArrangement() {
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";  // Clear previous seats
    const rows = document.querySelectorAll("tbody tr");

    const centerX = canvas.offsetWidth / 2; // Center of the canvas container
    const centerY = canvas.offsetHeight / 2; // Adjusted for visibility
    const radiusStep = 120; // Distance between each row of seats

    rows.forEach((row, rowIndex) => {
        const inputs = row.querySelectorAll("input");
        const b1Seats = parseInt(inputs[0].value);
        const b2Seats = parseInt(inputs[1].value);
        const totalSeats = b1Seats + b2Seats;

        if (totalSeats <= 0) return;

        const radius = (rowIndex + 1) * radiusStep;
        const angleStep = Math.PI / (totalSeats - 1); // Space seats evenly

        for (let i = 0; i < totalSeats; i++) {
            const angle = Math.PI - i * angleStep; 

            const seat = document.createElement("div");
            seat.classList.add("seat");

            // Assign numbers
            seat.textContent = (i < b1Seats) ? i + 1 : i - b1Seats + 1;

            // Compute position
            const x = centerX + radius * Math.cos(angle) + 65; // Adjusted position
            const y = centerY - radius * Math.sin(angle) + 65; // Adjusted position

            // Compute tangent rotation
            const tangentAngle = -(angle * 180) / Math.PI + 90;

            // Apply styles
            seat.style.left = `${x}px`;
            seat.style.top = `${y}px`;
            seat.style.transform = `rotate(${tangentAngle}deg)`;  // Correct rotation

            canvas.appendChild(seat);
        }
    });
}
