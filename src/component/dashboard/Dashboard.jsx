import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import ReactMarkdown from "react-markdown";
import "./Dashboard.css";

const Dashboard = () => {

    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetchDocuments();

    }, []);

    const fetchDocuments = async () => {

        try {

            const response = await ApiService.getAllDocuments();

            setDocuments(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleUpload = async () => {

        if (!file) {

            setMessage("Please select a file");

            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("file", file);

            const response = await ApiService.uploadDocument(formData);

            setMessage(response.message);

            fetchDocuments();

            setFile(null);

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Upload failed"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleLogout = () => {

        ApiService.logout();

        navigate("/login");
    };

    return (

        <div className="dashboard-page">

            <div className="background-glow"></div>

            <div className="dashboard-container">

                {/* HEADER */}

                <div className="dashboard-header">

                    <div className="header-content">

                        <div>

                            <h1>PanScience AI</h1>

                            <p>
                                Intelligent Document & Multimedia
                                Analysis Platform
                            </p>

                        </div>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

                {/* UPLOAD SECTION */}

                <div className="upload-section">

                    <div className="upload-left">

                        <h3>Upload Your Content</h3>

                        <p>
                            Upload PDFs, Audio, Video &
                            Multimedia Files
                        </p>

                    </div>

                    <div className="upload-right">

                        <input
                            type="file"
                            accept=".pdf,.mp3,.wav,.mp4,.mpeg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />

                        <button onClick={handleUpload}>

                            {
                                loading
                                    ? "Uploading..."
                                    : "Upload File"
                            }

                        </button>

                    </div>

                </div>

                {/* MESSAGE */}

                {
                    message && (

                        <p className="message-text">

                            {message}

                        </p>
                    )
                }

                {/* DOCUMENT LIST */}

                <div className="document-list">

                    {
                        documents.length === 0 ? (

                            <div className="empty-state">

                                <h3>
                                    No Content Uploaded Yet
                                </h3>

                                <p>
                                    Upload documents, audio,
                                    or video to begin
                                    AI-powered analysis.
                                </p>

                            </div>

                        ) : (

                            documents.map((doc) => (

                                <div
                                    className="document-card"
                                    key={doc.id}
                                >

                                    <h3>
                                        {doc.originalFilename}
                                    </h3>

                                    <p>
                                        <strong>Type:</strong>
                                        {" "}
                                        {doc.fileType}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>
                                        {" "}
                                        {doc.transcriptionStatus}
                                    </p>

                                    {
                                        doc.fileType === "VIDEO" && (

                                            <video
                                                controls
                                                controlsList="nodownload"
                                                className="media-player"
                                                preload="metadata"
                                            >

                                                <source
                                                    src={`http://localhost:8080/uploads/${doc.fileName}`}
                                                    type="video/mp4"
                                                />

                                                Your browser does not support video.

                                            </video>
                                        )
                                    }

                                    {
                                        doc.fileType === "AUDIO" && (

                                            <audio
                                                controls
                                                className="media-player"
                                            >

                                                <source
                                                    src={`http://localhost:8080/uploads/${doc.fileName}`}
                                                    type="audio/mpeg"
                                                />

                                                Your browser does not support audio.

                                            </audio>
                                        )
                                    }

                                    {
                                        doc.extractedText && (
                                            <div className="transcript-box">

                                                <h4>Extracted Transcript</h4>

                                                <div className="transcript-content">

                                                    {doc.extractedText}

                                                </div>

                                            </div>
                                        )
                                    }

                                    <div className="summary-box">

                                        <h4>Summary</h4>

                                        <ReactMarkdown>

                                            {
                                                doc.summary ||
                                                "Summary not available"
                                            }

                                        </ReactMarkdown>

                                    </div>

                                    <button
                                        className="chat-btn"
                                        onClick={() => navigate(`/chat/${doc.id}`)}
                                    >

                                        Open AI Chat

                                    </button>

                                </div>
                            ))
                        )
                    }

                </div>

            </div>

        </div>
    );
};

export default Dashboard;