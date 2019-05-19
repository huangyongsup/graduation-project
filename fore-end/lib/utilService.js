// import  html2canvas from 'html2canvas'
// import  jsPDF from 'jspdf'
//
//
// export function PDF(dom, name) {
//   html2canvas(dom, {
//     scale: 2,
//     onrendered:function(canvas) {
//
//       var contentWidth = canvas.width;
//       var contentHeight = canvas.height;
//
//       //一页pdf显示html页面生成的canvas高度;
//       var pageHeight = contentWidth / 592.28 * 841.89;
//       //未生成pdf的html页面高度
//       var leftHeight = contentHeight;
//       //页面偏移
//       var position = 0;
//       //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
//       var imgWidth = 595.28;
//       var imgHeight = 592.28/contentWidth * contentHeight;
//
//       var pageData = canvas.toDataURL('image/jpeg', 1.0);
//
//       var pdf = new jsPDF('', 'pt', 'a4');
//
//       //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
//       //当内容未超过pdf一页显示的范围，无需分页
//       if (leftHeight < pageHeight) {
//         pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
//       } else {
//         while(leftHeight > 0) {
//           pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//           leftHeight -= pageHeight;
//           position -= 841.89;
//           //避免添加空白页
//           if(leftHeight > 0) {
//             pdf.addPage();
//           }
//         }
//       }
//
//       pdf.save(`${name}.pdf`)
//     }
//   })
// }

export function keyMirror(obj, val){
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = val ? (val + '_' + key) : key;
  }
  return ret;
}

class LocalStorage {
  setObject(key, value) {
    if (window.localStorage) {
      window.localStorage[key] = JSON.stringify(value);
    }
  }
  getObject(key) {
    let obj = window.localStorage[key];
    try {
      return obj ? JSON.parse(obj) : null;
    } catch (e) {
      return null;
    }
  }
  remove(key) {
    delete window.localStorage[key];
  }
}
const lStorage = new LocalStorage();

class SessionStorage {
  setObject(key, value) {
    if (window.sessionStorage) {
      window.sessionStorage[key] = JSON.stringify(value);
    }
  }
  getObject(key) {
    try {
      let obj = window.sessionStorage[key];
      return obj ? JSON.parse(obj) : null;
    } catch (e) {
      return null;
    }
  }
  remove(key) {
    delete window.sessionStorage[key];
  }
}
const sStorage = new SessionStorage();

export {
  lStorage as LocalStorage, sStorage as SessionStorage
};
