import React from 'react'
import EmployerCards from '../Cards/EmployerCards';

function HomePage({ employment }) {
    // const employersData = [
    //     {
    //         companyName: "Tech Innovators Inc.",
    //         jobRequirement: "Full-Stack Developer",
    //         skillsNeeded: ["JavaScript", "React", "Node.js", "MongoDB"],
    //         companyImageLink: "https://media.licdn.com/dms/image/v2/C510BAQGyrjejcc1lAg/company-logo_200_200/company-logo_200_200/0/1630614328507?e=2147483647&v=beta&t=v6YiDrB5LV_2I_5JFdmkQqszxmvu3dkrb09ts0rxPt8"
    //     },
    //     {
    //         companyName: "FinTech Solutions",
    //         jobRequirement: "Data Scientist",
    //         skillsNeeded: ["Python", "Machine Learning", "SQL", "Statistics"],
    //         companyImageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZLlytG4J0JsftyMGaioZdcvT5mU-K0RkLQ&s"
    //     },
    //     {
    //         companyName: "Global Health Corp",
    //         jobRequirement: "Backend Developer",
    //         skillsNeeded: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    //         companyImageLink: "https://www.drkfoundation.org/wp-content/uploads/2016/09/GHC_Logo_272x160.png"
    //     },
    //     {
    //         companyName: "Creative Minds Studio",
    //         jobRequirement: "UI/UX Designer",
    //         skillsNeeded: ["Figma", "Sketch", "Adobe XD", "Wireframing"],
    //         companyImageLink: "https://files.sitebuilder.1-grid.com/8e/e7/8ee7d7c2-d392-4172-ba80-4d44097256d1.jpeg"
    //     },
    //     {
    //         companyName: "CyberSafe Security",
    //         jobRequirement: "Cybersecurity Specialist",
    //         skillsNeeded: ["Network Security", "Penetration Testing", "Firewalls", "Cryptography"],
    //         companyImageLink: "https://cdn.dribbble.com/userupload/9781946/file/original-d784505767ce51bd31fef37b7af5699b.png"
    //     },
    //     {
    //         companyName: "EcoEnergy Solutions",
    //         jobRequirement: "Project Manager",
    //         skillsNeeded: ["Agile", "Scrum", "Budget Management", "Risk Assessment"],
    //         companyImageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSce2NqFqwBPrSPyfwccd2xdofmfEUBPGcCrg&s"
    //     }
    // ];
    return (
        <div className="container">
            <div className="row">
                {employment.length > 0 ? (
                    employment.map((employer, index) =>
                        <EmployerCards key={index} employer={employer} />
                    )
                ) : (
                    <p>No employers found.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage