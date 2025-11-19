// Load portfolio data from JSON and populate the page
async function loadPortfolioData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    // Populate personal info
    populatePersonalInfo(data.personal);

    // Populate hero section
    populateHero(data.personal, data.hero);

    // Populate about section
    populateAbout(data.about);

    // Populate experience timeline
    populateExperience(data.experience);

    // Populate education
    populateEducation(data.education);

    // Populate certifications
    populateCertifications(data.certifications);

    // Populate projects
    populateProjects(data.projects);

    // Populate contact section
    populateContact(data.personal);

    // Remove inline animation styles that hide content
    removeAnimationStyles();

    // Dispatch event to notify that data is loaded
    window.dispatchEvent(new Event('portfolioDataLoaded'));

  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

function removeAnimationStyles() {
  // Remove inline styles that hide sections
  const sections = document.querySelectorAll('section[style]');
  sections.forEach(section => {
    section.style.opacity = '';
    section.style.transform = '';
  });

  // Remove styles from animated elements
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => {
    el.style.opacity = '';
    el.style.transform = '';
  });
}

function populatePersonalInfo(personal) {
  document.title = `${personal.name} - Data Scientist Portfolio`;
}

function populateHero(personal, hero) {
  document.querySelector('.hero-title').textContent = personal.name;
  document.querySelector('.hero-subtitle').textContent = personal.title;
  document.querySelector('.hero-description').textContent = hero.description;
}

function populateAbout(about) {
  document.querySelector('#about .section-subtitle').textContent = about.subtitle;
  document.querySelector('#about .glass-card .card-content').textContent = about.professionalSummary;

  const techCard = document.querySelectorAll('#about .grid .glass-card')[0];
  techCard.querySelector('.card-content').innerHTML = `
    <strong>Core Skills:</strong> ${about.technicalExpertise.coreSkills}<br><br>
    <strong>Specializations:</strong> ${about.technicalExpertise.specializations}
  `;

  const interestsCard = document.querySelectorAll('#about .grid .glass-card')[1];
  interestsCard.querySelector('.card-content').textContent = about.interests;
}

function populateExperience(experiences) {
  const timeline = document.querySelector('.timeline');

  if (!timeline) {
    console.error('Timeline element not found!');
    return;
  }

  timeline.innerHTML = '';

  experiences.forEach((exp, index) => {
    const item = document.createElement('div');
    item.className = 'timeline-item visible';
    item.setAttribute('data-animate', 'timeline');

    const descriptionItems = exp.description.map(desc => `<li>${desc}</li>`).join('');

    item.innerHTML = `
      <div class="timeline-content glass-card">
        <div class="timeline-date">${exp.date}</div>
        <h3 class="timeline-title">${exp.title}</h3>
        <div class="timeline-company">${exp.company}</div>
        <div class="timeline-location">${exp.location}</div>
        <div class="timeline-description">
          <ul>
            ${descriptionItems}
          </ul>
        </div>
      </div>
      <div class="timeline-marker"></div>
    `;

    timeline.appendChild(item);
  });
}

function populateEducation(education) {
  const container = document.querySelector('#education .container');
  const header = container.querySelector('.section-header');

  // Remove existing education cards
  const existingCards = container.querySelectorAll('.education-card');
  existingCards.forEach(card => card.remove());

  education.forEach(edu => {
    const card = document.createElement('div');
    card.className = 'glass-card education-card mb-4 visible';
    card.setAttribute('data-animate', 'card');

    let contentHTML = '';

    // Only add thesis/mentor/link if they exist
    if (edu.thesis) {
      contentHTML = `
        <strong>Thesis:</strong> ${edu.thesis}<br>
        <strong>Mentor${edu.mentor.includes(',') ? 's' : ''}:</strong> ${edu.mentor}
        <a href="${edu.link}" target="_blank" rel="noopener noreferrer" class="card-link">
          View Thesis →
        </a>
      `;
    } else if (edu.description) {
      contentHTML = edu.description;
    }

    card.innerHTML = `
      <div class="card-header">
        <h3 class="card-title">${edu.degree}</h3>
        <div class="card-subtitle">${edu.institution}</div>
        <div class="card-meta">${edu.period}</div>
      </div>
      <div class="card-content">
        ${contentHTML}
      </div>
    `;

    // Insert after header and before certifications section
    const certHeader = container.querySelector('.section-header:last-of-type');
    container.insertBefore(card, certHeader);
  });
}

function populateCertifications(certifications) {
  const container = document.querySelector('#education .container');
  const certHeader = container.querySelector('.section-header:last-of-type');

  // Remove existing cert cards
  const existingCerts = container.querySelectorAll('.cert-card');
  existingCerts.forEach(cert => cert.remove());

  certifications.forEach((cert, index) => {
    const card = document.createElement('div');
    card.className = `glass-card cert-card${index < certifications.length - 1 ? ' mb-3' : ''} visible`;
    card.setAttribute('data-animate', 'card');

    const content = cert.instructor
      ? `Instructor: ${cert.instructor}`
      : cert.description;

    card.innerHTML = `
      <div class="card-header">
        <h4 class="card-title">${cert.title}</h4>
        <div class="card-subtitle">${cert.institution}</div>
        <div class="card-meta">${cert.year}</div>
      </div>
      <div class="card-content">
        ${content}
      </div>
    `;

    container.appendChild(card);
  });
}

function populateProjects(projects) {
  const grid = document.querySelector('#projects .grid');
  grid.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'glass-card project-card visible';
    card.setAttribute('data-animate', 'card');

    let contentHTML = project.description;

    if (project.coauthor) {
      contentHTML += `<br><br><strong>Co-author:</strong> ${project.coauthor}`;
    }

    if (project.link) {
      contentHTML += `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="card-link">
          View Publication →
        </a>
      `;
    }

    card.innerHTML = `
      <div class="card-header">
        <h3 class="card-title">${project.title}</h3>
        <div class="card-meta">${project.year}</div>
      </div>
      <div class="card-content">
        ${contentHTML}
      </div>
    `;

    grid.appendChild(card);
  });
}

function populateContact(personal) {
  // Update contact items
  document.querySelector('.contact-item:nth-child(1) .contact-value').textContent = personal.email;
  document.querySelector('.contact-item:nth-child(1) .contact-value').href = `mailto:${personal.email}`;

  document.querySelector('.contact-item:nth-child(2) .contact-value').textContent = personal.phone.replace(/(\+\d{3})(\d{2})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  document.querySelector('.contact-item:nth-child(2) .contact-value').href = `tel:${personal.phone}`;

  document.querySelector('.contact-item:nth-child(3) .contact-value').textContent = personal.location;

  // Update languages
  document.querySelector('.glass-card.mt-5 .card-content').textContent = personal.languages.join(' • ');

  // Update social links
  const githubLink = document.querySelector('.social-links a:nth-child(1)');
  githubLink.href = `https://github.com/${personal.github}`;

  const linkedinLink = document.querySelector('.social-links a:nth-child(2)');
  linkedinLink.href = `https://linkedin.com/in/${personal.linkedin}`;
}

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', loadPortfolioData);
