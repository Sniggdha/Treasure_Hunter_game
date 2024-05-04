const GRIDHEIGHT = 10,
    GRIDWIDTH = 10,
    grid = document.getElementById("grid"),
    startGameButton = document.getElementById("start"),
    endGameButton = document.getElementById("end"),
    resetButton = document.getElementById("reset"),
    gameInfo = document.getElementById("gameInfo"),
    scoreCount = document.getElementById("score"),
    roundsCount = document.getElementById("rounds"),
    treasuresRemaining = document.getElementById("remainingTreasure"),
    errorMessage = document.getElementById("errorMessage"),
    userPrompt = document.getElementById("userPrompt");
let gameStage = "setup",
    treasures = [],
    obstacles = [],
    hunterPosition,
    hunterPlaced = !1,
    placingObject = !1,
    score = 0,
    rounds = 0;
function initialiseGame() {
    startGameButton.addEventListener("click", start),
    resetButton.addEventListener("click", reset),
    endGameButton.addEventListener("click", end),
    initializeGrid(),
    grid.classList.add("setup")
}
function initializeGrid() {
    grid.style.gridTemplateRows = "repeat(10, 50px)",
    grid.style.gridTemplateColumns = "repeat(10, 50px)";
    for (let e = 0; e < 100; e++) {
        var t = document.createElement("div");
        t.classList.add("cell"),
        t.addEventListener("click", cellClickHandler),
        grid.appendChild(t)
    }
}
function cellClickHandler(e) {
    let t = e.target;
    for (; t && !t.classList.contains("cell");)
        t = t.parentNode;
    e = Array.from(grid.children).indexOf(t);
    placingObject || t.classList.add("selectedCell"),
    handleCellClick(e)
}
let lastClickedCellIndex;
function handleCellClick(e) {
    var t = grid.getElementsByClassName("selectedCell");
    if (Array.from(t).forEach(e => e.classList.remove("selectedCell")), isCellOccupied(lastClickedCellIndex = e))
        showError("ALERT! This cell is already occupied.");
    else {
        t = grid.children[e];
        const n = e => {
            isValidObjectInput(e.key) ? (placeObject(lastClickedCellIndex, e.key), updateGridView(), userPrompt.textContent = "Click a gridcell to place an object.", document.removeEventListener("keypress", n), placingObject = !1) : showError("Invalid input. Enter 5, 6, 7, 8, 'o' or 'h'.")
        };
        placingObject = !0,
        userPrompt.textContent = "Enter 5,6,7,8 for treasure, 'o' for obstacle and 'h' for hunter.",
        document.addEventListener("keypress", n),
        t.classList.add("selectedCell")
    }
}
function isCellOccupied(t) {
    return treasures.some(e => e.position === t) || obstacles.includes(t) || hunterPosition === t
}
function showError(e) {
    errorMessage.textContent = e,
    setTimeout(removeErrorMessage, 3e3)
}
function removeErrorMessage() {
    errorMessage.textContent = ""
}
function isValidObjectInput(e) {
    return ["5", "6", "7", "8", "o", "h"].includes(e)
}
function placeObject(e, t) {
    if ("h" === t) {
        if (hunterPlaced)
            return void showError("Hunter is already placed on the grid.");
        hunterPosition = e,
        hunterPlaced = !0
    } else
        "o" === t ? obstacles.push(e) : treasures.push({
            position: e,
            value: parseInt(t)
        });
    updateGridView()
}
function updateGridView() {
    var e = grid.getElementsByClassName("cell");
    for (let t = 0; t < e.length; t++) {
        var n = e[t];
        n.innerHTML = "",
        treasures.some(e => e.position === t) ? n.innerHTML = '<img src="treasure.png" width="50" height="50" alt="Treasure">' : obstacles.includes(t) ? n.innerHTML = '<img src="obstacle.png" width="50" height="50" alt="Obstacle">' : hunterPosition === t && (n.innerHTML = '<img src="Hunter.png" width="50" height="50" alt="Hunter">')
    }
}
function start() {
    hunterPlaced ? (gameStage = "play", grid.classList.remove("setup"), removeCellClickListeners(), setPlayStateElements(), updateTreasureCounts(), checkEndConditions(), startGameButton.style.display = "none", resetButton.style.display = "none") : showError("Treasure hunter missing.")
}
function removeCellClickListeners() {
    var t = grid.getElementsByClassName("cell");
    for (let e = 0; e < t.length; e++)
        t[e].removeEventListener("click", cellClickHandler)
}
function setPlayStateElements() {
    gameInfo.style.display = "flex",
    gameInfo.style.justifyContent = "space-between",
    gameInfo.style.width = "390px",
    scoreCount.textContent = score,
    roundsCount.textContent = rounds,
    treasuresRemaining.style.display = "block",
    document.addEventListener("keypress", handleKeyPressForMovement),
    userPrompt.textContent = "Use 'w', 'a', 's', 'd' keys to move."
}
function indexToRowCol(e) {
    return [Math.floor(e / GRIDWIDTH), e % GRIDWIDTH]
}
function rowColToIndex(e, t) {
    return e * GRIDWIDTH + t
}
function handleKeyPressForMovement(e) {
    var e = e.key,
        [t, n] = indexToRowCol(hunterPosition);
    let r = t,
        o = n;
    switch (e) {
    case "w":
        r--;
        break;
    case "a":
        o--;
        break;
    case "s":
        r++;
        break;
    case "d":
        o++;
        break;
    default:
        return void showError("Error! Invalid key.")
    }
    isValidMove(r, o) ? (updateHunterPosition(r, o), updateGameState()) : showError("Invalid move. Try again!")
}
function isValidMove(e, t) {
    return 0 <= e && e < GRIDHEIGHT && 0 <= t && t < GRIDWIDTH && !obstacles.includes(rowColToIndex(e, t))
}
function canHunterMove() {
    var [e, t] = indexToRowCol(hunterPosition);
    return isValidMove(e - 1, t) || isValidMove(e + 1, t) || isValidMove(e, t - 1) || isValidMove(e, t + 1)
}
function updateHunterPosition(e, t) {
    e = rowColToIndex(e, t);
    hunterPosition = e,
    checkForTreasure(),
    updateGridView()
}
function checkForTreasure() {
    var e = treasures.findIndex(e => e.position === hunterPosition);
    -1 !== e && (score += treasures[e].value, treasures.splice(e, 1), addRandomObstacle(), updateTreasureCounts(), updateGridView())
}
function addRandomObstacle() {
    var e = getEmptyCells();
    0 < e.length && (e = e[Math.floor(Math.random() * e.length)], obstacles.push(e), updateGridView())
}
function getEmptyCells() {
    var t = [];
    for (let e = 0; e < GRIDHEIGHT * GRIDWIDTH; e++)
        isCellOccupied(e) || t.push(e);
    return t
}
function updateTreasureCounts() {
    const n = {
        5: 0,
        6: 0,
        7: 0,
        8: 0
    };
    treasures.forEach(e => {
        n.hasOwnProperty(e.value.toString()) && n[e.value.toString()]++
    }),
    Object.keys(n).forEach(e => {
        var t = document.getElementById("tc" + e);
        t && (t.innerHTML = e + ": " + n[e])
    })
}
function updateGameState() {
    rounds++,
    scoreCount.textContent = score,
    roundsCount.textContent = rounds,
    checkEndConditions()
}
function checkEndConditions() {
    "play" !== gameStage || 0 !== treasures.length && canHunterMove() && !isHunterSurrounded() || end()
}
function isHunterSurrounded() {
    var e,
        t,
        [n, r] = indexToRowCol(hunterPosition);
    for ([e, t] of [[n - 1, r], [n + 1, r], [n, r - 1], [n, r + 1]])
        if (isValidMove(e, t))
            return !1;
    return !0
}
function end() {
    gameStage = "end",
    document.removeEventListener("keypress", handleKeyPressForMovement),
    resetButton.style.marginBottom = "41px";
    var e = `Game Over! Your Performance Index is ${0 < rounds ? (score / rounds).toFixed(2) : 0}.`,
        t = document.createElement("button");
    t.textContent = "New Game",
    t.addEventListener("click", reset),
    displayPopup(e, t)
}
function displayPopup(e, t) {
    document.getElementById("popup-text").textContent = e,
    document.querySelector(".popup-content").appendChild(t),
    document.getElementById("popup").style.display = "block"
}
function reset() {
    location.reload()
}
document.addEventListener("DOMContentLoaded", initialiseGame);
