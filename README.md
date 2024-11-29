# Tank Battle 3D Game

[**Demo Game**](https://tank-battle-threejs.netlify.app/)

## **Overview**

**Tank Battle 3D Game** adalah sebuah game browser 3D yang dibangun menggunakan **React** dan **Three.js**. Pemain dapat mengendalikan tank untuk bertempur dalam lingkungan 3D yang dirancang khusus. Game ini mendukung **multiplayer hingga 4 pemain**, cocok untuk permainan kompetitif.

Game ini memiliki sistem **kill-death ranking**, di mana performa pemain menentukan posisi mereka di leaderboard. Minimal 2 pemain diperlukan untuk pengalaman penuh; jika bermain sendiri, pemain hanya dapat menjelajahi map tanpa lawan.

---

## **Features**

### 1. **3D Tank Control**

- Kontrol realistis dengan mekanik fisika dinamis.
- Menggunakan keyboard dan mouse untuk navigasi dan menembak.

### 2. **Multiplayer Support**

- Bermain bersama hingga 4 pemain secara real-time.
- Didukung oleh **Playroomkit** untuk sinkronisasi multiplayer.
- Minimal 2 pemain diperlukan untuk gameplay kompetitif.

### 3. **Kill-Death Ranking System**

- **Game log** mencatat jumlah kill dan death setiap pemain.
- Leaderboard diupdate secara real-time berdasarkan rasio kill-death.

### 4. **Custom Map Design**

- Map dirancang menggunakan **Blender**.
- Menggunakan aset berkualitas tinggi dari:
  - [**Animated Tanks Pack**](https://quaternius.com/packs/animatedtanks.html)
  - [**Simple Nature Pack**](https://quaternius.com/packs/simplenature.html)

### 5. **Immersive Game Mechanics**

- Mekanik menembak dengan lintasan peluru realistis.
- Sistem skor terintegrasi dengan countdown timer.
- Efek visual seperti ledakan dan pasca-pemrosesan untuk tank yang hancur.

### 6. **Responsive UI**

- Antarmuka ramah pengguna dengan petunjuk di dalam game.
- Menampilkan countdown, skor, dan leaderboard.
- **Catatan:** Beberapa elemen UI belum sepenuhnya responsif, terutama di perangkat dengan layar kecil.

---

## **Technologies Used**

### **1. Core Libraries**

- **[React](https://reactjs.org/):** Framework untuk membangun antarmuka pengguna.
- **[Three.js](https://threejs.org/):** Engine 3D untuk rendering dunia game.

### **2. React Three Utilities**

- **[@react-three/fiber](https://github.com/pmndrs/react-three-fiber):** React renderer untuk Three.js.
- **[@react-three/drei](https://github.com/pmndrs/drei):** Utilities untuk kontrol kamera, lingkungan, dan pencahayaan.
- **[@react-three/rapier](https://rapier.rs/):** Simulasi fisika untuk gerakan tank dan peluru.
- **[@react-three/postprocessing](https://github.com/pmndrs/postprocessing):** Menambahkan efek visual seperti bloom dan depth of field.

### **3. Multiplayer Support**

- **[Playroomkit](https://github.com/playroomkit):** Library untuk sinkronisasi real-time dalam multiplayer.

### **4. Additional Libraries**

- **[Leva](https://github.com/pmndrs/leva):** Panel kontrol interaktif untuk menyesuaikan parameter real-time.
- **[React Countdown](https://github.com/ndresx/react-countdown):** Timer untuk sesi permainan.
- **[React Router DOM](https://reactrouter.com/):** Routing untuk halaman seperti Home, Gameplay, dan Instructions.

---

## **Development Highlights**

### Multiplayer Emphasis

Game mendukung hingga 4 pemain dengan sinkronisasi real-time menggunakan **Playroomkit**. Minimal 2 pemain diperlukan untuk gameplay kompetitif.

### Kill-Death Ranking System

Sistem ini memantau performa pemain, mencatat jumlah kill dan death, serta mengupdate leaderboard secara real-time.

### Custom Map Design

Map dirancang menggunakan **Blender** dan memanfaatkan aset dari [Quaternius](https://quaternius.com/).

### Realistic Game Mechanics

Mekanik menembak, ledakan, dan gerakan tank dirancang dengan fisika yang akurat menggunakan **Rapier**.

### Optimized Rendering

Rendering yang efisien menggunakan kombinasi **React Three Fiber** dan utilities dari Drei.

---

## **Current Limitations**

- **Responsiveness:** Beberapa elemen UI belum sepenuhnya responsif di perangkat kecil.
- **Performance Optimization:** Perlu pengoptimalan lebih lanjut untuk perangkat dengan spesifikasi rendah.
- **Feature Expansion:** Potensi penambahan fitur seperti kustomisasi tank atau map tambahan untuk variasi gameplay.

---

## **Conclusion**

Tank Battle 3D Game menawarkan pengalaman multiplayer kompetitif yang menarik dengan desain map khusus dan mekanik realistis. Namun, beberapa aspek seperti **responsiveness**, **optimasi performa**, dan **pengembangan fitur baru** perlu ditingkatkan untuk mencapai potensi penuh game ini.

---
