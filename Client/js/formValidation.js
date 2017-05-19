$(document)
  .ready(function() {
    $('#login')
      .form({
        fields: {
          login: {
            identifier  : 'log',
            rules: [
              {
                type   : 'empty',
                prompt : 'Veuillez entrez un identifiant ou une adresse mail'
              }
            ]
          },
          password: {
            identifier  : 'pwd',
            rules: [
              {
                type   : 'empty',
                prompt : 'Veuillez entrer un mot de passe'
              },
              {
                type   : 'length[8]',
                prompt : 'Veuillez entrer un mot de passe d\'au moins 6 caractères'
              }
            ]
          }
        }
      });
    $('.ui.dropdown')
  .dropdown();
});

