// https://docs.google.com/spreadsheets/d/13pRh-mSnVw08jGoAnQCMfB_IzhrtCDPNzRTaocmhZ6k/edit?usp=sharing


// $(document).ready(function () {
//   $.getJSON("https://spreadsheets.google.com/feeds/list/13pRh-mSnVw08jGoAnQCMfB_IzhrtCDPNzRTaocmhZ6k/od6/public/values?alt=json", function (data) {
//     console.log(data);
//   })
// })

window.onload = function () {
  //послать запрос
  let getJSON = function (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      let status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      }
      else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  }

//   getJSON('https://spreadsheets.google.com/feeds/list/13pRh-mSnVw08jGoAnQCMfB_IzhrtCDPNzRTaocmhZ6k/od6/public/values?alt=json', function (err, data) {
  getJSON('https://m2in.github.io/shop/js/miShop.xlsx', function (err, data) {
    console.log(data);
    if (err !== null) {
      console.log('Error: ' + err);
    }
    else {
      data = data['feed']['entry'];
      console.log(data);
      document.querySelector('.shop-field').innerHTML = showGoods(data);
    }
  });

  function showGoods(data) {
    let out = '';
    for (var i = 0; i < data.length; i++) {
      if (data[i]['gsx$show']['$t'] != 0) {
        out += `<div class="col-lg-3 col-md-3 col-sm-6 text-center">`;
        out += `<div class="goods">`;
        out += `<h3>${data[i]['gsx$name']['$t']}</h3>`;
        out += `<img src="${data[i]['gsx$image']['$t']}" alt="">`;
        out += `<p class="cost">Цена: ${data[i]['gsx$cost']['$t']}</p>`;
        out += `<p>На складе: ${data[i]['gsx$kg']['$t']}</p>`;
        out += `<p><button type="button" class="btn btn-outline-success" data="${data[i]['gsx$id']['$t']}">Купить</button></p>`;
        out += `</div>`;
        out += `</div>`;
      }
    }
    return out;
  }
}
