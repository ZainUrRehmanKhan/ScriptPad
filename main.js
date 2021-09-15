// Imports
import firebase from "firebase";
import {MongoClient} from 'mongodb';
import axios from "axios";
import * as fs from "fs";

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
// SKIP THE COMMENTED CODE BELOW
/////////////////////////////////////////

// const collections = ['v2_questions']
// const collections = ['admins', 'available_for_random_match', 'banners', 'current_matches', 'decks', 'endless_highscore', 'endless_mode_option_categories', 'friends_list', 'institution_requests', 'institutions', 'logs', 'option_categories', 'questions', 'review_mode_module', 'review_mode_questions', 'subcategories', 'user_stats', 'users', 'v2_categories', 'v2_current_matches', 'v2_endless_mode_preferences', 'v2_endless_mode_scores', 'v2_flagged_questions', 'v2_institute_confirmations', 'v2_logs', 'v2_notifications', 'v2_qbank_preferences', 'v2_qbank_score', 'v2_qbank_scores', 'v2_question_bookmarks', 'v2_questions', 'v2_review_mode_preferences', 'v2_review_mode_scores', 'v2_subcategories', 'v2_timed_mode_preferences', 'v2_timed_mode_scores', 'v2_users']

// const client = new MongoClient("mongodb://localhost:27017/kotc--db");
// const client = new MongoClient("mongodb+srv://arish:1234@cluster0.kz2th.mongodb.net/kotc--db?retryWrites=true&w=majority");
// await client.connect();

// fetchDataFromCollections().then(r => console.log('Done'));
// async function fetchDataFromCollections() {
//     console.log('Processing...')
//     // for (const collection of collections) {
//     const col = await db.collection("v2_questions").get()
//     const result = []
//
//     // var i = 0
//     for (const doc of col.docs) {
//         // const docu = await client.db('kotc--db').collection('questions').insertOne(doc.data());
//         // console.log(docu.insertedId.toString())
//         break;
//         // db.collection('').doc('').update()
//
//
//         // result.push(doc.data())
//     }
//     // await fs.writeFile('data/' + collection + '.json', JSON.stringify(result), (err, result) => {
//     //     if (err) console.log('Error', err)
//     // })
//     // console.log(collection + ' Successfully Converted.')
//     // }
// }

//////////////////////////////////////////
//////////////////////////////////////////

migrateSubCategories().then(r => console.log('Done'));

async function migrateSubCategories() {
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

    // Updating v2_categories
    let data = await db.collection("v2_categories").get()
    for (const cat of data.docs) {
        const catData = cat.data().subs
        const listSubs = []
        for (const item of catData) {
            if (subCategoriesMap[item.id]) {
                item.id = subCategoriesMap[item.id]
                listSubs.push(item)
            } else listSubs.push(item)
        }
        await db.collection('v2_categories').doc(cat.id).update("subs", listSubs)
    }
    console.log('v2 categories done')

    //updating v2_questions
    const questionData = await db.collection('v2_questions').get()
    for (const cat of questionData.docs) {
        if (subCategoriesMap[cat.data().subcategory]) {
            await db.collection('v2_questions').doc(cat.id).update("subcategory", subCategoriesMap[cat.data().subcategory])
        }
    }
    console.log('v2 questions done')

    const collections = ['v2_endless_mode_preferences', 'v2_qbank_preferences', 'v2_review_mode_preferences', 'v2_timed_mode_preferences']

    // updating preferences collections
    for (const collection of collections) {
        let colData = await db.collection(collection).get()
        for (const cat of colData.docs) {
            const catData = cat.data().subcategories

            if (catData && catData.length > 0) {
                for (const item of catData) {
                    if (subCategoriesMap[item]) {
                        //remove item and add new
                        const index = catData.indexOf(item)
                        catData[index] = subCategoriesMap[item]
                    }
                }

                await db.collection(collection).doc(cat.id).update("subcategories", catData)
            }
        }
    }
    console.log('preference collections done')
}

migrateCategories().then(value => console.log("done"))

async function migrateCategories() {
    console.log("Migrating Categories")

    const col = await db.collection("v2_categories").get()
    console.log(col.docs.length + ' Total')
    let categoriesMap = {}

    for (const doc of col.docs) {
        //inserting to mongodb
        const insertData = doc.data()
        delete insertData.id
        categoriesMap[doc.data().id] = (await axios.post('http://localhost:5000/categories', insertData)).data.id
    }

    console.log("\nCategories inserted successfully, now updating other data")

    //updating v2_questions
    const questionData = await db.collection('v2_questions').get()
    for (const cat of questionData.docs) {
        if (categoriesMap[cat.data().category]) {
            await db.collection('v2_questions').doc(cat.id).update("category", categoriesMap[cat.data().category])
        }
    }
    console.log('v2 questions done')

    const collections = ['v2_endless_mode_preferences', 'v2_qbank_preferences', 'v2_review_mode_preferences', 'v2_timed_mode_preferences']

    // updating preferences collections
    for (const collection of collections) {
        let colData = await db.collection(collection).get()
        for (const cat of colData.docs) {
            const catData = cat.data().categories

            if (catData && catData.length > 0) {
                for (const item of catData) {
                    if (categoriesMap[item]) {
                        //remove item and add new
                        const index = catData.indexOf(item)
                        catData[index] = categoriesMap[item]
                    }
                }

                await db.collection(collection).doc(cat.id).update("categories", catData)
            }
        }
    }
    console.log('preference collections done')
}

migrateQuestions().then(value => console.log("done"))

async function migrateQuestions() {
    console.log("Migrating Questions")

    const col = await db.collection("v2_questions").get()
    console.log(col.docs.length + ' Total')
    let questionsMap = {}

    let WrongQuestions = []

    for (const doc of col.docs) {
        //inserting to mongodb
        const insertData = doc.data()
        insertData.statement = insertData.question
        insertData.images = insertData.question_images
        insertData.videos = insertData.question_videos
        insertData.pdfs = insertData.question_pdfs
        insertData.options = insertData.choices
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
                WrongQuestions.push(insertData)
                continue
            }
        }
        delete insertData.id
        questionsMap[doc.data().id] = (await axios.post('http://localhost:5000/questions', insertData)).data.id
    }

    console.log("\nQuestions inserted successfully, now updating other data")

    //Updating v2_flagged_questions
    const flaggedData = await db.collection('v2_flagged_questions').get()
    for (const cat of flaggedData.docs) {
        if (questionsMap[cat.data().question_id]) {
            await db.collection('v2_flagged_questions').doc(cat.id).update("question_id", questionsMap[cat.data().question_id])
        }
    }
    console.log('v2 flagged questions done')

    const scoreCollections = ['v2_timed_mode_scores', 'v2_review_mode_scores', 'v2_qbank_scores', 'v2_endless_mode_scores']

    //updating score collections
    for (const collection of scoreCollections) {
        let colData = await db.collection(collection).get()
        console.log("Data Found " + colData.docs.length)
        for (const cat of colData.docs) {
            const catData = cat.data().answers
            if (catData && catData.length > 0) {
                for (const item of catData) {
                    if (questionsMap[item.question_id]) {
                        //remove item and add new
                        item.question_id = questionsMap[item.question_id]
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
                }
                await db.collection(collection).doc(cat.id).update("answers", catData)
            }
        }
        console.log(collection + " done")
    }
    console.log('score collections done')
}