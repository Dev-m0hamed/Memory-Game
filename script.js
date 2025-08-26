let rightTries = document.querySelector(".right-tries");
let wrongTries = document.querySelector(".wrong-tries");
let blocksContainer = document.querySelector(".memory-game-blocks");
// Create array from game blocks
let blocks = Array.from(blocksContainer.children);
// Create range of keys
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
// Add order css property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  // Add click event
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let flippedBlocks = blocks.filter((block) =>
    block.classList.contains("is-flipped")
  );
  if (flippedBlocks.length === 2) {
    checkBlocks(flippedBlocks[0], flippedBlocks[1]);
  }
}

function checkBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.name === secondBlock.dataset.name) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    rightTries.innerHTML = parseInt(rightTries.innerHTML) + 1;
    document.getElementById("success").play();
  } else {
    wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;
    document.getElementById("failed").play();
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, 500);
  }
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

blocks.forEach((block) => block.classList.add("is-flipped"));
setTimeout(() => {
  blocks.forEach((block) => block.classList.remove("is-flipped"));
}, 1500);
