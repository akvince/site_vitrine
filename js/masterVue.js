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

var presentation = new Vue({
  el: '#presentation',
  data:{
    infos: [
      {id: 'Nom & Prénom : ', key: 'Deflandre Vincent'},
      {id: 'Date de naissance : ', key: '19/07/1990'},
      {id: 'Profession : ', key: 'Développeur front-end'},
      {id: 'Affectation : ', key: 'IT-Room'},
      {id: 'Mission actuelle : ', key: 'La Redoute'},
    ]
  }
})

var project = new Vue({
  el: '#projects',
  data:{
    projects: [
      {
        name:'La Redoute (régie)',
        description: 'Maintenance et intégration de nouvelles fonctionnalités',
        skill: 'HTML, CSS, Bootstrap, jQuery, environnement .Net',
        hasLink: false
      },
      {
        name:'Sogood People',
        description: 'Integration responsive',
        link:'http://www.sogood-people.fr/',
        hasLink: true,
        skill:'HTML, CSS, Bootstrap, jQuery, Environnement Symphony (twig)'
      }
    ]
  }
})
