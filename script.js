document.getElementById("btn").addEventListener("click", createTable);

function createTable() {
    const rows = parseInt(document.getElementById("rows").value);
    if (isNaN(rows) || rows <= 0) {
        alert("Please enter a valid number of rows.");
        return;
    }

    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = "";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Row", "B1 Seats", "B2 Seats"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

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
                input.value = (i + 1) * 2 + 4;
                input.className = j === 1 ? "block1Input" : "block2Input";
                cell.appendChild(input);
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableContainer.appendChild(table);

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
    canvas.innerHTML = ""; 

    const table = document.querySelector("table");
    const rows = Array.from(table.querySelectorAll("tbody tr"));

    const rowCount = rows.length;
    const block1Inputs = [];
    const block2Inputs = [];

    rows.forEach(row => {
        const inputs = row.querySelectorAll("input");
        block1Inputs.unshift(parseInt(inputs[0].value));
        block2Inputs.unshift(parseInt(inputs[1].value));
    });

    const max1 = Math.max(...block1Inputs);
    const max2 = Math.max(...block2Inputs);
    const maxSeats = Math.max(max1, max2);

    const centerX = 600;
    const centerY = 600;

    for (let row = rowCount - 1; row >= 0; row--) {
        const radius = 550 - (rowCount - 1 - row) * 50; 

       
        for (let i = block1Inputs[rowCount - 1 - row] - 1; i >= 0; i--) {
            const angle = -Math.PI / 2 - (Math.PI / 2) * (i / (maxSeats - 1));
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            const seat = document.createElement("div");
            seat.className = "seat";
            seat.style.left = `${x}px`;
            seat.style.top = `${y}px`;

            seat.style.transform = `rotate(${(angle * 180) / Math.PI + 90}deg)`;
            seat.textContent = i + 1;
            canvas.appendChild(seat);
        }

        
        for (let i = 0; i < block2Inputs[rowCount - 1 - row]; i++) {
            const angle = (Math.PI / 2) * (i / (maxSeats - 1)) - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle) + 100;
            const y = centerY + radius * Math.sin(angle);

            const seat = document.createElement("div");
            seat.className = "seat";
            seat.style.left = `${x}px`;
            seat.style.top = `${y}px`;

            seat.style.transform = `rotate(${(angle * 180) / Math.PI + 90}deg)`;
            seat.textContent = i + 1;
            canvas.appendChild(seat);
        }
    }
}

