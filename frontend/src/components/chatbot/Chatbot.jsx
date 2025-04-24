import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import style from './Chatbot.module.css';

export function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            const response = await axios.post('http://localhost:8000/api/chat', {
                messages: messages,
                new_message: input
            });

            setMessages(prev => [...prev, 
                { role: 'assistant', content: response.data.response }
            ]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, 
                { role: 'assistant', content: "Sorry, I encountered an error." }
            ]);
        }
    };

    return (
        <div className={style.chatContainer}>
            <div className={style.messages}>
                {messages.length === 0 ? (
                    <div className={style.welcomeMessage}>
                        Hello! How can I help you today?
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`${style.message} ${msg.role === 'user' ? style.user : style.assistant}`}>
                            <div className={style.content}>{msg.content}</div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <div className={style.inputArea}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}