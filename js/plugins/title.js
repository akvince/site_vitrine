class Title{
  constructor(title){
    this.title = title;
    this.displayTitle();
  }
  displayTitle(){
    var $title = document.getElementById('title');
    $title.innerHTML = this.title;
  }
}
