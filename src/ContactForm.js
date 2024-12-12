import './ContactForm.css';

export default function ContactForm(){
    
    const validate = () => {
    //get user input
    const feedbackBox = document.getElementById("feedbackpanel");
    let namebox = document.getElementById("namebox").value; 
    namebox = namebox.charAt(0).toUpperCase() + namebox.slice(1);
    const emailbox = document.getElementById("emailbox").value;
    const msgbox = document.getElementById("msgbox").value;
    //reset
    feedbackBox.innerText = "";

    //console.log(namebox, typeof(namebox));
    //console.log(emailbox, typeof(emailbox));
    //console.log(msgbox, typeof(msgbox));

    //validation
    const nameRegex = /^[a-z]{2,}$/i;
    const emailRegex = /^[\w.+=!#$%^&*'_-]+[@][\w-]+[.][a-z]{3,4}$/i;
    if(!nameRegex.test(namebox)){
        feedbackBox.innerText += "Name must be at least 2 letters long.\n";
    }
    if (!emailRegex.test(emailbox)){
        feedbackBox.innerText += "Invalid email format.\n";
    }
    if (msgbox.length < 5){
        feedbackBox.innerText += "Please make sure you include all the info in the message.";
    }
    if(feedbackBox.innerText.length === 0){ //passed validation
        //record client name & display thanks msg
        const thankYouBox = document.getElementById("thankyoubox");
        thankYouBox.innerText=`Thank you, ${namebox}!  Your message is sent.`;
        //close form
        const contactform = document.getElementById("contactform");
        contactform.replaceChildren("");
        contactform.style.height = "0";
        contactform.style.padding = "0";
    }
    }

    const handleSubmit =(event) => {
        //console.log(event);
        event.preventDefault();
        validate();
        return 0;
    }


    return(
        <>
        <form id="contactform" onSubmit={(e)=>{handleSubmit(e)}}>
            <h3>Contact Me</h3>
            <label for="namebox">Full Name:</label>
            <input type="text" id="namebox" placeholder="Joe Smith" required />
            <label for="emailbox">Email:</label>
            <input type="email" id="emailbox" placeholder="example@email.com" required />
            <label for="msgbox">Message:</label>
            <textarea id="msgbox" placeholder="Hello..." required></textarea>
            <p id="feedbackpanel"></p>
            <button type="submit" id="submitbtn">Send</button>
        </form>
        <p id="thankyoubox"></p>
        
        </>
    )
}