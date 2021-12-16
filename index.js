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
const fs = require("fs");

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
for (var k in listMember) {
  if (listMember.hasOwnProperty(k)) {
    console.log("Key is " + k + ", value is " + listMember[k]);
    console.log("get file " + `${listMember[k]}`);
    fs.readFile(
      `../${listMember[k]}/${listMember[k]}.json`,
      "utf8",
      async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const rawData = JSON.parse(data);
        rawData.GraphImages.forEach(async (element) => {
          // console.log(element.id);
          // console.log(element.display_url);
          // console.log(element.edge_media_to_caption.edges[0]?.node?.text ?? "-");
          // console.log(element.taken_at_timestamp);

          const docRef = db.collection("social_feeds").doc(`ig_${element.id}`);
          await docRef.set({
            images: element.urls,
            caption: element.edge_media_to_caption.edges[0]?.node?.text ?? "",
            createdAt: new Date(element.taken_at_timestamp * 1000),
            member: k,
            username: element.username,
            link: `https://www.instagram.com/p/${element.shortcode}`,
            source: "instagram",
          });
        });
      }
    );
  }
}
