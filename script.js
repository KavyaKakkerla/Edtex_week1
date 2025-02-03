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
    const rows = document.querySelectorAll("tbody tr");

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2; 
    const radiusStep = 120; 

    rows.forEach((row, rowIndex) => {
        const inputs = row.querySelectorAll("input");
        const b1Seats = parseInt(inputs[0].value);
        const b2Seats = parseInt(inputs[1].value);
        const totalSeats = b1Seats + b2Seats;

        if (totalSeats <= 0) return;

        const radius = (rowIndex + 1) * radiusStep;
        const angleStep = Math.PI / (totalSeats - 1); 

        for (let i = 0; i < totalSeats; i++) {
            const angle = Math.PI - i * angleStep; 

            const seat = document.createElement("div");
            seat.classList.add("seat");

            
            seat.textContent = (i < b1Seats) ? i + 1 : i - b1Seats + 1;

            
            const x = centerX + radius * Math.cos(angle) + 65; 
            const y = centerY - radius * Math.sin(angle) + 65; 

            
            const tangentAngle = -(angle * 180) / Math.PI + 90;

            
            seat.style.left = `${x}px`;
            seat.style.top = `${y}px`;
            seat.style.transform = `rotate(${tangentAngle}deg)`;  

            canvas.appendChild(seat);
        }
    });
}
