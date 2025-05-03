import { getOrderHistoryByEmail } from "./order.entity.js";

// Render order history for current user
async function renderOrderHistoryForUser() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  const historyList = await getOrderHistoryByEmail(currentUser);
  const tableBody = document.getElementById("history-table");

  // Clear existing rows
  tableBody.innerHTML = "";

  historyList.forEach((order) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${new Date(order.created_at).toLocaleString()}</td>
      <td>${order.order_id}</td>
      <td>${order.qty}</td>
      <td>${order.total}</td>
      <td>SP${Math.floor(Math.random() * 10000)}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Format number as VND currency
function formatVND(amount) {
  if (isNaN(amount)) return "0 ₫";
  return Number(amount).toLocaleString("vi-VN") + " ₫";
}

// Init
renderOrderHistoryForUser();
