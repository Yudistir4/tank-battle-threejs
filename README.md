# Tank Battle 3D Game

[**Game Demo**](https://tank-battle-threejs.netlify.app/)

## **Overview**

**Tank Battle 3D Game** is a browser-based 3D game built with **React** and **Three.js**. Players can control tanks and engage in battles within a custom-designed 3D environment. The game supports **multiplayer for up to 4 players**, making it ideal for competitive gameplay.

The game features a **kill-death ranking system**, where player performance determines their leaderboard position. A minimum of 2 players is required for the full experience; if played solo, the game will only allow exploration of the map without enemies.

---

## **Features**

### 1. **3D Tank Control**

- Realistic controls with dynamic physics mechanics.
- Use keyboard and mouse for navigation and shooting.

### 2. **Multiplayer Support**

- Play with up to 4 players in real time.
- Powered by **Playroomkit** for multiplayer synchronization.
- A minimum of 2 players is required for competitive gameplay.

### 3. **Kill-Death Ranking System**

- **Game log** tracks the number of kills and deaths for each player.
- The leaderboard updates in real time based on the kill-death ratio.

### 4. **Custom Map Design**

- Maps are designed using **Blender**.
- Utilizes high-quality assets from:
  - [**Animated Tanks Pack**](https://quaternius.com/packs/animatedtanks.html)
  - [**Simple Nature Pack**](https://quaternius.com/packs/simplenature.html)

### 5. **Immersive Game Mechanics**

- Shooting mechanics with realistic bullet trajectories.
- Integrated scoring system with a countdown timer.
- Visual effects like explosions and post-processing for destroyed tanks.

### 6. **Responsive UI**

- User-friendly interface with in-game instructions.
- Displays countdown, scores, and leaderboard.
- **Note:** Some UI elements are not fully responsive, especially on smaller screens.

---

## **Technologies Used**

### **1. Core Libraries**

- **[React](https://reactjs.org/):** Framework for building user interfaces.
- **[Three.js](https://threejs.org/):** 3D engine for rendering the game world.

### **2. React Three Utilities**

- **[@react-three/fiber](https://github.com/pmndrs/react-three-fiber):** React renderer for Three.js.
- **[@react-three/drei](https://github.com/pmndrs/drei):** Utilities for camera controls, environment, and lighting.
- **[@react-three/rapier](https://rapier.rs/):** Physics simulation for tank and bullet movement.
- **[@react-three/postprocessing](https://github.com/pmndrs/postprocessing):** Adds visual effects like bloom and depth of field.

### **3. Multiplayer Support**

- **[Playroomkit](https://github.com/playroomkit):** Library for real-time synchronization in multiplayer games.

### **4. Additional Libraries**

- **[Leva](https://github.com/pmndrs/leva):** Interactive control panel for adjusting parameters in real time.
- **[React Countdown](https://github.com/ndresx/react-countdown):** Timer for game sessions.
- **[React Router DOM](https://reactrouter.com/):** Routing for pages like Home, Gameplay, and Instructions.

---

## **Development Highlights**

### Multiplayer Emphasis

The game supports up to 4 players with real-time synchronization using **Playroomkit**. A minimum of 2 players is required for competitive gameplay.

### Kill-Death Ranking System

This system monitors player performance, tracking kills and deaths, and updating the leaderboard in real time.

### Custom Map Design

Maps are crafted using **Blender** and utilize assets from [Quaternius](https://quaternius.com/).

### Realistic Game Mechanics

Shooting, explosions, and tank movements are designed with accurate physics using **Rapier**.

### Optimized Rendering

Efficient rendering is achieved using **React Three Fiber** and utilities from Drei.

---

## **Current Limitations**

- **Responsiveness:** Some UI elements are not fully responsive on smaller devices.
- **Performance Optimization:** Further optimization is needed for devices with lower specifications.
- **Feature Expansion:** Potential to add features like tank customization or additional maps for more varied gameplay.

---

## **Conclusion**

Tank Battle 3D Game offers an engaging multiplayer experience with competitive gameplay, custom-designed maps, and realistic mechanics. However, aspects like **responsiveness**, **performance optimization**, and **new feature development** need improvement to realize the game’s full potential.

---
