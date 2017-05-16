$('.ui.form.registerForm')
  .form({
    fields: {
      name: {
        identifier: 'ftname',
        rules: [
          {
            type   : 'empty',
            prompt : 'Entrez votre prénom'
          }
        ]
      },
      skills: {
        identifier: 'ltname',
        rules: [
          {
            type   : 'empty',
            prompt : 'Entrez votre nom de famille'
          }
        ]
      },
      gender: {
        identifier: 'psd',
        rules: [
          {
            type   : 'empty',
            prompt : 'Entrez votre pseudo'
          }
        ]
      },
      username: {
        identifier: 'em',
        rules: [
          {
            type   : 'email',
            prompt : 'Entrez votre email'
          }
        ]
      },
      password: {
        identifier: 'pw1',
        rules: [
          {
            type   : 'empty',
            prompt : 'Entrez un mot de passe'
          },
          {
            type   : 'minLength[8]',
            prompt : 'Le mot de passes doit être supérieur à 8 caractères'
          }
        ]
      },
      terms: {
        identifier: 'pw2',
        rules: [
          {
            type   : 'match[pwd1]',
            prompt : 'Mauvaise validation de mot de passe'
          }
        ]
      }
    }
  });
$('.ui.checkbox').checkbox();