// im keeping the code so that anyone can understand it, normally i would do more "personal preference" things like one-liners
var story = document.querySelector("#story"); // or document.getElementById("story"), but i just prefer this :P
var optionA = document.querySelector("#optionA");
var optionB = document.querySelector("#optionB");
var optionC = document.querySelector("#optionC");
var choices = {
    story: "You are gay.",
    A: ["Tell your parents", {
        story: "You told your parents and they became mad. You don't know why, though...",
        A: ["Ignore them", {
            story: "Your dad grabbed a gun and shot you. You died.",
            A: ["Retry", "-"] // a dash counts as setting `choices` as the next path, so it loops back to the beginning
            // omitting the other options will hide them
        }],
        B: ["Run to your room", {
            story: "You run to your room. You're safe... for now...",
            A: ["I don't want to deal with this anymore", "-ACB"] // reuse the suicide path
        }],
        C: ["Plan a murder", {
            story: "Who will you plan a murder on?",
            A: ["My parents", "-AA"], // reuse other parts of the story
            B: ["Myself", checkIfPlanningMurder] // run the function to check whether its a redirect or not
            // again, omitting C will cause it to be hidden
        }]
    }], // ok lemme code already
    B: ["Stay in the closet", {
        story: "Nothing happens. You live a happy life! :D",
        A: ["Yay!", "-"]
    }],
    C: ["Ungay yourself (???)", {
        story: "You decided you didn't want to be gay anymore. A few years later, you dated a few women. You liked a boy in university but you didn't want to be gay anymore, so you graduated without him. Now you're depressed.",
        A: ["I JUST NEED TO FINISH THIS STORY", "-"]
    }]
};
var currentPath = choices;
var path = [];

optionA.onclick = () => {
    path.push("A");
    // if the path is a string, redirect to another part of the story
    // if the path is a function, run it to decide what to do or store a variable
    var f = typeof currentPath.A[1] == "function" ? currentPath.A[1]() : currentPath.A[1];
    currentPath = typeof f == "string" ? setAs(f) : f;
    renderStory();
};
optionB.onclick = () => {
    path.push("B");
    var f = typeof currentPath.B[1] == "function" ? currentPath.B[1]() : currentPath.B[1];
    currentPath = typeof f == "string" ? setAs(f) : f;
    renderStory();
};
optionC.onclick = () => {
    path.push("C");
    var f = typeof currentPath.C[1] == "function" ? currentPath.C[1]() : currentPath.C[1];
    currentPath = typeof f == "string" ? setAs(f) : f;
    renderStory();
};

function checkIfPlanningMurder() {
    // path[1] means the second option taken since the start, meaning in this case if its C then the player chose "Plan a murder" and is in the room with the parents, while else the player is in their own room cuz they ran there
    return path[1] != "C" ? {
        story: "You jump out a nearby window and fall to your death.",
        A: ["Retry", "-"] // again, it loops back to the beginning
    } : {
        story: "You grab your dads gun and die.",
        A: ["Retry", "-"]
    };
}

function renderStory() {
    story.innerText = currentPath.story;
    optionA.style.display = "inline-block";
    optionB.style.display = "inline-block";
    optionC.style.display = "inline-block";
    if (currentPath.A) optionA.innerText = currentPath.A[0];
    else optionA.style.display = "none"; // hide if theres no option for it
    if (currentPath.B) optionB.innerText = currentPath.B[0];
    else optionB.style.display = "none";
    if (currentPath.C) optionC.innerText = currentPath.C[0];
    else optionC.style.display = "none";
}

// redirect to a certain path
function setAs(str) {
    // if its going back to the root then its basically retrying and the path should be cleared
    if (str.length == 1) path = [];
    // and after that provide the redirected path
    var f = choices;
    for (var i = 1; i < str.length; i++) {
        f = f[str[i]][1];
        if (typeof f == "function") f = f();
    }
    return f;
}

/*
//button IDs show the next path if the user clicks on that button
// this gonna get messey :p

const pathA = document.getElementById("pathA");
const pathB = document.getElementById("pathB");
const pathC = document.getElementById("pathC");
const textBox = document.getElementById("storyTextBox")
;
//first story text
textBox.textContent = "haha";

pathA.addEventListener("click" , ()=> {
  textBox.textContent = "Story path A";
  pathA.id = "pathAA";
  pathB.id = "pathAB";
  pathC.id = "pathAC";
  const pathAA = document.getElementById("pathAA");
  const pathAB = document.getElementById("pathAB");
  const pathAC = document.getElementById("pathAC");
  

});

pathB.addEventListener("click" , ()=> {
  textBox.textContent = "Story path B";
  pathA.id = "pathAA";
  pathB.id = "pathAB";
  pathC.id = "Null-button";

});

pathC.addEventListener("click" , ()=> {
  textBox.textContent = "Story path C";
  pathA.id = "pathAA";
  pathB.id = "pathAB";
  pathC.id = "pathAC";
});


//what the fuck
*/