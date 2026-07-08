// Array of Course Objects (Criterion 8)
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

// DOM Elements
const courseList = document.getElementById('course-list');
const totalCreditsEl = document.getElementById('total-credits');
const btnAll = document.getElementById('btn-all');
const btnCse = document.getElementById('btn-cse');
const btnWdd = document.getElementById('btn-wdd');

function renderCourses(filter = 'All') {
    courseList.innerHTML = '';
    
    let filteredCourses = courses;
    if (filter !== 'All') {
        filteredCourses = courses.filter(course => course.subject === filter);
    }

    filteredCourses.forEach(course => {
        const courseDiv = document.createElement('div');
       
        courseDiv.classList.add('course-card', course.completed ? 'completed' : 'incomplete');
        courseDiv.innerHTML = `<h3>${course.subject} ${course.number}</h3><p>${course.title}</p><p>Credits: ${course.credits}</p>`;
        courseList.appendChild(courseDiv);
    });

    const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsEl.textContent = totalCredits;
}

function updateActiveButton(activeBtn) {
    [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove('active-filter'));
    activeBtn.classList.add('active-filter');
}

btnAll.addEventListener('click', () => {
    renderCourses('All');
    updateActiveButton(btnAll);
});

btnCse.addEventListener('click', () => {
    renderCourses('CSE');
    updateActiveButton(btnCse);
});

btnWdd.addEventListener('click', () => {
    renderCourses('WDD');
    updateActiveButton(btnWdd);
});

renderCourses('All');

const menuButton = document.getElementById('menu-button');
const navUl = document.querySelector('#main-nav ul');

menuButton.addEventListener('click', () => {
    navUl.classList.toggle('open');
});

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;