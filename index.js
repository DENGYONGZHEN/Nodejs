const fs = require('fs');
const superagent = require('superagent');

//version 1

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(res.body.message);
//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('Random dog image saved to file!');
//       });
//     });
// });

//version 2

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file!');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('i could not find the file 😥');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('i could not write the file 😥');
      resolve(console.log('Random dog image saved to file!'));
    });
  });
};

//version 4

/* readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breeds:${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .catch((err) => {
    console.log(err.message);
  }); */

//version 5

// const getDogPic = async()=>{}
/* async function getDogPic() {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`); //await后面的代码被阻塞，直到await执行完
    console.log(`Breeds:${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);

    return '🐶';
  } catch (err) {
    console.log(err);
  }
}

console.log('start......');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('finished.......');
  })
  .catch((err) => {
    console.log('ERROR 💥');
  }); */

//version 6

/* (async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`); //await后面的代码被阻塞，直到await执行完
    console.log(`Breeds:${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
  } catch (err) {
    console.log(err);
  }
})(); */

//VERSION 7

(async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`); //await后面的代码被阻塞，直到await执行完
    console.log(`Breeds:${data}`);

    const res1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1, res2, res3]);
    imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
  } catch (err) {
    console.log(err);
  }
})();
