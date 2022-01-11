export function goLogin() {
  if (!window.location.href.includes("returnUrl")) {
    const returnUrl = encodeURIComponent(
      window.location.href.replace(window.location.origin, "").replace("/#", "")
    );
    window.location.href = `/#/login?returnUrl=${returnUrl}`;
  }
}
/**
 * 深拷贝
 * @param {any} obj
 */
export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
/**
 * 添加水印
 * @param {string} str
 */
export function addWaterMarker(str: string) {
  const can = document.createElement("canvas");
  const cover = document.createElement("div");
  document.body.appendChild(cover);
  cover.style.position = "fixed";
  cover.style.height = "100vh";
  cover.style.width = "100vw";
  cover.style.zIndex = "99999";
  cover.style.top = "0";
  cover.style.left = "0";
  cover.style.pointerEvents = "none";
  cover.appendChild(can);
  can.width = 150;
  can.height = 150;
  can.style.display = "none";
  const cans = can.getContext("2d");
  if (cans !== null) {
    cans.rotate((-20 * Math.PI) / 180);
    cans.font = "12px Microsoft JhengHei";
    cans.fillStyle = "rgba(17, 17, 17, 0.9)";
    cans.textAlign = "left";
    cans.textBaseline = "middle";
    cans.fillText(str, can.width / 3 - 40, can.height / 2, 200);
  }
  cover.style.backgroundImage = `url(${can.toDataURL("image/png")})`;
}

export function Export(file: BlobPart, fileName: string) {
  const blob = new Blob([file]);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
