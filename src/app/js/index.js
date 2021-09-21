import PhotoModel from "./models/photo.model";

class Index {
  constructor() {
    this.photoModel = new PhotoModel();

    // 뷰 초기화
    this.mainPhotoView = document.getElementById("mainPhotoView");
    this.mainPhotoDetailLink = document.getElementById("mainPhotoDetailLink");
    this.mainPhotoBy = document.getElementById("mainPhotoBy");

    // 사진 26장 가져오기
    this.getPhotoList().then((res) => {
      this.setData(res);
    });

    // 검색창 입력 시 검색 페이지로 이동
  }

  async getPhotoList() {
    const res = await this.photoModel.getPhotoList("", 1, 26);
    return res;
  }

  setData(res) {
    console.log(res);
    // 예외처리
    if (!res || !res.results) return;

    // 메인 사진
    this.setMainPhoto(res.results[0]);

    // 사진 목록
    //  ㄴ사진 링크 연결
  }

  // 메인 사진 관련 데이터 바인딩
  setMainPhoto(photoInfo) {
    const { id, user, urls } = photoInfo;
    this.mainPhotoView.setAttribute("src", urls.regular);

    // 해당 사진을 업로드한 유저 이름
    this.mainPhotoBy.innerHTML = user.name;
    // 상세보기 링크 연결
    this.mainPhotoDetailLink.setAttribute("href", `/photo/${id}`);
  }
}

new Index();
