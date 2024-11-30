import { createContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = createContext();

export const UserProvider = ({ children }) => {
    // const [candidat, setCandidate] = useState([
    //     {
    //         name: "Alice Johnson",
    //         email: "alice@gmail.com",
    //         PhoneNumber: 125482485,
    //         experience: "5 years",
    //         skills: ["JavaScript", "React", "Redux", "Node.js"],
    //         role: "Frontend Developer",
    //         description: "A passionate frontend developer with a focus on creating interactive and responsive web applications.",
    //         photo: "https://static.vecteezy.com/system/resources/previews/003/241/796/non_2x/search-employee-and-candidate-vector.jpg",
    //         projects: [
    //             {
    //                 projectName: "E-Commerce Website",
    //                 projectDescription: "Developed a full-featured e-commerce web app using React, Redux, and Node.js.",
    //                 projectLink: "https://example.com/projects/ecommerce"
    //             },
    //             {
    //                 projectName: "Portfolio Website",
    //                 projectDescription: "Created a personal portfolio to showcase my work and blog using modern JavaScript frameworks.",
    //                 projectLink: "https://example.com/projects/portfolio"
    //             }
    //         ]
    //     }
    //     // {
    //     //     name: "Brian Smith",
    //     //     email: "alice@gmail.com",
    //     //     PhoneNumber: 125482485,
    //     //     experience: "3 years",
    //     //     skills: ["Python", "Django", "REST APIs", "PostgreSQL"],
    //     //     role: "Backend Developer",
    //     //     description: "Backend developer with expertise in Python and Django, focused on building scalable and secure APIs.",
    //     //     photo: "https://static.vecteezy.com/system/resources/previews/014/352/384/original/candidate-person-icon-cartoon-employee-job-vector.jpg",
    //     //     projects: [
    //     //         {
    //     //             projectName: "Inventory Management System",
    //     //             projectDescription: "Developed a scalable inventory management system using Django and PostgreSQL.",
    //     //             projectLink: "https://example.com/projects/inventory"
    //     //         },
    //     //         {
    //     //             projectName: "Weather App",
    //     //             projectDescription: "Created a weather forecasting application that provides real-time data using a public API.",
    //     //             projectLink: "https://example.com/projects/weather-app"
    //     //         }
    //     //     ]
    //     // },
    //     // {
    //     //     name: "Catherine Lee",
    //     //     email: "alice@gmail.com",
    //     //     PhoneNumber: 125482485,
    //     //     experience: "7 years",
    //     //     skills: ["Java", "Spring Boot", "Microservices", "AWS"],
    //     //     role: "Full-Stack Developer",
    //     //     description: "Experienced full-stack developer with a strong background in building cloud-based microservices.",
    //     //     photo: "https://static.vecteezy.com/system/resources/previews/014/307/410/original/job-candidate-icon-cartoon-person-employee-vector.jpg",
    //     //     projects: [
    //     //         {
    //     //             projectName: "Online Banking System",
    //     //             projectDescription: "Led the development of a secure and scalable online banking platform using Spring Boot and AWS.",
    //     //             projectLink: "https://example.com/projects/online-banking"
    //     //         },
    //     //         {
    //     //             projectName: "Task Management App",
    //     //             projectDescription: "Built a task management application with features like real-time notifications and cloud storage.",
    //     //             projectLink: "https://example.com/projects/task-manager"
    //     //         }
    //     //     ]
    //     // },
    //     // {
    //     //     name: "David Nguyen",
    //     //     email: "alice@gmail.com",
    //     //     PhoneNumber: 125482485,
    //     //     experience: "4 years",
    //     //     skills: ["Ruby", "Ruby on Rails", "MySQL", "GraphQL"],
    //     //     role: "Software Engineer",
    //     //     description: "Software engineer specializing in building efficient web applications using Ruby on Rails and GraphQL.",
    //     //     photo: "https://static.vecteezy.com/system/resources/previews/014/318/871/non_2x/candidate-icon-cartoon-employee-job-vector.jpg",
    //     //     projects: [
    //     //         {
    //     //             projectName: "Social Media Platform",
    //     //             projectDescription: "Developed a social media platform with real-time messaging and user authentication features.",
    //     //             projectLink: "https://example.com/projects/social-media"
    //     //         },
    //     //         {
    //     //             projectName: "Job Board Application",
    //     //             projectDescription: "Built a job board platform with search, filtering, and notifications using Ruby on Rails.",
    //     //             projectLink: "https://example.com/projects/job-board"
    //     //         }
    //     //     ]
    //     // },
    //     // {
    //     //     name: "Eva Martinez",
    //     //     email: "alice@gmail.com",
    //     //     PhoneNumber: 125482485,
    //     //     experience: "6 years",
    //     //     skills: ["HTML", "CSS", "JavaScript", "WordPress"],
    //     //     role: "UI/UX Designer",
    //     //     description: "Creative UI/UX designer with a passion for creating visually appealing and user-friendly interfaces.",
    //     //     photo: "https://static.vecteezy.com/system/resources/previews/014/316/734/non_2x/student-candidate-icon-cartoon-hr-people-vector.jpg",
    //     //     projects: [
    //     //         {
    //     //             projectName: "Blog Platform",
    //     //             projectDescription: "Designed a blog platform focusing on usability and visual appeal using WordPress and custom themes.",
    //     //             projectLink: "https://example.com/projects/blog-platform"
    //     //         },
    //     //         {
    //     //             projectName: "Landing Page Design",
    //     //             projectDescription: "Created various landing pages for clients with high conversion rates through UX best practices.",
    //     //             projectLink: "https://example.com/projects/landing-page"
    //     //         }
    //     //     ]
    //     // }
    // ])

    const [candidat, setCandidate] = useState([]);
    // console.log(candidat);
    const getData = async () => {
        // console.log("Before axios");
        try {
            const users = await axios.get("http://localhost:3000/users")
            // console.log(users.data);
            setCandidate(users.data)
        } catch (error) {
            alert("something went wrong on get FE")
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return <userContext.Provider value={{ candidat, setCandidate }}>
        {children}
    </userContext.Provider>
}

export default userContext;