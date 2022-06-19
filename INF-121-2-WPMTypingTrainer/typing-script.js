const paragraphs = [
    "Typing is a good way to pass the time. Sometimes we can sitch it up by speaking while we're typing. I ordered a steak the waiter said how would you like it cooked? I replied well done. To witch the waiter replied thank you. Slowing watching as the drip drip drip of rain from the tin roof I stood under. Eagerly awaiting my next moment of clarity. I once took a stroll through the deep dark. When I came out the other side I realised that I forgot my wallet. Maybe I should have remembered to bring it. Maybe I should have just brought cash. I never knew when I would next need to eat anything. Last time I looked for a coin in those woods. I later found that the coin was in fact chocolate. The flies should have gave it away. I tried to use it to buy tacos from a truck outside of the forest. I was mistaken as he stated he only accepted chocolate coins yesterday. Too little too late I'm afraid. No tacos and no wallet. But the vendor was nicely dressed and I assumed he had made quite a name for himself. ",
    "Once upon a time there were three little pigs, they were the type of guys who liked to roam around. They went everyplace and roamed from town to town. It was once thought that they would soon meet their fate. This was a surprising turn of events. For In West Philadelphia born and raised, On the playground was where I spent most of my days Chillin' out, maxin', relaxin', all cool And all shootin' some b-ball outside of the school When a couple of guys who were up to no good Started making trouble in my neighborhood I got in one little fight and my mom got scared She said, You're movin' with your auntie and uncle in Bel-Air I whistled for a cab and when it came near, the license plate said fresh and it had dice in the mirror, if anything i could that this cab was rare but I thought nah, forget it, yo holmes to Bel Air."

];
const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");
let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;
function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}
function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}
function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}
function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}
loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
