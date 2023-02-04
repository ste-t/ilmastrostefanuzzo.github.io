const typewriter = new Typewriter("#hello-friend-text", {
    strings: [
        "Hello friend",
        "Ciao amico",
        "Bok prijatelju",
        "Привет друг",
        "Hallo Freund",
        "Hej ven",
        "Привіт друже",
        "Salut l'ami",
        "Γεια σου φίλε",
        "Hola amigo",
        !Math.random() ? "Сәләм дуҫ" : "Salut prietene",
    ],
    cursor: "_",
    cursorClassName: "typewriter-cursor", // Give it a nice name and remove the default CSS
    autoStart: true,
    loop: true,
    delay: 80,
    pauseFor: 750,
});
