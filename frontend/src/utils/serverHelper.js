import { URL } from "./config";

const parseResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    }
    const text = await response.text();
    return { success: false, message: text || 'Server error' };
};

export const makeUnauthPostReq = async (route, body) => {
    const response = await fetch(URL + route, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return parseResponse(response);
};

export const makeAuthPostReq = async (route, body) => {
    const token = localStorage.getItem("docToken");
    const response = await fetch(URL + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    return parseResponse(response);
};

export const makeAuthGetReq = async (route) => {
    const response = await fetch(URL + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("docToken")}`,
        },
    });
    return parseResponse(response);
};

export const makeUnAuthGetReq = async (route) => {
    const response = await fetch(URL + route, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    return parseResponse(response);
};
