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

       // Build dynamic education section
    let education = '';
    const eduCount = parseInt(document.getElementById('eduCount').value);
     for (let i = 1; i <= eduCount; i++) {
      const institution = get(`institution${i}`);
      const degree = get(`degree${i}`);
      const field = get(`field${i}`);
      const yearStart = get(`yearStart${i}`);
      const yearEnd = get(`yearEnd${i}`);
      const grade = get(`grade${i}`);

      if (institution || degree || field || yearStart || yearEnd || grade) {
        education += `${degree || 'Degree/Diploma'}${field ? ', ' + field : ''} from ${institution || 'Institution'} (${yearStart || 'Start'} - ${yearEnd || 'End'})${grade ? ', Grade/GPA: ' + grade : ''}\n`;
      }
    }
  
    
// Build dynamic experience section
    let experience = '';
    const expCount = parseInt(document.getElementById('expCount').value);
    for (let i = 1; i <= expCount; i++) {
      const title = get(`jobTitle${i}`);
      const company = get(`company${i}`);
      const location = get(`location${i}`);
      const startDate = get(`expStart${i}`);
      const endDate = get(`expEnd${i}`);
      const description = get(`responsibilities${i}`);

      if (title || company || location || startDate || endDate || description) {
        experience += `${title || 'Job Title'} at ${company || 'Company'} in ${location || 'Location'} (${startDate || 'Start'} - ${endDate || 'End'})\n${description || 'Job Description'}\n\n`;
      }
    }

     const cvText = `
${get('forenames')} ${get('middleName')} ${get('surname')}
Gender: ${get('gender')}
Date of Birth: ${get('dob')}
Marital Status: ${get('marital')}
No. of Children: ${get('children')}
Nationality: ${get('nationality')}
National ID / NRC #: ${get('nrc')}
TPIN: ${get('tpin')}
NAPSA SSN: ${get('napsa')}
Postal Address: ${get('postal')}
Guardian / Company: ${get('guardian')}
Town: ${get('postalTown')}
Residential Address: ${get('residential')}
Plot No.: ${get('plot')}
Street: ${get('street')}
Township: ${get('township')}
Phone: ${get('phone')}
Email: ${get('email')}
Contact No. (Tel): ${get('tel')}
Location: ${get('location')}
LinkedIn: ${get('linkedin')}
GitHub: ${get('github')}
Portfolio: ${get('portfolio')}
Position Applied For: ${get('position')}
Alternate Position of Interest: ${get('altPosition')}
State of Health: ${get('illnesses')}
List any illnesses: ${get('illnesses')}
List any allergies: ${get('allergies')}
Disabilities (If any): ${get('disabilities')}
Any other data: ${get('otherData')}
Special Achievements: ${get('achievements')}
Special Attributes: ${get('attributes')}
Languages Spoken: ${get('languages')}
Hobbies & Pass Time Activities: ${get('hobbies')}
What is your expected minimum gross pay?: ${get('expectedPay')}
Other Expectations: ${get('expectations')}
Do you have a valid driver’s license?: ${get('license')}
If successful, when would you be ready to start work?: ${get('startDate')}
Reason for Leaving Last Employment: ${get('reasonLeave')}
If not working, indicate current occupation: ${get('currentOccupation')}
Referees (Name, Profession, Address, Contact No.): ${get('referee1')}, ${get('referee2')}, ${get('referee3')}
==============================
Professional Summary
==============================
${get('summary')}

==============================
Technical Skills
==============================
${skills}

==============================
Experience
==============================
${experience || 'N/A'}

==============================
Education
==============================
${education || 'N/A'}

==============================
Certifications
==============================
${certs}

==============================
Additional Info
==============================
${get('additional')}

${profilePicDataUrl ? '[Profile Picture included below]' : ''}

References available upon request.`;

    document.getElementById('output').textContent = cvText;
  }