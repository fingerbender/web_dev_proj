import React, { useState } from 'react';
import "./ContactForm.css";

interface FormValues {
    name: string;
    email: string;
    message: string;
}

//type: React.FC = React Functional Component.
// syntax: const FuncName: React.FuncType = (props: type) = {}
const ContactForm: React.FC = () => {
    //init state with interface type
    const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' });

    //init state for textboxes in HTML elements
    const [feedback, setFeedback] = useState({ nameError: "", emailError: "", msgError: "" });
    const [thankyou, setThankyou] = useState("");

    // Track form submission
    const [formSubmitted, setFormSubmitted] = useState(false);

    //for input boxes only
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    //for textarea only
    const handleChangeTA = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const validate = () => {
        //get user input
        //const feedbackBox = document.getElementById("feedbackpanel") as HTMLDivElement;
        let namebox = values.name;
        namebox = namebox.charAt(0).toUpperCase() + namebox.slice(1);
        const emailbox = values.email;
        const msgbox = values.message;

        // Reset errors and thank you message
        let feedbackMsg = { nameError: "", emailError: "", msgError: "" };
        let thankyouMsg = "";

        //console.log(namebox, typeof(namebox));
        //console.log(emailbox, typeof(emailbox));
        //console.log(msgbox, typeof(msgbox));

        //validation
        const nameRegex = /^[a-z]{2,}$/i;
        const emailRegex = /^[\w.+=!#$%^&*'_-]+[@][\w-]+[.][a-z]{3,4}$/i;
        if (!nameRegex.test(namebox)) {
            feedbackMsg.nameError = `Name must be at least 2 letters long. `;
        }
        if (!emailRegex.test(emailbox)) {
            feedbackMsg.emailError = `Invalid email format. 
             `;
        }
        if (msgbox.length < 5) {
            feedbackMsg.msgError = `Please make sure you include all the info in the message.`;
        }
        setFeedback(feedbackMsg);
        console.log("msg", feedbackMsg);
        console.log("state", feedback);

        if ((feedbackMsg.nameError.length + feedbackMsg.emailError.length + feedbackMsg.msgError.length) === 0) {
            //passed validation
            //record client name & display thanks msg
            //const thankYouBox = document.getElementById("thankyoubox") as HTMLDivElement;
            thankyouMsg = `Thank you, ${namebox}!  Your message is sent.`;
            setThankyou(thankyouMsg);

            // Set formSubmitted to true to hide the form
            setFormSubmitted(true);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validate();
        console.log(values);
    };

    return (
        <>
            {!formSubmitted && (  // Only show the form if formSubmitted is false
                <form onSubmit={handleSubmit} id="contactform">
                    <h3>Contact Me</h3>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ color: 'red' }}>{feedback.nameError}</div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ color: 'red' }}>{feedback.emailError}</div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={values.message}
                            onChange={handleChangeTA}
                        />
                    </div>
                    <div style={{ color: 'red' }}>{feedback.msgError}</div>
                    <button type="submit">Send</button>
                </form>
            )}
            <div id="thankyoubox" style={{ color: 'yellowgreen' }}>{thankyou}</div>

        </>
    );
};

export default ContactForm;