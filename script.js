document.addEventListener('DOMContentLoaded', () => {
  //Utilities
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

   function isValidPhone(phone) {
     const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(phone);
  }

   function addEducation() {
    let eduCount = parseInt(document.getElementById('eduCount').value);
    eduCount++;
    document.getElementById('eduCount').value = eduCount;
     const container = document.getElementById('educationContainer');
    const newBlock = document.createElement('div');
    newBlock.className = 'input-group';
    newBlock.id = `eduBlock${eduCount}`;
    newBlock.innerHTML = `
      <label>Institution</label>
      <input type="text" id="institution${eduCount}" />

      <label>Degree / Diploma (optional)</label>
      <input type="text" id="degree${eduCount}" />

      <label>Field of Study / Major</label>
      <input type="text" id="field${eduCount}" />

      <label>Year Started</label>
      <input type="text" id="yearStart${eduCount}" />

      <label>Year Completed</label>
      <input type="text" id="yearEnd${eduCount}" />
 <label>Grade / GPA (optional)</label>
      <input type="text" id="grade${eduCount}" />
    `;
    container.appendChild(newBlock);
  }

   function addExperience() {
    let expCount = parseInt(document.getElementById('expCount').value);
    expCount++;
    document.getElementById('expCount').value = expCount;

    const container = document.getElementById('experienceContainer');
    const newBlock = document.createElement('div');
    newBlock.className = 'input-group';
    newBlock.id = `expBlock${expCount}`;
    newBlock.innerHTML = `
      <label>Job Title</label>
      <input type="text" id="jobTitle${expCount}" />

      <label>Company Name</label>
      <input type="text" id="company${expCount}" />
  <label>Location (City, Country)</label>
      <input type="text" id="location${expCount}" />

      <label>Start Date</label>
      <input type="text" id="expStart${expCount}" />

      <label>End Date (or "Present")</label>
      <input type="text" id="expEnd${expCount}" />

      <label>Key Responsibilities / Achievements</label>
      <textarea id="responsibilities${expCount}"></textarea>
    `;
    container.appendChild(newBlock);
  }

