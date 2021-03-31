function generateTam(n) {
  var randomNm = (num, limitLower, limitUpper) => {
    var set = new Set();
    while (num) {
      let x = Number(Math.floor(Math.random() * (limitUpper - limitLower)) + limitLower);
      if (x)
        x = set.add(x).size;
      if (x == num)
        num = !x;
    }
    return [...set];
  }
  var randomArrNum = (num = 5, limit = 50) => {
    var set = new Set();
    while (num && limit) {
      let x = Number(Math.ceil(Math.random() * limit));
      if (x) {
        x = set.add(x).size;
      }
      if (x == num)
        num = !x;
    }
    return [...set].sort((a, b) => a - b);
  }
  var globalArr = [];
  for (var i = 1; i <= 10; i++) {
    globalArr = globalArr.concat(randomNm(3, (i - 1) * 10, i * 10))
  }
  globalArr.sort((a, b) => a - b)
  var finalArray = globalArr.filter((final, idx) => idx % 3 == 0)
  var finalRemainArray = globalArr.filter((final, idx) => {
    return idx % 3 != 0
  });
  finalArray = finalArray.concat(randomArrNum(5, 19).map((tam) => {
    return finalRemainArray[tam]
  })).sort((a, b) => a - b);
  var ss = randomArrNum(10, 10).map(
    (val) => {
      return finalArray.filter((inner) => {
        return inner >= ((val - 1) * 10) && inner < val * 10
      }).length
    }
  )
  flag = true;
  while (flag) {
    var mm = ss.map((val) => randomArrNum(val, 3)).reduce((all, inner) => {
      return all.concat(inner)
    }, [])
    var check = randomArrNum(3, 3).filter((val) => {
      return mm.filter((inner) => {
        return val == inner
      }).length == 5
    }).length
    if (check == 3) {
      flag = false;
    }

  }
  var globalCounter = 0;
  var remake = ss.map((val, idx) => {
    return randomArrNum(val, val).map((inner) => {
      return mm[globalCounter++];
    })
  })
  var positionArr = remake.map((val, idx) => {
    return val.map((inner) => {
      return (inner - 1) * 10 + (idx + 1);
    })
  }).reduce((all, itm) => {
    return all.concat(itm)
  }, [])
  var tambolaArr = randomArrNum(30, 30).map((val) => {
    var selIndex = positionArr.indexOf(val);
    if (selIndex >= 0) {
      return finalArray[selIndex]
    } else {
      return "";
    }
  })
  var finalStr = `
  <div style="display:flex;justify-content:space-around;margin-left:23px">
  <h4>Teknack2021<h4>
  <h4>#${n}<h4>
  </div>
  `;  
   finalStr += "<table>";  
  randomArrNum(3, 3).forEach((val, idx) => {
    finalStr += "<tr>";
    randomArrNum(10, 10).forEach((inner, id) => {
      finalStr += "<td>" + tambolaArr[idx * 10 + id] + "</td>";
    })
    finalStr += "</tr>";
  })
  finalStr += "</table>";
  console.log(finalStr)
  var dom = document.createElement("template");
  dom.innerHTML = finalStr;
  var frag = document.importNode(dom.content, true);
  //document.body.appendChild(frag);  
  document.getElementsByClassName("table-container")[0].appendChild(frag);
}



  var loopTo = 200;
  document.getElementsByClassName("table-container")[0].innerHTML="";
  for (var n = 1; n <= loopTo; n++) {
    // console.log(n);
    generateTam(n);
  }
