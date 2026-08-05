const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = input.value.trim();

    if (title === "") {
        alert("할 일을 입력해 주세요.");
        return;
    }

    if (title.length > 30) {
        alert("할 일은 30자 이내로 입력해 주세요.");
        return;
    }

    console.log("입력한 할 일:", title);
    console.log(title.length);

    input.value = "";
    input.focus();
});