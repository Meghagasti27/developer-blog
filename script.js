/**
 * Developer Notes & Interview Prep Blog
 * Features: Search, Filter, Like, Bookmark (localStorage), Dark Mode, Typing Animation
 * Read More: Opens external resource links directly
 */

const notesData = [
    // Developer Notes
    { 
        id: 1, title: "Arrays & Hashing Mastery", 
        desc: "Two pointers, sliding window, prefix sums. Essential DSA patterns for interviews based on AlgoMaster DSA Roadmap.", 
        category: "DSA", type: "note", likes: 12, bookmarked: false,
        externalUrl: "https://algomaster.io/learn/dsa"
    },
    { 
        id: 2, title: "Java OOP: The 4 Pillars", 
        desc: "Deep dive into Encapsulation, Inheritance, Polymorphism, Abstraction. Must-read for Java interviews.", 
        category: "Java", type: "note", likes: 8, bookmarked: false,
        externalUrl: "https://medium.com/search?q=java+oops"
    },
    { 
        id: 3, title: "SQL Joins & Window Functions", 
        desc: "Master INNER JOIN, LEFT JOIN, RANK, DENSE_RANK for complex queries. Real interview scenarios.", 
        category: "SQL", type: "note", likes: 15, bookmarked: false,
        externalUrl: "https://medium.com/search?q=sql+interview+questions"
    },
    { 
        id: 4, title: "AI/ML Basics: Supervised vs Unsupervised", 
        desc: "Linear regression, decision trees, clustering. High-level overview for ML interviews.", 
        category: "AI/ML", type: "note", likes: 7, bookmarked: false,
        externalUrl: "https://medium.com/search?q=machine+learning+notes"
    },
    { 
        id: 5, title: "Dynamic Programming Patterns", 
        desc: "Knapsack, LCS, and DP optimization. Pattern-based DSA approach from AlgoMaster.", 
        category: "DSA", type: "note", likes: 23, bookmarked: false,
        externalUrl: "https://algomaster.io/learn/dsa"
    },
    { 
        id: 6, title: "Java Collections Framework Deep Dive", 
        desc: "ArrayList, HashMap, ConcurrentModification. Internal working and best practices.", 
        category: "Java", type: "note", likes: 14, bookmarked: false,
        externalUrl: "https://medium.com/search?q=java+collections+framework"
    },
    { 
        id: 7, title: "Advanced SQL Indexing Strategies", 
        desc: "B-Tree, Hash indexes, query optimization tips for high-performance databases.", 
        category: "SQL", type: "note", likes: 9, bookmarked: false,
        externalUrl: "https://medium.com/search?q=sql+indexing+optimization"
    },
    { 
        id: 8, title: "Transformers & LLM Architecture", 
        desc: "Attention mechanism, GPT architecture simplified for AI/ML interviews.", 
        category: "AI/ML", type: "note", likes: 21, bookmarked: false,
        externalUrl: "https://medium.com/search?q=transformers+llm+architecture"
    },
    { 
        id: 9, title: "JavaScript: Event Loop & Closures", 
        desc: "Deep dive into async JavaScript, callbacks, promises, and closures.", 
        category: "Web Development", type: "note", likes: 18, bookmarked: false,
        externalUrl: "https://medium.com/search?q=javascript+event+loop+closures"
    },
    { 
        id: 16, title: "System Design for SDE-1", 
        desc: "Design URL shortener, rate limiter. Entry level system design concepts.", 
        category: "Web Development", type: "note", likes: 11, bookmarked: false,
        externalUrl: "https://medium.com/search?q=system+design+interview"
    },
    
    // Interview Questions
    { 
        id: 10, title: "Top 30 DSA Interview Questions", 
        desc: "Reverse linked list, detect cycle, two sum variations. Must know for FAANG interviews.", 
        category: "DSA", type: "interview", likes: 45, bookmarked: false,
        externalUrl: "https://algomaster.io/learn/dsa"
    },
    { 
        id: 11, title: "Java Concurrency & Multithreading", 
        desc: "Interview Q&A: synchronized, volatile, ExecutorService, deadlock prevention.", 
        category: "Java", type: "interview", likes: 32, bookmarked: false,
        externalUrl: "https://medium.com/search?q=java+concurrency+interview"
    },
    { 
        id: 12, title: "SQL Leetcode Hard Questions", 
        desc: "Second highest salary, department top three salaries. Explained with solutions.", 
        category: "SQL", type: "interview", likes: 27, bookmarked: false,
        externalUrl: "https://medium.com/search?q=sql+leetcode+hard"
    },
    { 
        id: 13, title: "AI/ML Interview Questions", 
        desc: "Bias-variance tradeoff, precision/recall, ROC curve. Core ML questions.", 
        category: "AI/ML", type: "interview", likes: 19, bookmarked: false,
        externalUrl: "https://medium.com/search?q=machine+learning+interview+questions"
    },
    { 
        id: 14, title: "HR Interview Questions", 
        desc: "Tell me about yourself, strengths and weaknesses, leadership scenarios. Complete guide.", 
        category: "HR Interview", type: "interview", likes: 38, bookmarked: false,
        externalUrl: "https://medium.com/search?q=hr+interview+questions+and+answers"
    },
    { 
        id: 15, title: "Web Dev: Tricky JavaScript Questions", 
        desc: "Event loop, hoisting, closures, this binding. Most asked JS questions.", 
        category: "Web Development", type: "interview", likes: 22, bookmarked: false,
        externalUrl: "https://medium.com/search?q=javascript+interview+questions"
    }
];

let allItems = JSON.parse(JSON.stringify(notesData));
let currentFilterCategory = "All";
let searchQuery = "";

function loadLocalStorageData() {
    const savedBookmarks = JSON.parse(localStorage.getItem("devPrep_bookmarks")) || [];
    const savedLikes = JSON.parse(localStorage.getItem("devPrep_likes")) || {};
    
    allItems.forEach(item => {
        item.bookmarked = savedBookmarks.includes(item.id);
        item.likes = savedLikes[item.id] !== undefined ? savedLikes[item.id] : item.likes;
    });
}

function saveBookmarksToStorage() {
    const bookmarkedIds = allItems.filter(i => i.bookmarked).map(i => i.id);
    localStorage.setItem("devPrep_bookmarks", JSON.stringify(bookmarkedIds));
}

function saveLikesToStorage() {
    const likesMap = {};
    allItems.forEach(i => { likesMap[i.id] = i.likes; });
    localStorage.setItem("devPrep_likes", JSON.stringify(likesMap));
}

function toggleLike(id, event) {
    event.stopPropagation();
    const note = allItems.find(n => n.id === id);
    if (note) {
        note.likes += 1;
        saveLikesToStorage();
        renderAllSections();
    }
}

function toggleBookmark(id, event) {
    event.stopPropagation();
    const note = allItems.find(n => n.id === id);
    if (note) {
        note.bookmarked = !note.bookmarked;
        saveBookmarksToStorage();
        renderAllSections();
    }
}

function getFilteredItemsByType(typeFilter = "all") {
    let filtered = allItems.filter(item => {
        const matchesCategory = currentFilterCategory === "All" || item.category === currentFilterCategory;
        const matchesSearch = searchQuery === "" || 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (typeFilter === "note") return matchesCategory && matchesSearch && item.type === "note";
        if (typeFilter === "interview") return matchesCategory && matchesSearch && item.type === "interview";
        return matchesCategory && matchesSearch;
    });
    return filtered;
}

function createCardHTML(item) {
    const bookmarkClass = item.bookmarked ? "bookmarked" : "";
    return `
        <div class="card" data-id="${item.id}">
            <span class="card-category">${escapeHtml(item.category)}</span>
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
            <p class="card-desc">${escapeHtml(item.desc.substring(0, 120))}${item.desc.length > 120 ? '...' : ''}</p>
            <div class="card-actions">
                <button class="icon-btn like-btn" data-id="${item.id}">
                    <i class="${item.likes > 0 ? 'fas' : 'far'} fa-heart"></i> ${item.likes}
                </button>
                <button class="icon-btn bookmark-btn ${bookmarkClass}" data-id="${item.id}">
                    <i class="${item.bookmarked ? 'fas' : 'far'} fa-bookmark"></i>
                </button>
                <a href="${item.externalUrl}" target="_blank" class="read-more" data-id="${item.id}" data-url="${item.externalUrl}">Read More</a>
            </div>
        </div>
    `;
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function renderNotesGrid() {
    const notesContainer = document.getElementById("notesGrid");
    let filteredNotes = getFilteredItemsByType("note");
    
    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = `<div class="empty-message">No notes found. Try changing filters or search.</div>`;
    } else {
        notesContainer.innerHTML = filteredNotes.map(card => createCardHTML(card)).join("");
    }
    attachCardEvents();
}

function renderInterviewGrid() {
    const interviewContainer = document.getElementById("interviewGrid");
    let filteredInt = getFilteredItemsByType("interview");
    
    if (filteredInt.length === 0) {
        interviewContainer.innerHTML = `<div class="empty-message">No interview questions match your criteria.</div>`;
    } else {
        interviewContainer.innerHTML = filteredInt.map(card => createCardHTML(card)).join("");
    }
    attachCardEvents();
}

function renderBookmarksGrid() {
    const bookmarksContainer = document.getElementById("bookmarksGrid");
    const bookmarkedItems = allItems.filter(item => item.bookmarked === true);
    
    if (bookmarkedItems.length === 0) {
        bookmarksContainer.innerHTML = `<div class="empty-message">No bookmarked notes yet. Click the bookmark icon on any card to save for later.</div>`;
    } else {
        bookmarksContainer.innerHTML = bookmarkedItems.map(card => createCardHTML(card)).join("");
    }
    attachCardEvents();
}

function renderAllSections() {
    renderNotesGrid();
    renderInterviewGrid();
    renderBookmarksGrid();
}

function attachCardEvents() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.removeEventListener('click', likeHandler);
        btn.addEventListener('click', likeHandler);
    });
    
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.removeEventListener('click', bookmarkHandler);
        btn.addEventListener('click', bookmarkHandler);
    });
}

function likeHandler(e) {
    e.stopPropagation();
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    toggleLike(id, e);
}

function bookmarkHandler(e) {
    e.stopPropagation();
    const id = parseInt(e.currentTarget.getAttribute('data-id'));
    toggleBookmark(id, e);
}

const categoriesSet = ["All", ...new Set(allItems.map(item => item.category))];

function initCategoryFilters() {
    const filterContainer = document.getElementById("filterButtonsContainer");
    filterContainer.innerHTML = "";
    
    categoriesSet.forEach(cat => {
        const btn = document.createElement("button");
        btn.innerText = cat;
        btn.classList.add("category-btn");
        if (currentFilterCategory === cat) btn.classList.add("active");
        
        btn.addEventListener("click", () => {
            currentFilterCategory = cat;
            document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderAllSections();
        });
        
        filterContainer.appendChild(btn);
    });
}

const phrases = ["DSA & Algorithms", "Java & OOP Concepts", "SQL Mastery", "AI/ML Foundations", "HR Interview Prep"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById("typingElement");

function typeEffect() {
    const fullText = phrases[phraseIndex];
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    
    let displayText = fullText.substring(0, charIndex);
    typedElement.innerHTML = `${displayText}${!isDeleting && charIndex === fullText.length ? ' |' : ''}`;
    
    let speed = isDeleting ? 60 : 120;
    
    if (!isDeleting && charIndex === fullText.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 300;
    }
    
    setTimeout(typeEffect, speed);
}

const darkModeToggle = document.getElementById("darkModeToggle");
const savedTheme = localStorage.getItem("devPrep_theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    darkModeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("devPrep_theme", isLight ? "light" : "dark");
    const icon = darkModeToggle.querySelector("i");
    if (isLight) {
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
    }
});

const revealElements = document.querySelectorAll('.reveal, .card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
            e.preventDefault();
            targetElem.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderAllSections();
});

loadLocalStorageData();
initCategoryFilters();
renderAllSections();
typeEffect();

document.querySelectorAll('.about-card').forEach(el => el.classList.add('reveal'));