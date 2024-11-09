const allData = async (inputValue) => {
  const url = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputValue}`
  );
  const allNews = await url.json();
  const allNewsSection = document.getElementById("all-news-section");
  allNews.posts.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex  gap-5 p-6 bg-[#efefef] rounded-3xl mb-5 ">
          <div class="indicator">
              <span  class="color-change indicator-item badge badge-success badge-error"></span>
              <img  src="${element.image}" class="h-16 w-16 rounded-lg" alt="" />
            </div>
          <div>
            <p>#${element.category} Author: ${element.author.name}</p>
            <h2 class="text-xl font-bold my-3">
              ${element.title}
            </h2>
            <p class="pb-4 border-b-2 border-dashed border-[#92929b] ">
              ${element.description}
            </p>
            <div class="flex justify-between my-5">
              <div class="flex gap-6">
                <div class="flex gap-2">
                  <img src="./images/msg.png" class="w-fit" alt="" />
                  <p>${element.comment_count}</p>
                </div>
                <div class="flex gap-2">
                  <img src="./images/eye.png" alt="" />
                  <p>${element.view_count}</p>
                </div>
                <div class="flex gap-2">
                  <img src="./images/Watch.png" alt="" />
                  <p>5min</p>
                </div>
              </div>
              <div class="mark-read-btn">
                <img src="./images/mail.png" style="cursor: pointer" alt="" />
              </div>
            </div>
          </div>
        </div>
        `;
    allNewsSection.appendChild(div);
    const badgeElement = div.querySelector(".color-change");
    colorChange(badgeElement, element);
    const markReadButton = div.querySelector(".mark-read-btn");
    markReadButton.onclick = () => markAsRead(element);
  });
};
allData();

function getNewsTopic() {
  const getInput = document.getElementById("news-category");
  const inputValue = getInput.value.toLowerCase();
  console.log(inputValue);
  if (inputValue === "coding" || "music" || "comedy") {
    allData(inputValue);
  } else {
    allData((inputValue = ""));
  }
}

const latestData = async () => {
  const url = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const latestNews = await url.json();
  const latestPostCards = document.getElementById("latest-posts-cards");
  latestNews.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-xl h-full">
          <figure class="px-10 pt-10">
            <img
              src="${news.cover_image}"
              alt="Shoes"
              class="rounded-xl"
            />
          </figure>
          <div class="card-body items-start text-left">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-calendar-days text-[#63636a]"></i>
              <p class="text-left text-[#63636a]">${
                news.author.posted_date || "No publish date"
              }</p>
            </div>
            <h2 class="card-title font-extrabold">
              ${news.title}
            </h2>
            <p class="my-2 text-[#63636a]">
            ${news.description}
            </p>
            <div class="flex gap-2">
              <img src="${
                news.profile_image
              }" class="h-full w-11 rounded-full" alt="" />
              <div>
                <h2 class="font-bold">${news.author.name}</h2>
                <p class="text-[#63636a]">${
                  news.author.designation || "Unknown"
                }</p>
              </div>
            </div>
          </div>
        </div>
    `;
    latestPostCards.appendChild(div);
  });
};
latestData();

function colorChange(colorElement, element) {
  colorElement.classList.remove("badge-success", "badge-error");

  if (element.isActive) {
    colorElement.classList.add("badge-success");
  } else {
    colorElement.classList.add("badge-error");
  }
}

let count = 0;
function markAsRead(element) {
  const markAsReadSection = document.getElementById("mark-as-read-section");
  const markAsReadCount = document.getElementById("mark-as-read-count");
  count++;
  console.log(count);
  markAsReadCount.innerText = count;
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="flex justify-between my-5 bg-[#ffffff] p-5 rounded-3xl">
              <p>${element.title}</p>
              <div class="flex gap-3">
                <img src="./images/eye.png" alt="" />
                <p>${element.view_count}</p>
              </div>
            </div>
  `;
  markAsReadSection.appendChild(div);
}
