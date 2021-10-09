export function DownloadCategoryItem() {
  const wrap = document.createElement("details"),
    summary = document.createElement("summary"),
    itemsDiv = document.createElement("div");

  // 클래스 추가
  itemsDiv.classList.add("item-list");

  // 교체할 문자열 대입
  summary.innerHTML = "{category-name}";
  itemsDiv.innerHTML = "{item-list}";

  // 자식 노드 연결
  wrap.appendChild(summary);
  wrap.appendChild(itemsDiv);

  return wrap;
}

export function DownloadItem() {
  const wrap = document.createElement("li"),
    titleDiv = document.createElement("div"),
    resolutionDiv = document.createElement("div"),
    downloadButton = document.createElement("button");

  // 클래스 추가
  wrap.classList.add("item");
  titleDiv.classList.add("item__title");
  resolutionDiv.classList.add("item__resolution");
  downloadButton.classList.add("item__download-button", "secondary");

  // 문자열 대입
  downloadButton.innerHTML = "다운로드";

  // 교체할 문자열 대입
  titleDiv.innerHTML = "{item-name}";
  resolutionDiv.innerHTML = "{width} x {height}";

  // 자식 노드 연결
  wrap.appendChild(titleDiv);
  wrap.appendChild(resolutionDiv);
  wrap.appendChild(downloadButton);

  return wrap;
}
