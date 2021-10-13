const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Copy the slug to the clipboard:
function pbcopy(data) {
    const proc = require("child_process").spawn('pbcopy');
    proc.stdin.write(data);
    proc.stdin.end();
}

rl.question("Slug:", function(slug){
    let words = slug.split("-");
    let newSlug = words.join(" ").toLowerCase();
    newSlug = newSlug.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    pbcopy(newSlug);
    rl.close();
})

rl.on("close", function() {
    console.log('\nNew slug in clipboard. Bye!');
    process.exit(0);
})