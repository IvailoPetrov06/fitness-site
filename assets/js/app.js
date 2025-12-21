const API = "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

// -------- WORKOUTS --------
async function loadTrainings() {
  const res = await fetch(`${API}/workouts`, {
    headers: { Authorization: getToken() }
  });
  return res.json();
}

async function saveTraining(data) {
  const res = await fetch(`${API}/workouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken()
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function deleteTraining(id) {
  await fetch(`${API}/workouts/${id}`, {
    method: "DELETE",
    headers: { Authorization: getToken() }
  });
}

// -------- MEALS --------
async function loadMeals() {
  const res = await fetch(`${API}/meals`, {
    headers: { Authorization: getToken() }
  });
  return res.json();
}

async function saveMeal(data) {
  const res = await fetch(`${API}/meals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken()
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function deleteMeal(id) {
  await fetch(`${API}/meals/${id}`, {
    method: "DELETE",
    headers: { Authorization: getToken() }
  });
}
