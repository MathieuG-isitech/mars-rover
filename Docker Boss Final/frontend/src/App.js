import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3001/messages");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="App">
      <h1>Messages</h1>
      
      <div className="messages-list">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="message">
              <p className="message-content">{message.content}</p>
              <p className="message-date">
                {new Date(message.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>Aucun message à afficher</p>
        )}
      </div>
    </div>
  );
}

export default App;
