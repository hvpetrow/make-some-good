// const loadMoreScrollHandler = async (e) => {
//     console.log("load more event");


//     if (clickable === false) {
//         return;
//     }

//     if (window.scrollY > 200) {
//         try {
//             getAll(orderedQuery)
//                 .then(docs => {
//                     if (docs.empty) {
//                         return;
//                     }
//                     let arr = [];

//                     docs.forEach((doc) => {
//                         let fields = doc.data();

//                         arr.push({
//                             id: doc.id,
//                             fields: fields
//                         });
//                         console.log(doc.id, " => ", doc.data());
//                     });


//                     setCauses(oldArr => [
//                         ...oldArr,
//                         ...arr
//                     ]);


//                     console.log("LATEST DOC", latestDoc);

//                     console.log(docs.docs);
//                     setLatestDoc(docs.docs[docs.docs.length - 1]);
//                     console.log(docs.docs[docs.docs.length - 1]);
//                 console.log("LATEST2222 DOC", latestDoc);

//                 }).then(() => {
//                     setIsLoading(false);
//                 });
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }