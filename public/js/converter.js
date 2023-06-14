var romanToInt = function(s) {
  s = s.toUpperCase()
  const map = { I: 1, IV: 4 , V: 5, X: 10, XL: 40 , L: 50, XC: 90, C: 100, CD: 400, D: 500, CM: 900, M: 1000 };
  let res = 0;
  s.split('').forEach((num, i) => {
    if(map[num] < map[s[i + 1]]) res -= map[num];
    else res += map[num];
  });

  return res;
};

var intToRoman = function(number) {
  if (number === 0) {
    return "N";
  }

  var numerosArabicos = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  var numerosRomanos = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];

  var res = "";

  for (var i = numerosArabicos.length - 1; i >= 0; i--) {
    while (number >= numerosArabicos[i]) {
      res += numerosRomanos[i];
      number -= numerosArabicos[i];
    }
  }

  return res;
}

  
btnConverterRomano = document.getElementById("btnConverterRomano");
btnConverterInteiro = document.getElementById("btnConverterInteiro");
  
btnConverterRomano.onclick =  () => {
  var inputRomano = document.getElementById("valorRomano");
  var number = romanToInt(inputRomano.value);

  document.getElementById('resultadoArabico').value = number;
}

btnConverterInteiro.onclick = () => {
  var inputInteiro = document.getElementById("valorInteiro");
  var number = intToRoman(parseInt(inputInteiro.value));

  document.getElementById('resultadoRomano').value = number;
}


  