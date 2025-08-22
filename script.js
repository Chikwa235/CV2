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

    // Theme switching
  const themeSelector = document.getElementById('themeSelector');
  themeSelector.addEventListener('change', e => {
    document.body.className = e.target.value;
  });

   // Profile Picture Preview
  const profilePicInput = document.getElementById('profilePic');
  const profilePreview = document.getElementById('profilePreview');
  let profilePicDataUrl = '';

  profilePicInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) {
      profilePreview.style.display = 'none';
      profilePicDataUrl = '';
      return;
    }

      const reader = new FileReader();
    reader.onload = function (e) {
      profilePicDataUrl = e.target.result;
      profilePreview.src = profilePicDataUrl;
      profilePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

   // Generate CV Preview
  function generateCV() {
    const get = id => document.getElementById(id)?.value.trim() || '';
    const required = ['forenames', 'surname', 'gender', 'dob', 'phone', 'email', 'summary', 'skills'];
    const missing = required.filter(id => !get(id));

    if (missing.length > 0) {
      const errorMsg = document.getElementById('errorMsg');
      errorMsg.style.display = 'block';
      setTimeout(() => errorMsg.style.display = 'none', 3000);
      return;
    }

    if (!isValidEmail(get('email'))) {
      alert('Invalid email format');
      return;
    }

    if (!isValidPhone(get('phone'))) {
      alert('Invalid phone number');
      return;
    }

     const skills = get('skills').split(',').map(s => '- ' + s.trim()).join('\n');
    const certs = get('certifications_and_Learning') ? get('certifications_and_Learning').split('\n').map(c => '- ' + c.trim()).join('\n') : 'N/A';
