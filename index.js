// Check if an element is inside the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        // 4 : 100 = X : a
        // X = a * 4 / 100
        rect.bottom <=
            (window.innerHeight / 2 ||
                document.documentElement.clientHeight / 2) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

class Typewriter {
    constructor(id, speed) {
        this.id = id;
        this.speed = speed;

        console.log("Animation");

        this.typewriter(this.id, this.speed);
    }

    typewriter() {
        let target = document.getElementById(this.id);
        let result = target.getAttribute("data-anim-result"); // End result, fetched from the data-anim-result HTML attribute
        let no_anim = target.innerHTML == "&nbsp;" ? "" : target.innerHTML; // Do not animate whatever is in the innerHTML
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
        typewriter_played.push(this.id);
    }
}

var typewriter_played = new Array(); // Already played animations go here so they won't be played again
var animations = new Array();
// * Istantiate a Typewriter object, putting it inside the animations array and delete ended animation objects from the array
function typewriter_spawn(id, speed) {
    if (typewriter_played.includes(id)) {
        // Don't start animation if it has already run
        return;
    }
    animations.push(new Typewriter(id, speed)); // Istantiate animation object
    animations.splice(animations.indexOf(id)); // Delete animation object
}

function handle_scroll_animation() {
    // * Insert actions here
    if (isInViewport(document.getElementById("whoami"))) {
        typewriter_spawn("whoami", 140);
    }

    if (isInViewport(document.getElementById("whoami"))) {
        typewriter_spawn("introduction", 12);
    }
}

// Scroll to the top of the page on reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// * Enable scrolling after the hello_friend typewriter animation
setTimeout(function () {
    document.body.setAttribute("scroll", "yes");
    document.body.setAttribute("style", "overflow: initial");
}, 1100);

// The first animation
typewriter_spawn("hello_friend", 60);

// Check if the user is scrolling
document.addEventListener("scroll", handle_scroll_animation, {
    passive: true,
});
