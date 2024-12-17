import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Login Page/Login"
import UserRegister from "./Login Page/UserRegister"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import EmployerReister from "./Login Page/EmployerReister"
import ResetPage from "./Login Page/ResetPage"
import UserProfile from "./Profile Page/UserProfile"
import "./App.css"
import Navbar from "./HomePage/Navbar"
import HomePage from "./HomePage/HomePage"
import UserPage from "./HomePage/UserPage"
import userContext, { UserProvider } from "./UserContext"
import UserModal from "./Profile Page/UserModal"
import { useContext, useState } from "react"
import EmployerModal from "./Profile Page/EmployerModal"
import employersContext, { EmployersProvider } from "./EmployersContext"
import EmployerProfile from "./Profile Page/EmployerProfile"
function App() {
  const { candidat } = useContext(userContext);

  const { employer } = useContext(employersContext);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [filteredemployers, setfilteredemployers] = useState([]);

  const handleSearch = (query) => {
    const results = candidat.filter((candidate) => {
      const skillsArray = typeof candidate.skills === "string"
        ? candidate.skills.split(",").map((skill) => skill.trim().toLowerCase())
        : [];

      const skillsMatch = skillsArray.some((skill) =>
        skill.includes(query.toLowerCase())
      );

      const nameMatch = candidate.name
        .toLowerCase()
        .includes(query.toLowerCase());

      return skillsMatch || nameMatch;
    });
    setFilteredCandidates(results);


  };
  const handleemployerSearch = (query) => {
    const results = employer.filter((employers) => {
      const skillsArray = typeof employers.skillsneeded === "string"
        ? employers.skillsneeded.split(",").map((skill) => skill.trim().toLowerCase())
        : [];

      const skillsMatch = skillsArray.some((skill) =>
        skill.includes(query.toLowerCase())
      );

      const nameMatch = employers.company
        .toLowerCase()
        .includes(query.toLowerCase());

      return skillsMatch || nameMatch;
    });
    setfilteredemployers(results);

  }
  return (
    <>

      <UserProvider>
        <EmployersProvider>
          <BrowserRouter>
            <Navbar onSearch={handleSearch} onemployersearch={handleemployerSearch} />
            <Routes>              
              <Route path="/Nav" element={<Navbar />} />
              <Route path="/userpage" element={<UserPage candidates={filteredCandidates.length > 0 ? filteredCandidates : candidat} />} />
              <Route path="/jobspage" element={<HomePage employment={filteredemployers.length > 0 ? filteredemployers : employer} />} />
              <Route index path="/Login" element={<Login />} />
              <Route path="/user-register" element={<UserRegister />} />
              <Route path="/company-register" element={<EmployerReister />} />
              <Route path="/reset-page" element={<ResetPage />} />
              <Route path="/Profile" element={<UserProfile />} />
              <Route path="/employerProfile" element={<EmployerProfile />} />
              <Route path="usermodal" element={<UserModal />} />
              <Route path="employermodal" element={<EmployerModal />} />
              <Route path="usermodal/:id" element={<UserModal />} />
              <Route path="employermodal/:id" element={<EmployerModal />} />
              <Route path="/Profile/:id" element={<UserProfile />} />
              <Route path="/employerProfile/:id" element={<EmployerProfile />} />

            </Routes>
          </BrowserRouter>
        </EmployersProvider>
      </UserProvider>
    </>
  )
}

export default App

