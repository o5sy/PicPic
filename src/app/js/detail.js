import PhotoModel from "./models/photo.model";
import { getParam } from "./util/util.page";

const downloadjs = require("./lib/download.js");

const urlSplit = location.pathname.split("/");
const photoId = urlSplit[2];

// 뷰 초기화
const photoView = document.getElementById("photoView");
const userNameLabel = document.getElementById("userNameLabel");
const userProfileImg = document.getElementById("userProfileImg");
const tagList = document.getElementById("tagList");
const downloadButton = document.getElementById("downloadButton");

// 모델
const photoModel = new PhotoModel();
async function getPhoto(id) {
  const res = await photoModel.getPhoto(id);
  console.log(res);
  return res;
}
function setPhotoInfo(res) {
  if (!res) return;

  // 사진 뿌리기
  photoView.setAttribute("src", res.urls.regular);

  // 유저 정보 뿌리기
  userNameLabel.innerHTML = res.user.username;
  userProfileImg.setAttribute("src", res.user.profile_image.small);

  // 태그 목록 뿌리기
  res.tags.map((tag) => {
    const li = document.createElement("li"),
      a = document.createElement("a");

    li.classList.add("tag");
    a.setAttribute("href", `/search/${tag.title}`);
    a.innerHTML = tag.title;

    li.appendChild(a);
    tagList.appendChild(li);
  });

  // 다운로드 링크 연결
  downloadButton.addEventListener("click", () => {
    // 이미지 url
    const downloadUrl = res.urls.regular;

    // 이미지 명
    let extension = getParam("fm", "jpg", downloadUrl);
    let fileName = res.id + "-regular." + extension;

    // 다운로드
    var x = new XMLHttpRequest();
    x.open("GET", res.urls.regular, true);
    x.responseType = "blob";
    x.onload = function (e) {
      downloadjs(x.response, fileName, `image/${extension}`);
    };
    x.send();

    // 다운로드 추적
    photoModel.trackDownloadPhoto(res.links.download_location);
  });
}

// 컨트롤러?
getPhoto(photoId).then((res) => setPhotoInfo(res));
