document.addEventListener("DOMContentLoaded", function () {
  let chatbox = document.getElementById("chatbox");
  let openChatbot = document.getElementById("openChatbot");
  let closeChatbot = document.getElementById("closeChatbot");
  let chatBody = document.querySelector(".chat-body");
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let phoneInput = document.getElementById("phone");
  let genderInput = document.getElementById("gender");
  let startChatBtn = document.getElementById("startChat");

  // Kiểm tra nếu đã có thông tin trước đó
  if (localStorage.getItem("userInfo")) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    nameInput.value = userInfo.name || "";
    emailInput.value = userInfo.email || "";
    phoneInput.value = userInfo.phone || "";
    genderInput.value = userInfo.gender || "";
  }

  // Mở chatbot khi bấm nút
  openChatbot.addEventListener("click", function () {
    chatbox.style.display = "block";
    chatbox.width = "350px";
    chatbox.height = "500px";
    openChatbot.style.display = "none";
  });

  // Đóng chatbot khi bấm nút X
  closeChatbot.addEventListener("click", function () {
    chatbox.style.display = "none";
    chatbox.width = "0";
    chatbox.height = "0";
    openChatbot.style.display = "block";
  });

  // Hàm thêm tin nhắn vào chat
  function addMessage(sender, message) {
    let msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.innerHTML = `<p>${message}</p>`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Tự động cuộn xuống
  }

  // Khi nhấn "Bắt đầu trò chuyện"
  startChatBtn.addEventListener("click", function () {
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = phoneInput.value.trim();
    let gender = genderInput.value;

    if (name === "" || phone === "") {
      alert("Vui lòng nhập tên và số điện thoại!");
      return;
    }

    // Lưu thông tin vào LocalStorage
    let userInfo = { name, email, phone, gender };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Gửi tin nhắn chào mừng
    addMessage("user", `Xin chào, tôi là ${name}!`);
    setTimeout(() => {
      addMessage("bot", "Xin chào! Tôi có thể giúp gì cho bạn?");
    }, 1000);
  });
});
