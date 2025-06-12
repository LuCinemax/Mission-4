import { useState } from "react";
import Header from "../components/Header";
import Separator from "../components/Separator";
import Footer from "../components/Footer";
import styles from "./GeminiInterviewerBot.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const GeminiInterviewerBot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionId] = useState(() => Date.now().toString());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.customInput || userInput;
    if (!input.trim()) return;

    const updatedHistory = [
      ...chatHistory,
      { role: "user", text: input },
    ];

    try {
      const response = await axios.post("http://localhost:3001/interview", {
        history: updatedHistory,
      });

      setChatHistory([
        ...updatedHistory,
        { role: "model", text: response.data.text },
      ]);
      setUserInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />

      <figure className={styles.bannerImage}>
        <div className={styles.bannerTextContainer}>
          <h1>Insurance Consultant AI</h1>
          <p>Powered By Gemini</p>
        </div>
      </figure>

      <figure className={styles.separatorContainer}>
        <Separator />
      </figure>

      <p className={styles.versionLabel}>v1.5-Flash – Gemini Model Standard</p>

      <main className={styles.infoContainer}>
        <div className={styles.chatBox}>
          <div className={styles.chatHistory}>
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? styles.userMsg : styles.botMsg}
              >
                <strong>{msg.role === "user" ? "Me:" : "Tina:"}</strong>{" "}
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={styles.inputSection}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className={styles.inputExpand}
              placeholder="Type your response..."
            />
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </main>

      <div className={styles.bottomButton}>
        <Link to="/TurnersInterviewPage" className={styles.navButton}>
          Connect to Turners
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default GeminiInterviewerBot;
