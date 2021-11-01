function DownloadCategory(name, downloadItems) {
  if (typeof name !== "string" || !name) {
    throw "CategoryName is required.";
  }
  if (!Array.isArray(downloadItems)) {
    throw "DownloadItems should be array.";
  }
  this.categoryName = name;
  this.downloadItems = downloadItems; // DownloadItem[]
}

function DownloadItem(name, subText = null, width, height) {
  if (typeof name !== "string" || !name) {
    throw "DownloadItem name is required.";
  }
  if (
    !(width && height) ||
    typeof width !== "number" ||
    typeof height !== "number"
  ) {
    throw "DownloadItem's width and height is required.";
  }
  this.itemName = name;
  this.subText = subText; // 옵션
  this.resolution = { width, height };
}

export default class DownloadModel {
  constructor() {
    this.categoryList = []; // DownloadCategory[]
    this.createData();
  }

  // 하드코딩
  createData() {
    // 데스크탑
    const desktopItems = [
      new DownloadItem("FHD", null, 1920, 1080),
      new DownloadItem("Full Wide XGA", null, 1366, 768),
      new DownloadItem("HD", null, 1280, 720),
      new DownloadItem("QHD", null, 2560, 1440),
      new DownloadItem("UHD(4K)", null, 3840, 2160),
    ];
    const desktopCat = new DownloadCategory("Desktop", desktopItems);

    // 태블릿
    const tabletItems = [
      new DownloadItem("iPad Pro 9.7", "iPad mini", 2048, 2048),
      new DownloadItem(
        'Galaxy Tab 3 10"',
        'Galaxy Tab 8.9, Galaxy Tab 2 10"',
        1280,
        1280
      ),
      new DownloadItem("Nexus 10", null, 2560, 2560),
      new DownloadItem("Nexus 7", "G pad 8.3", 1920, 1920),
      new DownloadItem("iPad", null, 1920, 1920),
    ];
    const tabletCat = new DownloadCategory("Tablet", tabletItems);

    // 모바일
    const mobileItems = [
      new DownloadItem(
        "Galaxy Note 4, Galaxy S7 edge",
        "Galaxy S7, Galaxy S6, Nexus 5, G3, G4, G5",
        1440,
        2560
      ),
      new DownloadItem("iPhone 11", "iPhone XR", 828, 1792),
      new DownloadItem("iPhone 11 Pro Max", "iPhone XS Max", 1242, 2688),
      new DownloadItem(
        "iPhone SE 2gen",
        "iPhone 8, iPhone 7, iPhone SE2",
        750,
        1334
      ),
    ];
    const mobileCat = new DownloadCategory("Mobile", mobileItems);

    this.categoryList.push(desktopCat);
    this.categoryList.push(tabletCat);
    this.categoryList.push(mobileCat);
  }
}
