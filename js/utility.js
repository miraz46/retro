const allData = async () => {
  const url = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const allNews = await url.json();
  const allNewsSection = document.getElementById("all-news-section");
  allNews.posts.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex  gap-5 p-6 bg-[#efefef] rounded-3xl mb-5">
          <div class="indicator">
              <span  class="color-change indicator-item badge badge-success badge-error"></span>
              <img  src="${element.image}" class="h-16 w-16 rounded-lg" alt="" />
            </div>
          <div>
            <p>#${element.category} Author: ${element.author.name}</p>
            <h2 class="text-xl font-bold my-3">
              ${element.title}
            </h2>
            <p class="pb-4 border-b-2 border-dashed border-[#92929b]">
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

function colorChange(colorElement, element) {
  colorElement.classList.remove("badge-success", "badge-error");

  if (element.isActive) {
    colorElement.classList.add("badge-success");
  } else {
    colorElement.classList.add("badge-error");
  }
}

function markAsRead(element) {
  console.log(element);
}
