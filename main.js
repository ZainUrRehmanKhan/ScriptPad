// Imports
import firebase from "firebase";
import axios from "axios";

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
const db = firebase.firestore();
db.useEmulator("localhost", 8080);

////////////////////////////////////////
//// SKIP THE COMMENTED CODE BELOW /////
////////////////////////////////////////

// const collections = ['v2_questions']
// const collections = ['admins', 'available_for_random_match', 'banners', 'current_matches', 'decks', 'endless_highscore', 'endless_mode_option_categories', 'friends_list', 'institution_requests', 'institutions', 'logs', 'option_categories', 'questions', 'review_mode_module', 'review_mode_questions', 'subcategories', 'user_stats', 'users', 'v2_categories', 'v2_current_matches', 'v2_endless_mode_preferences', 'v2_endless_mode_scores', 'v2_flagged_questions', 'v2_institute_confirmations', 'v2_logs', 'v2_notifications', 'v2_qbank_preferences', 'v2_qbank_score', 'v2_qbank_scores', 'v2_question_bookmarks', 'v2_questions', 'v2_review_mode_preferences', 'v2_review_mode_scores', 'v2_subcategories', 'v2_timed_mode_preferences', 'v2_timed_mode_scores', 'v2_users']

// const client = new MongoClient("mongodb://localhost:27017/kotc--db");
// const client = new MongoClient("mongodb+srv://arish:1234@cluster0.kz2th.mongodb.net/kotc--db?retryWrites=true&w=majority");
// await client.connect();

// fetchDataFromCollections().then(r => console.log('Done'));

// async function fetchDataFromCollections() {
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
//     // const csvWriter = createObjectCsvWriter({
//     //     path: 'file.csv',
//     //     header: [
//     //         {id: 'id', title: 'ID'},
//     //         {id: 'question', title: 'QUESTION'},
//     //         {id: 'explanation', title: 'EXPLANATION'},
//     //         {id: 'answer', title: 'ANSWER'},
//     //         {id: 'option1', title: 'OPTION1'},
//     //         {id: 'option2', title: 'OPTION2'},
//     //         {id: 'option3', title: 'OPTION3'},
//     //         {id: 'option4', title: 'OPTION4'},
//     //         {id: 'option5', title: 'OPTION5'},
//     //     ]
//     // });
//     //
//     // const csvWriter2 = createObjectCsvWriter({
//     //     path: 'file2.csv',
//     //     header: [
//     //         {id: 'id', title: 'ID'},
//     //         {id: 'question', title: 'QUESTION'},
//     //         {id: 'explanation', title: 'EXPLANATION'},
//     //         {id: 'answer', title: 'ANSWER'}
//     //     ]
//     // });
//     //
//     // console.log('Processing...')
//     // const col = (await db.collection("v2_questions").get()).docs
//     //
//     // const records = [];
//     // const records2 = [];
//     //
//     // for (const doc of col) {
//     //     if (doc.data().choices) {
//     //         records.push({
//     //             id: doc.id,
//     //             question: doc.data().question,
//     //             explanation: doc.data().explanation,
//     //             answer: doc.data().answer,
//     //             option1: doc.data().choices ? Object.values(doc.data().choices)[0] ?? "" : "",
//     //             option2: doc.data().choices ? Object.values(doc.data().choices)[1] ?? "" : "",
//     //             option3: doc.data().choices ? Object.values(doc.data().choices)[2] ?? "" : "",
//     //             option4: doc.data().choices ? Object.values(doc.data().choices)[3] ?? "" : "",
//     //             option5: doc.data().choices ? Object.values(doc.data().choices)[4] ?? "" : ""
//     //         });
//     //     } else {
//     //         records2.push({
//     //             id: doc.id,
//     //             question: doc.data().question,
//     //             explanation: doc.data().explanation,
//     //             answer: doc.data().answer,
//     //         });
//     //     }
//     // }
//     //
//     // await csvWriter.writeRecords(records);
//     // await csvWriter2.writeRecords(records2);
//     //
//     // console.log('...Done...')
//
//     // await fs.writeFile('data/' + collection + '.json', JSON.stringify(result), (err, result) => {
//     //     if (err) console.log('Error', err)
//     // })
//     // console.log(collection + ' Successfully Converted.')
//     // }
// }

///////////////////////////////////////////////////////
///////////////// MIGRATION STARTED ///////////////////
///////////////////////////////////////////////////////

await migrate();

async function migrate() {
    console.log("Migrating Sub Categories")

    const col = await db.collection("v2_subcategories").get()
    console.log(col.docs.length + ' Total')
    let subCategoriesMap = {}

    for (const doc of col.docs) {
        //inserting to mongodb
        const insertData = doc.data()
        delete insertData.id
        subCategoriesMap[doc.data().id] = (await axios.post('http://localhost:5000/subcategories', insertData)).data.id
    }

    console.log("\nSubcategories inserted successfully, now updating other data")

    console.log("Migrating Categories")

    const col2 = await db.collection("v2_categories").get()
    console.log(col2.docs.length + ' Total')
    let categoriesMap = {}

    for (const doc of col2.docs) {
        //inserting to mongodb
        const insertData = doc.data()
        delete insertData.id

        const listSubs = []
        for (const item of insertData.subs) {
            if (subCategoriesMap[item.id]) {
                item.id = subCategoriesMap[item.id]
                listSubs.push(item)
            } else listSubs.push(item)
        }

        insertData.subCategories = listSubs
        categoriesMap[doc.data().id] = (await axios.post('http://localhost:5000/categories', insertData)).data.id
    }

    console.log("\nCategories inserted successfully, now updating other data")

    //updating v2_questions
    const questionData = await db.collection('v2_questions').get()

    let questionsMap = {}
    let count = 0
    for (const doc of questionData.docs) {
        console.log(count++)
        //inserting to mongodb
        const insertData = doc.data()
        insertData.statement = insertData.question

        //Extracting images
        if (insertData.question_images) {
            let imagesArr = []
            for (let image of insertData.question_images) {
                imagesArr.push(image.image_url)
            }
            insertData.images = imagesArr
        } else insertData.images = []

        //Extracting pdfs
        if (insertData.question_pdfs) {
            let pdfsArr = []
            for (let pdf of insertData.question_pdfs) {
                pdfsArr.push(pdf.url)
            }
            insertData.pdfs = pdfsArr
        } else insertData.pdfs = []

        //extracting videos
        if (insertData.question_videos) {
            let videosArr = []
            for (let video of insertData.question_videos) {
                videosArr.push(video.url)
            }
            insertData.videos = videosArr
        } else insertData.videos = []

        if (insertData.choices) insertData.options = Object.values(insertData.choices)

        //correcting answers
        if (insertData.type == "bool") {
            if (insertData.answer == false) insertData.answer = 0
            else insertData.answer = 1
        } else {
            if (insertData.answer == "a") insertData.answer = 0
            else if (insertData.answer == "b") insertData.answer = 1
            else if (insertData.answer == "c") insertData.answer = 2
            else if (insertData.answer == "d") insertData.answer = 3
            else if (insertData.answer == "e") insertData.answer = 4
            else if (insertData.answer == "f") insertData.answer = 5
            else if (insertData.answer == "g") insertData.answer = 6
            else {
                insertData.answer = insertData.options.indexOf(insertData.answer)
            }
        }

        //populating categories and subcategories
        insertData.subcategory = (await axios.get('http://localhost:5000/subcategories/' + subCategoriesMap[insertData.subcategory])).data
        insertData.category = (await axios.get('http://localhost:5000/categories/' + categoriesMap[insertData.category])).data
        delete insertData.category.subs
        delete insertData.category.createdAt
        delete insertData.category.updatedAt
        delete insertData.id
        questionsMap[doc.id] = (await axios.post('http://localhost:5000/questions', insertData)).data.id
    }

    console.log("\nQuestions inserted successfully, now updating other data")

    //Updating v2_flagged_questions
    const flaggedData = await db.collection('v2_flagged_questions').get()
    for (const flagQuestion of flaggedData.docs) {
        if (questionsMap[flagQuestion.data().question_id]) {
            await db.collection('v2_flagged_questions').doc(flagQuestion.id).update("question_id", questionsMap[flagQuestion.data().question_id])
        }
    }
    console.log('v2 flagged questions done')

    const collections = ['v2_endless_mode_preferences', 'v2_qbank_preferences', 'v2_review_mode_preferences', 'v2_timed_mode_preferences']

    // updating preferences collections
    for (const collection of collections) {
        console.log(collection)
        let count = 0;
        let prefColData = await db.collection(collection).get()
        for (const prefData of prefColData.docs) {
            console.log(count++)
            const subCatData = prefData.data().subcategories
            const mainCatData = prefData.data().categories

            let one = false
            let two = false

            if (subCatData && subCatData.length > 0) {
                one = true
                for (const item of subCatData) {
                    if (subCategoriesMap[item]) {
                        //remove item and add new
                        const index = subCatData.indexOf(item)
                        subCatData[index] = subCategoriesMap[item]
                    }
                }
            }

            if (mainCatData && mainCatData.length > 0) {
                two = true
                for (const item of mainCatData) {
                    if (categoriesMap[item]) {
                        //remove item and add new
                        const index = mainCatData.indexOf(item)
                        mainCatData[index] = categoriesMap[item]
                    }
                }
            }

            if (one && two)
                await db.collection(collection).doc(prefData.id).update("subcategories", subCatData, "categories", mainCatData)
            else if (one)
                await db.collection(collection).doc(prefData.id).update("subcategories", subCatData)
            else if (two)
                await db.collection(collection).doc(prefData.id).update("categories", mainCatData)
        }
        console.log("#########################################################")
    }
    console.log('preference collections done')

    const scoreCollections = ['v2_timed_mode_scores', 'v2_review_mode_scores', 'v2_qbank_scores', 'v2_endless_mode_scores']

    // updating score collections
    for (const scoreCollection of scoreCollections) {
        let colData = await db.collection(scoreCollection).get()

        console.log("Data Found " + colData.docs.length)
        count = 0
        for (const cat of colData.docs) {
            console.log(count++)
            const catData = cat.data().answers
            let answers = []
            if (catData && catData.length > 0) {
                for (let item of catData) {
                    if (questionsMap[item["question_id"]]) {
                        item.question_id = questionsMap[item["question_id"]]
                    }

                    if (item.answer == false) item.answer = 0
                    else if (item.answer == true) item.answer = 1
                    else if (item.answer == "a") item.answer = 0
                    else if (item.answer == "b") item.answer = 1
                    else if (item.answer == "c") item.answer = 2
                    else if (item.answer == "d") item.answer = 3
                    else if (item.answer == "e") item.answer = 4
                    else if (item.answer == "f") item.answer = 5
                    else if (item.answer == "g") item.answer = 6

                    answers.push(item)
                }
            }
            let myData = cat.data()
            myData.answers = answers

            switch (scoreCollection) {
                case "v2_timed_mode_scores":
                    await axios.post('http://localhost:5000/timed-mode-scores', myData)
                    break
                case "v2_review_mode_scores":
                    await axios.post('http://localhost:5000/review-mode-scores', myData)
                    break
                case "v2_qbank_scores":
                    await axios.post('http://localhost:5000/qbank-mode-scores', myData)
                    break
                case "v2_endless_mode_scores":
                    await axios.post('http://localhost:5000/endless-mode-scores', myData)
                    break
            }
        }
        console.log(scoreCollection + " done")
    }

    console.log('score collections done')
}