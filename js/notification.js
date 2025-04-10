const colors = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-black",
  info: "bg-sky-500 text-white",
};

/**
 * @param {*} type success | error | warning | info
 * @returns
 */
function createHTMLNotification(type, title, message) {
  return `<div
      class="${colors[type]} notification fixed inset-x-0 top-0 mx-auto max-w-sm md:max-w-md lg:top-3 lg:right-3 lg:left-auto lg:inset-x-auto xl:rounded-lg px-4 py-3 border shadow-lg z-50"
      style="animation: slideIn 0.5s ease forwards, fadeIn 0.5s ease forwards;"
    >
      <div class="flex items-start">
        <div class="flex-grow overflow-hidden">
          <h5 class="font-bold text-lg truncate">${title}</h5>
          <p class="mt-2 text-sm md:text-base">${message}</p>
        </div>
        <button class="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 flex-shrink-0" onclick="dismissNotification(this)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <style>
        @keyframes slideIn {
          0% { transform: translateY(-100%); }
          70% { transform: translateY(10px); }
          100% { transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideOut {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        .notification-out {
          animation: slideOut 0.5s ease forwards;
        }
      </style>
    </div>`;
}

function dismissNotification(button) {
  const notification = button.closest(".notification");
  notification.classList.add("notification-out");
  setTimeout(() => {
    notification.remove();
  }, 500);
}

function showNotification(type, title, message, duration = 5000) {
  const notificationHTML = createHTMLNotification(type, title, message);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = notificationHTML;
  const notification = wrapper.firstChild;

  document.body.appendChild(notification);

  if (duration > 0) {
    setTimeout(() => {
      notification.classList.add("notification-out");
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }, duration);
  }

  return notification;
}

function showNotification(type, title, message) {
  const html = createHTMLNotification(type, title, message);
  document.body.innerHTML += html;
}
