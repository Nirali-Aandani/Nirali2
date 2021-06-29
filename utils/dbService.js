const createDocument =  (model, data) => {

    return new Promise((resolve,reject)=>{
        model.create(data, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
       }) 
}

const updateDocument =  (model, id, data) => {
    return new Promise((resolve,reject)=>{
            model.updateOne({ _id: id }, data, { runValidators: true, context: 'query' },(err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
       }) 
}

const deleteDocument =  (model, id) => {

    return new Promise((resolve,reject)=>{
        model.deleteOne({ _id: id}, (err, data) => {
            console.log(data)
            if (err) reject(err);
            else resolve(data);
        })
   }) 


}

const getAllDocuments =  (model,query,options) => {

    return new Promise((resolve,reject)=>{
        model.paginate(query, options, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
   }) 

}

const getSingleDocumentById = (model,id,select=[])=>{
    return new Promise((resolve,reject)=>{
        model.findOne({_id:id},select,(err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
   })
}


//  Request Query
// {
//     "query":{
//         "and":[
//             {"Name":"Dhiraj"},{"Salary":300}
//         ],
//         "or":[
//           {"Name":"Dhiraj"},{"Salary":300}
//         ]
//     },
//     "model":"Employee"
// }

const findExistsData = (model,data) => {
    // let { model } = data;
    let { query } = data;
    let { and } = query;
    let { or } = query;
    var q = {};

    if (and) {
        console.log("in add");
        q["$and"] = [];
        for (let index = 0; index < and.length; index++) {
          q["$and"].push(and[index]);
        }
      }
      if (or) {
        q["$or"] = [];
        console.log("in Or");
        for (let index = 0; index < or.length; index++) {
          q["$or"].push(or[index]);
        }
      }

    return new Promise((resolve,reject)=>{
        model.find(q,(err,result)=>{
            if (err) reject(err);
            else resolve(result);
        });
   }) 
    
}
const getDocumenyByAggregation=(model,query)=>{
    
    let keys, values;
    let obj;
    let q = {};
    let arr = [];
    let a2 = {};
    let a3 = {};


    for (const [y, x] of Object.entries(query)) {
        for (const [j, i] of Object.entries(x)) {
            switch (y) {
                case 'group':
                    keys = 'key' in i;
                    if (keys) {
                        values = Object.values(i);
                        let v = Object.values(values[0]);
                        let k = Object.keys(values[0]);
                        for (const [b, a] of Object.entries(v)) {
                            if (Array.isArray(a)) {
                                a2._id = `$${k[b]}`;
                                for (const [p, s] of Object.entries(a)) {
                                    a3[`$${j}`] += `$${s}`;
                                    a3[`$${j}`] = a3[`$${j}`].split('undefined').join('');
                                    a2[s] = a3;
                                    a3={};
                                }
                                obj = '';
                                q.$group = a2;
                                arr.push(q);
                            } else {
                                a2._id = `$${k[b]}`;
                                    a3[`$${j}`] = `$${a}`;
                                    a3[`$${j}`] = a3[`$${j}`].split('undefined').join('');
                                    a2[a] = a3;
                                obj = '';
                                q.$group = a2;
                                arr.push(q);

                            }

                        }

                    }
                    q={};
                    a2={};
                    a3={};
                
                    break;

                case 'match':
                    values = Object.values(i).flat();
                    keys = Object.keys(i);
                    if (Array.isArray(values) && values.length > 1) {
                        a3['$in'] = values;
                        a2[keys[0]] = a3;
                    } else {
                        a2[keys[0]] = values[0];
                    }
                    q.$match = a2;
                    arr.push(q);
                    q={};
                    a2={};
                    a3={};
                    break;

                case 'project':
                    values = Object.values(i);
                    if (values.length === 1) {
                        let v = Object.values(values[0]).toString();
                        let k = Object.keys(values[0]).toString();
                        let demo = []

                        if (isNaN(v)) {
                            demo.push(`$${k}`);
                            demo.push(`$${v}`);
                        } else {
                            demo.push(`$${k}`);
                            demo.push(v);
                        }
                        a2[`$${j}`]=demo;
                        q.$project=a2;
                        arr.push(q);
                    }
                    q={};
                    a2={};
                    a3={};
                
                    break;

            }
        }
    } 
    return new Promise((resolve,reject)=>{
        model.aggregate(arr,(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data)
        })   
        
})
}

const softDeleteDocument = (model,id) => {
    return new Promise(async(resolve,reject)=>{
      const result = await getSingleDocumentById(model,id)
        result.isDeleted=true
        result.isActive=false
        model.updateOne({ _id: id },result, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
   }) 
}

const bulkInsert = (model,data)=>{
    return new Promise((resolve,reject)=>{

        model.insertMany(data,(err,result)=>{
            if(result !== undefined && result.length > 0 ){
                resolve(result)
            }else{
                reject(err)
            }
        })

        
    })
}

const bulkUpdate = (model ,filter,data)=>{
    return new Promise((resolve,reject)=>{
        model.updateMany(filter,data,(err,result)=>{
            if(result !== undefined){
                resolve(result)
            }else{
                reject(err)
            }
        })
    })
}

const countDocument = (model,where)=>{
    return new Promise((resolve,reject)=>{
        model.where(where).countDocuments((err,result)=>{
            if(result !== undefined){
                resolve(result)
            }else{
                reject(err)
            }
        })
    })
}

const getDocumentByQuery = (model,where,select=[])=>{
    return new Promise((resolve,reject)=>{
        model.findOne(where,select,(err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
   })
}

module.exports={
    createDocument:createDocument,
    getAllDocuments:getAllDocuments,
    updateDocument:updateDocument,
    deleteDocument:deleteDocument,
    getSingleDocumentById:getSingleDocumentById,
    findExistsData:findExistsData,
    softDeleteDocument:softDeleteDocument,
    bulkInsert:bulkInsert,
    bulkUpdate:bulkUpdate,
    countDocument:countDocument,
    getDocumentByQuery:getDocumentByQuery,
    getDocumenyByAggregation:getDocumenyByAggregation


}