import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import ReactMarkdown from "react-markdown";
import "./Chat.css";

const Chat = () => {

    const { id } = useParams();

    const mediaRef = useRef(null);

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [documentData, setDocumentData] = useState(null);

    useEffect(() => {

        fetchHistory();

        fetchDocument();

    }, []);

    const fetchDocument = async () => {

        try {

            const response =
                await ApiService.getAllDocuments();

            const currentDocument =
                response.data.find(
                    (doc) => doc.id === Number(id)
                );

            setDocumentData(currentDocument);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchHistory = async () => {

        try {

            const response =
                await ApiService.getChatHistory(id);

            setHistory(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleAsk = async () => {

        if (!question.trim()) return;

        try {

            setLoading(true);

            const response =
                await ApiService.chatWithDocument(
                    id,
                    question
                );

            setAnswer(response.data.answer);

            setQuestion("");

            fetchHistory();

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    const playFromTimestamp = (timestamp) => {

        if (!timestamp || !mediaRef.current) {
            return;
        }

        const parts = timestamp.split(":");

        let seconds = 0;

        if (parts.length === 3) {

            seconds =
                parseInt(parts[0]) * 3600 +
                parseInt(parts[1]) * 60 +
                parseInt(parts[2]);
        }

        mediaRef.current.currentTime = seconds;

        mediaRef.current.play();
    };

    return (

        <div className="chat-container">

            <h2 className="chat-title">
                Document Chat
            </h2>

            {
                documentData?.fileType === "VIDEO" && (

                    <video
                        ref={mediaRef}
                        controls
                        width="100%"
                        className="media-player"
                    >

                        <source
                            src={`http://localhost:8080/uploads/${documentData.fileName}`}
                            type="video/mp4"
                        />

                    </video>
                )
            }

            {
                documentData?.fileType === "AUDIO" && (

                    <audio
                        ref={mediaRef}
                        controls
                        className="media-player"
                    >

                        <source
                            src={`http://localhost:8080/uploads/${documentData.fileName}`}
                            type="audio/mpeg"
                        />

                    </audio>
                )
            }

            <div className="chat-input-section">

                <input
                    type="text"
                    placeholder="Ask something about the document..."
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                />

                <button onClick={handleAsk}>

                    {
                        loading
                            ? "Thinking..."
                            : "Ask"
                    }

                </button>

            </div>

            {
                answer && (

                    <div className="answer-box">

                        <h3>Latest Answer</h3>

                        <ReactMarkdown>
                            {answer}
                        </ReactMarkdown>

                    </div>
                )
            }

            <div className="history-section">

                <h3>Chat History</h3>

                {
                    history.length === 0 ? (

                        <p>
                            No chat history available
                        </p>

                    ) : (

                        history.map((chat, index) => (

                            <div
                                className="history-card"
                                key={index}
                            >

                                <p>
                                    <strong>
                                        Question:
                                    </strong>
                                    {" "}
                                    {chat.question}
                                </p>

                                <div className="history-answer">

                                    <ReactMarkdown>
                                        {chat.answer}
                                    </ReactMarkdown>

                                </div>

                                {
                                    chat.timestampReference && (

                                        <div
                                            className="timestamp-section"
                                        >

                                            <p>

                                                <strong>
                                                    Timestamp:
                                                </strong>

                                                {" "}

                                                {
                                                    chat.timestampReference
                                                }

                                            </p>

                                            <button
                                                onClick={() =>
                                                    playFromTimestamp(
                                                        chat.timestampReference
                                                    )
                                                }
                                            >

                                                Play From Timestamp

                                            </button>

                                        </div>
                                    )
                                }

                            </div>
                        ))
                    )
                }

            </div>

        </div>
    );
};

export default Chat;