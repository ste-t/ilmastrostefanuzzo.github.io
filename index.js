// Check if an element is inside the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight / 2 ||
                document.documentElement.clientHeight / 2) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

class Typewriter {
    constructor(element, speed) {
        this.element = element;
        this.speed = speed;

        console.log("Animation");

        this.typewriter(this.element, this.speed);
    }

    typewriter() {
        let target = this.element;
        let no_anim = target.hasAttribute("data-no-anim")
            ? target.getAttribute("data-no-anim")
            : ""; // Do not animate the content of data-no-anim
        let result = target.innerHTML
            .replace(/\s+/g, " ")
            .trim()
            .replace(/&lt; /, "< "); // Animate what is in the innerHTML
        console.log(result);
        target.innerHTML = "";
        let current = no_anim; // Current animation status

        let anim_id = setInterval(frame, this.speed); // Repeat animation frames

        target.classList.remove("hidden");

        // Where the animation magic happens
        function frame() {
            if (current.length - no_anim.length == result.length) {
                // * Stop loop if the animation ended
                clearInterval(anim_id);
                console.log("End Animation");
            } else {
                current += result[current.length - no_anim.length]; // Add letter

                // * Update HTML content and blink cursor
                if (
                    current.length % 2 == 0 ||
                    current.length - no_anim.length == result.length
                ) {
                    target.innerHTML = current + "_"; // cursor
                } else {
                    target.innerHTML = current; // no cusor
                }
            }
        }
        typewriter_played.push(this.element);
    }
}

var typewriter_played = new Array(); // Already played animations go here so they won't be played again
var animations = new Array();
// * Istantiate a Typewriter object, putting it inside the animations array and delete ended animation objects from the array
function typewriter_spawn(element, speed) {
    if (typewriter_played.includes(element)) {
        // Don't start animation if it has already run
        return;
    }
    animations.push(new Typewriter(element, speed)); // Istantiate animation object
    animations.splice(animations.indexOf(element)); // Delete animation object
}

function handle_scroll_animation() {
    // * Insert actions here
    if (isInViewport(document.getElementById("whoami"))) {
        typewriter_spawn(document.getElementById("whoami"), 140);
        typewriter_spawn(document.getElementById("introduction"), 12);
        document.getElementById("cards").classList.add("appear");
        // document.getElementById("scroll_down2").classList.add("appear");
    }

    if (isInViewport(document.getElementById("projects"))) {
        typewriter_spawn(document.getElementById("projects"), 80);
        typewriter_spawn(document.getElementById("projects_uncompleted"), 50);
        setTimeout(() => {
            document
                .getElementById("projects_uncompleted1")
                .classList.remove("hidden");
            setTimeout(() => {
                document
                    .getElementById("uncompleted_comments")
                    .classList.remove("hidden");
                document.getElementById("cards1").classList.add("appear");
            }, 690);
        }, 1950);
    }
}

// Scroll to the top of the page on reload
window.onbeforeunload = () => window.scrollTo(0, 0);

// * Enable scrolling after the hello_friend typewriter animation
setTimeout(() => {
    document.getElementById("scroll_down").classList.add("appear");
    document.body.setAttribute("scroll", "yes");
    document.body.setAttribute("style", "overflow: initial");
}, 1100);

// The first animation
typewriter_spawn(document.getElementById("hello_friend"), 60);

// Check if the user is scrolling
document.addEventListener("scroll", handle_scroll_animation, {
    passive: true,
});
