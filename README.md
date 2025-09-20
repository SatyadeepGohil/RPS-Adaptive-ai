# 🎮 RPS Prediction AI

A simple **Rock-Paper-Scissors game** built with **TypeScript, Zustand, Postgres, Node(Express), HTML and CSS**, featuring multiple difficulty modes and AI-based opponent mechanics.

---

## ⚠️ Important Notice on Database Usage
This project relies on a Postgres database to store and query the opponent’s pattern_library.

- *The database contains custom-generated patterns essential for the AI predictions.*

- *Database credentials will not be shared publicly.*

- *Cloning the repo alone will not give a fully working game unless you set up your own Postgres instance and pattern generation pipeline.*

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

### 3. Compile the Project
Run TypeScript:
```bash
npx tsc
```

## ⚡️ Zustand Setup & Build Instructions

> Note: Zustand is now self-hosted in this project to reduce latency.

### Fix Zustand Import
TypeScript currently fails to bundle Zustand correctly, so the library must be copied manually:

- Locate the `lib` folder inside the src directory:

  - Path: `src/lib/`

- Copy the **entire** `lib` folder and paste it inside the `dist` directory:

  - Resulting path: `dist/lib/`

This ensures all Zustand-related modules are available in the build and prevents compilation/import errors.

---

## 🎯 How to Play

1. Select **Difficulty Mode** and **Round Type** from the navigation bar.
2. Choose your move: **Rock, Paper, or Scissors**.
3. Watch the opponent’s card flip and reveal their move.
4. Scores update automatically.
5. At the end of finite rounds, the **winner modal** displays the result.

---

## 🌐 Deployment

The deployed version will be made available soon.
Once deployed, you’ll be able to play directly without any database setup.