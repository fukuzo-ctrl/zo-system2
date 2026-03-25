fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://jpn.mizuno.com/ec/disp/item/12JA7T6216/"))
  .then(r => r.text())
  .then(console.log)
  .catch(console.error);
