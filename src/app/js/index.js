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

    photoList.map((data) => {
      const { id, urls } = data;

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

      // 부모 노드 연결
      this.photoListView.appendChild(li);
    });
  }
}

new Index();
