import axios from "axios";

export default class ApiService {

    static BASE_URL = "http://13.206.241.248:8080";

    static getHeader() {

        const token = localStorage.getItem("token");

        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
    }

    static async registerUser(registrationData) {

        const response = await axios.post(
            `${this.BASE_URL}/auth/register`,
            registrationData
        );

        return response.data;
    }

    static async loginUser(loginDetails) {

        const response = await axios.post(
            `${this.BASE_URL}/auth/login`,
            loginDetails
        );

        return response.data;
    }

    static async uploadDocument(formData) {

        const response = await axios.post(
            `${this.BASE_URL}/api/documents/upload`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    }

    static async getAllDocuments() {

        const response = await axios.get(
            `${this.BASE_URL}/api/documents`,
            {
                headers: this.getHeader(),
            }
        );

        return response.data;
    }

    static async summarizeDocument(documentId) {

        const response = await axios.get(
            `${this.BASE_URL}/api/documents/${documentId}/summarize`,
            {
                headers: this.getHeader(),
            }
        );

        return response.data;
    }

    static async chatWithDocument(documentId, question) {

        const response = await axios.post(
            `${this.BASE_URL}/api/documents/${documentId}/chat`,
            { question },
            {
                headers: this.getHeader(),
            }
        );

        return response.data;
    }

    static async getChatHistory(documentId) {

        const response = await axios.get(
            `${this.BASE_URL}/api/documents/${documentId}/history`,
            {
                headers: this.getHeader(),
            }
        );

        return response.data;
    }

    static logout() {
        localStorage.removeItem("token");
    }

    static isAuthenticated() {
        return !!localStorage.getItem("token");
    }
}