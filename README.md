# 🎮 RPS Self-Adapting AI

A simple **Rock-Paper-Scissors game** built with **TypeScript, Node (Express), Postgres, HTML, and CSS**, featuring multiple difficulty modes and an AI-based opponent that adapts to the player’s behavior.

---

## ⚠️ Important Notice

* *The system is under R\&D for a Self-Adapting system.*
* *Database is present but currently unused; future updates will include database-driven features.*
* *The server exists but is not actively used.*

---

## 🚀 Features

* **Difficulty Modes**:

  * `Easy`: Opponent plays random moves.
  * `Medium`: Opponent adapts to the player’s most common moves.
  * `Hard` & `Extreme`: Reserved for future predictive/adaptive strategies.
* **Round Types**: Play infinite rounds or limited rounds (5, 10, or 15).
* **Scoring System**: Tracks user, opponent, and tie counts.
* **Custom State Management**:

  * **Purpose:** Manage game state and allow components to react to changes.
  * **Key Methods:**

    * `setState(prop, value)`: Update a single property; observers are triggered if value changes.
    * `setStates(partial)`: Update multiple properties at once; only triggers relevant observers.
    * `observe(observer)`: Register callbacks that react to the properties they read.
  * **Behavior:** Uses a `Proxy` to track dependencies automatically, enabling fine-grained reactivity without unnecessary updates.
* **UI/UX**:

  * Flip animation to reveal opponent’s move.
  * Scoreboard and round tracking.
  * Winner modal at the end of finite rounds.
* **AI Mechanics**:

  * Random move generation using `crypto.getRandomValues` (fallback to `Math.random`).
  * Adaptive mode counters based on player move history.

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SatyadeepGohil/RPS-Prediction-ai.git
cd RPS-Prediction-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Compile the Project

```bash
npx tsc
```

---

### 4. Run the Game

#### Option 1: Open `index.html` in VS Code using Live Server

1. Install the **Live Server** extension in VS Code if you haven’t already.
2. Right-click `index.html` in the file explorer → **Open with Live Server**.
3. The game will open in your default browser.
4. Any changes you make to the code will automatically reload in the browser.

#### Option 2: Open `index.html` directly in a browser

1. Navigate to the project folder.
2. Double-click `index.html` or open it with your preferred browser.
3. Note: Some features (like fetching resources or modules) may require a local server, so Live Server is recommended.

---


## 🎯 How to Play

1. Select **Difficulty Mode** and **Round Type** from the navigation bar.
2. Choose your move: **Rock, Paper, or Scissors**.
3. Watch the opponent’s card flip and reveal their move.
4. Scores update automatically.
5. At the end of finite rounds, the **winner modal** displays the result.

---

## 🌐 Deployment

* The deployed version will be made available soon.
* No database setup is currently required, but future updates will use Postgres for adaptive gameplay.