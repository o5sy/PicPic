import PhotoModel from "./models/photo.model";

class Index {
  constructor() {
    this.photoModel = new PhotoModel();

    // 뷰 초기화
    this.mainPhotoView = document.getElementById("mainPhotoView");
    this.mainPhotoDetailLink = document.getElementById("mainPhotoDetailLink");
    this.mainPhotoBy = document.getElementById("mainPhotoBy");
    this.photoListView = document.getElementById("photoList");
    this.queryInput = document.getElementById("queryInput");

    // 사진 26장 가져오기
    this.getPhotoList().then((res) => {
      this.setData(res);
    });

    // 검색창 입력 시 검색 페이지로 이동
    this.queryInput.addEventListener("keydown", (event) => {
      const query = queryInput.value;
      if (event.key === "Enter") {
        const path = location.origin + `/search/${query}`;
        location.assign(path);
      }
    });
  }

  async getPhotoList() {
    const res = await this.photoModel.getPhotoList("", 1, 26);
    return res;
  }

  setData(res) {
    // console.log(res);
    // 예외처리
    if (!res || !res.results) return;

    // 메인 사진
    this.setMainPhoto(res.results.shift());

    // 사진 목록
    this.setPhotoList(res.results);
  }

  // 메인 사진 관련 데이터 바인딩
  setMainPhoto(photoData) {
    const { id, user, urls } = photoData;
    this.mainPhotoView.setAttribute("src", urls.regular);

    // 해당 사진을 업로드한 유저 이름
    this.mainPhotoBy.innerHTML = user.name;
    // 상세보기 링크 연결
    this.mainPhotoDetailLink.setAttribute("href", `/photo/${id}`);
  }

  // 사진 목록 데이터 바인딩
  setPhotoList(photoList) {
    // 각 사진별 상세보기 링크 연결

    // photoList.map((data) => {
    //   const { id, urls } = data;

    //   // 엘리먼트 생성
    //   const li = document.createElement("li"),
    //     link = document.createElement("a"),
    //     img = document.createElement("img");

    //   // 클래스 추가
    //   li.classList.add("item");
    //   link.classList.add("item__photo-link");

    //   // 데이터 추가
    //   link.href = `/photo/${id}`;
    //   img.src = urls.thumb;

    //   // 노드 연결
    //   li.appendChild(link);
    //   link.appendChild(img);

    //   // 부모 노드 연결
    //   this.photoListView.appendChild(li);
    // });

    // 사진 목록 추가
    photoList.map((info) => {
      const { id, urls, user, links } = info;

      // 엘리먼트 생성
      const li = document.createElement("li"),
        link = document.createElement("a"),
        img = document.createElement("img");

      // 클래스 추가
      li.classList.add("item");
      link.classList.add("item__photo-link");

      // 데이터 추가
      link.href = `/photo/${id}`;
      img.src = urls.thumb;

      // 노드 연결
      li.appendChild(link);
      link.appendChild(img);

      // 유저 정보 연결
      const infoDiv = document.createElement("div"),
        userInfoDiv = document.createElement("div"),
        userProfileImg = document.createElement("img"),
        userNameDiv = document.createElement("div"),
        downloadButton = document.createElement("button");

      // 클래스 추가
      infoDiv.classList.add("info-container");
      userInfoDiv.classList.add("user-info");
      userNameDiv.classList.add("user-name");
      downloadButton.classList.add("download-button");

      // 유저 정보 추가
      userProfileImg.setAttribute("src", user.profile_image.small);
      userNameDiv.innerHTML = user.name;

      // 다운로드 기능 추가
      downloadButton.addEventListener("click", () => {
        // 이미지 url
        const downloadUrl = urls.regular;

        // 이미지 명
        let extension = getParam("fm", "jpg", downloadUrl);
        let fileName = id + "-regular." + extension;

        // 다운로드
        var x = new XMLHttpRequest();
        x.open("GET", downloadUrl, true);
        x.responseType = "blob";
        x.onload = function (e) {
          downloadjs(x.response, fileName, `image/${extension}`);
        };
        x.send();

        // 다운로드 추적
        photoModel.trackDownloadPhoto(links.download_location);
      });

      // 애니메이션 추가
      li.addEventListener("mouseover", () => {
        infoDiv.classList.add("hover");
      });
      li.addEventListener("mouseleave", () => {
        if (!infoDiv.classList.contains("hover")) return;
        infoDiv.classList.remove("hover");
      });

      // 노드 연결
      li.appendChild(infoDiv);
      infoDiv.appendChild(userInfoDiv);
      userInfoDiv.appendChild(userProfileImg);
      userInfoDiv.appendChild(userNameDiv);
      infoDiv.appendChild(downloadButton);

      // 부모 노드 연결
      this.photoListView.appendChild(li);
    });
  }
}

new Index();
