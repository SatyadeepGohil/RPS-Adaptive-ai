# 🎮 RPS Prediction AI

A simple **Rock-Paper-Scissors game** built with **TypeScript, SCSS, Zustand, and HTML**, featuring multiple difficulty modes and AI-based opponent mechanics.

---

## 🚀 Features
- **Difficulty Modes**:
  - `Easy`: Opponent plays random moves.
  - `Medium`: Opponent adapts to the player’s most common moves.
  - `Hard` & `Extreme`: (reserved for future AI strategies).
- **Round Types**: Play infinite rounds or limited rounds (5, 10, or 15).
- **Scoring System**: Tracks user, opponent, and tie counts.
- **AI Mechanics**:  
  - Random attack generation using `crypto.getRandomValues` (with fallback to `Math.random`).
  - Adaptive attack mode that predicts and counters based on move history.
- **UI/UX**:
  - Flip animation to reveal opponent’s move.
  - Scoreboard and round tracking.
  - Winner modal at the end of finite rounds.

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

### 3. Build the project

```bash
npm run build
```

*(ensure your `package.json` has a `build` script set up for TypeScript & SCSS compilation)*

### 4. Run locally

Simply open `index.html` in your browser, or use a local server:

```bash
npx serve .
```

---

## 🎯 How to Play

1. Select **Difficulty Mode** and **Round Type** from the navigation bar.
2. Choose your move: **Rock, Paper, or Scissors**.
3. Watch the opponent’s card flip and reveal their move.
4. Scores update automatically.
5. At the end of finite rounds, the **winner modal** displays the result.