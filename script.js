document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded, attempting to fetch XML...");

    fetch("justinlei_doroy.xml")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("XML fetched successfully!");
            return response.text();
        })
        .then(data => {
            console.log("Parsing XML...");
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const students = xml.getElementsByTagName("student");
            const container = document.getElementById("studentContainer");

            console.log(`Found ${students.length} student entries in XML.`);

            for (let student of students) {
                const picture = student.getElementsByTagName("picture")[0].textContent;
                const name = student.getElementsByTagName("name")[0].textContent;
                const course = student.getElementsByTagName("course")[0].textContent;
                const yearLevelSection = student.getElementsByTagName("year_level_section")[0].textContent;
                const adviser = student.getElementsByTagName("adviser")[0].textContent;
                const schoolYear = student.getElementsByTagName("school_year")[0].textContent;

                const card = document.createElement("div");
                card.className = "student-card";
                card.innerHTML = `
                    <img src="${picture}" alt="${name}'s Picture">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Course:</strong> ${course}</p>
                    <p><strong>Year Level/Section:</strong> ${yearLevelSection}</p>
                    <p><strong>Adviser:</strong> ${adviser}</p>
                    <p><strong>School Year:</strong> ${schoolYear}</p>
                `;

                card.addEventListener("click", function () {
                    const modal = document.getElementById("studentModal");
                    document.getElementById("modalPicture").src = picture;
                    document.getElementById("modalName").textContent = name;
                    document.getElementById("modalCourse").textContent = course;
                    document.getElementById("modalYearLevelSection").textContent = yearLevelSection;
                    document.getElementById("modalAdviser").textContent = adviser;
                    document.getElementById("modalSchoolYear").textContent = schoolYear;
                    modal.style.display = "flex"; 
                });

                container.appendChild(card);
            }

            
            const modal = document.getElementById("studentModal");
            const closeBtn = document.getElementsByClassName("close")[0];
            closeBtn.addEventListener("click", function () {
                modal.style.display = "none";
            });

         
            window.addEventListener("click", function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        })
        .catch(error => {
            console.error("Error loading or parsing XML:", error);
            const container = document.getElementById("studentContainer");
            container.innerHTML = `<p style="color: red;">Error loading student data. Please check the console for details.</p>`;
        });
});
