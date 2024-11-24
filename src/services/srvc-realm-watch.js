import * as Realm from "realm-web";
const app = new Realm.App({ id: "miniland-rooms-qudptma" });

export const GetRoomNotification = async (item) => {
  const user = await app.logIn(
    Realm.Credentials.apiKey(
      "WyA2Sxipc07I3Wgc6BW5eh2ra1pcI6RFRSwWud1gLLWr5seZXt6v2PK9riyx00Vl"
    )
  );
  // console.log(item)
  const mndb = app.currentUser.mongoClient("mongodb-atlas");
  const dbse = mndb
    .db("trxnmodb9u24cohskemabswz")
    .collection("roomsuz24hdmuav");

  for await (const docx of dbse.watch()) {
    switch (docx.operationType) {
      case "update": {
        const { documentKey, fullDocument } = docx;
        // console.log(`new: ${documentKey.toString()}`, fullDocument);
        return fullDocument;
        break;
      }
      case "insert": {
        const { documentKey, fullDocument } = docx;
        // console.log(`new: ${documentKey.toString()}`, fullDocument);
        return fullDocument;
        break;
      }
    }
  }
};

export const GetLiveMessages = async (roomid) => {
  // console.log(roomid);

  const user = await app.logIn(
    Realm.Credentials.apiKey(
      "WyA2Sxipc07I3Wgc6BW5eh2ra1pcI6RFRSwWud1gLLWr5seZXt6v2PK9riyx00Vl"
    )
  );
  const mndb = app.currentUser.mongoClient("mongodb-atlas");
  const dbse = mndb
    .db("trxnmodb9u24cohskemabswz")
    .collection("memouzcxmbuw24s");

  const changeStream = dbse.watch({
    filter: {
      operationType: "insert",
      // "fullDocument.room": roomid,
    },
  });

  for await (const change of changeStream) {
    const { documentKey, fullDocument } = change;
    // console.log(change)
    switch (change.operationType) {
      case "insert": {
        const { documentKey, fullDocument } = change;
        // console.log("Full Document", fullDocument);
        changeStream.return();
        return fullDocument;
      }
    }
  }

  // for await (const docx of dbse.watch({
  //   filter: {
  //     operationType: "insert",
  //     "fullDocument.room": roomid,
  //   },
  //   filter: {
  //     operationType: "update",
  //     "fullDocument.room": roomid,
  //   },
  // }))
  //   {
  //     const { documentKey, fullDocument } = docx;

  //     // return  fullDocument

  //       switch (docx.operationType) {
  //         case "update": {
  //           const { documentKey, fullDocument } = docx;
  //           if(fullDocument.room != roomid) break;
  //           else return fullDocument
  //         }
  //         case "insert": {
  //           const { documentKey, fullDocument } = docx;
  //           if(fullDocument.room != roomid) break;
  //           else return fullDocument

  //           // console.log(`new: ${documentKey.toString()}`, fullDocument);
  //         }

  //       }
  //     }
};


// Function to authenticate the user
async function login() {
  const credentials = Realm.Credentials.apiKey("WyA2Sxipc07I3Wgc6BW5eh2ra1pcI6RFRSwWud1gLLWr5seZXt6v2PK9riyx00Vl");
  try {
    const user = await app.logIn(credentials);
    return user;
  } catch (err) {
    console.error("Failed to log in", err);
  }
}

// Function to set up the change stream and watch for changes
export async function watchCollection() {
  const user = await login();
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongodb.db("trxnmodb9u24cohskemabswz").collection("roomsuz24hdmuav");

  const changeStream = collection.watch();

  for await (const change of changeStream) {
    console.log("Received a change to the collection:", change);
    // You can handle the change event here
    // Example:
    if (change.operationType === "insert") {
      console.log("A document was inserted:", change.fullDocument);
    }
    if (change.operationType === "update") {
      console.log("A document was inserted:", change.fullDocument);
    }
  }
}

// watchCollection().catch(err => console.error("Error watching collection:", err));
