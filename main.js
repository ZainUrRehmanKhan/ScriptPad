// Imports
import firebase from "firebase";
import {MongoClient, ObjectId} from "mongodb";
import * as fs from "fs";
import axios from "axios";
// import csvParser from "csv-parser";

// Firebase Setup
firebase.initializeApp({
    apiKey: "AIzaSyDNkhYP2qNLwxhujM9_2I5CTAAsELX0aLo",
    authDomain: "kings-of-the-curve-sonal.firebaseapp.com",
    projectId: "kings-of-the-curve-sonal",
    storageBucket: "kings-of-the-curve-sonal.appspot.com",
    messagingSenderId: "347848146862",
    appId: "1:347848146862:web:d1ed02b703921c4252523f",
    measurementId: "G-9FZQXBEEQ4"
})

// firebase.initializeApp({
//     apiKey: "AIzaSyAP5OKVuX3Eu7PxwlA70UM0a2N0i9-2u_M",
//     authDomain: "kotc-demo-622d7.firebaseapp.com",
//     projectId: "kotc-demo-622d7",
//     storageBucket: "kotc-demo-622d7.appspot.com",
//     messagingSenderId: "548050728632",
//     appId: "1:548050728632:web:1b1106c97eff45bd2be64d",
//     measurementId: "G-LY20XD2PB6"
// })

const db = firebase.firestore();
// db.useEmulator("localhost", 8080);

// const collections = ['v2_questions']
// const collections = ['admins', 'available_for_random_match', 'banners', 'current_matches', 'decks', 'endless_highscore', 'endless_mode_option_categories', 'friends_list', 'institution_requests', 'institutions', 'logs', 'option_categories', 'questions', 'review_mode_module', 'review_mode_questions', 'subcategories', 'user_stats', 'users', 'v2_categories', 'v2_current_matches', 'v2_endless_mode_preferences', 'v2_endless_mode_scores', 'v2_flagged_questions', 'v2_institute_confirmations', 'v2_logs', 'v2_notifications', 'v2_qbank_preferences', 'v2_qbank_score', 'v2_qbank_scores', 'v2_question_bookmarks', 'v2_questions', 'v2_review_mode_preferences', 'v2_review_mode_scores', 'v2_subcategories', 'v2_timed_mode_preferences', 'v2_timed_mode_scores', 'v2_users']

const client = new MongoClient("mongodb://localhost:27017/kotc--db");
// const client = new MongoClient("mongodb://api.kingofthecurve.org:27017/kotc--db");
// const client = new MongoClient("mongodb+srv://arish:1234@cluster0.kz2th.mongodb.net/kotc--db?retryWrites=true&w=majority");
// await client.connect();

// fetchDataFromCollections().then(r => console.log('Done'));
//
// async function fetchDataFromCollections() {
//
//
//     ///////////////////////////////////////////////////////
//     //// TO CHECK CANCELLATIONS AND REFUND IN FIREBASE ////
//     ///////////////////////////////////////////////////////
//
//     // const records = [];
//     //
//     // const col = (await db.collection("v2_webhooks").get()).docs
//     // for (const doc of col) {
//     //     const data = doc.data()
//     //     const json = JSON.parse(data.event)
//     //     if (json["notification_type"] === "CANCEL" || json["notification_type"] === "REFUND") {
//     //         records.push(json);
//     //     }
//     // }
//     //
//     // console.log(records)
//
//     ///////////////////////////////////////////////////////
//     ///////////////// GENERATE CSV FILES //////////////////
//     ///////////////////////////////////////////////////////
//
//     const csvWriter = createObjectCsvWriter({
//         path: 'options.csv',
//         header: [
//             {id: 'id', title: 'ID'},
//             {id: 'question', title: 'QUESTION'},
//             {id: 'explanation', title: 'EXPLANATION'},
//             {id: 'option1', title: 'OPTION1'},
//             {id: 'option2', title: 'OPTION2'},
//             {id: 'option3', title: 'OPTION3'},
//             {id: 'option4', title: 'OPTION4'},
//         ]
//     });
//
//     const csvWriter2 = createObjectCsvWriter({
//         path: 'boolean.csv',
//         header: [
//             {id: 'id', title: 'ID'},
//             {id: 'question', title: 'QUESTION'},
//             {id: 'explanation', title: 'EXPLANATION'},
//         ]
//     });
//
//     console.log('Processing...')
//     const records = [];
//     const records2 = [];
//     // const col = (await db.collection("questions").get()).docs
//     await client.db("kotc--db").collection("questions").find().forEach(doc => {
//         // console.log(doc.)
//         if (doc.type === "choices") {
//             records.push({
//                 id: doc._id,
//                 question: doc.statement,
//                 explanation: doc.explanation,
//                 option1: doc.options[0] ?? "",
//                 option2: doc.options[1] ?? "",
//                 option3: doc.options[2] ?? "",
//                 option4: doc.options[3] ?? "",
//             });
//         } else {
//             records2.push({
//                 id: doc._id,
//                 question: doc.statement,
//                 explanation: doc.explanation,
//             });
//         }
//     }).then(async value => {
//         await csvWriter.writeRecords(records);
//         await csvWriter2.writeRecords(records2);
//         console.log('...Done...')
//     })

// await csvWriter.writeRecords(records);
// await csvWriter2.writeRecords(records2);

//     await fs.writeFile('data/' + collection + '.json', JSON.stringify(result), (err, result) => {
//         if (err) console.log('Error', err)
//     })
//     // console.log(collection + ' Successfully Converted.')
//     // }
// }


// await migrate();

/////////////////////////////////////////////////////
/////////////// MIGRATION STARTED ///////////////////
/////////////////////////////////////////////////////
// async function migrate() {
//     console.log("Migrating Sub Categories")
//
//     const col = await db.collection("v2_subcategories").get()
//     console.log(col.docs.length + ' Total')
//     let subCategoriesMap = {}
//
//     for (const doc of col.docs) {
//         //inserting to mongodb
//         const insertData = doc.data()
//         delete insertData.id
//         subCategoriesMap[doc.data().id] = (await axios.post('http://localhost:5000/subcategories', insertData)).data.id
//     }{id}
//
//     console.log("\nSubcategories inserted successfully, now updating other data")
//
//     console.log("Migrating Categories")
//
//     const col2 = await db.collection("v2_categories").get()
//     console.log(col2.docs.length + ' Total')
//     let categoriesMap = {}
//
//     for (const doc of col2.docs) {
//         //inserting to mongodb
//         const insertData = doc.data()
//         delete insertData.id
//
//         const listSubs = []
//         for (const item of insertData.subs) {
//             if (subCategoriesMap[item.id]) {
//                 item.id = subCategoriesMap[item.id]
//                 listSubs.push(item)
//             } else listSubs.push(item)
//         }
//
//         insertData.subCategories = listSubs
//         categoriesMap[doc.data().id] = (await axios.post('http://localhost:5000/categories', insertData)).data.id
//     }
//
//     console.log("\nCategories inserted successfully, now updating other data")
//
//     //updating v2_questions
//     const questionData = await db.collection('v2_questions').get()
//
//     let questionsMap = {}
//     let count = 0
//     for (const doc of questionData.docs) {
//         console.log(count++)
//         //inserting to mongodb
//         const insertData = doc.data()
//         insertData.statement = insertData.question
//
//         //Extracting images
//         if (insertData.question_images) {
//             let imagesArr = []
//             for (let image of insertData.question_images) {
//                 imagesArr.push(image.image_url)
//             }
//             insertData.images = imagesArr
//         } else insertData.images = []
//
//         //Extracting pdfs
//         if (insertData.question_pdfs) {
//             let pdfsArr = []
//             for (let pdf of insertData.question_pdfs) {
//                 pdfsArr.push(pdf.url)
//             }
//             insertData.pdfs = pdfsArr
//         } else insertData.pdfs = []
//
//         //extracting videos
//         if (insertData.question_videos) {
//             let videosArr = []
//             for (let video of insertData.question_videos) {
//                 videosArr.push(video.url)
//             }
//             insertData.videos = videosArr
//         } else insertData.videos = []
//
//         if (insertData.choices) insertData.options = Object.values(insertData.choices)
//
//         //correcting answers
//         if (insertData.type == "bool") {
//             if (insertData.answer == false) insertData.answer = 0
//             else insertData.answer = 1
//         } else {
//             if (insertData.answer == "a") insertData.answer = 0
//             else if (insertData.answer == "b") insertData.answer = 1
//             else if (insertData.answer == "c") insertData.answer = 2
//             else if (insertData.answer == "d") insertData.answer = 3
//             else if (insertData.answer == "e") insertData.answer = 4
//             else if (insertData.answer == "f") insertData.answer = 5
//             else if (insertData.answer == "g") insertData.answer = 6
//             else {
//                 insertData.answer = insertData.options.indexOf(insertData.answer)
//             }
//         }
//
//         //populating categories and subcategories
//         insertData.subcategory = (await axios.get('http://localhost:5000/subcategories/' + subCategoriesMap[insertData.subcategory])).data
//         insertData.category = (await axios.get('http://localhost:5000/categories/' + categoriesMap[insertData.category])).data
//         delete insertData.category.subs
//         delete insertData.category.createdAt
//         delete insertData.category.updatedAt
//         delete insertData.id
//         questionsMap[doc.id] = (await axios.post('http://localhost:5000/questions', insertData)).data.id
//     }
//
//     console.log("\nQuestions inserted successfully, now updating other data")
//
//     await fs.writeFile('data/subcat.json', JSON.stringify(subCategoriesMap), (err, result) => {
//         if (err) console.log('Error', err)
//     })
//     await fs.writeFile('data/cat.json', JSON.stringify(categoriesMap), (err, result) => {
//         if (err) console.log('Error', err)
//     })
//     await fs.writeFile('data/question.json', JSON.stringify(questionsMap), (err, result) => {
//         if (err) console.log('Error', err)
//     })
//
//     //Updating v2_flagged_questions
//     const flaggedData = await db.collection('v2_flagged_questions').get()
//     for (const flagQuestion of flaggedData.docs) {
//         if (questionsMap[flagQuestion.data().question_id]) {
//             await db.collection('v2_flagged_questions').doc(flagQuestion.id).update("question_id", questionsMap[flagQuestion.data().question_id])
//         }
//     }
//     console.log('v2 flagged questions done')
//
//     //Updating v2_question_bookmarks
//     const bookmarkData = await db.collection('v2_question_bookmarks').get()
//     for (const bookmarkQuestion of bookmarkData.docs) {
//         let ques = []
//         if (bookmarkQuestion.data().questions) {
//             for (const q of bookmarkQuestion.data().questions) {
//                 if (questionsMap[q])
//                     ques.push(questionsMap[q])
//             }
//         }
//         if (ques.length > 0) {
//             await db.collection('v2_question_bookmarks').doc(bookmarkQuestion.id).update("questions", ques)
//         }
//     }
//     console.log('v2 Question Bookmarks done')
//
//
//     const collections = ['v2_endless_mode_preferences', 'v2_qbank_preferences', 'v2_review_mode_preferences', 'v2_timed_mode_preferences']
//
//     // updating preferences collections
//     for (const collection of collections) {
//         console.log(collection)
//         let count = 0;
//         let prefColData = await db.collection(collection).get()
//         for (const prefData of prefColData.docs) {
//             console.log(count++)
//             const subCatData = prefData.data().subcategories
//             const mainCatData = prefData.data().categories
//
//             let one = false
//             let two = false
//
//             if (subCatData && subCatData.length > 0) {
//                 one = true
//                 for (const item of subCatData) {
//                     if (subCategoriesMap[item]) {
//                         //remove item and add new
//                         const index = subCatData.indexOf(item)
//                         subCatData[index] = subCategoriesMap[item]
//                     }
//                 }
//             }
//
//             if (mainCatData && mainCatData.length > 0) {
//                 two = true
//                 for (const item of mainCatData) {
//                     if (categoriesMap[item]) {
//                         //remove item and add new
//                         const index = mainCatData.indexOf(item)
//                         mainCatData[index] = categoriesMap[item]
//                     }
//                 }
//             }
//
//             if (one && two)
//                 await db.collection(collection).doc(prefData.id).update("subcategories", subCatData, "categories", mainCatData)
//             else if (one)
//                 await db.collection(collection).doc(prefData.id).update("subcategories", subCatData)
//             else if (two)
//                 await db.collection(collection).doc(prefData.id).update("categories", mainCatData)
//         }
//         console.log("#########################################################")
//     }
//     console.log('preference collections done')
//
//
//     const scoreCollections = ['v2_timed_mode_scores', 'v2_review_mode_scores', 'v2_qbank_scores', 'v2_endless_mode_scores']
//     // const scoreCollections = ['v2_endless_mode_scores']
//
//     // updating score collections
//     for (const scoreCollection of scoreCollections) {
//         let colData = await db.collection(scoreCollection).get()
//         // let jsonData = fs.readFileSync('data/question.json')
//         // const questionsMap = JSON.parse(jsonData.toString())
//
//         console.log("Data Found " + colData.docs.length)
//         let count = 0
//         for (const cat of colData.docs) {
//             console.log(count++)
//             const catData = cat.data().answers
//             let answers = []
//             if (catData && catData.length > 0) {
//                 for (let item of catData) {
//                     if (questionsMap[item["question_id"]]) {
//                         item.question_id = questionsMap[item["question_id"]]
//                     }
//
//                     if (item.answer == false) item.answer = 0
//                     else if (item.answer == true) item.answer = 1
//                     else if (item.answer == "a") item.answer = 0
//                     else if (item.answer == "b") item.answer = 1
//                     else if (item.answer == "c") item.answer = 2
//                     else if (item.answer == "d") item.answer = 3
//                     else if (item.answer == "e") item.answer = 4
//                     else if (item.answer == "f") item.answer = 5
//                     else if (item.answer == "g") item.answer = 6
//
//                     answers.push(item)
//                 }
//             }
//             let myData = cat.data()
//             myData.answers = answers
//
//             switch (scoreCollection) {
//                 case "v2_timed_mode_scores":
//                     await axios.post('http://localhost:5000/timed-mode-scores', myData)
//                     break
//                 case "v2_review_mode_scores":
//                     await axios.post('http://localhost:5000/review-mode-scores', myData)
//                     break
//                 case "v2_qbank_scores":
//                     await axios.post('http://localhost:5000/qbank-mode-scores', myData)
//                     break
//                 case "v2_endless_mode_scores":
//                     await axios.post('http://localhost:5000/endless-mode-scores', myData)
//                     break
//             }
//         }
//         console.log(scoreCollection + " done")
//     }
//
//     console.log('score collections done')
// }

// await correctQuestions();
//
// async  function correctQuestions() {
//     console.log("starting")
//
//     let jsonData = fs.readFileSync('data/question.json')
//     const questionsMap = JSON.parse(jsonData.toString())
//
//     const col = await db.collection("v2_questions").get()
//     console.log(col.docs.length + ' Total')
//     let count = 0
//     for (const doc of col.docs) {
//         count++
//         //inserting to mongodb
//         const insertData = doc.data()
//         console.log(count)
//         if (insertData.choices) {
//             insertData.options = Object.values(insertData.choices)
//             // console.log(insertData)
//             // console.log(insertData.options)
//
//             if (questionsMap[doc.id]) {
//                 let mongoDoc = await axios.get('http://localhost:5000/questions/' + questionsMap[doc.id])
//                 let d = mongoDoc.data
//                 // console.log(d)
//                 d.options = insertData.options
//                 let a = await axios.patch('http://localhost:5000/questions', d)
//                 console.log(a.data)
//             }
//         }
//
//         // subCategoriesMap[doc.data().id] = (await axios.post('http://localhost:5000/subcategories', insertData)).data.id
//     }
// }

// await mergeScores();
//
// async function mergeScores() {
//     let i = 0
//     let mongoDoc = await client.db("kotc--db").collection("qbank-mode-scores").find().forEach(doc => insert(doc))
// }
//
// async function insert( obj) {
//     obj.type = 3
//     await client.db("kotc--db").collection("scores").insertOne(obj)
// }

// await shiftUserStats();
//
// async function shiftUserStats() {
//     const col2 = await db.collection("v2_users").get()
//     const col = await db.collection("v2_user_stats").get()
//     console.log(col2.docs.length + ' Total Users')
//     let count = 0
//     for (const doc of col2.docs) {
//         console.log(count++)
//
//         const data = doc.data()
//         let stat = {
//             user: doc.id,
//             name: data.name,
//             win: data.wins ?? 0,
//             lost: data.lost ?? 0,
//             match_count: data.matches_count ?? 0,
//             point: data.points ?? 0,
//             streak: data.streak ?? 0,
//             crown: data.total_crowns ?? 0,
//             timed_high_score: data.timed_mode_high_score ?? 0,
//             bool_blitz_high_score: 0,
//             review_high_score: data.review_mode_high_score ?? 0,
//             qbank_high_score: data.adaptive_qbank_high_score ?? 0,
//             endless_high_score: data.endless_mode_high_score ?? 0,
//         }
//         let flag = false
//         for (let doc2 of col.docs) {
//             if (doc2.id === doc.id) {
//                 let data = doc2.data()
//                 stat.total = data.total_answered
//                 stat.right = data.right
//                 stat.wrong = data.wrong
//                 flag = true
//             }
//         }
//         if (!flag) {
//             stat.total = 0
//             stat.right = 0
//             stat.wrong = 0
//         }
//
//         await client.db("kotc--db").collection("user-stats").insertOne(stat)
//     }
//     console.log("==============================================")
// }

// await moveInstitutes();
//
// async  function moveInstitutes() {
//     console.log("starting")
//
//     let jsonData = fs.readFileSync('/home/zainkhan/PycharmProjects/kotc-iap-server/institutes.json')
//     const institutes = JSON.parse(jsonData.toString())
//
//     let count = 0
//     for (const doc of institutes) {
//         count++
//         await axios.post('http://localhost:5000/institutes/', doc)
//     }
//
//     console.log("Completed")
// }

// await showWebhooks();
//
// async function showWebhooks() {
//     let data = await db.collection("v2_webhooks").get()
//     for (let item of data.docs) {
//         const d = JSON.parse(item.data().event)
//         await client.db("kotc--db").collection("webhooks").insertOne(d)
//     }
// }

// await migrateBookmark();
//
// async function migrateBookmark() {
//     try {
//         let data = await db.collection("v2_question_bookmarks").get()
//         for (let item of data.docs) {
//             let listQ = []
//             for (let ques of item.data().questions) {
//                 console.log(ques)
//                 listQ.push(ObjectId.createFromHexString(ques))
//             }
//
//             await client.db("kotc--db").collection("question-bookmarks").insertOne({
//                 "user": item.id,
//                 "questions": listQ
//             })
//         }
//     }
//     catch (e) {
//
//     }
//     console.log("done")
// }

// await migrateQuestionComments();
//
// async function migrateQuestionComments() {
//     // let jsonData = fs.readFileSync('data/question.json')
//     // const questionsMap = JSON.parse(jsonData.toString())
//     db.collection("v2_questions").get().then(value => {
//         console.log(value.docs.length)
//         for (let doc of value.docs) {
//             console.log(doc.id)
//             db.collection("v2_questions/" + doc.id + "/comments").get().then(value1 => {
//                 let list = []
//                 for (let doc of value1.docs){
//                     const d = doc.data()
//                     list.push({
//                         "user_id": d.userId,
//                         "comment": d.comment,
//                         "username": d.userName
//                     })
//                 }
//                 client.db('kotc--db').collection("questions").findOneAndUpdate({_id: doc.id}, { $set : {comments: list}}).then(value2 => console.log(value2))
//             })
//         }
//     })
// }

// await removePremium();
//
// //
// async function removePremium() {
//     // const ids = ["VNg8qB7Kg4QDjcTNyJCJ6nk11bg2","Urr4MAuDLZWHCuHjNPtXMpkIxlA3","m4oJF3mrCkd0GpLhRJXkPsB7Xs82","w3CoSkhcKrdn1zmhVmR00DGaLr22","HnGLv3fSv1Q645IX7pAB7eFPNbS2","6oqBcvyJgLW4DnTquh2RezxunKI2","3eqmEpb6cfTNBdkdEHwea0WIO722","WOnwDHJP1wfxJB5FT8SZTOG1XKn1","GbZEsz5hB9YVHZYdJlUPcbd5Iip1","VcrBxTrj1AQzAMXAIhVugky4I7s1","2IJLViCgpkacRo2WZkGd8EuuJ7V2","u2XQXIpX6VVwJZ9KdUp1Lu87dmw2","T5zppzxU1uQEV6JuD5D1lpNjqiC3","qukU3D2mkfPMu93nUfaWE9QP71A2","4b8IOLh40rRn46IpoQFQjGJiRFJ2","eJG5HLkIzUN98O8fnwB8aw1cM6A2","Cr3kDiuJrOSdbsqabkDWBXD67QE3","LJwC2hWrzmfRRzzkwwGYIZ7ImxK2","Dr9otBU4SIdlsqgJ93CKNrqWObD2","zlQZib00EfbWYP3Z1u60adx0jPb2","eYjVGe5lCNTh1Y2KCMl88b4o2DM2","zbY0umzydhcfRZtqBoVbTGgqMcu2","EIeNFvWDnKU5Sy4DPhunDFYVemr1","bl0jydbb01TL5yfWopG8jjr110r2","6CLAA3SQO6SBDn4FwwtBZkYFGw83","shiNCh6W87RsNwHSQX79gfS4wtk1","WxJZeqB6yUVp2Ca1LGJ9oTwinWu2","pUcS0lILZ7gzVqGNuJafyWRLTaz2","RttjadAhYeUmDsYoozKa9sCW3w62","FeyGOK30KxdYKEwpEQhQYfTGBxr2","SUwjdsq57KbDWp7R9XS0EGiexTf2","6a0flHK3gaMkSM37c1WknkfRXXJ3","EiMpmgUmjkSdTD7rUx0btauRW293","JW3qtGHbfYdPhSl6tYO14AZwwgi2","Bqk2xj2KdBbub0cA0sLQhhTxlH02","GJuwgPcZ81NvvdttDQkOlOP7hMx2","L34Zv4HIbGap0PVLh1RNuwnH4732","XMEJI4HqhCQL4xferhSb9EEuB7e2","19eRxqUIAsNZvQuL1bXdDS61seH3","TprtaLNb6eVko46cd6Ly4m4u5932","m9P1UBIxJ1gYy3gdYlQizdE00hD3","TInyQmvLtyWWD0MAOkyqIEhoItv2","AXq09UJfdvRvJMLrVbfZvi7xlCJ2","tI9yUvaZ0fTTABgeRF2qbEJ2mMx1","nIKqthEbxVVkmWLo1PGCNqzWADo2","jQZ8WslfqTbopxavXsNfA8gyVCn2","Bjnsi9iId4e6aBkwEAgg3RKDwYq1","4KnaeanV2dYz85uxPn44PzjdiTG3","HAgVZqYFVXO8iGCoRlNAEoolW4H3","zAvKcCWTHaQ6bJwRMhqOlmkOmvU2","TGKVwZDFPvXIPDPhXuQp5bH7Izo1","ZlsCQNCOKbfNTzNP31Y62HqxUwg2","rOvSy8IOXzPiFMiRRmc7aOYzHur2","AGELw88uy8MIfTOhOo5LjCBhk4y1","TaGjaGQuYpem6UT4whzUzJyuAB52","6nd89S6PfRW6nhd4SGXvBDYcDFq1","wgJQ75oD9XcnQDCgra273zPdOO52","iL0TWa2uSOcdcvS9DBC66lHVs022","zakkn6dTigQb1LukeWTuZOd2mTB2","pW5sWaRJD2gKenj32ZlR53FM1R22","KZBxst3wbkO0p2lFrPtHy7GM0eX2","BffeW0CWeHRY2OPMxRiRxTo1paS2","4hCbH3RdL9M6AgLpRwS6uwooPbs1","626kywRrlggttsMmXjQg7EzoI1p1","GBwEOkRDE3PA0je0lfdl709dYxI2","1o73OGVYiMP7kzEzsBizcXEJmpH3","J92wSZMqzsMl58a2oc2Uwdbjlu73","Lq0p8scsN0M93vnyxpmgcwlrQT02","hs3hAkarPbYl9ztQcQFVy4STycE2","CgOyD3EEoUZd9LUl2lFyiyXI8QD3","RQVjrbGfYCZKpGbxLfbeBDGA1j12","ANivpVzFnMgga1Gjixtpk7zoDF33","nTByWWtsGiNeP0xK2f28QEv7aeA2","uHbOS7UrrRhU7F8P0Faqqv0ZyMr1","0yDevugIX7gXmAxzwEuOX3GVFOD3","apr7dDHBUifoHCHXbV9uh6ZDb3O2","zD4q9B2FZcZiZ2n2tt909Wm3kdu1","nThpmAYxxAeNEJrU0KQNz6AIlRF3","smokqLYY3pgs8zbGoMPBd96eYrW2","4TnATBDYBfUyMFtq58QgV9AHcEy2","InJqrC4qK9QLO1EhlqFqI1sHPbF2","PP5awJUL7ZhmuLkB71iJ21yWYSh2","wnsGOhVIT9ftTjVKE6MBJIhAPg23","xlCTP5agp4ZqzydS7wxREQY4WXn2","cDKgDKMvhKaqksxMBGKHG1ctWDJ3","A1guhKLorMZ0rBj9jvSwwOEaXOC2","f0jM3QqcHlT0uqVRBAXY40kCOqY2","BkSALCP9KcUkuurwBKLLi8X41IF2","kWxJHBwguGg0oiurwhhuQeeTvjy2","n4AxADHlcRdK25o3iEYPXFh0Xh83","x2gfkP3ST2fBCjl9TIE9KRFYJzr2","age6BfktAsdtUJktSoSu30CIYOK2","UEogDe3yRGZbEvTWywgxayR7bHa2","H7lzsQy5WlOrCaEM5grz4qMovDp2","nLZ8TPvNizfVRWnB1tbbnqlFHph1","mCZGPyVY6iUUWxgoZtkFSdL03ua2","U8jUpT7XMQNdENeHfHIWurTmRQU2","emk2j9zt7HglL41ERAKZ7Rn4pyW2","8NAQM3N4YbTKbteXgXsLIeWf5NM2","wsRWOzJmOve3VFpmepR76Z1yD412","sx2IjS1SNTgyrVCpBaMAJqzXO8s2","yPTIsjUWowO3rjdhtxxKhpWCgxA2","ig4sRL0doIOIFm5s5qfeLfU4MFv1","3XwuU8sz3le9lZIl1ZEmrEJLHUx1","qN4CHe8WPQWePMORoIuP3JPAQB83","zswCFg1NBlaY70b7wco3H3SFWkV2","7QcqvtKJyoRziPD1hGMvabh30Lm2","RxVOeVcdqtNlPsWLdiZNpDYlp742","rB4uHS5Ba1f72MnfQzXAkE6fJ9D2","REuBUoSW9jdC7lLdEMpPhLIGHi23","8yEDrSXDOeYYxaldvG0tiIfOlva2","VuFVgQkBE2by4xDgToWDZPeJix73","ezCYzMp3GwcoWxmEEzuDFyY2jNK2","25jR24icUANZK22cTPReUodvpMm2","evwjDt3ybRTbNQCJlK1WPvS31xI2","RRE0pOdBtkQrmealR6Ayfme1rQk2","LHZPWR6MpJPQi92oRJqyhFlMKHW2","wRZWgidKGmX05ZGQm7EskNZ6AiR2","A5auACUvwBeeAs4WWBAACpI6HWj2","VNd1WUq4TAWN1unuxEFBXOQxrxY2","XwwifeHeyUgP6FrBVqClcFjzBE63","kuWw9QwRzHUDfbBpcUlA0LG1AJp2","XJdLNmmOZMTPUCB4M8HjfVkdCDf1","I0Llk3T7jBUIBAjgeXqESwo3UkI3","31QWykIVQMcjsIUOWs6w0gRsWHw2","UjgMuRcdazZq5pwcIV7i166EOtt1","Qd43VPvssIOiWh5CpgBJzaqEeXI3","1GjoUO8NNsggi8q79As8TsWv7Nn2","H71zEViTL4Q0WXzkEOGCgLE73pp2","E7PEwEgj51dZ79VDZURpXwdrMYC2","nSqKyRS2WMRJWWhHndHaUYAJSr62","plvM1ikCv6Y54VFQqNAJ6YE81Uh2","1TGbBHP1SPfTKOxvsA7ejP3CA132","uLf5IAkz3gUUNwC0y40rscJPo2J2","upHYtGgKTtQl77NhfNS7Zj6iZgL2","aiPb6sV7V5aCXLkTZnXzWqHvuJ23","rR2kE2H0JmZrY56gp31C3HXuFy73","doubLn4LhwhQdgXZmJwjsIeYy4r2","DF6UiFJFvST0v641vQsAt1No2RA2","OBq986JrTohLnlVBPEkgoFuVlq12","W7oINrgqbzSZQLBFFvhdEScGnAG3","pMqvmvdxd9MGHQRuQg8v7C5NnTF3","JFYm7mi5ZffSqdO2YDu8XsyutYj1","TtjoFVhBIjeAP1rxcyvGRkLNojf1","VPVSxAIUPTW0GhnpiuwF5YFv4J03","kOFiPB5CkwMonLs5c5ApjskrcU72","trepy1vhvjRkuaWnUzNYPNZ17k22","NwZ5LRG4FnO76MRNJCWvoHjDEcx1","wt4WEwLaBkaatxzIic2pIou5cjs1","Zv9CnGk4TabOOcrgajUMbBJxTyT2","DtpSorfiCvTZBruyzPVhIfS3EtN2","YpTohiId7AetguJZwuITB2Wzie43","86Be5cu4dthcnAbKKcxZZbYbCaE3","tnXy2ky862R4YzYVx1x8vnscIul2","Vq9P4Rahfhc0CGCzyY8Qp3AcGHN2","7hEnioTm1Bh5SowXHxsJWiWlxMn2","B9626Z4o4ihWHhLPHgIUIgFBzYK2","K7AoemFwtReQkhCydERXV8nY9lw2","xsooGg8AEMZCZHeKD4NXZEsUAiP2","VzicdnYypXcy9FL5DjHJhiCvArL2","JtLcolWKLZeWJ0DHxySavLZgF7l1","NHNIHQdNcqNFe6Zi1Et6rMJwdUr2","LAW4p7RXQceYa4dufZ6vLK4M0UI3","g8XH8c8XnPXXaRJIrby5UQjiQTw2","ab6fRJsx3jaPswUck4lPRsi1OSe2","i6VLgq8Jsth5m7GFqQzTCleNqth1","TUYQZfQbZUORKTetKLMM1jOd08T2","kDTNV7v6ochArLqG4bpEX0s0QGy1","ukZ3osPwYfeHH2ykCjDqHRaos2D2","jU9DmungSlY2fF22S7GuF0QW8De2","rEY5PdWtKLQB9Jq6ezoQ51qlkH03","YfvZqINziYeXjdhmVgygzxmiRB92","QBRbGlTMHZUcQE4MkrpKEOXvP4V2","tPiVa3D50jhNNb2Y7y07wq5mrAl2","65vJL4i2P8MwEzKM1H0rGWkItb53","2pxzR8vwl3dtw2IumYjL1UgHbxv2","QaT8xnZEssV6HUVmWWGeHS8ajy73","SZxpysPkXCQENKKFjEKTFqobLw73","CXHllJzgxMYEFVjjbLFs4eHgydn1","q4rBBOYRlZeZA1gX36otxhUfiun2","pucPTDIvO9WNkmC6Imu8tyAK4wE3","luFudMuqPbgNTR19JzUsZ9QpQP12","wDtYKrSiJTdWh0ufFV07JDtKsWF2","aNVNIOUzvtXT9cfPprghSrTg1663","Q1yeK3xReOXnvMX4MWoByS487aN2","1jtduqHPgKR42FXtYPWosACz0ig2","retGnqKoarQAlAuIyAKTPQWMFQ73","zjMMoV8z1KbkKzU2bFMJNwlsAJz1","yGGKkSmMItesI45IxbSrARlNuH02","9JGitPicqrNJpiC7pSWIGfW223F3","G2jxoXb2G4Uv5NPtWArO4Jcek6o1","hVhtv4CoMJPdzxMXGTIGkY0si2l2","bN2nuijG5hX3gMMu73r24GxD6xg1","5gkeLjeuJDRZu0SoVaok6XUP3z42","Skfx6Gk40gTF587H0yhu4Xaoe4F3","CGgNh0GX8TQ637728Dw0t9lJevO2","1jKPKGOrWwRRedHRZv8b54hnPl02","u6eu59Ai94S1p7MaajrFbC9k0Uo2","xRMH34HvOkPoZVFqaoz0iruTY8P2","64RzAQAwpFO0SBIsPnbTXPMQB4h2","kSdvw3zulaPyvr9iurzgyeHm7Lw2","BhKXz5i1mJgdAeGCjne00LxNUvx1","Zbn0BYRlGcUcY2b3m0bnFNmG1Jq2","h6M8uPXNh1hMwXqqdbTQO1zyPOB3","n2zSDdnfapU7dNSRqKPPMLwpJD92","1zb9cUlP5XXIvGCuOzOgN5NGmIl1","rCsUwQTpuGNcz4PKIENAwJVZG6B3","LkIjU0YgcxfFuT07PPYTAwUQDDv2","J72TUeoUrqcImZP0RNti3nZOIOP2","34DGLhp0kXPA3R1PiVslxCeReM82","35jz8LQE5oVMYeSiJVU5YaJaB3G3","zsA1GB7jpzNVfM4IQMX1DTGGGGx2","bZAG5pGm9edn0xg9igHpvAOSdaq2","lW8BSwHFwghi1D6e3pXz6wnDVKH2","PfzIujdSmVhiT9Qksjbo5jep0vv1","qaTCnemE7Ge9XSD64yqXI03Mmiq1","lv4tGwQyF9gQoSzHbC3xaW7Jk292","hdRzc2CagKfBLiwd2fLHJhMAQNu1","f8UbVhdQxoOzlXL8dmmbKimutlY2","8QgCmfsfUlbzDx2j3bEbuxDEyPl1","vmZKvsYb0qZiJpAhuxbwd0g8w8y1","T3P7jHZ5TKhkBpwKdjnGnvcJxn92","6OYdYM3ciKY7xaMlWGka8Y1gcbI3","Qi8uqg7jIgcrFTxiCzc4f2Abxeu2","9bUov1NWnfQrKEzexozlIPkjTXJ2","0LoU09l476P8HLiPuP47hlwi5tY2","Gl9yfZsc1lWP5SHuDDfp53RDMDE3","fxDQTjbp7caGNvH8OPdn1pCgyUX2","oECYtL9xenU3mryMGuoBUgwWQaw1","fCcOmNjsNwOYrUcFHpToqWRsLK93","ZPdz7X1IssPhM5rHbEEyRH0iOCl1","LdzNmB51hxSINLXKL1gYBU34fwk1","uHn1zVbkLffdZtAhXW99uPss9bK2","aA4HHEgWFhTpqVKaIUotgSI6NS63","UubH27n4COTkLOim7i1hU6V8G8x2","g6SHtaydT0QBwn9u289wM73N2sF3","UawqMLBE3vNCqjOryXlpCLhkTLB3","ldGbisCvBGb35O5diaui4Tmfg6g1","Wd9qoPNlhlYiIg8ufWwPBChPrQR2","4DPFbypnD2aYww27so4pa3Bd0Kf1","o8dbQJGRJiXJ5OKx63avZAA0lNF2","fcbelO54bBfKnZ2TVGRKGD2rvq92","0ceu9zHMsXTXwJYFdTyCbHEe0h83","5B8944wN2UeqF3QWnnrG61ckBu42","8LChWJCcfMgFkXmCAVCZvLFg08Y2","i8USqJBDFlejjzCrLpDsz0x4zYj2","vDSSt76QfhepCjsoM3IHQu2cN6j1","QyWBPhgOH8MeVdqLH4LiUjFHqBv1","7yz0Mjm06edf1JCDOV4yW8k8Z6B2","2BmRteqNzIgdJ32Y4SiVMbhUVfu2","UFOsBK1qZhUf2jK8SDfdCe0Ijki1","CSonjNtofhVVDLvjYdeuLIPxyiM2","IOiYPpUigMYWtTsXOqaZAEIoYcm1","UBQu4SCBhTYpmx3NDvNiOHwH2fq2","oG1iXiqd0aPlhp46jXSt26tYtQl2","DV8jqAxcBsfe9xDgxJB5uQjpz033","YAXarDRQAEhoe3VU9eqOpw46ER53","ROjNa4UNzKeBkVFyS8SFKj2VQ9h1","rAa1I2v9ONVqckpZ5MkPVQTHkf13","W1pSUTxOOzePuL6NYVMqYdfdTIs2","Rzmn3uLkIDbZ4VWTHUrhoQpgZFp1","C9q4o6fcZLYMbAP5jc5WcFmUHTt1","rS3smdpFbdh6FfKFd0xCp4E9DzM2","nmZeO7ADVhNABJ34Vu33i6lXTZI2","LJZeJ2foZbgUP09C1tJhZDFknf63","K5NR6VwIA9adq36lBxHO1WwWHtB2","qmQNZNBHlddUWLfIz9baQ4e9a7B3","VWFD21TxXtfYX2nLraqtbfB8eVB3","HuvRQ8eDRoOlZWPQ72yDP1EcTUs1","nlqSNFv2HFccGXBM8xJub80wAhG2","mYQdkMk22EPB0uONjVkQ78tBkOv1","UYY28twzt8RMCzzI6UeeME1IUMG3","YKzAH2hxhZTI9EA0ama6LHlixXj1","qF6OypOCDfROun1AK2Zzhe9yaDf1","tOaFkxnBqySSzyfOBRfeOoyLzmA3","iNcifO5xn9Pi7grKNucoCgt0Gmw1","Yrg0Nj7SH9gkrfxMsZTnP1peb202","yDM3QBWw3hTJwOi3WFYD6aMr51x1","OQ5HCI1W71W4Nwi5kIH4oXFfCBv1","38ud2nKZvZdkz1lSijBCTkJqEst1","Yd8EhnSQLaenxQW6M48Bu0JDLE83","cqoCsxh7ZyUYmlG88ndETaDzN1x1","Qv0XmQXWschA0hRxb4ekH6qIUB42","wCY1UVHcIGW4VSb6CCl6g4RMbJN2","5ohFWv7RUzZBeZVl4jkm8A66uok1","RL6x3sE6UxgG6XKr9Hzv6PSZsQL2","PBuF9IYPZdfy3Iw1ZtbNVGaJ0Oe2","gjlZhmJObRWC3we3o55m1e3x7gt2","DZeVyLL7SvPzgUsWDYksUlyQjMP2","j7eqgmVUQBMm2syofrklHkfwiiJ3","sQuBhPNkuGO6ZKxQ9O0ObIPe9253","9FdK6onSK2ZJiWQ2DfEIYf5uy3K3","g1F8YEx7fPhbdzR4p9oJQkptM7l1","R7OkdDKO2TZLZkkJYm6stzaesQC2","BV40231U9PhiA86jkxFTBmPXEpb2","JBdi1EtcI7YRsmfaYUOnryVoEfv2","ychb2ygUoeb5CkNkbFchXAyFX3m1","JlUTwQxQ0Ihf9YBQRAc9HEOLUgf1","zrOACMhprCMuSwujbxxmv7Tvx0v1","8gsEbVUXC8XTwusdQMvwUKp8e5g1","Zo2W9baaT3XgApYjSfH4uFeneAn2","MS1Sjym0b5UDI9bvuH8Tv06XVKY2","vHwfR7T2RFU1D2CtiCZ2hOHVSXI3","BZPKhf9Di4WN4hdewdDtneYfeaQ2","swVL0PInNYS4C6ICd4VDYU6Ld9Q2","CsCW06iR4pTlcNgtyJCSmTiicdo2","0pK7ZvUg6rMxNglBnM3hp7cr4wf1","FzUjEGKfKlapa2X8qHpFlz83h3P2","HgiqXsWHsnUBf8MGfcgzqrxAvLL2","BjljHEOaYEZMzuDMGaiGKlSNXhc2","TsRSwIcs2IWrLXIDRD8YoGh7Z5G3","BXaDRMClGLMjwI9Gjp7c1b6cTDg1","OFXdHCiZt7Nfv5C6oxyBWve7x902","d8cf84NjVtWyzyDe37dNxtdr0Aq2","ogTN5sdPu4W8hYDL30y5OgwG0R93","LOoKMPsHbBgBhiBCQ2h2TuCn38A2","kcfnpGc6zjPyOn8EUiAdgYgk2yl1","fwWNwbXC8ieRQ8LvpCneIz58dW83","5OtZHIw6CDWYbEZXwVf5kbSUxHH3","HX93FtCDzDTZEtfbW1YDbbztdeH2","JRokgAYsB2frB8gcnvQy1qrvVXz2","zb9kPNuC6CX03bYTUNU0kSamxUn1","bjtVgDCb7kS218L9KRZzrfzys3g2","G6JzHuXh2taES5WkgJS0aU71MC02","hVKhVwp7YESIO8iUng1ir9jAxYi2","lPcBlVKE2AhJtbT1IVYp66Kbf9e2","3W1MFlljfMUZ6VIiy7dveOoF9mc2","CY2i8K7vxwbro8THya2qcANx3sX2","vXvl5Hd6BRV9SO673oD3Fh9GVT02","Pu9nFr9gR2clqjXP4Y7bN3YZce12","5xW97kW1NESeEM26zUYMiricM802","TMwkj09o43OfgpCvlAFoytS4VSH3","q96TU1qO6QXUwJSMmfvaUDoAIfR2","aImRyzdQA5POUA0AD3irpXGUGxo2","YVusVNgSYzYBsN4HVwKxeb81dEu2","ZIQKUBvQPkcMQvxyeynG1rVAgkI2","8zSL6Ugl7BVCPXIATIJ6cN4lplw1","x7fXZztUbsaP98knjE0iqXT2Okl2","XZiyaQBqnOVuka5DdJR2BRM5Sqj2","f9uaHNxC6hRu4crCMdhtr4smCKE2","nZtiZYJANfV70ZNB8NVAVZS4kms1","t7DZk6XSjrXToevaU2sAAflbB563","LRhZ6YdBeTPE3QFNJHQUUWdwscs1","nSwNUPN7kuPp5DKm8LhKrAgUjca2","I9NtEpd7t1bNxC9qH1AJfmIUO2L2","fi09U3K8s9acFhFAz7yZ9TWPXsx1","H9DeexusIsaCORHwXTyy1xoAQIB3","xu7s1PK9OXbVlHdB5kY2ed8N7cY2","4IhL8mqIx7XdsxTrk1pONcrpx552","AoFJNUzUbFPCiSYEq7uj9tCxZ642","ir49e1fpL7Y6prIMwus5GUNqPHv1","Zx1j7TbPGSXTYtCLnQxzgl6q1T72","wZSsqR6mb3Tu7Ifc6526SatpT562","MoYYr2djmpQokD3W71T0WFtG4xx1","y0vtbpYy4iagWCVwliPwIvgGRZg1","apjIJu7yRwRW0ftNeEJyyEdA5fJ3","ggE22e55aTe6m0fdF0ehKIsSW3y1","thu4VJYcWzVlBD3MMCzDI4pVAW63","MGhpYilnvYPuc6NL8CQX1AyjAel2","h6PVz9I82PcQSj8GjyLmrPya8Hg1","ru5vKeBWGAh95kONtxdx05Gno3L2","64yKoHszmoahjlD0jPtCHZ8otZY2","pEB20j5LwcUzY1VwZyCP0IZZacp2","agmxp1oP4OgL4rRexPtuIY6kLYC2","nuvsp0rHykPnTjgZDRSPtKSyrYm2","e0UM7BiKh6Ra95kO8yxSKrCahbp2","aADSo3w6aycgud54r8TZxC9Fb6s1","EJWK1tpA6mYJEZzPvbtcd4mRvom1","38NFfV29UrREm4RjK7xxtSEHixr2","neIkcjlozvWXo1sUf5EsQaBnOfc2","N4gq8hMvAZYd0DKG8uPAVeL4oN12","aIM2TjNTFkYYMGhWr66O47RgeKA2","tfznaOpIzsaVLB45gyx0uyzJZLe2","XuiputcfEAaGkPetIUCG8YhqTbY2","MVgk6AH8IiXoOWy8suYpCUmy25W2","zbSATRsZJMg5WBoMxnV14Ojofjk2","ZtnMK8GehChmklHuyf7MLDfuSiv2","wLsFIvmHPjZ0pA6l1lT730mb6De2","ZTQkZg7ZePYmda2Rx6yJJLvNnk03","uwzU81H7VgfYVrNEWx8ah2MP1RM2","BeroJd7ZFSTIWpCJM7KVdyFViCX2","Lk8WzALfEmZLND65OB48XCCh5Fw2","xdOOmHYMmRUsmH6zZcmqf73fjr23","WtXNn2l0jFYHOxMyz1LTyjS6zBr2","Lf7RwyZyP5RLz5jZ6n6N8cUjBH43","YjcbqrRW06dMt2rL35mhR8JNgbr1","NCWcMyd7oUcZWQ0wPa6XtNZjDky1","qZk2UohZSvWTCBmOVRSWkjwgTLm2","D03Kpo8PovSEodUuhtuFx722X803","mGmfHQAmyPcqKjuJOuenQv3H2Yh1","m9x9drFkLWdxo8ZdascVz5OAjel2","aVyQRDetuiSlws19vtsILnFKmp93","0UMnaaQQgpYXlPeGcCKv7Wczqo42","Fo6XXJaa1Ic6iJqLcY7lke9zqSx2","PqTneqEt2ScSOau0olbazLcGnLm1","P8G0OX6nFiYxVJLlYe2lHNybf6E3","CGYvRUroV5VcxD2K3EKJJ9bDUtd2","tLb2OfPma7OgPNQOxfBjogjeolO2","7MgRpsfs15UucytK2viq6V6iJuA3","kbL0EywIMraCUfQ9izW6Vhf6HsG2","MrRsbFBGMHbP0qmsorZOuG5HhIP2","DMnyU59H7TUB7F2wKIwxYkdwvUE2","CbM0mhNPMXUdVMAPOpuya30ghRN2","uPGaNUYdyHO3fCkumu6lAkcSoSF3","d1enxrl8ugMi5R4Mi2xiQEUVlhC2","7qTOPpKUmjgQDKI77LtvwUIIePS2","CqD8jtynzLbiVv43mHD1aS4AOq63","UdIdA1ibTlWukRlNdFUPL5EOhGd2","ppWYE54c8AbPkEPpO941A5X16Yn1","W0zUywWRJMUcZjqNqugQXkDAFFc2","TrTPDS8u1LVfA2PTFuJPk8uLxZo2","PRL9lE5735OOfiEdnMeNZFm7KjN2","c6YWvQE21qT60hHyNL5Ps81SU6t2","x2SrMBMBaHfYyFuz4d7uqIunBVj2","0SHkkO9bjbNiqxBPoTwzoJN1jBv2","l6jVMq8KyZWfMqQ01w92iVm4TUA3","qvrn891NZFVfqSDfJM4Od3Wy1h63","EqE9N2m2Olb1J3je0ymvAEjNTDH3","f4f80R1NMVSS3lybC0Ba4xAp0fR2","Y2JheTucFMcSOAHvNs5jO7kkQks1","ww7VJTSgSydMN0M9Ao4chtuZ1Yy1","XGlDfcwvUtQLk8uP2fZE9wVNfry1","BKwcZzX9EqX2pov8A9SJ7wzbSj12","0VfpxsINFdSsejVmwATeO4sAOzl2","L7pnOkY5GrYGRsF7TMXp2QvRUUt1","XXbxe54jIRW0MMV7migAC4ZQ2fZ2","6vr61Mh54YQlwoe1cBOON5UAQ5m2","Q9BqG9ipYMdL8IgoK2t8v9w7I4J2","yAN6nH66Aqf7G9XjqYiN5l57RqM2","z0tBhyx6zTf5qhPXQQ03ouNypa83","75haBclZOwhS7a5618W0AfYNlgS2","ZQmEkJqQQqVhu6FG6LQxTyZWu2G2","50ZyhEyuCmhOBCSNdbdkdPWMyYu1","VJrOtNw40YNrQLnSV6qocFTbroZ2","nZjW1QUndaToaVTUfi26W3atV0Z2","ckGUrqvt5bS0hgwGibc3IrF19kr2","SxwrMXtLISMYIc96qtShsWv2H6J2","uQLxho5Ka3UQJMGdcecPkB8l8PJ2","L4ZXQVGft4ei792hhcQoT41rjlY2","UB3P9CGhM0N7d367gOVcxDc5h7K2","IaXTpGTVEdfoFbCF954MNmul9dE2","1FO5mvHhPJhrRyKcSbLJI4JV3t32","QzeBPkV51pPTMzmDXr2QZ1JUQa93","Z23FR4gTqudNUiK2hfUTHq8sMBU2","YIVGsLKeapeWn3Onmc1YjjfOL9G2","jbFPdphy7NYu9VGqwa2Oa7LogCg2","nNmJeN1It3dXmCviqpIh0soUaER2","HH2YxaHwVJRGXVoh7vBqRklNEUj1","v38pcJWeI0gFF2pRbhL1e1c5WDo2","mK67oSjiMVNTTiShDvGmCxDVy8y2","EBAj4Qc0zRVus5ApxoYihS2fzv43","D99xVoVHaqRoASb3aOwEOqBwcZm1","jrH4OmPE1YcFTloHlCCGfvWdNvl2","EVRs2FLX08dVqhMEFPItNxq0M2d2","GcnnCTZjeIWvgPIvx3ZKpnZ3iGV2","TOBpfmof1EUzEzxADunM2XyTkdm2"]
//     const ids = ["VNg8qB7Kg4QDjcTNyJCJ6nk11bg2","Urr4MAuDLZWHCuHjNPtXMpkIxlA3","m4oJF3mrCkd0GpLhRJXkPsB7Xs82","w3CoSkhcKrdn1zmhVmR00DGaLr22","HnGLv3fSv1Q645IX7pAB7eFPNbS2","6oqBcvyJgLW4DnTquh2RezxunKI2","WOnwDHJP1wfxJB5FT8SZTOG1XKn1","GbZEsz5hB9YVHZYdJlUPcbd5Iip1","VcrBxTrj1AQzAMXAIhVugky4I7s1","2IJLViCgpkacRo2WZkGd8EuuJ7V2","u2XQXIpX6VVwJZ9KdUp1Lu87dmw2","T5zppzxU1uQEV6JuD5D1lpNjqiC3","qukU3D2mkfPMu93nUfaWE9QP71A2","4b8IOLh40rRn46IpoQFQjGJiRFJ2","eJG5HLkIzUN98O8fnwB8aw1cM6A2","Cr3kDiuJrOSdbsqabkDWBXD67QE3","LJwC2hWrzmfRRzzkwwGYIZ7ImxK2","Dr9otBU4SIdlsqgJ93CKNrqWObD2","zlQZib00EfbWYP3Z1u60adx0jPb2","eYjVGe5lCNTh1Y2KCMl88b4o2DM2","zbY0umzydhcfRZtqBoVbTGgqMcu2","EIeNFvWDnKU5Sy4DPhunDFYVemr1","bl0jydbb01TL5yfWopG8jjr110r2","6CLAA3SQO6SBDn4FwwtBZkYFGw83","shiNCh6W87RsNwHSQX79gfS4wtk1","WxJZeqB6yUVp2Ca1LGJ9oTwinWu2","pUcS0lILZ7gzVqGNuJafyWRLTaz2","RttjadAhYeUmDsYoozKa9sCW3w62","FeyGOK30KxdYKEwpEQhQYfTGBxr2","SUwjdsq57KbDWp7R9XS0EGiexTf2","6a0flHK3gaMkSM37c1WknkfRXXJ3","EiMpmgUmjkSdTD7rUx0btauRW293","JW3qtGHbfYdPhSl6tYO14AZwwgi2","Bqk2xj2KdBbub0cA0sLQhhTxlH02","L34Zv4HIbGap0PVLh1RNuwnH4732","XMEJI4HqhCQL4xferhSb9EEuB7e2","19eRxqUIAsNZvQuL1bXdDS61seH3","TprtaLNb6eVko46cd6Ly4m4u5932","m9P1UBIxJ1gYy3gdYlQizdE00hD3","TInyQmvLtyWWD0MAOkyqIEhoItv2","AXq09UJfdvRvJMLrVbfZvi7xlCJ2","tI9yUvaZ0fTTABgeRF2qbEJ2mMx1","nIKqthEbxVVkmWLo1PGCNqzWADo2","jQZ8WslfqTbopxavXsNfA8gyVCn2","Bjnsi9iId4e6aBkwEAgg3RKDwYq1","4KnaeanV2dYz85uxPn44PzjdiTG3","HAgVZqYFVXO8iGCoRlNAEoolW4H3","zAvKcCWTHaQ6bJwRMhqOlmkOmvU2","TGKVwZDFPvXIPDPhXuQp5bH7Izo1","ZlsCQNCOKbfNTzNP31Y62HqxUwg2","rOvSy8IOXzPiFMiRRmc7aOYzHur2","AGELw88uy8MIfTOhOo5LjCBhk4y1","TaGjaGQuYpem6UT4whzUzJyuAB52","6nd89S6PfRW6nhd4SGXvBDYcDFq1","wgJQ75oD9XcnQDCgra273zPdOO52","iL0TWa2uSOcdcvS9DBC66lHVs022","zakkn6dTigQb1LukeWTuZOd2mTB2","pW5sWaRJD2gKenj32ZlR53FM1R22","KZBxst3wbkO0p2lFrPtHy7GM0eX2","BffeW0CWeHRY2OPMxRiRxTo1paS2","4hCbH3RdL9M6AgLpRwS6uwooPbs1","626kywRrlggttsMmXjQg7EzoI1p1","GBwEOkRDE3PA0je0lfdl709dYxI2","1o73OGVYiMP7kzEzsBizcXEJmpH3","J92wSZMqzsMl58a2oc2Uwdbjlu73","Lq0p8scsN0M93vnyxpmgcwlrQT02","hs3hAkarPbYl9ztQcQFVy4STycE2","CgOyD3EEoUZd9LUl2lFyiyXI8QD3","RQVjrbGfYCZKpGbxLfbeBDGA1j12","ANivpVzFnMgga1Gjixtpk7zoDF33","nTByWWtsGiNeP0xK2f28QEv7aeA2","uHbOS7UrrRhU7F8P0Faqqv0ZyMr1","0yDevugIX7gXmAxzwEuOX3GVFOD3","apr7dDHBUifoHCHXbV9uh6ZDb3O2","zD4q9B2FZcZiZ2n2tt909Wm3kdu1","nThpmAYxxAeNEJrU0KQNz6AIlRF3","smokqLYY3pgs8zbGoMPBd96eYrW2","4TnATBDYBfUyMFtq58QgV9AHcEy2","InJqrC4qK9QLO1EhlqFqI1sHPbF2","PP5awJUL7ZhmuLkB71iJ21yWYSh2","wnsGOhVIT9ftTjVKE6MBJIhAPg23","xlCTP5agp4ZqzydS7wxREQY4WXn2","A1guhKLorMZ0rBj9jvSwwOEaXOC2","f0jM3QqcHlT0uqVRBAXY40kCOqY2","BkSALCP9KcUkuurwBKLLi8X41IF2","kWxJHBwguGg0oiurwhhuQeeTvjy2","n4AxADHlcRdK25o3iEYPXFh0Xh83","x2gfkP3ST2fBCjl9TIE9KRFYJzr2","age6BfktAsdtUJktSoSu30CIYOK2","UEogDe3yRGZbEvTWywgxayR7bHa2","H7lzsQy5WlOrCaEM5grz4qMovDp2","nLZ8TPvNizfVRWnB1tbbnqlFHph1","mCZGPyVY6iUUWxgoZtkFSdL03ua2","U8jUpT7XMQNdENeHfHIWurTmRQU2","emk2j9zt7HglL41ERAKZ7Rn4pyW2","wsRWOzJmOve3VFpmepR76Z1yD412","sx2IjS1SNTgyrVCpBaMAJqzXO8s2","ig4sRL0doIOIFm5s5qfeLfU4MFv1","3XwuU8sz3le9lZIl1ZEmrEJLHUx1","qN4CHe8WPQWePMORoIuP3JPAQB83","zswCFg1NBlaY70b7wco3H3SFWkV2","7QcqvtKJyoRziPD1hGMvabh30Lm2","RxVOeVcdqtNlPsWLdiZNpDYlp742","rB4uHS5Ba1f72MnfQzXAkE6fJ9D2","REuBUoSW9jdC7lLdEMpPhLIGHi23","8yEDrSXDOeYYxaldvG0tiIfOlva2","VuFVgQkBE2by4xDgToWDZPeJix73","ezCYzMp3GwcoWxmEEzuDFyY2jNK2","25jR24icUANZK22cTPReUodvpMm2","evwjDt3ybRTbNQCJlK1WPvS31xI2","RRE0pOdBtkQrmealR6Ayfme1rQk2","LHZPWR6MpJPQi92oRJqyhFlMKHW2","wRZWgidKGmX05ZGQm7EskNZ6AiR2","A5auACUvwBeeAs4WWBAACpI6HWj2","VNd1WUq4TAWN1unuxEFBXOQxrxY2","XwwifeHeyUgP6FrBVqClcFjzBE63","kuWw9QwRzHUDfbBpcUlA0LG1AJp2","XJdLNmmOZMTPUCB4M8HjfVkdCDf1","I0Llk3T7jBUIBAjgeXqESwo3UkI3","31QWykIVQMcjsIUOWs6w0gRsWHw2","UjgMuRcdazZq5pwcIV7i166EOtt1","Qd43VPvssIOiWh5CpgBJzaqEeXI3","1GjoUO8NNsggi8q79As8TsWv7Nn2","H71zEViTL4Q0WXzkEOGCgLE73pp2","E7PEwEgj51dZ79VDZURpXwdrMYC2","nSqKyRS2WMRJWWhHndHaUYAJSr62","plvM1ikCv6Y54VFQqNAJ6YE81Uh2","1TGbBHP1SPfTKOxvsA7ejP3CA132","uLf5IAkz3gUUNwC0y40rscJPo2J2","upHYtGgKTtQl77NhfNS7Zj6iZgL2","aiPb6sV7V5aCXLkTZnXzWqHvuJ23","rR2kE2H0JmZrY56gp31C3HXuFy73","doubLn4LhwhQdgXZmJwjsIeYy4r2","DF6UiFJFvST0v641vQsAt1No2RA2","OBq986JrTohLnlVBPEkgoFuVlq12","W7oINrgqbzSZQLBFFvhdEScGnAG3","pMqvmvdxd9MGHQRuQg8v7C5NnTF3","JFYm7mi5ZffSqdO2YDu8XsyutYj1","TtjoFVhBIjeAP1rxcyvGRkLNojf1","VPVSxAIUPTW0GhnpiuwF5YFv4J03","kOFiPB5CkwMonLs5c5ApjskrcU72","trepy1vhvjRkuaWnUzNYPNZ17k22","NwZ5LRG4FnO76MRNJCWvoHjDEcx1","wt4WEwLaBkaatxzIic2pIou5cjs1","Zv9CnGk4TabOOcrgajUMbBJxTyT2","DtpSorfiCvTZBruyzPVhIfS3EtN2","YpTohiId7AetguJZwuITB2Wzie43","86Be5cu4dthcnAbKKcxZZbYbCaE3","tnXy2ky862R4YzYVx1x8vnscIul2","Vq9P4Rahfhc0CGCzyY8Qp3AcGHN2","7hEnioTm1Bh5SowXHxsJWiWlxMn2","B9626Z4o4ihWHhLPHgIUIgFBzYK2","K7AoemFwtReQkhCydERXV8nY9lw2","xsooGg8AEMZCZHeKD4NXZEsUAiP2","VzicdnYypXcy9FL5DjHJhiCvArL2","JtLcolWKLZeWJ0DHxySavLZgF7l1","NHNIHQdNcqNFe6Zi1Et6rMJwdUr2","LAW4p7RXQceYa4dufZ6vLK4M0UI3","g8XH8c8XnPXXaRJIrby5UQjiQTw2","ab6fRJsx3jaPswUck4lPRsi1OSe2","i6VLgq8Jsth5m7GFqQzTCleNqth1","TUYQZfQbZUORKTetKLMM1jOd08T2","kDTNV7v6ochArLqG4bpEX0s0QGy1","ukZ3osPwYfeHH2ykCjDqHRaos2D2","jU9DmungSlY2fF22S7GuF0QW8De2","rEY5PdWtKLQB9Jq6ezoQ51qlkH03","YfvZqINziYeXjdhmVgygzxmiRB92","QBRbGlTMHZUcQE4MkrpKEOXvP4V2","tPiVa3D50jhNNb2Y7y07wq5mrAl2","65vJL4i2P8MwEzKM1H0rGWkItb53","2pxzR8vwl3dtw2IumYjL1UgHbxv2","QaT8xnZEssV6HUVmWWGeHS8ajy73","SZxpysPkXCQENKKFjEKTFqobLw73","CXHllJzgxMYEFVjjbLFs4eHgydn1","q4rBBOYRlZeZA1gX36otxhUfiun2","pucPTDIvO9WNkmC6Imu8tyAK4wE3","luFudMuqPbgNTR19JzUsZ9QpQP12","wDtYKrSiJTdWh0ufFV07JDtKsWF2","aNVNIOUzvtXT9cfPprghSrTg1663","Q1yeK3xReOXnvMX4MWoByS487aN2","1jtduqHPgKR42FXtYPWosACz0ig2","retGnqKoarQAlAuIyAKTPQWMFQ73","zjMMoV8z1KbkKzU2bFMJNwlsAJz1","yGGKkSmMItesI45IxbSrARlNuH02","9JGitPicqrNJpiC7pSWIGfW223F3","G2jxoXb2G4Uv5NPtWArO4Jcek6o1","bN2nuijG5hX3gMMu73r24GxD6xg1","5gkeLjeuJDRZu0SoVaok6XUP3z42","Skfx6Gk40gTF587H0yhu4Xaoe4F3","CGgNh0GX8TQ637728Dw0t9lJevO2","1jKPKGOrWwRRedHRZv8b54hnPl02","u6eu59Ai94S1p7MaajrFbC9k0Uo2","xRMH34HvOkPoZVFqaoz0iruTY8P2","64RzAQAwpFO0SBIsPnbTXPMQB4h2","kSdvw3zulaPyvr9iurzgyeHm7Lw2","BhKXz5i1mJgdAeGCjne00LxNUvx1","Zbn0BYRlGcUcY2b3m0bnFNmG1Jq2","h6M8uPXNh1hMwXqqdbTQO1zyPOB3","n2zSDdnfapU7dNSRqKPPMLwpJD92","1zb9cUlP5XXIvGCuOzOgN5NGmIl1","rCsUwQTpuGNcz4PKIENAwJVZG6B3","LkIjU0YgcxfFuT07PPYTAwUQDDv2","J72TUeoUrqcImZP0RNti3nZOIOP2","34DGLhp0kXPA3R1PiVslxCeReM82","35jz8LQE5oVMYeSiJVU5YaJaB3G3","zsA1GB7jpzNVfM4IQMX1DTGGGGx2","bZAG5pGm9edn0xg9igHpvAOSdaq2","lW8BSwHFwghi1D6e3pXz6wnDVKH2","PfzIujdSmVhiT9Qksjbo5jep0vv1","qaTCnemE7Ge9XSD64yqXI03Mmiq1","lv4tGwQyF9gQoSzHbC3xaW7Jk292","hdRzc2CagKfBLiwd2fLHJhMAQNu1","f8UbVhdQxoOzlXL8dmmbKimutlY2","8QgCmfsfUlbzDx2j3bEbuxDEyPl1","vmZKvsYb0qZiJpAhuxbwd0g8w8y1","T3P7jHZ5TKhkBpwKdjnGnvcJxn92","6OYdYM3ciKY7xaMlWGka8Y1gcbI3","Qi8uqg7jIgcrFTxiCzc4f2Abxeu2","9bUov1NWnfQrKEzexozlIPkjTXJ2","0LoU09l476P8HLiPuP47hlwi5tY2","Gl9yfZsc1lWP5SHuDDfp53RDMDE3","fxDQTjbp7caGNvH8OPdn1pCgyUX2","oECYtL9xenU3mryMGuoBUgwWQaw1","fCcOmNjsNwOYrUcFHpToqWRsLK93","ZPdz7X1IssPhM5rHbEEyRH0iOCl1","LdzNmB51hxSINLXKL1gYBU34fwk1","uHn1zVbkLffdZtAhXW99uPss9bK2","aA4HHEgWFhTpqVKaIUotgSI6NS63","UubH27n4COTkLOim7i1hU6V8G8x2","g6SHtaydT0QBwn9u289wM73N2sF3","UawqMLBE3vNCqjOryXlpCLhkTLB3","ldGbisCvBGb35O5diaui4Tmfg6g1","Wd9qoPNlhlYiIg8ufWwPBChPrQR2","4DPFbypnD2aYww27so4pa3Bd0Kf1","o8dbQJGRJiXJ5OKx63avZAA0lNF2","fcbelO54bBfKnZ2TVGRKGD2rvq92","0ceu9zHMsXTXwJYFdTyCbHEe0h83","5B8944wN2UeqF3QWnnrG61ckBu42","8LChWJCcfMgFkXmCAVCZvLFg08Y2","i8USqJBDFlejjzCrLpDsz0x4zYj2","vDSSt76QfhepCjsoM3IHQu2cN6j1","QyWBPhgOH8MeVdqLH4LiUjFHqBv1","7yz0Mjm06edf1JCDOV4yW8k8Z6B2","2BmRteqNzIgdJ32Y4SiVMbhUVfu2","UFOsBK1qZhUf2jK8SDfdCe0Ijki1","CSonjNtofhVVDLvjYdeuLIPxyiM2","IOiYPpUigMYWtTsXOqaZAEIoYcm1","UBQu4SCBhTYpmx3NDvNiOHwH2fq2","oG1iXiqd0aPlhp46jXSt26tYtQl2","DV8jqAxcBsfe9xDgxJB5uQjpz033","YAXarDRQAEhoe3VU9eqOpw46ER53","ROjNa4UNzKeBkVFyS8SFKj2VQ9h1","rAa1I2v9ONVqckpZ5MkPVQTHkf13","W1pSUTxOOzePuL6NYVMqYdfdTIs2","Rzmn3uLkIDbZ4VWTHUrhoQpgZFp1","C9q4o6fcZLYMbAP5jc5WcFmUHTt1","rS3smdpFbdh6FfKFd0xCp4E9DzM2","nmZeO7ADVhNABJ34Vu33i6lXTZI2","LJZeJ2foZbgUP09C1tJhZDFknf63","K5NR6VwIA9adq36lBxHO1WwWHtB2","qmQNZNBHlddUWLfIz9baQ4e9a7B3","VWFD21TxXtfYX2nLraqtbfB8eVB3","HuvRQ8eDRoOlZWPQ72yDP1EcTUs1","nlqSNFv2HFccGXBM8xJub80wAhG2","mYQdkMk22EPB0uONjVkQ78tBkOv1","UYY28twzt8RMCzzI6UeeME1IUMG3","YKzAH2hxhZTI9EA0ama6LHlixXj1","qF6OypOCDfROun1AK2Zzhe9yaDf1","tOaFkxnBqySSzyfOBRfeOoyLzmA3","iNcifO5xn9Pi7grKNucoCgt0Gmw1","Yrg0Nj7SH9gkrfxMsZTnP1peb202","yDM3QBWw3hTJwOi3WFYD6aMr51x1","OQ5HCI1W71W4Nwi5kIH4oXFfCBv1","38ud2nKZvZdkz1lSijBCTkJqEst1","Yd8EhnSQLaenxQW6M48Bu0JDLE83","cqoCsxh7ZyUYmlG88ndETaDzN1x1","Qv0XmQXWschA0hRxb4ekH6qIUB42","wCY1UVHcIGW4VSb6CCl6g4RMbJN2","5ohFWv7RUzZBeZVl4jkm8A66uok1","RL6x3sE6UxgG6XKr9Hzv6PSZsQL2","PBuF9IYPZdfy3Iw1ZtbNVGaJ0Oe2","gjlZhmJObRWC3we3o55m1e3x7gt2","DZeVyLL7SvPzgUsWDYksUlyQjMP2","j7eqgmVUQBMm2syofrklHkfwiiJ3","sQuBhPNkuGO6ZKxQ9O0ObIPe9253","9FdK6onSK2ZJiWQ2DfEIYf5uy3K3","g1F8YEx7fPhbdzR4p9oJQkptM7l1","R7OkdDKO2TZLZkkJYm6stzaesQC2","BV40231U9PhiA86jkxFTBmPXEpb2","JBdi1EtcI7YRsmfaYUOnryVoEfv2","ychb2ygUoeb5CkNkbFchXAyFX3m1","JlUTwQxQ0Ihf9YBQRAc9HEOLUgf1","zrOACMhprCMuSwujbxxmv7Tvx0v1","8gsEbVUXC8XTwusdQMvwUKp8e5g1","Zo2W9baaT3XgApYjSfH4uFeneAn2","MS1Sjym0b5UDI9bvuH8Tv06XVKY2","vHwfR7T2RFU1D2CtiCZ2hOHVSXI3","BZPKhf9Di4WN4hdewdDtneYfeaQ2","swVL0PInNYS4C6ICd4VDYU6Ld9Q2","CsCW06iR4pTlcNgtyJCSmTiicdo2","0pK7ZvUg6rMxNglBnM3hp7cr4wf1","FzUjEGKfKlapa2X8qHpFlz83h3P2","HgiqXsWHsnUBf8MGfcgzqrxAvLL2","BjljHEOaYEZMzuDMGaiGKlSNXhc2","TsRSwIcs2IWrLXIDRD8YoGh7Z5G3","BXaDRMClGLMjwI9Gjp7c1b6cTDg1","OFXdHCiZt7Nfv5C6oxyBWve7x902","d8cf84NjVtWyzyDe37dNxtdr0Aq2","ogTN5sdPu4W8hYDL30y5OgwG0R93","LOoKMPsHbBgBhiBCQ2h2TuCn38A2","kcfnpGc6zjPyOn8EUiAdgYgk2yl1","fwWNwbXC8ieRQ8LvpCneIz58dW83","5OtZHIw6CDWYbEZXwVf5kbSUxHH3","HX93FtCDzDTZEtfbW1YDbbztdeH2","JRokgAYsB2frB8gcnvQy1qrvVXz2","zb9kPNuC6CX03bYTUNU0kSamxUn1","bjtVgDCb7kS218L9KRZzrfzys3g2","G6JzHuXh2taES5WkgJS0aU71MC02","hVKhVwp7YESIO8iUng1ir9jAxYi2","lPcBlVKE2AhJtbT1IVYp66Kbf9e2","3W1MFlljfMUZ6VIiy7dveOoF9mc2","CY2i8K7vxwbro8THya2qcANx3sX2","vXvl5Hd6BRV9SO673oD3Fh9GVT02","Pu9nFr9gR2clqjXP4Y7bN3YZce12","5xW97kW1NESeEM26zUYMiricM802","TMwkj09o43OfgpCvlAFoytS4VSH3","q96TU1qO6QXUwJSMmfvaUDoAIfR2","aImRyzdQA5POUA0AD3irpXGUGxo2","YVusVNgSYzYBsN4HVwKxeb81dEu2","ZIQKUBvQPkcMQvxyeynG1rVAgkI2","8zSL6Ugl7BVCPXIATIJ6cN4lplw1","x7fXZztUbsaP98knjE0iqXT2Okl2","XZiyaQBqnOVuka5DdJR2BRM5Sqj2","f9uaHNxC6hRu4crCMdhtr4smCKE2","nZtiZYJANfV70ZNB8NVAVZS4kms1","t7DZk6XSjrXToevaU2sAAflbB563","LRhZ6YdBeTPE3QFNJHQUUWdwscs1","nSwNUPN7kuPp5DKm8LhKrAgUjca2","I9NtEpd7t1bNxC9qH1AJfmIUO2L2","fi09U3K8s9acFhFAz7yZ9TWPXsx1","H9DeexusIsaCORHwXTyy1xoAQIB3","xu7s1PK9OXbVlHdB5kY2ed8N7cY2","4IhL8mqIx7XdsxTrk1pONcrpx552","AoFJNUzUbFPCiSYEq7uj9tCxZ642","ir49e1fpL7Y6prIMwus5GUNqPHv1","Zx1j7TbPGSXTYtCLnQxzgl6q1T72","wZSsqR6mb3Tu7Ifc6526SatpT562","MoYYr2djmpQokD3W71T0WFtG4xx1","y0vtbpYy4iagWCVwliPwIvgGRZg1","apjIJu7yRwRW0ftNeEJyyEdA5fJ3","ggE22e55aTe6m0fdF0ehKIsSW3y1","thu4VJYcWzVlBD3MMCzDI4pVAW63","MGhpYilnvYPuc6NL8CQX1AyjAel2","h6PVz9I82PcQSj8GjyLmrPya8Hg1","ru5vKeBWGAh95kONtxdx05Gno3L2","64yKoHszmoahjlD0jPtCHZ8otZY2","pEB20j5LwcUzY1VwZyCP0IZZacp2","agmxp1oP4OgL4rRexPtuIY6kLYC2","nuvsp0rHykPnTjgZDRSPtKSyrYm2","e0UM7BiKh6Ra95kO8yxSKrCahbp2","aADSo3w6aycgud54r8TZxC9Fb6s1","EJWK1tpA6mYJEZzPvbtcd4mRvom1","38NFfV29UrREm4RjK7xxtSEHixr2","neIkcjlozvWXo1sUf5EsQaBnOfc2","N4gq8hMvAZYd0DKG8uPAVeL4oN12","aIM2TjNTFkYYMGhWr66O47RgeKA2","tfznaOpIzsaVLB45gyx0uyzJZLe2","XuiputcfEAaGkPetIUCG8YhqTbY2","MVgk6AH8IiXoOWy8suYpCUmy25W2","zbSATRsZJMg5WBoMxnV14Ojofjk2","ZtnMK8GehChmklHuyf7MLDfuSiv2","wLsFIvmHPjZ0pA6l1lT730mb6De2","uwzU81H7VgfYVrNEWx8ah2MP1RM2","BeroJd7ZFSTIWpCJM7KVdyFViCX2","Lk8WzALfEmZLND65OB48XCCh5Fw2","xdOOmHYMmRUsmH6zZcmqf73fjr23","WtXNn2l0jFYHOxMyz1LTyjS6zBr2","Lf7RwyZyP5RLz5jZ6n6N8cUjBH43","YjcbqrRW06dMt2rL35mhR8JNgbr1","NCWcMyd7oUcZWQ0wPa6XtNZjDky1","qZk2UohZSvWTCBmOVRSWkjwgTLm2","D03Kpo8PovSEodUuhtuFx722X803","mGmfHQAmyPcqKjuJOuenQv3H2Yh1","m9x9drFkLWdxo8ZdascVz5OAjel2","aVyQRDetuiSlws19vtsILnFKmp93","0UMnaaQQgpYXlPeGcCKv7Wczqo42","Fo6XXJaa1Ic6iJqLcY7lke9zqSx2","PqTneqEt2ScSOau0olbazLcGnLm1","P8G0OX6nFiYxVJLlYe2lHNybf6E3","CGYvRUroV5VcxD2K3EKJJ9bDUtd2","tLb2OfPma7OgPNQOxfBjogjeolO2","7MgRpsfs15UucytK2viq6V6iJuA3","kbL0EywIMraCUfQ9izW6Vhf6HsG2","MrRsbFBGMHbP0qmsorZOuG5HhIP2","DMnyU59H7TUB7F2wKIwxYkdwvUE2","CbM0mhNPMXUdVMAPOpuya30ghRN2","uPGaNUYdyHO3fCkumu6lAkcSoSF3","7qTOPpKUmjgQDKI77LtvwUIIePS2","CqD8jtynzLbiVv43mHD1aS4AOq63","UdIdA1ibTlWukRlNdFUPL5EOhGd2","ppWYE54c8AbPkEPpO941A5X16Yn1","W0zUywWRJMUcZjqNqugQXkDAFFc2","TrTPDS8u1LVfA2PTFuJPk8uLxZo2","PRL9lE5735OOfiEdnMeNZFm7KjN2","c6YWvQE21qT60hHyNL5Ps81SU6t2","x2SrMBMBaHfYyFuz4d7uqIunBVj2","0SHkkO9bjbNiqxBPoTwzoJN1jBv2","l6jVMq8KyZWfMqQ01w92iVm4TUA3","qvrn891NZFVfqSDfJM4Od3Wy1h63","EqE9N2m2Olb1J3je0ymvAEjNTDH3","f4f80R1NMVSS3lybC0Ba4xAp0fR2","Y2JheTucFMcSOAHvNs5jO7kkQks1","ww7VJTSgSydMN0M9Ao4chtuZ1Yy1","XGlDfcwvUtQLk8uP2fZE9wVNfry1","BKwcZzX9EqX2pov8A9SJ7wzbSj12","0VfpxsINFdSsejVmwATeO4sAOzl2","L7pnOkY5GrYGRsF7TMXp2QvRUUt1","XXbxe54jIRW0MMV7migAC4ZQ2fZ2","6vr61Mh54YQlwoe1cBOON5UAQ5m2","Q9BqG9ipYMdL8IgoK2t8v9w7I4J2","yAN6nH66Aqf7G9XjqYiN5l57RqM2","z0tBhyx6zTf5qhPXQQ03ouNypa83","75haBclZOwhS7a5618W0AfYNlgS2","ZQmEkJqQQqVhu6FG6LQxTyZWu2G2","VJrOtNw40YNrQLnSV6qocFTbroZ2","nZjW1QUndaToaVTUfi26W3atV0Z2","ckGUrqvt5bS0hgwGibc3IrF19kr2","SxwrMXtLISMYIc96qtShsWv2H6J2","uQLxho5Ka3UQJMGdcecPkB8l8PJ2","UB3P9CGhM0N7d367gOVcxDc5h7K2","IaXTpGTVEdfoFbCF954MNmul9dE2","1FO5mvHhPJhrRyKcSbLJI4JV3t32","QzeBPkV51pPTMzmDXr2QZ1JUQa93","j9pANKw0t6PruN0akQgdOjDrdJe2","Z23FR4gTqudNUiK2hfUTHq8sMBU2","YIVGsLKeapeWn3Onmc1YjjfOL9G2","jbFPdphy7NYu9VGqwa2Oa7LogCg2","nNmJeN1It3dXmCviqpIh0soUaER2","HH2YxaHwVJRGXVoh7vBqRklNEUj1","v38pcJWeI0gFF2pRbhL1e1c5WDo2","EBAj4Qc0zRVus5ApxoYihS2fzv43","D99xVoVHaqRoASb3aOwEOqBwcZm1","GcnnCTZjeIWvgPIvx3ZKpnZ3iGV2","TOBpfmof1EUzEzxADunM2XyTkdm2"]
//     console.log(ids.length)
//     for (const id of ids) {
//         db.collection("v2_users").doc(id).update("is_premium", false).then(value => console.log("Done: ", id))
//     }
// }
// let result = []
// let start = new Date('2021-12-07');
// db.collection("v2_users").where("is_premium", "==", true).where("subscription_to", "<=", start).get().then(value => {
//     console.log(value.docs.length)
//     value.docs.map(value1 => {
//         if (value1.data().purchase) {
//             let a = new Date(value1.data().purchase.latest_receipt_info[0].expires_date?.split(' ')[0])
//             if (a > start) {
//             } else {
//                 if (value1.data().is_premium) {
//                     result.push(value1.id)
//                 }
//             }
//         }
//         else {
//             result.push(value1.id)
//         }
//     })
// })
//     .then(async value => {
//         await fs.writeFile('users_with_wrong_premium_v2.json', JSON.stringify(result), (err, result) => {
//             if (err) console.log('Error', err)
//         })
//     })
// const purchase = user["purchase"]
// if (purchase) {
//     const latest_receipt_info = purchase["latest_receipt_info"]
//     const receipt = latest_receipt_info[0]
//     if (receipt["expires_date_ms"]) {
//         const date = new Date(parseInt(receipt["expires_date_ms"])).getTime()
//         const now = new Date().getTime()
//         const difference_In_Days = (now - date) / (1000 * 3600 * 24);
//         if (difference_In_Days > 0) {
//             result.push(doc.id)
//         }
//     }
// }
// }

// removePremium().then(r => console.log("==============="));
//
// async function removePremium() {
//     const premium = []
//     const nonPremium = []
//     db.collection("v2_users").get().then(async value => {
//             for (let doc of value.docs) {
//                 const data = doc.data()
//                 if (data.is_premium && data.purchase && data.purchase.latest_receipt_info[0].product_id !== "lifetime") {
//                     let a = new Date(data.purchase.latest_receipt_info[0].expires_date.split(' ')[0])
//                     if (a < new Date('2021-12-22')) {
//                         // if (data.is_premium) {
//                         //     db.collection("v2_users").doc(doc.id).update({"is_premium": false}).then(value1 => nonPremium.push(doc.id))
//                         // }
//                         nonPremium.push(doc.id)
//                     } else {
//                         // console.log(!data.is_premium)
//                         // if (!data.is_premium) {
//                         //     // db.collection("v2_users").doc(doc.id).update({"is_premium": true}).then(value1 => premium.push(doc.id))
//                         // }
//                         premium.push(doc.id)
//                     }
//                 }
//             }
//             fs.writeFile('non-premium.json', JSON.stringify(nonPremium), (err, result) => {
//                 if (err) console.log('Error', err)
//             })
//             fs.writeFile('premium.json', JSON.stringify(premium), (err, result) => {
//                 if (err) console.log('Error', err)
//             })
//             console.log(nonPremium)
//             console.log(nonPremium.length)
//             console.log("============")
//             console.log(premium.length)
//         }
//     )
// }

// await migratePreferences()

// async function migratePreferences() {
//     const collections = ['v2_endless_mode_preferences', 'v2_qbank_preferences', 'v2_review_mode_preferences', 'v2_timed_mode_preferences']
//
//     // updating preferences collections
//     for (const collection of collections) {
//         console.log(collection)
//         let count = 0;
//         let prefColData = await db.collection(collection).get()
//         for (const prefData of prefColData.docs) {
//             console.log(count++)
//             const data = {
//                 "subcategories": prefData.data().subcategories,
//                 "categories": prefData.data().categories,
//                 "type": collection === "v2_endless_mode_preferences" ? 0 : collection === "v2_timed_mode_preferences" ? 1 : collection === "v2_review_mode_preferences" ? 2 : collection === "v2_qbank_preferences" ? 3 : 0,
//                 "user_id": prefData.id
//             }
//             if (collection === "v2_qbank_preferences") {
//                 data.show_bool_questions = prefData.data().show_bool_questions
//                 data.show_choices_questions = prefData.data().show_choices_questions
//                 data.show_easy_questions = prefData.data().show_easy_questions
//                 data.show_medium_questions = prefData.data().show_medium_questions
//                 data.show_hard_questions = prefData.data().show_hard_questions
//             }
//
//             await axios.post('http://localhost:5000/preferences', data).then(value => console.log("-")).catch(reason => console.log(reason))
//         }
//         console.log("#########################################################")
//     }
//     console.log('preference collections done')
//
// }

// await get();
//
// async function get() {
//     let data = await db.collection("v2_question_bookmarks").doc("u8sIYmB2xcNoijAEzmXQESyzVGD3").get().then(value => console.log(value.data()))
// }

// await migrateFlaggedQuestions();
//
// async function migrateFlaggedQuestions() {
//     //Updating v2_flagged_questions
//     const flaggedData = await db.collection('v2_flagged_questions').get()
//     for (const flagQuestion of flaggedData.docs) {
//         const flagged = {
//             "question_id": ObjectId.createFromHexString(flagQuestion.data().question_id),
//             "reason": flagQuestion.data().reason,
//             "user": flagQuestion.data().user
//         }
//         // client.db("kotc--db").collection("flagged-questions").insertOne(flagged).then(value => console.log(flagged.id + " Done"))
//         await axios.post('http://localhost:5000/flagged-questions', flagged).then(value => console.log("-")).catch(reason => console.log(reason))
//     }
//     console.log('v2 flagged questions done')
// }

// func (n *institutesService) ConnectToInstitute() {
//     fmt.Println("starting...")
//     cred := option.WithCredentialsJSON([]byte("{\n  \"type\": \"service_account\",\n  \"project_id\": \"kings-of-the-curve-sonal\",\n  \"private_key_id\": \"11475dea7ebcb9925401c6fb3c111d957391a7b9\",\n  \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCDv+Wr13qDYVWV\\nnufPXlD180Ud9QyuXsf7Ao+nCwlyReQxXNXokWJDW1cakP4fN8EtpC94qydg+dTE\\nNFJS2XrwvoUdORt4rYgRmgpDHNCGmj1xGj4A5XWYG0Mq5E5OH9SUf4xEB5gBTpFJ\\nk6OGLfszpFvtwdfSlPF62VFdgm6ufavKDNX/97Spn3PzMJdyzTexU6J8/gEp4X6L\\nz6ZGfQI/BXHc8jDz37Nfbw3X7efCpCZsDWIQBInt/5Wy/IKGNzOjSBJJtQHaHka+\\n952JdD3qOy3aYottemMnGij/Cek5MWfIsHTATkP8D79sDx99DtP78iNNDGxgurbR\\ncKHXbw0tAgMBAAECggEAAIE+nDMaaZUbrOVUfZ8TChNUQSgWjjc6rH9XD34JShgh\\neCLGEoZ8dcYSVMlSRRBDlhuY0m1TqCrivD9gt2G9saLuWtX+r7oy3vd8vNpIGKVn\\nTMezAk7eyrePqevSgHMjaYoVOL7Jy45lYdvASyqQZV1+AfZ1spSn/MgHC0q7+wa8\\nNpoKWEeV4cJgoK2zP7yUxdX+E7HZaYMSypaMt+k+kiAeEQ//8cVEqJBW8SSgxSAW\\nTc5uKxSAu/SqCuXwLaa1xCO6Wa+coA8YmTw53Wgkco6VPyxQODsrsEfbQsPYdF8o\\n0717WunYcFj1yCaS8vEa8PEADdgK82jwT0YFzlvSkwKBgQC3v6O13c6SlG+WXDlu\\npJukWzV/9ULQyKQLBllzB/dZxq7qxfLTmGbzWqXLM6J3Ti90pSgR7yK292rSyPxX\\nXG1/9An0/x/L3PztHyJl4xjJMTP83oPYJRl7aeybcE3nk3BhsNvoHZdPf3vhJBRm\\ngbrGoTqipRkEU2rZh6zUcsT0vwKBgQC3jfmDVZ32x2eJS8ERYMjxHCkQ6t7N39dv\\n4bDrGDHbVuCwDT7t1O4kaYUkZxuSQLTY/fsR4965PkWfixSGNnVdMRQxEkc8iIL0\\nvW8tvN5chKN+VWuTLHUwZTA+kmEPGEUnR0la4tKsv7ol5QQen87duI7q99N1lWrW\\n0QxT7njdEwKBgCX+Uyx0q5T1aklN0nZFRQVr8pj9ro4bHohFDNPTLtr6UQqsWXRV\\nC9x/vs5QY+SFXxygVbO3nZb1e7oP4tVxgBa38CMfaYSusgGZsXQdy+815EkB/YMA\\n0M8K7OiLBSDABLm+ZwoMrE+8zXGVEz7KzkLp7YTZ3F1fnjVSb3MSNBVjAoGAFfSO\\nds4j4ePCF6MPCeQYxPZIVzSwx9FRdJl7TvOK6yB+KbC76TjB72sLuOn4W0sQFrBy\\nepZWCrRPIaFCKDeVXDtFngUArlXpzBpolQD1W/2ljLPs9SKpNcu0tJdPsr2FcAhP\\n1uYwqucX/fZhwsP8u3qa5bIVAgiISf+hSNzKai8CgYAy8RW8aDGmqY7O7ti86gGH\\nrOpv9tQEUHlaQaVLs+9TwInDMTh5mVzBHmWq7Y9HTsWKQ953v3ASGvMyf9/qLm6b\\nkywImrdbQbyvTDLZwN/lFhAeM0dpNfpItvPKCwPrcufNPx7FKqCn8IbjbjRqzkfn\\nyvPv0I3QsChEra2PTqjr+w==\\n-----END PRIVATE KEY-----\\n\",\n  \"client_email\": \"firebase-adminsdk-tpo6p@kings-of-the-curve-sonal.iam.gserviceaccount.com\",\n  \"client_id\": \"114493104750696303008\",\n  \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n  \"token_uri\": \"https://oauth2.googleapis.com/token\",\n  \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n  \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tpo6p%40kings-of-the-curve-sonal.iam.gserviceaccount.com\"\n}\n"))
//     app, err := firebase.NewApp(context.Background(), nil, cred)
//     if err != nil {
//         panic(err)
//     }
//
//     store, err := app.Firestore(context.TODO())
//     if err != nil {
//         panic(err)
//     }
//
//     iter := store.Collection("v2_users").Documents(context.TODO())
//     docs, err := iter.GetAll()
//     if err != nil {
//         return
//     }
//     fmt.Println(len(docs))
//     for _, doc := range docs {
//         data := doc.Data()
//
//         if data["institute"] == nil && data["email"] != nil {
//             domain := strings.Split(data["email"].(string), "@")[1]
//             if strings.Contains(domain, "edu") {
//                 fmt.Println(data["email"].(string))
//                 n.LinkInstitutionEmail(data["email"].(string), doc.Ref.ID)
//             }
//         }
//     }
//     fmt.Println("END")
// }

// deleteInvalidImagesFromQuestions();
//
// async function deleteInvalidImagesFromQuestions() {
//     await client.connect()
//     const questions = await client.db('kotc--db').collection("questions").find({
//         images: {
//             $exists: true,
//             $not: {$size: 0}
//         }
//     }).toArray()
//     console.log(questions.length)
//
//     // await fs.writeFile('all-questions.json', JSON.stringify(questions), (err, result) => {
//     //     if (err) console.log('Error', err)
//     // })
//     //
//     // let i = 0
//     // const questionsFixed = []
//     // for (let question of questions) {
//     //     let images = []
//     //     let flag = false;
//     //     if (question.images) {
//     //         for (let i = 0; i < question.images.length; ++i) {
//     //             await axios.get(question.images[i]).then(value => {
//     //                 images.push(question.images[i])
//     //             }).catch(reason => {
//     //                 flag = true
//     //             })
//     //         }
//     //         if (flag) {
//     //             question.images = images
//     //             await client.db('kotc--db').collection("questions").findOneAndUpdate({_id: question._id}, {$set: {images: images}});
//     //             // questionsFixed.push(question._id)
//     //         }
//     //         console.log(i++, '/', questions.length)
//     //     }
//     // }
//     //
//     // await fs.writeFile('fixed-questions.json', JSON.stringify(questionsFixed), (err, result) => {
//     //     if (err) console.log('Error', err)
//     // })
//
//     // console.log('Questions done')
// }