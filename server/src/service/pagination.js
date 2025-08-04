let DEFAULT_LIMIT = 20;
let DEFAULT_PAGE = 1
let DEFAULT_SORT = -1


function getPagination(qurery){
    let limit = Math.abs(qurery.limit) || DEFAULT_LIMIT;
    let page = Math.abs(qurery.page) ||  DEFAULT_PAGE ;
    let skip = (page - 1) * limit;
    let sort = Number(qurery.sort) || DEFAULT_SORT


    return{
        skip,
        limit,
        sort
    }
}


module.exports = {
    getPagination
};