import React, { useState } from "react";
import NavBar from "../components/TurnersNavBar";
import TopHeader from "../components/TurnersTopHeader";
import Footer from "../components/TurnersFooter";
import styles from "./TurnersInterviewPage.module.css";
import logo from "../assets/images/turnerscars_logo.png";
import finance from "../assets/images/finance.jpg";
import userIcon from "../assets/images/user.png";
import phoneIcon from "../assets/images/phone.png";
import locationIcon from "../assets/images/location.png";
import axios from "axios";

function TurnersInterviewPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId] = useState(() => Date.now().toString());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.customInput || userInput;
    if (!input.trim() || !jobTitle.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:3001/interview/standard",
        {
          sessionId,
          jobTitle,
          userResponse: input,
        }
      );
      setChatHistory(response.data.history);
      setUserInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <TopHeader />
      <div className={styles.logoBox}>
        <figure className={styles.logoImage}>
          <img src={logo} alt="turnerslogo" />
        </figure>
        <ul className={styles.infoSection}>
          <li>
            <img src={userIcon} alt="" /> LOGIN / REGISTER
          </li>
          <li>
            <img src={phoneIcon} alt="" /> 0800 887 637
          </li>
          <li>
            <img src={locationIcon} alt="" /> Find Us
          </li>
        </ul>
      </div>
      <NavBar />

      <main className={styles.background}>
        <section className={styles.pageBox}>
          <nav className={styles.breadcrumb}>
            <a href="https://www.turners.co.nz/">Home</a>
            <span>»</span>
            <a href="https://www.turners.co.nz/Cars/">Cars</a>
            <span>»</span>
            <a href="https://www.turners.co.nz/Cars/finance-insurance/">
              Finance & Insurance
            </a>
            <span>»</span>
            <a href="https://www.turners.co.nz/Cars/finance-insurance/car-insurance/">
              Car Insurance
            </a>
            <span>»</span>
            <a href="#">AI Interviewer</a>
          </nav>

          <figure>
            <img className={styles.financeImg} src={finance} alt="" />
          </figure>

          {/* Chat Box Section */}
          <div className={styles.chatBox}>
            {/* Job Title Input and Start Button */}
            <div className={styles.jobInputSection}>
              <label htmlFor="jobTitle">Enter Your Full Name:</label>
              <input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className={styles.inputField}
              />
              <button
                type="button"
                className={styles.startButton}
                onClick={() =>
                  handleSubmit({
                    preventDefault: () => {},
                    customInput: "Learn More",
                  })
                }
              >
                Learn More
              </button>
            </div>

            {/* Description */}
            <div>
              <h1>
                "Sign up to unlock your full experience. Creating an account is
                fast and secure, giving you access to personalized
                recommendations, saved progress, and seamless interaction across
                all your devices. As a registered user, you'll be able to manage
                your preferences, revisit past activity, and receive tailored
                updates that match your needs. Join our community today and take
                advantage of all the features designed to make your experience
                smarter, faster, and more convenient."
              </h1>
            </div>
            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default TurnersInterviewPage;
