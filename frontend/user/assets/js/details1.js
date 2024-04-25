const details = [
  {
      "src": "img/covers/14.png",
      "textContent": {
          "resolution": "Full HD",
          "age_restriction" : "18-",
          "title": "I Dream in Another Language",
          "rate": "8.4",
          "genre": ["Action", "tân béo"],
          "runningTime": "120 min",
          "country": "USA",
          "premiere": "05.02.2023",
          "director": "Louis Leterrier",
          "actors": ["Tân peo", "Tân cá voi", "Jordana Brewster", "Tyreese Gibson", "Charlize Theron"],
          "description": [
              "When a renowned archaeologist goes missing, his daughter sets out on a perilous journey to the heart of the Amazon rainforest to find him. Along the way, she discovers a hidden city and a dangerous conspiracy that threatens the very balance of power in the world. With the help of a charming rogue, she must navigate treacherous terrain and outwit powerful enemies to save her father and uncover the secrets of the lost city. A down-on-his-luck boxer struggles to make ends meet while raising his young son. When an old friend offers him a chance to make some quick cash by fighting in an illegal underground boxing tournament, he sees it as his last shot at redemption. But as the stakes get higher and the fights get more brutal, he must confront his own demons and find the strength to win not just for himself, but for his son.",
              "A brilliant scientist discovers a way to harness the power of the ocean's currents to create a new, renewable energy source. But when her groundbreaking technology falls into the wrong hands, she must race against time to stop it from being used for evil. Along the way, she must navigate complex political alliances and confront her own past to save the world from disaster."
          ]
      }
  }
];

const itemContents = [
  {
      "title": "Tân mất tích",
      "coverSrc": "img/covers/7.png",
      "categories": ["Action", "Triler"],
      "rate": "8.4"
  },
  {
      "title": "Red Sky at Night",
      "coverSrc": "img/covers/8.png",
      "categories": ["Comedy"],
      "rate": "7.1"
  },
  {
      "title": "The Forgotten Road",
      "coverSrc": "img/covers/9.png",
      "categories": ["Romance", "Drama", "Music"],
      "rate": "6.3"
  },
  {
      "title": "Dark Horizons",
      "coverSrc": "img/covers/10.png",
      "categories": ["Comedy", "Drama"],
      "rate": "7.9"
  },
  {
      "title": "Echoes of Yesterday",
      "coverSrc": "img/covers/11.png",
      "categories": ["Action", "Triler"],
      "rate": "8.4"
  },
  {
      "title": "Into the Unknown",
      "coverSrc": "img/covers/12.png",
      "categories": ["Comedy"],
      "rate": "7.1"
  }
]

const commentsData = [
  {
      "avatarSrc": "img/user.svg",
      "authorName": "Matt Jones",
      "commentTime": "30.08.2023, 17:53",
      "commentText": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      "likes": 12,
      "dislikes": 7
  },
  {
      "avatarSrc": "img/user.svg",
      "authorName": "Gene Graham",
      "commentTime": "24.08.2023, 16:41",
      "commentText": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      "likes": 8,
      "dislikes": 3
  },
  {
      "avatarSrc": "img/user.svg",
      "authorName": "Rosa Lee",
      "commentTime": "11.08.2023, 11:11",
      "commentText": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "likes": 11,
      "dislikes": 1
  },
  {
      "avatarSrc": "img/user.svg",
      "authorName": "Brian Cranston",
      "commentTime": "07.08.2023, 14:33",
      "commentText": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      "likes": 99,
      "dislikes": 35
  },
  {
      "avatarSrc": "img/user.svg",
      "authorName": "Tess Harper",
      "commentTime": "02.08.2023, 15:24",
      "commentText": "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      "likes": 74,
      "dislikes": 13
  }
];

const reviews = [
    {
        "avatarSrc": "img/user.svg",
        "authorName": "Best Marvel movie in my opinion",
        "commentTime": "24.08.2023, by Tess Harper",
        "commentText": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
        "rating": "8.0"
    },
    {
        "avatarSrc": "img/user.svg",
        "authorName": "Greate movie",
        "commentTime": "24.08.2023, by Gene Graham",
        "commentText": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
        "rating": "9.0"
    },
    {
        "avatarSrc": "img/user.svg",
        "authorName": "It could be better",
        "commentTime": "24.08.2023, by Rosa Lee",
        "commentText": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
        "rating": "7.0"
    }
]


function updateDetails(jsonData) {
  const itemCoverImg = document.querySelector('.item--details .item__cover img');
  const itemRate = document.querySelector('.item--details .item__rate');
  const itemLists = document.querySelectorAll('.item--details .item__list li');
  const genreLinks = document.querySelectorAll('.item--details .item__meta li:nth-child(1) a');
  const runningTime = document.querySelector('.item--details .item__meta li:nth-child(2)');
  const countryLink = document.querySelector('.item--details .item__meta li:nth-child(3) a');
  const premiereDate = document.querySelector('.item--details .item__meta li:nth-child(4)');
  const directorLink = document.querySelector('.item--details .item__meta--second li:nth-child(1) a');
  const actorLinks = document.querySelectorAll('.item--details .item__meta--second li:nth-child(2) a');
  const descriptionDiv = document.querySelector('.item--details .item__description--details');

  // Update cover image src
  itemCoverImg.src = jsonData[0].src;

  // Update rate
  itemRate.textContent = jsonData[0].textContent.rate;

  // Update lists
  itemLists[0].textContent = jsonData[0].textContent.resolution;
  itemLists[1].textContent = jsonData[0].textContent.age_restriction;

  // Update genres
  genreLinks[0].textContent = jsonData[0].textContent.genre[0];
  genreLinks[0].setAttribute('href', '#');
  genreLinks[1].textContent = jsonData[0].textContent.genre[1];
  genreLinks[1].setAttribute('href', '#');

  // Update running time
  runningTime.textContent = `Running time: ${jsonData[0].textContent.runningTime}`;

  // Update country
  countryLink.textContent = jsonData[0].textContent.country;
  countryLink.setAttribute('href', '#');

  // Update premiere date
  premiereDate.textContent = `Premiere: ${jsonData[0].textContent.premiere}`;

  // Update director
  directorLink.textContent = jsonData[0].textContent.director;
  directorLink.setAttribute('href', '#');

  // Update actors
  actorLinks.forEach((link, index) => {
      link.textContent = jsonData[0].textContent.actors[index];
      link.setAttribute('href', '#');
  });
  // Update description
  descriptionDiv.innerHTML = jsonData[0].textContent.description.map(para => `<p>${para}</p>`).join('');
}

function update_u_may_like(itemContents) {
  itemContents.forEach((item, index) => {
      const itemDiv = document.getElementById(`item${index + 1}`);
          const titleElement = itemDiv.querySelector(".item__title a");
          const coverElement = itemDiv.querySelector(".item__cover img");
          const categoryElement = itemDiv.querySelector(".item__category");
          const rateElement = itemDiv.querySelector(".item__rate");

          titleElement.textContent = item.title;
          
          coverElement.setAttribute("src", item.coverSrc);
          coverElement.setAttribute("alt", "");

          categoryElement.innerHTML = ""; // Clear previous categories
          item.categories.forEach(category => {
          const categoryLink = document.createElement("a");
          categoryLink.setAttribute("href", "#");
          categoryLink.textContent = category;
          categoryElement.appendChild(categoryLink);
          });
          rateElement.textContent = item.rate;
  });
}

function generateComments(commentsData) {
  const commentsContainer = document.querySelector(".comments__list")

  commentsData.forEach(comment => {
      // Create <li> element
      const liElement = document.createElement("li");
      liElement.classList.add("comments__item");

      // Create author section
      const authorDiv = document.createElement("div");
      authorDiv.classList.add("comments__autor");

      // Create avatar image
      const avatarImg = document.createElement("img");
      avatarImg.classList.add("comments__avatar");
      avatarImg.setAttribute("src", comment.avatarSrc);
      avatarImg.setAttribute("alt", "");

      // Create author name
      const nameSpan = document.createElement("span");
      nameSpan.classList.add("comments__name");
      nameSpan.textContent = comment.authorName;

      // Create comment time
      const timeSpan = document.createElement("span");
      timeSpan.classList.add("comments__time");
      timeSpan.textContent = comment.commentTime;

      // Append author section elements to <div class="comments__autor">
      authorDiv.appendChild(avatarImg);
      authorDiv.appendChild(nameSpan);
      authorDiv.appendChild(timeSpan);

      // Create comment text
      const commentText = document.createElement("p");
      commentText.classList.add("comments__text");
      commentText.textContent = comment.commentText;

      // Create actions section
      const actionsDiv = document.createElement("div");
      actionsDiv.classList.add("comments__actions");

      // Create rate section
      const rateDiv = document.createElement("div");
      rateDiv.classList.add("comments__rate");

      // Create like button
      const likeButton = document.createElement("button");
      likeButton.setAttribute("type", "button");
      likeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"/></svg>${comment.likes}`;

      // Create dislike button
      const dislikeButton = document.createElement("button");
      dislikeButton.setAttribute("type", "button");
      dislikeButton.innerHTML = `${comment.dislikes}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,2H6.27A3,3,0,0,0,3.32,4.46l-1.27,7A3,3,0,0,0,5,15H9.56L9,16.43A4.13,4.13,0,0,0,12.89,22a1,1,0,0,0,.91-.59L16.65,15H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM15,13.79l-2.72,6.12a2.13,2.13,0,0,1-1.38-2.78l.53-1.43A2,2,0,0,0,9.56,13H5a1,1,0,0,1-.77-.36A1,1,0,0,1,4,11.82l1.27-7a1,1,0,0,1,1-.82H15ZM20,12a1,1,0,0,1-1,1H17V4h2a1,1,0,0,1,1,1Z"/></svg>`;

      // Append like and dislike buttons to rate section
      rateDiv.appendChild(likeButton);
      rateDiv.appendChild(dislikeButton);

      // Append rate section to actions section
      actionsDiv.appendChild(rateDiv);

      // Append author section, comment text, and actions section to <li> element
      liElement.appendChild(authorDiv);
      liElement.appendChild(commentText);
      liElement.appendChild(actionsDiv);

      // Append <li> element to comments container
      commentsContainer.appendChild(liElement);
  });
}

function generateReviewItems(reviews) {
    const reviewsList = document.querySelector(".reviews__list");

    reviews.forEach(review => {
        // Tạo phần tử <li>
        const reviewItem = document.createElement("li");
        reviewItem.classList.add("reviews__item");

        // Tạo phần tử chứa thông tin người đăng bình luận
        const authorDiv = document.createElement("div");
        authorDiv.classList.add("reviews__autor");

        // Tạo phần tử ảnh đại diện
        const avatarImg = document.createElement("img");
        avatarImg.classList.add("reviews__avatar");
        avatarImg.setAttribute("src", review.avatarSrc);
        avatarImg.setAttribute("alt", "");

        // Tạo phần tử tên tác giả
        const nameSpan = document.createElement("span");
        nameSpan.classList.add("reviews__name");
        nameSpan.textContent = review.authorName;

        // Tạo phần tử thời gian đăng bình luận
        const timeSpan = document.createElement("span");
        timeSpan.classList.add("reviews__time");
        timeSpan.textContent = review.commentTime;

        // Tạo phần tử đánh giá
        const ratingSpan = document.createElement("span");
        ratingSpan.classList.add("reviews__rating");
        ratingSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"></path></svg>${review.rating}`;

        // Thêm các phần tử vào phần tử chứa thông tin người đăng bình luận
        authorDiv.appendChild(avatarImg);
        authorDiv.appendChild(nameSpan);
        authorDiv.appendChild(timeSpan);
        authorDiv.appendChild(ratingSpan);

        // Tạo phần tử chứa nội dung bình luận
        const textParagraph = document.createElement("p");
        textParagraph.classList.add("reviews__text");
        textParagraph.textContent = review.commentText;

        // Thêm các phần tử vào phần tử <li>
        reviewItem.appendChild(authorDiv);
        reviewItem.appendChild(textParagraph);

        // Thêm phần tử <li> vào danh sách bình luận
        reviewsList.appendChild(reviewItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  updateDetails(details);
  update_u_may_like(itemContents);
  generateComments(commentsData);
  generateReviewItems(reviews);
});

