const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const fs = require("fs").promises;

const listMember = {
  lidth: "lastidol_th",
  tonnam: "tonnam.lastidolthofficial",
  mahnmook: "mahnmook.lastidolthofficial",
  meemie: "meemie.lastidolthofficial",
  runma: "runma.lastidolthofficial_",
  seamoon: "seamoon.lastidolthofficial",
  kae: "kae.lastidolthofficial_",
  highway: "highway.lastidolthofficial",
  gigy: "gigy.lastidolthofficial",
  taln: "taln.lastidolthofficial",
  chacha: "chacha.lastidolthofficial",
  goii: "goii.lastidolthofficial",
  nall: "nall.lastidolthofficial",
  pim: "pim.lastidolthofficial",
  preme: "preme.lastidolthofficial",
  hongyok: "hongyok.lastidolthofficial",
  centre: "centre.lastidolthofficial",
  grace: "grace.lastidolthofficial",
  jan: "jan.lastidolthofficial",
  fa: "fa.lastidolthofficial",
  minnie: "minnie.lastidolthofficial",
  knomwhan: "knomwhan.lastidolthofficial",
  saonoi: "saonoi.lastidolthofficial",
  remy: "remy.lastidolthofficial",
  eye: "eye.lastidolthofficial",
  my: "my.lastidolthofficial",
  yodnam: "yodnam.lastidolthofficial",
};
for (const [key, value] of Object.entries(listMember)) {
  fs.readFile(`../${value}/${value}.json`, "utf8")
    .then((resp) => JSON.parse(resp))
    .then((rawData) => {
      let count = 0;
      rawData.GraphImages.forEach(async (element) => {
        if (count > 5) {
          return;
        }
        const docRef = db.collection("social_feeds").doc(`ig_${element.id}`);
        console.log(`name ` + key);
        docRef.set({
          images: element.urls,
          caption: element.edge_media_to_caption.edges[0]?.node?.text ?? "",
          createdAt: new Date(element.taken_at_timestamp * 1000),
          member: key,
          username: element.username,
          link: `https://www.instagram.com/p/${element.shortcode}`,
          source: "instagram",
        });
        count++;
      });
    });
}
