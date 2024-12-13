"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./ContactForm.css");
//type: React.FC = React Functional Component.
// syntax: const FuncName: React.FuncType = (props: type) = {}
const ContactForm = () => {
    //init state with interface type
    const [values, setValues] = (0, react_1.useState)({ name: '', email: '', message: '' });
    //init state for textboxes in HTML elements
    const [feedback, setFeedback] = (0, react_1.useState)({ nameError: "", emailError: "", msgError: "" });
    const [thankyou, setThankyou] = (0, react_1.useState)("");
    // Track form submission
    const [formSubmitted, setFormSubmitted] = (0, react_1.useState)(false);
    //for input boxes only
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(Object.assign(Object.assign({}, values), { [name]: value }));
    };
    //for textarea only
    const handleChangeTA = (event) => {
        const { name, value } = event.target;
        setValues(Object.assign(Object.assign({}, values), { [name]: value }));
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
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        validate();
        console.log(values);
    };
    return (<>
            {!formSubmitted && ( // Only show the form if formSubmitted is false
        <form onSubmit={handleSubmit} id="contactform">
                    <h3>Contact Me</h3>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={values.name} onChange={handleChange}/>
                    </div>
                    <div style={{ color: 'red' }}>{feedback.nameError}</div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={values.email} onChange={handleChange}/>
                    </div>
                    <div style={{ color: 'red' }}>{feedback.emailError}</div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" value={values.message} onChange={handleChangeTA}/>
                    </div>
                    <div style={{ color: 'red' }}>{feedback.msgError}</div>
                    <button type="submit">Send</button>
                </form>)}
            <div id="thankyoubox" style={{ color: 'yellowgreen' }}>{thankyou}</div>

        </>);
};
exports.default = ContactForm;
