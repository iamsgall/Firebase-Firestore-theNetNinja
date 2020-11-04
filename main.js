const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render cafe
function renderCafe(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  // Deleting Data
  cross.addEventListener('click', e => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('cafes').doc(id).delete();
  });
}

// Getting Data
// db.collection('cafes')
//   .get()
//   .then(snap => {
//     snap.docs.forEach(doc => {
//       renderCafe(doc);
//     });
//   });

// Getting Data with Queries
// db.collection('cafes')
//   .where('city', '==', 'city1')
//   .get()
//   .then(snap => {
//     snap.docs.forEach(doc => {
//       renderCafe(doc);
//     });
//   });

// Getting Ordering Data
// db.collection('cafes')
//   .where('city', '==', 'city1')
//   .orderBy('name')
//   .get()
//   .then(snap => {
//     snap.docs.forEach(doc => {
//       renderCafe(doc);
//     });
//   });

// Saving Data
form.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value,
  });
  form.name.value = '';
  form.city.value = '';
});

// Real-Time listener
db.collection('cafes')
  .orderBy('city')
  .onSnapshot(snap => {
    let changes = snap.docChanges();
    changes.forEach(change => {
      if (change.type === 'added') {
        renderCafe(change.doc);
      } else if (change.type === 'removed') {
        let li = cafeList.querySelector(`[data-id=${change.doc.id}]`);
        cafeList.removeChild(li);
      }
    });
  });

// Updating Data (IN CONSOLE) UPDATE: Only override part of doc
// db.collection('cafes').doc('TWZv4PiYTAmfeXYCMBQE').update({
//   city: 'city changed',
// });

// Updating Data (IN CONSOLE) SET: Override all of doc
// db.collection('cafes').doc('TWZv4PiYTAmfeXYCMBQE').set({
//   city: 'city changed',
// });
