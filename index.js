/*
var lastScrollTop = pageYOffset || scrollTop;

// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
document.addEventListener(
    "scroll",
    function () {
        // or window.addEventListener("scroll"....
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop) {
            // downscroll code
            console.log("DOWN");
        } else {
            // upscroll code
            console.log("UP");
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    },
    false
);*/

// Check if an element is inside the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
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
        let no_anim = ""; // (Optional) do not animate this part, just print it out
        if (target.getAttribute("data-no-anim")) {
            // Check if a data-no-anim has been specified for this element and assign the value to no_anim
            no_anim = target.getAttribute("data-no-anim");
        }
        let current = no_anim; // Current animation status

        let anim_id = setInterval(frame, this.speed); // Repeat animation frames

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
        typewriter_spawn("whoami", 60);
    }
    if (isInViewport(document.getElementById("introduction"))) {
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
