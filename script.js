function saveEntry() {
  const mood = document.getElementById('mood').value;
  const entry = document.getElementById('entry').value.trim();

  if (!entry) {
    alert("Please write something in your journal.");
    return;
  }

  const journalEntry = {
    mood: mood,
    text: entry,
    date: new Date().toLocaleString()
  };

  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.unshift(journalEntry); // newest first
  localStorage.setItem("journalEntries", JSON.stringify(entries));

  document.getElementById("entry").value = "";
  showEntries();
}

function showEntries() {
  const entriesDiv = document.getElementById("entries");
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  entriesDiv.innerHTML = "";
  entries.forEach((entry) => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <strong>${entry.mood}</strong> - <em>${entry.date}</em><br/>
      ${entry.text}
    `;
    entriesDiv.appendChild(div);
  });
}

// Show entries on page load
window.onload = showEntries;
