const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express')
const app = express();

app.get('/getProviders', (req, res) => {
  admin
    .firestore()
    .collection('users')
    .get()
    .then( data => {
      let userData = []
      data.forEach(doc => {
        userData.push(doc.data())
      })
      return res.json(userData)
    })
    .catch(err => console.error(err))
})

// TODO: add in a call to the Firebase location api to like 47
app.post('/createUser', (req, res) => {
  const newUser = {
    email: req.body.email,
    birthday: req.body.birthday,
    img: req.body.img,
    name: req.body.name,
    //location: req.body.location,
    createdAt: new Date().toISOString()
  }

  admin
    .firestore()
    .collection('users')
    .add(newUser)
    .then( doc => {
      console.log('add doc: ', doc);
      return res.json(`User data has been added: ${doc.id}`)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(`Your intention to add yourself as a user has failed, please try again. Error ${err}`)
    })
})


app.post('/createOffer', (req, res) => {
  console.log('req.body.socialMedia.twitter: ', req.body.socialMedia.twitter)
  const newOffer = {
    logo: req.body.logo,
    company: req.body.company,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    socialMedia: {
      twitter: req.body.socialMedia.twitter,
      facebook: req.body.socialMedia.facebook,
      instagram: req.body.socialMedia.instagram,
    },
    createdAt: new Date().toISOString(),
    expireDate: new Date().toISOString()
  }

  admin
    .firestore()
    .collection('company')
    .add(newOffer)
    .then( doc => {
      console.log('add doc: ', doc);
      return res.json(`User data has been added: ${doc.id}`)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(`Your intention to add yourself as a user has failed, please try again. Error ${err}`)
    })
})


// exports.getUsers = functions.https.onRequest( (req, res) => {
//   admin
//     .firestore()
//     .collection('users')
//     .get()
//     .then( data => {
//       let userData = []
//       data.forEach(doc => {
//         userData.push(doc.data())
//       })
//       return res.json(userData)
//     })
//     .catch(err => console.error(err))
// })

// exports.createUser = functions.https.onRequest( (req, res) => {
//   const newUser = {
//     email: req.body.email,
//     birthday: req.body.birthday,
//     img: req.body.img,
//     name: req.body.name,
//     //location: req.body.location,
//     createdAt: new Date().toISOString()
//   }

//   admin
//     .firestore()
//     .collection('users')
//     .add(newUser)
//     .then( doc => {
//       console.log('add doc: ', doc);
//       return res.json(`User data has been added: ${doc.id}`)
//     })
//     .catch(err => {
//       console.error(err)
//       return res.status(500).json(`Your intention to add yourself as a user has failed, please try again. Error ${err}`)
//     })

// })

exports.api = functions.https.onRequest(app)