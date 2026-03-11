# 🎓 Global Scholarship Finder

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)

**Live Demo:** [Click here to view the live application](https://saifurrahmansaif-gif.github.io/scholarships/)

## 🚀 The Vision & My Story
Navigating higher education funding is one of the most stressful barriers for students globally. I noticed my peers (and myself) struggling to sift through thousands of scattered, unorganized scholarship websites. 

Having **zero prior coding experience**, I decided to build a solution. Instead of using a drag-and-drop website builder like Wix or WordPress, I wanted to understand how the web truly works from "first principles." I taught myself the fundamentals of **HTML semantic structuring, modern CSS design, and Asynchronous JavaScript** to engineer this platform entirely from scratch. 

This project represents my transition from a consumer of technology to a creator of it.

## 🧠 Technical Architecture & CS Concepts
To ensure lightning-fast performance, I intentionally avoided heavy JavaScript frameworks and built a **Vanilla JavaScript Single Page Application (SPA)**. 

Professors and engineers reviewing this code will notice the following implementations:
* **Algorithmic Efficiency (O(N) Time Complexity):** The search engine does not rely on slow server-side queries. The JSON dataset is fetched asynchronously on load, stored in local memory, and filtered instantly in `O(N)` time on every keystroke using high-order array methods (`.filter()`, `.map()`).
* **Asynchronous Data Fetching:** Utilized ES6 `async/await` and the Fetch API to handle data loading gracefully without blocking the main browser thread.
* **Functional Programming Patterns:** Used immutable data practices to render the DOM dynamically.
* **Modern UI/UX Engineering:** 
  * Implemented **CSS Grid (`auto-fill`, `minmax`)** for deep, mathematically perfect mobile responsiveness without relying on bloated media queries.
  * Designed using the **Glassmorphism** UI trend (`backdrop-filter: blur()`) with scalable CSS Custom Properties (`:root` variables) for a premium, future-proof dark mode aesthetic.
  * Engineered dynamic DOM manipulation to handle edge cases (e.g., "0 results found" states).

## 🗂️ Project Structure
```text
📦 scholarships
 ┣ 📜 index.html   # The structural skeleton (Semantic HTML5)
 ┣ 📜 style.css    # The design system (CSS Grid, Variables, Glassmorphism)
 ┣ 📜 script.js    # The Brain (Async fetch, O(N) filtering, DOM injection)
 ┗ 📜 data.json    # The Database (160+ Scholarship records)
