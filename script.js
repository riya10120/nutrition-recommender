document.addEventListener('DOMContentLoaded', () => {
  const loginPage = document.getElementById('loginPage');
  const mainPage = document.getElementById('mainPage');
  const storedUser = localStorage.getItem('username');

  if (storedUser) {
    loginPage.style.display = 'none';
    mainPage.style.display = 'block';
    document.getElementById('userDisplay').textContent = storedUser;
  }

  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    loginPage.style.display = 'none';
    mainPage.style.display = 'block';
    document.getElementById('userDisplay').textContent = username;
  });

  document.getElementById('nutritionForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const goal = document.getElementById('goal').value;
    const preference = document.getElementById('preference').value;
    const activity = document.getElementById('activity').value;

    const plan = getNutritionPlan(goal, preference, activity);
    document.getElementById('result').innerHTML = plan;
  });
});

function getNutritionPlan(goal, preference, activity) {
  const plans = {
    weight_loss: {
      macro: "50% carbs, 30% protein, 20% fat",
      meals: "Oats, Grilled veggies, Lentils"
    },
    muscle_gain: {
      macro: "40% carbs, 40% protein, 20% fat",
      meals: "Chicken breast, Quinoa, Protein shake"
    },
    maintain: {
      macro: "45% carbs, 30% protein, 25% fat",
      meals: "Rice, Beans, Eggs"
    }
  };

  const selected = plans[goal] || plans.maintain;

  return `
    <h3>AI Suggested Nutrition Plan</h3>
    <p><strong>Macronutrient Ratio:</strong> ${selected.macro}</p>
    <p><strong>Sample Meals:</strong> ${selected.meals} (${preference})</p>
    <p><em>Activity Level: ${activity.charAt(0).toUpperCase() + activity.slice(1)}</em></p>
    <p>Please consult a dietitian for professional guidance.</p>
  `;
}

function logout() {
  localStorage.removeItem('username');
  window.location.reload();
}
