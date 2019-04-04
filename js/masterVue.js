var menu = new Vue({
  el: '#menu',
  data:{
    entries:[
      {name: 'acceuil', dataId: 'home', icon: 'icon-menu fas fa-home'},
      {name: 'compétences', dataId: 'skill', icon: 'icon-menu fas fa-wrench'},
      {name: 'Projets', dataId: 'project', icon: 'icon-menu fas fa-code-branch'},
      {name: 'contact', dataId: 'contact', icon: 'icon-menu fas fa-at'}
    ]
  }
})
